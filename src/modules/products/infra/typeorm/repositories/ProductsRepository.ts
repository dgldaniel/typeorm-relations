import { getRepository, Repository, In } from 'typeorm';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IUpdateProductsQuantityDTO from '@modules/products/dtos/IUpdateProductsQuantityDTO';
import Product from '../entities/Product';

interface IFindProducts {
  id: string;
}

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create({
    name,
    price,
    quantity,
  }: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create({
      name,
      price,
      quantity,
    });

    await this.ormRepository.save(product);

    return product;
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const findProduct = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return findProduct;
  }

  public async findAllById(products: IFindProducts[]): Promise<Product[]> {
    const productsFound = await this.ormRepository.find({
      where: In(products),
    });

    return productsFound;
  }

  public async updateQuantity(
    products: IUpdateProductsQuantityDTO[],
  ): Promise<Product[]> {
    const productsOperators = await Promise.all(
      products.map(async product => {
        const productFound = await this.ormRepository.findOne(product.id);

        if (!productFound) return undefined;

        const { quantity: currentQuantity } = product;
        const { quantity: quantityReal } = productFound;

        const checkQuantity = currentQuantity <= quantityReal;

        if (!checkQuantity) return undefined;

        const newQuantity = quantityReal - currentQuantity;

        productFound.quantity = newQuantity;

        await this.ormRepository.save(productFound);

        return productFound;
      }),
    );

    const productsUpdated = productsOperators.filter(
      product => product !== undefined,
    ) as Product[];

    return productsUpdated;
  }
}

export default ProductsRepository;

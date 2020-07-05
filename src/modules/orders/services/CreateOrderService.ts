import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const currentCustomer = await this.customersRepository.findById(
      customer_id,
    );

    if (!currentCustomer) {
      throw new AppError('Customer not exists');
    }

    const productsId = products.map(product => ({
      id: product.id,
    }));

    const productsFound = await this.productsRepository.findAllById(productsId);

    if (productsFound.length !== products.length) {
      throw new AppError('Products not exists');
    }

    const productsUpdated = await this.productsRepository.updateQuantity(
      products,
    );

    if (productsUpdated.length !== products.length) {
      throw new AppError('Error on Updated Products');
    }

    const productsToOrder = productsUpdated.map(product => ({
      product_id: product.id,
      price: product.price,
      quantity: product.quantity,
    }));

    const newOrder = await this.ordersRepository.create({
      customer: currentCustomer,
      products: productsToOrder,
    });

    return newOrder;
  }
}

export default CreateOrderService;

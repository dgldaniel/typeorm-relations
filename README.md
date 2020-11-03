![Logo of the project](https://camo.githubusercontent.com/a869a2aaab296ef925343d7e76518cd213eb0a30/68747470733a2f2f73746f726167652e676f6f676c65617069732e636f6d2f676f6c64656e2d77696e642f626f6f7463616d702d676f737461636b2f6865616465722d6465736166696f732d6e65772e706e67)

# Typeorm relations

Creation of customers, products and orders, where the customer can generate new purchase orders for certain products, such as a small e-commerce.

## Requirements

- For development, you will need Node.js, a node global package, Yarn, installed in your environement.

- Docker to use PostgresSQL.

- Insomnia to use API REST.

### Node

- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
  Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

### Main Tools and concepts

- Typescript
- Express.js
- TypeORM
- Many-to-many relationships
- Cascade option
- Eager loading
- DDD architecture
- Eslint
- Jest

### Yarn installation

After installing node, this project will need yarn too, so just run the following command.

      $ npm install -g yarn

### Postgres installation

[Instalar Docker](https://docs.docker.com/)

After installing, run this command on the terminal:

      $ docker run --name <some-name> -e POSTGRES_PASSWORD=docker -p <some-port>:5432 -d postgres
      
If the container is not running, start the service:
  
      $ docker start <container-name>
      
## Install

    $ git clone https://github.com/dgldaniel/gostack-template-typeorm-relations.git
    $ cd gostack-template-typeorm-relations
    $ yarn install
      
## Configure app

Create "gostack_desafio09" database using some Postgres service (PostBird, Pgadmin...)

Check that the database credentials in the file are correct 'ormconfig.json'.

With the Postgre service turned on, migrate with the command:

    $ yarn typeorm migration:run
 
## Running the project

In other terminal, run:

    $ yarn dev:server
    
[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=GoStack_Typeorm_Relations&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fdgldaniel%2Fgostack-template-typeorm-relations%2Fmaster%2Fexport_typeorm_relations.json)

Create a customer - http://localhost:3333/customer (POST)
 
Request example:

```json
{
	"name": "Daniel Douglas",
	"email": "daniel@test.com"
}
```

Create a product - http://localhost:3333/products (POST)

Request example:

```json
{
	"name": "Celular",
	"price": 99.99,
	"quantity": 20
}
```
 
Create a order - http://localhost:3333/orders (POST)

Request example:

```json
{
  "customer_id": "a5bdd1a3-5f04-46a0-b282-0364d37f8222",
  "products": [
    {
      "id": "052ed985-3cdb-480c-b68b-3ef2249f6073",
      "quantity": 1
    },
    {
      "id": "7df43890-d75c-4835-82f2-a1619a86692f",
      "quantity": 1
    }
  ]
}
```

Show an order - http://localhost:3333/orders/:order-id (GET)
    
## Running tests

    $ yarn test

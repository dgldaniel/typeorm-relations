![Logo of the project](https://camo.githubusercontent.com/a869a2aaab296ef925343d7e76518cd213eb0a30/68747470733a2f2f73746f726167652e676f6f676c65617069732e636f6d2f676f6c64656e2d77696e642f626f6f7463616d702d676f737461636b2f6865616465722d6465736166696f732d6e65772e706e67)

# Typeorm relations

Creation of customers, products and orders, where the customer can generate new purchase orders for certain products, such as a small e-commerce.

## Requirements

For development, you will need Node.js, a node global package, Yarn, installed in your environement.

Irá precisar do Docker para usar o PostgresSQL.

Insomnia, para utilizar a API REST da aplicação.

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

###

### Yarn installation

After installing node, this project will need yarn too, so just run the following command.

      $ npm install -g yarn

### Instalação do Postgres

![Instalar Docker](https://docs.docker.com/)

Após instalar, rode esse comando no terminal:

      $ docker run --name <some-name> -e POSTGRES_PASSWORD=docker -p <some-port>:5432 -d postgres
      
Se o container não estiver rodando, inicie o serviço:
  
      $ docker start <container-name>
      
## Install

    $ git clone https://github.com/dgldaniel/gostack-template-typeorm-relations.git
    $ cd gostack-template-typeorm-relations
    $ yarn install
      
## Configure app

Crie o database "gostack_desafio09" usando algum cliente de Postgres (PostBird, Pgadmin...)

Verifique se estão corretas as credenciais do banco de dados no arquivo 'ormconfig.json'.

Com o serviço do Postgre ligado, faça a migração com o comando:

    $ yarn typeorm migration:run
 
## Running the project

In other terminal, run:

    $ yarn dev:server
    
## Running tests

    $ yarn test



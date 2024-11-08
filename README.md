<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="100" alt="NestJS Logo" /></a>
  &nbsp;&nbsp;&nbsp;
  <a href="https://typeorm.io/" target="blank"><img src="https://github.com/typeorm/typeorm/raw/master/resources/logo_big.png" width="180" alt="TypeORM Logo" /></a>
  &nbsp;&nbsp;&nbsp;
  <a href="https://www.typescriptlang.org/" target="blank"><img src="https://cdn.worldvectorlogo.com/logos/typescript.svg" width="100" alt="TypeScript Logo" /></a>
  &nbsp;&nbsp;&nbsp;
  <a href="https://www.mysql.com/" target="blank"><img src="https://www.mysql.com/common/logos/logo-mysql-170x115.png" width="100" alt="MySQL Logo" /></a>
  <a href="https://www.graphql.org/" target="blank"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT98DxugSAuOVaFkvEL8Lz8Xxl-oCrSVx1dvg&s" width="100" alt="MySQL Logo" /></a>

</p>

# GraphQL API with TypeORM and MySQL integration

## A functioning project built according to the given specifications, created using NestJS, GraphQL, TypeORM, and MySQL

- This is the repository for Hanpooms Database - Backend Exam.
- Created by Juan Francisco Santos

### Installation

- This project assumes that we'll be using a MySQL database

1. Clone this project
2. To install, run the following:

```
pnpm install

or

npm install
```

- Create your database via MySQL workbench or the tool of your choice
- Then put the credentials in a .env file like so:

```
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=root
DB_NAME=hanpoom
```

- Run the project via:

```
pnpm run start:dev

or

npm run start:dev
```

### Queries available

- See submitted PDF document for screenshots.
- curl or open your browser to the endpoint: http://127.0.0.1:3000/graphql

#### Pre-order slips

**Query**

```
{
  preOrder(date: "2023-08-10") {
    id
    order_fulfillment_order_id
    count_of_pre_order_items
    printed_username
  }
}
```

**Result**

```
{
  "data": {
    "preOrder": [
      {
        "id": 2160,
        "order_fulfillment_order_id": "2167",
        "count_of_pre_order_items": 1,
        "printed_username": "test"
      }
    ]
  }
}
```

#### Picking Slips with status and pagination

```
{
  pickingSlips(status : "printed", pageSize: 3){
    picking_slip_id
    order_id
    picking_slip_status
    has_pre_order_item
    created_at
  }
}
```

**Result**

```
{
  "data": {
    "pickingSlips": [
      {
        "picking_slip_id": 2861,
        "order_id": "2869",
        "picking_slip_status": "printed",
        "has_pre_order_item": true,
        "created_at": "2024-02-16 10:54:37"
      },
      {
        "picking_slip_id": 2860,
        "order_id": "2868",
        "picking_slip_status": "printed",
        "has_pre_order_item": true,
        "created_at": "2024-02-16 10:44:23"
      },
      {
        "picking_slip_id": 2859,
        "order_id": "2867",
        "picking_slip_status": "printed",
        "has_pre_order_item": true,
        "created_at": "2024-02-16 10:35:51"
      }
    ]
  }
}
```

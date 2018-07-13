DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;


CREATE TABLE products(
id int AUTO_INCREMENT NOT NULL,
product_name varchar(30) NOT NULL,
department_name varchar(30) NOT NULL,
price int not null,
stock_quanity int not null,
primary key (id)
);


insert into products (id, product_name, department_name, price, stock_quanity)
value (1, 'Baseball', 'Sports', 10, 100);

insert into products (id, product_name, department_name, price, stock_quanity)
value (2, 'Tent', 'Camping', 100, 10);

insert into products (id, product_name, department_name, price, stock_quanity)
value (3, 'Soda Pop', 'Grocery', 1, 1000);

insert into products (id, product_name, department_name, price, stock_quanity)
value (4, 'Rocky Chair', 'Living', 200, 50);

insert into products (id, product_name, department_name, price, stock_quanity)
value (5, 'Basketball', 'Sports', 30, 45);

insert into products (id, product_name, department_name, price, stock_quanity)
value (6, 'Snickers', 'Grocery', 1, 500);

insert into products (id, product_name, department_name, price, stock_quanity)
value (7, 'BBQ', 'Outdoor Living', 350, 18);

insert into products (id, product_name, department_name, price, stock_quanity)
value (8, 'Broom', 'Cleaning', 10, 35);

insert into products (id, product_name, department_name, price, stock_quanity)
value (9, 'Volleyball', 'Sports', 20, 75);

insert into products (id, product_name, department_name, price, stock_quanity)
value (10, 'hammock','Outdoor Living', 75, 30);


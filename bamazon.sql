DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products
(
    item_id INT(10)
    AUTO_INCREMENT NOT NULL,
    product_name VARCHAR
    (30) NOT NULL,
    department_name VARCHAR
    (30) NOT NULL,
    price DECIMAL
    (6,2) NOT NULL,
    stock_quantity INT
    (10) NOT NULL,
    PRIMARY KEY
    (item_id)
);
    -- 1
    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("Sony TV 65 inches", 'Electronics', 1200, 20);

    -- 2
    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("Bosch Dishwasher", 'Appliances', 700, 20);
    -- 3
    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("Kenmore Oven", 'Appliances', 400, 10);
    -- 4
    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("Whirlpool Refrigerator", 'Appliances', 500, 20);
    -- 5
    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("Dell 17 inch Laptop", 'Electronics', 1000, 40);
    -- 6
    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("Samsung Galaxy S5 Mobile", 'Electronics', 400, 100);
    -- 7
    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("Sealy Queen Mattress", 'Bedroom', 700, 200);
    -- 8
    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("Sofa", 'Furniture', 600, 20);
    -- 9
    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("Leather Jacket", "Men's Clothes", 200, 200);
    -- 10
    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("Gucci Sandals", "Women's Shoes", 300, 100);
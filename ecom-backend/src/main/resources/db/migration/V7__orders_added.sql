CREATE TABLE orders
(
    id          BIGINT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    order_date  datetime              NULL,
    total_price DECIMAL               NULL,
    user_id     BIGINT                NULL,
    CONSTRAINT FK_ORDERS_ON_USER FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE order_items
(
    id       BIGINT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name     VARCHAR(255)          NULL,
    price    DECIMAL               NULL,
    quantity INT                   NOT NULL,
    order_id BIGINT                NULL,
    CONSTRAINT FK_ORDER_ITEMS_ON_ORDER FOREIGN KEY (order_id) REFERENCES orders (id)
);
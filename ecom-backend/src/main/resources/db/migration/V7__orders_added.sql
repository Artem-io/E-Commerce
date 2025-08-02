CREATE TABLE orders
(
    id         BIGINT AUTO_INCREMENT NOT NULL,
    order_date datetime              NULL,
    cart_id    BIGINT                NULL,
    CONSTRAINT pk_orders PRIMARY KEY (id)
);

ALTER TABLE orders
    ADD CONSTRAINT FK_ORDERS_ON_CART FOREIGN KEY (cart_id) REFERENCES carts (id);
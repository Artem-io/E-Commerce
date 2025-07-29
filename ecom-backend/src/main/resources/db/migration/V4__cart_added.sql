CREATE TABLE cart_items
(
    id         BIGINT AUTO_INCREMENT NOT NULL,
    product_id BIGINT                NULL,
    quantity   INT                   NOT NULL,
    cart_id    BIGINT                NULL,
    CONSTRAINT pk_cart_items PRIMARY KEY (id)
);

CREATE TABLE carts
(
    id          BIGINT AUTO_INCREMENT NOT NULL,
    total_price DOUBLE                NOT NULL,
    CONSTRAINT pk_carts PRIMARY KEY (id)
);

ALTER TABLE cart_items
    ADD CONSTRAINT FK_CART_ITEMS_ON_CART FOREIGN KEY (cart_id) REFERENCES carts (id);

ALTER TABLE cart_items
    ADD CONSTRAINT FK_CART_ITEMS_ON_PRODUCT FOREIGN KEY (product_id) REFERENCES products (id);

ALTER TABLE users add cart_id bigint null;

ALTER TABLE users
    ADD CONSTRAINT uc_users_cart UNIQUE (cart_id);

ALTER TABLE users
    ADD CONSTRAINT FK_USERS_ON_CART FOREIGN KEY (cart_id) REFERENCES carts (id);
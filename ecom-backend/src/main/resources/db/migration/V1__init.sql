CREATE TABLE products
(
    id            BIGINT AUTO_INCREMENT NOT NULL,
    name          VARCHAR(40)           NULL,
    `description` VARCHAR(300)          NULL,
    price         DECIMAL               NOT NULL,
    is_available  BIT(1)                NOT NULL,
    CONSTRAINT pk_products PRIMARY KEY (id)
);

CREATE TABLE users
(
    id       BIGINT AUTO_INCREMENT NOT NULL,
    username VARCHAR(30)           NULL,
    password VARCHAR(100)           NULL,
    `role`   VARCHAR(255)          NULL,
    CONSTRAINT pk_users PRIMARY KEY (id)
);
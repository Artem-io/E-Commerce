# E-Commerce
A website built with Spring Boot 3.5 (Java 21) and React (TytpeScript), providing RESTful APIs for managing products, users, shopping carts, and authentication.

## Features
- Users can register and log in (Spring Security + JWT)
- Complete CRUD operations for products
- Role-based authorization (admin, user): only admins can add / delete / edit products.
- Admins can upload image for a product.
- Logged users can add products to cart, change quantity and then checkout.

## Stack
- Backend: Spring Boot 3.5
- Frontend: React
- Database: Mysql + Flyway
- Image Storage: AWS S3
- Testing: JUnit 5, Mockito
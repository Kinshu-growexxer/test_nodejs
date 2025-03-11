# Kinshu Node.js Project: E-Commerce API

## Description

This project is a RESTful API designed for an e-commerce platform, handling product management, order processing, user authentication, and basic inventory control. It's built using Node.js, Express.js, and MongoDB, providing a robust backend for modern web and mobile applications.

## Features

**Product Management:**

* **Create Products:** Add new products with detailed information including name, description, price, and images.
* **Update Products:** Modify existing product details.
* **List Products:** Retrieve a list of products with support for filtering, sorting, and pagination.
* **Product Categories:** Group products into categories for easier navigation.
* **Inventory Tracking:** Basic inventory management to track product stock levels.

**Order Management:**

* **Place Orders:** Allow users to place orders with multiple products.
* **Order Status Updates:** Update order status (e.g., pending, processing, shipped, delivered).
* **Order History:** Retrieve order history for users.
* **Order Details:** View detailed information about a specific order.

**User Authentication & Authorization:**

* **User Registration:** Enable users to create accounts.
* **User Login:** Authenticate users and generate JWT tokens.
* **Role-Based Access Control (RBAC):** Implement basic RBAC for admin and regular users.

**Additional Features:**

* **Image Uploads:** Utilize Multer for handling product image uploads.
* **Data Validation:** Implement input validation for all API endpoints.
* **Error Handling:** Robust error handling and logging.

**Product Management:**

* `POST /api/products`: Create a new product.
* `PATCH /api/products/:id`: Update an existing product.
* `GET /api/products`: Retrieve a list of products (with filtering, sorting, and pagination).
* `GET /api/products/categories`: Get a list of product categories.

**Order Management:**

* `POST /api/orders`: Place a new order.
* `PATCH /api/orders/:id`: Update order status.
* `GET /api/orders/:id`: Retrieve order details.
* `GET /api/orders`: Retrieve order history (with filtering and pagination).

**Authentication:**

* `POST /api/auth/register`: Register a new user.
* `POST /api/auth/login`: User login and JWT token generation.

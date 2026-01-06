# E-Commerce Backend API

A comprehensive RESTful API for e-commerce applications built with Node.js, Express, and MongoDB.

## Features

- **User Authentication & Authorization**
  - User registration and login
  - JWT-based authentication
  - Role-based access control (Admin/Customer)
  - Secure password hashing with bcrypt

- **Product Management**
  - CRUD operations for products
  - Product search and filtering
  - Category-based filtering
  - Price range filtering
  - Pagination support

- **Shopping Cart**
  - Add/remove items from cart
  - Update item quantities
  - Automatic price calculation
  - Cart persistence per user

- **Order Management**
  - Place orders from cart
  - Order history tracking
  - Order status updates
  - Payment status tracking
  - Stock management

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **Security:** bcryptjs for password hashing

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/thai282004/e-commerce-backend.git
cd e-commerce-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

5. Start MongoDB service:
```bash
# On macOS with Homebrew
brew services start mongodb-community

# On Linux with systemd
sudo systemctl start mongod

# Or use MongoDB Atlas (cloud)
```

6. Start the development server:
```bash
npm run dev
```

The server will start on `http://localhost:5000`

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

### User Endpoints

#### Register User
```http
POST /api/users/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "customer",
  "token": "jwt_token"
}
```

#### Login User
```http
POST /api/users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get User Profile
```http
GET /api/users/profile
Authorization: Bearer <token>
```

#### Update User Profile
```http
PUT /api/users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Smith",
  "phone": "1234567890",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  }
}
```

#### Get All Users (Admin only)
```http
GET /api/users
Authorization: Bearer <admin_token>
```

---

### Product Endpoints

#### Get All Products
```http
GET /api/products?category=electronics&search=laptop&minPrice=100&maxPrice=2000&page=1&limit=10
```

**Query Parameters:**
- `category`: Filter by category (electronics, clothing, books, home, sports, toys, other)
- `search`: Search in product name and description
- `minPrice`: Minimum price filter
- `maxPrice`: Maximum price filter
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

#### Get Single Product
```http
GET /api/products/:id
```

#### Create Product (Admin only)
```http
POST /api/products
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "Laptop",
  "description": "High-performance laptop",
  "price": 1299.99,
  "category": "electronics",
  "stock": 50,
  "brand": "TechBrand",
  "images": ["url1", "url2"]
}
```

#### Update Product (Admin only)
```http
PUT /api/products/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "price": 1199.99,
  "stock": 45
}
```

#### Delete Product (Admin only)
```http
DELETE /api/products/:id
Authorization: Bearer <admin_token>
```

---

### Cart Endpoints

#### Get User Cart
```http
GET /api/cart
Authorization: Bearer <token>
```

#### Add Item to Cart
```http
POST /api/cart
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": "product_id",
  "quantity": 2
}
```

#### Update Cart Item Quantity
```http
PUT /api/cart/:productId
Authorization: Bearer <token>
Content-Type: application/json

{
  "quantity": 3
}
```

#### Remove Item from Cart
```http
DELETE /api/cart/:productId
Authorization: Bearer <token>
```

#### Clear Cart
```http
DELETE /api/cart
Authorization: Bearer <token>
```

---

### Order Endpoints

#### Create Order
```http
POST /api/orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "orderItems": [
    {
      "product": "product_id",
      "name": "Product Name",
      "quantity": 2,
      "price": 99.99
    }
  ],
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "paymentMethod": "credit_card",
  "itemsPrice": 199.98,
  "taxPrice": 20.00,
  "shippingPrice": 10.00,
  "totalPrice": 229.98
}
```

#### Get Order by ID
```http
GET /api/orders/:id
Authorization: Bearer <token>
```

#### Get My Orders
```http
GET /api/orders/myorders
Authorization: Bearer <token>
```

#### Get All Orders (Admin only)
```http
GET /api/orders
Authorization: Bearer <admin_token>
```

#### Update Order Status (Admin only)
```http
PUT /api/orders/:id/status
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "orderStatus": "shipped"
}
```

**Status Options:** pending, processing, shipped, delivered, cancelled

#### Update Payment Status
```http
PUT /api/orders/:id/payment
Authorization: Bearer <token>
Content-Type: application/json

{
  "paymentStatus": "completed"
}
```

**Payment Status Options:** pending, completed, failed

---

## Project Structure

```
e-commerce-backend/
├── src/
│   ├── config/
│   │   └── database.js          # Database connection
│   ├── controllers/
│   │   ├── cartController.js    # Cart logic
│   │   ├── orderController.js   # Order logic
│   │   ├── productController.js # Product logic
│   │   └── userController.js    # User logic
│   ├── middleware/
│   │   └── auth.js              # Authentication middleware
│   ├── models/
│   │   ├── Cart.js              # Cart schema
│   │   ├── Order.js             # Order schema
│   │   ├── Product.js           # Product schema
│   │   └── User.js              # User schema
│   ├── routes/
│   │   ├── cartRoutes.js        # Cart routes
│   │   ├── orderRoutes.js       # Order routes
│   │   ├── productRoutes.js     # Product routes
│   │   └── userRoutes.js        # User routes
│   ├── utils/
│   │   └── generateToken.js     # JWT token generator
│   └── server.js                # App entry point
├── .env.example                 # Environment variables template
├── .gitignore
├── package.json
└── README.md
```

## Error Handling

The API uses standard HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

Error responses follow this format:
```json
{
  "message": "Error description"
}
```

## Security Features

- Password hashing using bcryptjs
- JWT-based authentication
- Role-based access control
- Protected routes with authentication middleware
- Input validation
- CORS enabled
- **Rate limiting** to prevent abuse:
  - General API: 100 requests per 15 minutes
  - Authentication endpoints: 5 attempts per 15 minutes
  - Order creation: 10 orders per hour

## Development

Run in development mode with auto-reload:
```bash
npm run dev
```

Run in production mode:
```bash
npm start
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

ISC

## Author

Built with ❤️ for modern e-commerce applications

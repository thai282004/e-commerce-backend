# API Testing Guide

This guide provides examples for testing all API endpoints using cURL or any HTTP client.

## Setup

1. Start the server:
```bash
npm run dev
```

2. (Optional) Seed the database with sample data:
```bash
npm run seed
```

## Environment Variables

For the examples below, set these variables:
```bash
BASE_URL=http://localhost:5000/api
```

---

## User API Tests

### 1. Register a New User
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 2. Login User
```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

Save the token from the response for authenticated requests.

### 3. Get User Profile (Authenticated)
```bash
curl -X GET http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 4. Update User Profile (Authenticated)
```bash
curl -X PUT http://localhost:5000/api/users/profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "Updated Name",
    "phone": "1234567890",
    "address": {
      "street": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zipCode": "10001",
      "country": "USA"
    }
  }'
```

### 5. Get All Users (Admin Only)
```bash
curl -X GET http://localhost:5000/api/users \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE"
```

---

## Product API Tests

### 1. Get All Products
```bash
# Basic request
curl -X GET http://localhost:5000/api/products

# With filters
curl -X GET "http://localhost:5000/api/products?category=electronics&minPrice=100&maxPrice=2000&page=1&limit=5"

# With search
curl -X GET "http://localhost:5000/api/products?search=laptop"
```

### 2. Get Single Product
```bash
curl -X GET http://localhost:5000/api/products/PRODUCT_ID_HERE
```

### 3. Create Product (Admin Only)
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE" \
  -d '{
    "name": "New Product",
    "description": "Product description",
    "price": 99.99,
    "category": "electronics",
    "stock": 50,
    "brand": "BrandName",
    "images": ["url1", "url2"]
  }'
```

### 4. Update Product (Admin Only)
```bash
curl -X PUT http://localhost:5000/api/products/PRODUCT_ID_HERE \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE" \
  -d '{
    "price": 89.99,
    "stock": 45
  }'
```

### 5. Delete Product (Admin Only)
```bash
curl -X DELETE http://localhost:5000/api/products/PRODUCT_ID_HERE \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE"
```

---

## Cart API Tests

### 1. Get User's Cart
```bash
curl -X GET http://localhost:5000/api/cart \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 2. Add Item to Cart
```bash
curl -X POST http://localhost:5000/api/cart \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "productId": "PRODUCT_ID_HERE",
    "quantity": 2
  }'
```

### 3. Update Cart Item Quantity
```bash
curl -X PUT http://localhost:5000/api/cart/PRODUCT_ID_HERE \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "quantity": 3
  }'
```

### 4. Remove Item from Cart
```bash
curl -X DELETE http://localhost:5000/api/cart/PRODUCT_ID_HERE \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 5. Clear Cart
```bash
curl -X DELETE http://localhost:5000/api/cart \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Order API Tests

### 1. Create Order
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "orderItems": [
      {
        "product": "PRODUCT_ID_HERE",
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
  }'
```

### 2. Get Order by ID
```bash
curl -X GET http://localhost:5000/api/orders/ORDER_ID_HERE \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 3. Get My Orders
```bash
curl -X GET http://localhost:5000/api/orders/myorders \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 4. Get All Orders (Admin Only)
```bash
curl -X GET http://localhost:5000/api/orders \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE"
```

### 5. Update Order Status (Admin Only)
```bash
curl -X PUT http://localhost:5000/api/orders/ORDER_ID_HERE/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE" \
  -d '{
    "orderStatus": "shipped"
  }'
```

### 6. Update Payment Status
```bash
curl -X PUT http://localhost:5000/api/orders/ORDER_ID_HERE/payment \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "paymentStatus": "completed"
  }'
```

---

## Testing Flow Example

Here's a complete testing flow:

1. **Register a new user**
2. **Login to get token**
3. **Browse products** (public)
4. **Add products to cart** (authenticated)
5. **View cart**
6. **Create order from cart** (authenticated)
7. **View order details**
8. **Update payment status**
9. **(Admin) Update order status**

---

## Sample Test Data (After Seeding)

### Admin User
- Email: `admin@example.com`
- Password: `admin123`

### Customer Users
- Email: `john@example.com` / Password: `password123`
- Email: `jane@example.com` / Password: `password123`

### Product Categories
- electronics
- clothing
- books
- home
- sports
- toys
- other

### Payment Methods
- credit_card
- debit_card
- paypal
- cash_on_delivery

### Order Status Values
- pending
- processing
- shipped
- delivered
- cancelled

### Payment Status Values
- pending
- completed
- failed

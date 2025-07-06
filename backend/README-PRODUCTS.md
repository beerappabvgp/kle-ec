# Product Module API Documentation

## Overview
The Product module provides complete CRUD operations for managing products in the ecommerce system. All APIs are protected and require authentication.

## Base URL
```
/api/products
```

## Authentication
All endpoints require a valid JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## API Endpoints

### 1. Create Product
**POST** `/api/products`

Creates a new product.

**Request Body:**
```json
{
  "name": "iPhone 15 Pro",
  "description": "The most advanced iPhone ever with A17 Pro chip",
  "price": 999,
  "originalPrice": 1199,
  "discountPercentage": 17,
  "category": "Electronics",
  "brand": "Apple",
  "images": [
    "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500"
  ],
  "stock": 50,
  "tags": ["smartphone", "iphone", "apple"],
  "specifications": {
    "Screen Size": "6.1 inches",
    "Storage": "128GB"
  },
  "isFeatured": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "product_id",
    "name": "iPhone 15 Pro",
    "description": "The most advanced iPhone ever with A17 Pro chip",
    "price": 999,
    "sku": "SKU-abc123-def456",
    "createdBy": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 2. Get All Products
**GET** `/api/products`

Retrieves all products with filtering, sorting, and pagination.

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10)
- `search` (string): Search in name, description, or brand
- `category` (string): Filter by category
- `brand` (string): Filter by brand
- `minPrice` (number): Minimum price filter
- `maxPrice` (number): Maximum price filter
- `isActive` (boolean): Filter by active status
- `isFeatured` (boolean): Filter by featured status
- `sortBy` (string): Sort field (default: createdAt)
- `sortOrder` (string): Sort order - 'asc' or 'desc' (default: desc)

**Example:**
```
GET /api/products?page=1&limit=5&category=Electronics&sortBy=price&sortOrder=asc
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "product_id",
      "name": "iPhone 15 Pro",
      "price": 999,
      "category": "Electronics",
      "brand": "Apple",
      "isActive": true,
      "isFeatured": true,
      "rating": 4.8,
      "reviewCount": 1250
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 5,
    "total": 25,
    "pages": 5
  }
}
```

### 3. Get Product by ID
**GET** `/api/products/:id`

Retrieves a specific product by ID.

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "product_id",
    "name": "iPhone 15 Pro",
    "description": "The most advanced iPhone ever with A17 Pro chip",
    "price": 999,
    "originalPrice": 1199,
    "discountPercentage": 17,
    "category": "Electronics",
    "brand": "Apple",
    "images": ["https://example.com/image.jpg"],
    "stock": 50,
    "tags": ["smartphone", "iphone"],
    "specifications": {
      "Screen Size": "6.1 inches",
      "Storage": "128GB"
    },
    "isActive": true,
    "isFeatured": true,
    "rating": 4.8,
    "reviewCount": 1250,
    "createdBy": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 4. Get Product Details (Customer View)
**GET** `/api/products/:id/details`

Retrieves product details optimized for customer view with calculated discounted price.

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "product_id",
    "name": "iPhone 15 Pro",
    "description": "The most advanced iPhone ever with A17 Pro chip",
    "price": 999,
    "originalPrice": 1199,
    "discountPercentage": 17,
    "discountedPrice": 995.17,
    "category": "Electronics",
    "brand": "Apple",
    "images": ["https://example.com/image.jpg"],
    "stock": 50,
    "tags": ["smartphone", "iphone"],
    "specifications": {
      "Screen Size": "6.1 inches",
      "Storage": "128GB"
    },
    "isActive": true,
    "isFeatured": true,
    "rating": 4.8,
    "reviewCount": 1250,
    "createdBy": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

### 5. Update Product
**PUT** `/api/products/:id`

Updates an existing product. Only the product creator can update it.

**Request Body:**
```json
{
  "name": "iPhone 15 Pro Max",
  "price": 1099,
  "stock": 75,
  "isFeatured": false
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "product_id",
    "name": "iPhone 15 Pro Max",
    "price": 1099,
    "stock": 75,
    "isFeatured": false,
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 6. Delete Product (Soft Delete)
**DELETE** `/api/products/:id`

Soft deletes a product by setting isActive to false. Only the product creator can delete it.

**Response:**
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

### 7. Hard Delete Product (Permanent)
**DELETE** `/api/products/:id/hard`

Permanently deletes a product from the database. Only the product creator can perform this action.

**Response:**
```json
{
  "success": true,
  "message": "Product permanently deleted"
}
```

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Name, description, price, category, and images are required"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "No token, authorization denied"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Not authorized to update this product"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Product not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Server error"
}
```

## Sample Data

Use the sample data in `sample-data/products.json` to test the APIs. The file contains 5 sample products with real image URLs from Unsplash.

## Features

- **Image URLs**: Uses external image URLs (no file upload required)
- **SKU Generation**: Automatic unique SKU generation
- **Validation**: Comprehensive input validation
- **Filtering**: Multiple filter options (category, brand, price range, etc.)
- **Pagination**: Built-in pagination support
- **Sorting**: Flexible sorting options
- **Authorization**: Only product creators can update/delete their products
- **Soft Delete**: Products are soft deleted by default
- **Discount Calculation**: Automatic discounted price calculation
- **Search**: Full-text search across name, description, and brand 
## 📚 API Endpoints Documentation

### Base URL
```
http://localhost:8000/api/v1
```

### Health Check
```http
GET /health
```
**Response:**
```json
{
  "status": "OK",
  "timestamp": "2025-01-16T10:30:00.000Z"
}
```

### Authentication Endpoints

#### Register User
```http
POST /users/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Login User
```http
POST /users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Get User Profile
```http
GET /users/profile
Authorization: Bearer <jwt_token>
```

#### Logout User
```http
GET /users/logout
Authorization: Bearer <jwt_token>
```

### Transaction Endpoints

#### Get All Transactions
```http
GET /transactions
Authorization: Bearer <jwt_token>
```

#### Create Transaction
```http
POST /transactions/create-transaction
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "type": "expense",
  "amount": 50.00,
  "description": "Grocery shopping",
  "category": "64f1234567890abcdef123456",
  "date": "2025-01-16T00:00:00.000Z"
}
```

#### Update Transaction
```http
PUT /transactions/update-transaction/:id
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "type": "expense",
  "amount": 55.00,
  "description": "Updated grocery shopping",
  "category": "64f1234567890abcdef123456"
}
```

#### Delete Transaction
```http
DELETE /transactions/delete-transaction/:id
Authorization: Bearer <jwt_token>
```

### Category Endpoints

#### Get All Categories
```http
GET /categories
Authorization: Bearer <jwt_token>
```

#### Create Category
```http
POST /categories/create
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "name": "Groceries",
  "type": "expense",
  "color": "#FF6B6B"
}
```

#### Update Category
```http
PUT /categories/update-category/:id
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "name": "Food & Groceries",
  "color": "#FF8E8E"
}
```

#### Delete Category
```http
DELETE /categories/delete-category/:id
Authorization: Bearer <jwt_token>
```

### Analytics Endpoints

#### Get Monthly Summary
```http
GET /analytics/monthly-summary
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "totalIncome": 3000.00,
  "totalExpenses": 2200.00,
  "netSavings": 800.00,
  "month": "2025-01",
  "transactionCount": 45
}
```

#### Get Category Breakdown
```http
GET /analytics/category-breakdown
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "expensesByCategory": [
    {
      "category": "Groceries",
      "amount": 450.00,
      "percentage": 20.45,
      "color": "#FF6B6B"
    }
  ],
  "incomeByCategory": [
    {
      "category": "Salary",
      "amount": 3000.00,
      "percentage": 100.00,
      "color": "#4ECDC4"
    }
  ]
}
```

## 🔒 Authentication

The API uses JWT (JSON Web Tokens) for authentication. After successful login, include the token in the Authorization header:

```http
Authorization: Bearer <your_jwt_token>
```

Tokens expire after 30 days by default (configurable via `JWT_EXPIRES_IN` environment variable).
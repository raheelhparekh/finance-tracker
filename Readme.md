# Personal Finance Tracker

A comprehensive full-stack web application for managing personal finances with transaction tracking, category management, and detailed analytics visualization.

## 🚀 Features

### Core Functionality
- **User Authentication**: Secure registration and login system with JWT tokens
- **Transaction Management**: Add, edit, delete, and categorize financial transactions
- **Category Management**: Create and manage custom expense/income categories
- **Dashboard Analytics**: Interactive financial overview with charts and summaries

### Data Visualization
- **Monthly Summary**: Total income, expenses, and net savings overview
- **Spending Breakdown**: Pie chart showing expenses by category
- **Income vs Expense Chart**: Bar chart comparing monthly income and expenses
- **Transaction History**: Detailed table with filtering and sorting capabilities

### Export Capabilities
- **PDF Export**: Generate comprehensive financial reports in PDF format
- **CSV Export**: Export transaction data for external analysis
- **Formatted Reports**: Professional-looking reports with tables and summaries

### Technical Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS and DaisyUI
- **Real-time Updates**: State management with Zustand for seamless user experience
- **RESTful API**: Well-structured backend with Express.js and MongoDB
- **Data Security**: Password hashing, protected routes, and secure authentication

## 🛠️ Tech Stack

### Frontend
- **React 19.1.1** - Modern UI library with hooks
- **Vite 7.1.2** - Fast build tool and development server
- **Tailwind CSS 4.1.12** - Utility-first CSS framework
- **DaisyUI 5.0.50** - Component library for Tailwind CSS
- **Chart.js 4.5.0** - Interactive charts and data visualization
- **React Router DOM 7.8.0** - Client-side routing
- **Zustand 5.0.7** - Lightweight state management
- **Axios 1.11.0** - HTTP client for API requests

### Backend
- **Node.js 18+** - JavaScript runtime environment
- **Express.js 5.1.0** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing and security

### DevOps & Tools
- **Docker & Docker Compose** - Containerization and orchestration
- **ESLint** - Code linting and quality assurance
- **Nodemon** - Development server with auto-restart

## 📋 Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 8.0.0 or higher (comes with Node.js)
- **Docker**: Version 20.0.0 or higher
- **Docker Compose**: Version 2.0.0 or higher
- **MongoDB Atlas Account**: For cloud database (or local MongoDB installation)

### Version Check Commands
```bash
node --version    # Should be v18.0.0+
npm --version     # Should be 8.0.0+
docker --version  # Should be 20.0.0+
docker-compose --version  # Should be 2.0.0+
```

## 🚀 Complete Setup Instructions

### Step 1: Clone the Repository
```bash
git clone https://github.com/raheelhparekh/finance-tracker.git
cd finance-tracker
```

### Step 2: Environment Variables Configuration

#### Backend Environment Setup
Create a `.env` file in the `backend` directory:

```bash
cd backend
touch .env
```

Add the following environment variables to `backend/.env`:

```env
# Server Configuration
PORT=8000
NODE_ENV=development

# Database Configuration
MONGO_URI=mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/finance-tracker?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your-super-secure-jwt-secret-key-here
JWT_EXPIRES_IN=30d

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# Cookie Settings
COOKIE_EXPIRES=30
```

#### Frontend Environment Setup (Optional)
Create a `.env` file in the `frontend` directory if needed:

```bash
cd ../frontend
touch .env
```

Add the following to `frontend/.env`:

```env
# API Configuration
VITE_API_URL=http://localhost:8000/api/v1
```


### Step 3: Installation and Setup

#### Method 1: Docker Setup (Recommended)

1. **Build and Start with Docker Compose**:
```bash
# From the project root directory
docker-compose up --build
```

This command will:
- Build the backend Docker container
- Install all dependencies
- Start the backend server on port 8000
- Mount volumes for development

2. **Start Frontend Development Server** (in a new terminal):
```bash
cd frontend
npm install
npm run dev
```

The frontend will start on `http://localhost:5173` (or `http://localhost:5174` if 5173 is busy)

#### Method 2: Manual Setup

1. **Backend Setup**:
```bash
cd backend
npm install
npm run dev  # For development with nodemon
# OR
npm start    # For production
```

2. **Frontend Setup** (in a new terminal):
```bash
cd frontend
npm install
npm run dev
```

### Step 4: Verify Installation

1. **Check Backend Health**:
   - Open `http://localhost:8000/api/v1/health`
   - Should return: `{"status": "OK", "timestamp": "..."}`

2. **Check Frontend**:
   - Open `http://localhost:5173` (or the port shown in terminal)
   - Should see the login/register page

3. **Test Database Connection**:
   - Register a new user account
   - Login successfully
   - Create a test transaction
   - Verify data appears in dashboard

## 🐳 Docker Commands

### Basic Operations
```bash
# Build and start all services
docker-compose up --build

# Start services in background
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs backend

# Rebuild only backend
docker-compose build backend

# Start only backend service
docker-compose up backend
```

### Development Commands
```bash
# Remove all containers and volumes (clean slate)
docker-compose down -v

# Remove unused images
docker image prune

# View running containers
docker ps

# Access backend container shell
docker exec -it mern-backend sh
```


## 🎨 Frontend Usage

### User Registration/Login
1. Navigate to the home page
2. Click "Register" to create a new account
3. Fill in name, email, and password
4. After registration, login with your credentials

### Managing Transactions
1. **Add Transaction**: Click the "+" button and fill in the form
2. **Edit Transaction**: Click the edit icon in the transaction table
3. **Delete Transaction**: Click the delete icon (confirmation required)
4. **Filter Transactions**: Use the search and filter options

### Managing Categories
1. **View Categories**: Go to the "Categories" tab in dashboard
2. **Add Category**: Click "Add Category" and specify name, type, and color
3. **Edit Category**: Click edit icon next to any category
4. **Delete Category**: Click delete icon (only if no transactions use it)

### Viewing Analytics
1. **Dashboard Overview**: See monthly summary and charts
2. **Income vs Expense Chart**: Bar chart showing monthly comparison
3. **Spending Breakdown**: Pie chart showing expense categories
4. **Export Data**: Use PDF/CSV export buttons for reports

## 🔧 Development

### Project Structure
```
finance-tracker/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Core logic
│   ├── middleware/      # Authentication middleware
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── Dockerfile       # Backend container config
│   └── server.js        # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── store/       # Zustand state management
│   │   ├── utils/       # Utility functions
│   │   └── lib/         # API configuration
│   ├── public/          # Static assets
│   └── package.json     # Frontend dependencies
└── docker-compose.yml   # Container orchestration
```

### Available Scripts

#### Backend
```bash
npm start      # Start production server
npm run dev    # Start development server with nodemon
```

#### Frontend
```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run lint   # Run ESLint
npm run preview # Preview production build
```

### Development Tips

1. **Hot Reload**: Both frontend (Vite) and backend (nodemon) support hot reload
2. **CORS**: Frontend and backend are configured for cross-origin requests
3. **State Management**: Use Zustand stores for consistent state across components
4. **Error Handling**: Check browser console and network tab for debugging
5. **Database**: Use MongoDB Compass for direct database inspection

## 🚀 Deployment

### Production Environment Variables

For production deployment, update environment variables:

```env
NODE_ENV=production
FRONTEND_URL=https://your-domain.com
JWT_SECRET=your-production-jwt-secret-512-bit-key
COOKIE_SECURE=true
```

### Build Commands
```bash
# Build frontend for production
cd frontend
npm run build

# Start backend in production mode
cd backend
npm start
```

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**:
   - Verify MongoDB Atlas connection string
   - Check network access settings in MongoDB Atlas
   - Ensure database user has correct permissions

2. **Frontend Can't Connect to Backend**:
   - Verify backend is running on port 8000
   - Check CORS configuration in backend
   - Confirm API URL in frontend configuration

3. **Docker Issues**:
   - Run `docker-compose down` and `docker-compose up --build`
   - Check if ports 8000 and 5173 are available
   - Verify .env file exists in backend directory

4. **Authentication Errors**:
   - Clear browser cookies and local storage
   - Verify JWT_SECRET is set in environment variables
   - Check token expiration settings

5. **Charts Not Displaying**:
   - Verify Chart.js dependencies are installed
   - Check browser console for JavaScript errors
   - Ensure transaction data is properly formatted

### Debug Commands
```bash
# Check running processes
docker ps

# View backend logs
docker-compose logs backend

# Check network connectivity
curl http://localhost:8000/api/v1/health

# Verify environment variables
docker exec -it mern-backend env
```

## 📄 License

This project is licensed under the ISC License.

## 👥 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the troubleshooting section above
- Review the API documentation for endpoint details

---

**Happy tracking your finances! 💰📊**

# E-commerce Application

A full-stack e-commerce application built with React frontend and Node.js backend.

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- npm or yarn

### Installation

1. **Install all dependencies:**
   ```bash
   npm run install:all
   ```

2. **Setup the application:**
   ```bash
   npm run setup
   ```

3. **Start development servers:**
   ```bash
   npm run dev
   ```

**Note**: If you encounter "concurrently: not found" error, install it globally:
```bash
npm install -g concurrently
```
Or install it locally in the root directory:
```bash
npm install concurrently
```

## Available Scripts

### Root Level Scripts (package.json)

| Script | Description |
|--------|-------------|
| `npm run dev` | Start both frontend and backend in development mode |
| `npm run dev:frontend` | Start only frontend development server |
| `npm run dev:backend` | Start only backend development server |
| `npm run start` | Start both frontend and backend in production mode |
| `npm run build` | Build the frontend for production |
| `npm run install:all` | Install dependencies for all packages |
| `npm run clean` | Clean build artifacts from both frontend and backend |
| `npm run lint` | Run linting on both frontend and backend |
| `npm run test` | Run tests on both frontend and backend |
| `npm run seed` | Seed the database with sample data |
| `npm run setup` | Complete setup (install + seed) |

### Frontend Scripts (frontend/package.json)

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run start` | Start development server (alias for dev) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run serve` | Serve production build (alias for preview) |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Run ESLint with auto-fix |
| `npm run format` | Format code with Prettier |
| `npm run clean` | Remove dist folder |
| `npm run type-check` | Run TypeScript type checking |

### Backend Scripts (backend/package.json)

| Script | Description |
|--------|-------------|
| `npm run start` | Start production server |
| `npm run dev` | Start development server with nodemon |
| `npm run watch` | Start development server with nodemon (alias for dev) |
| `npm run debug` | Start development server with debugging enabled |
| `npm run prod` | Start production server with NODE_ENV=production |
| `npm run seed` | Seed database with sample data |
| `npm run clean` | Clean and reinstall dependencies |
| `npm run lint` | Run linting (placeholder) |
| `npm run format` | Format code (placeholder) |

## Project Structure

```
ecommerce/
├── frontend/          # React application
├── backend/           # Node.js/Express API
├── package.json       # Root package.json with convenience scripts
└── README.md         # This file
```

## Development

### Frontend
- Built with React 19
- Uses Vite for fast development
- Tailwind CSS for styling
- React Router for navigation

### Backend
- Built with Node.js and Express
- MongoDB with Mongoose ODM
- JWT authentication
- RESTful API design

## Environment Variables

### Frontend (.env)
```
VITE_API_URL=https://kle-ec.onrender.com/api
```

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your-secret-key
```

## Deployment

### Backend (Deployed on Render)
- **URL**: https://kle-ec.onrender.com
- **Status**: ✅ Live
- **Database**: MongoDB Atlas (Connected)
- **Port**: 5000

### Testing the API
You can test the API connection using:
```bash
npm run test:api
```

Or manually test these endpoints:
- Health check: `GET https://kle-ec.onrender.com/health`
- API test: `GET https://kle-ec.onrender.com/api/test`
- Products: `GET https://kle-ec.onrender.com/api/products`

## API Endpoints

- `GET /api/products` - Get all products
- `POST /api/products` - Create product
- `GET /api/products/:id` - Get product by ID
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add to cart
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create order

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

ISC

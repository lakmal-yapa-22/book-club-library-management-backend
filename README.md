# 📚 Book Club Library Management System - Backend

A comprehensive backend server for managing library operations in Colombo, Sri Lanka. This system provides secure authentication, book management, reader management, lending operations, and automated overdue notifications.

## 🌟 Key Features

### 🔐 **Authentication & Security**
- JWT-based authentication system for library staff
- Secure route protection for all operations
- Role-based access control

### 👥 **Reader Management**
- Complete CRUD operations for library members
- Advanced search and filtering capabilities
- Reader profile management with contact details

### 📚 **Book Inventory Management**
- Comprehensive book catalog with detailed metadata
- Search books by title, author, genre, or ISBN
- Track book availability and location

### 📖 **Lending Operations**
- Streamlined book lending process
- Automated due date calculation
- Real-time tracking of borrowed books
- Easy return processing

### ⚠️ **Overdue Management**
- Automatic detection of overdue books
- Email notifications via SendGrid/Nodemailer
- Configurable reminder schedules

### 📊 **Audit & Reporting**
- Comprehensive activity logging
- Track all lending, return, and administrative actions
- Generate reports for library operations

## 🛠️ Technology Stack

| Component | Technology |
|-----------|------------|
| Runtime | Node.js (v18+) |
| Framework | Express.js |
| Language | TypeScript |
| Database | MongoDB |
| Authentication | JSON Web Tokens (JWT) |
| Email Service | Nodemailer / SendGrid |
| Validation | Express Validator |

## 🚀 Quick Start

### Prerequisites
- **Node.js** >= 18.x
- **MongoDB** (local installation or Atlas URI)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/lakmal-yapa-22/book-club-library-management-backend.git
   cd book-club-library-management-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   
   Create a `.env` file in the root directory:
   ```env
   # Server Configuration
   PORT=3000
   NODE_ENV=development
   
   # Database
   MONGO_URI=mongodb://localhost:27017/bookclub_db
   
   # Authentication
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRES_IN=7d
   
   # Email Configuration
   EMAIL_SERVICE=gmail
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   
   # SendGrid (Alternative)
   SENDGRID_API_KEY=your_sendgrid_api_key
   ```

4. **Start the development server**
   ```bash
   # Development mode with hot reload
   npm run dev
   
   # Production mode
   npm start
   ```

5. **Access the server**
   
   The server will be running at: `http://localhost:3000`

## 📡 API Documentation

### Base URL
```
http://localhost:3000/api/v1
```


## 🧪 Testing

### Postman Collection
Import the provided Postman collection for comprehensive API testing:
- **File**: `book-club-library.postman_collection.json`
- **Sample Data**: `sample_data.json`

### Authentication for Testing
1. Use the login endpoint to get a JWT token
2. Add the token to request headers:
   ```
   Authorization: Bearer <your_jwt_token>
   ```

### Available Scripts
```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Lint code
npm run lint

# Format code
npm run format
```

## 📁 Project Structure

```
src/
├── controllers/     # Request handlers
├── models/         # Database schemas
├── routes/         # API route definitions
├── middleware/     # Custom middleware
├── services/       # Business logic
├── utils/          # Helper functions
├── config/         # Configuration files
└── types/          # TypeScript type definitions
```

## 🔧 Configuration

### Database Setup
The application supports both local MongoDB and MongoDB Atlas:

**Local MongoDB:**
```env
MONGO_URI=mongodb://localhost:27017/bookclub_db
```

**MongoDB Atlas:**
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/bookclub_db
```

### Email Configuration
Choose between Gmail/Nodemailer or SendGrid:

**Gmail (Nodemailer):**
```env
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

**SendGrid:**
```env
SENDGRID_API_KEY=your_sendgrid_api_key
```

## 🚦 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PORT` | Server port | No | 3000 |
| `MONGO_URI` | MongoDB connection string | Yes | - |
| `JWT_SECRET` | JWT signing secret | Yes | - |
| `JWT_EXPIRES_IN` | JWT expiration time | No | 7d |
| `EMAIL_USER` | Email account for notifications | Yes | - |
| `EMAIL_PASS` | Email password/app password | Yes | - |

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error:**
- Ensure MongoDB is running locally or check Atlas URI
- Verify network connectivity and firewall settings

**JWT Authentication Error:**
- Check if JWT_SECRET is set in environment variables
- Ensure token is properly formatted in request headers

**Email Notification Issues:**
- Verify email credentials are correct
- For Gmail, use App Passwords instead of regular password

## 📈 Future Enhancements

- [ ] REST API documentation with Swagger
- [ ] Rate limiting and request throttling
- [ ] Advanced reporting and analytics
- [ ] Integration with barcode scanners
- [ ] Mobile app API support
- [ ] Multi-library support
- [ ] Fine calculation system

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request



## 👨‍💻 Author

**Lakmal Kumarasiri Yapa**  
*Student at IJSE (Institute of Java Software Engineering), Sri Lanka*

- 🐙 GitHub: [@lakmal-yapa-22](https://github.com/lakmal-yapa-22)
- 📧 Email: [your.email@example.com](mailto:lakmal2001yapa@gmail.com)
- 💼 LinkedIn: [Your LinkedIn Profile](https://github.com/lakmal-yapa-22/book-club-library-management-fontend/)

---

⭐ **If you found this project helpful, please give it a star!** ⭐

*Built with ❤️ for the library community in Colombo, Sri Lanka*

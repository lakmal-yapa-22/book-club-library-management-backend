# 📚 Book Club Library Management – Backend

This is the backend server for the **Book Club Library Management System**, designed for a newly established library in **Colombo, Sri Lanka**. It provides comprehensive API support for managing readers, books, lending operations, overdue tracking, email notifications, and secure authentication using **JWT**.

---

## 📌 Project Features

### 🔐 Authentication
- JWT-based secure login system for library staff

### 👤 Reader Management
- Add, view, update, delete readers  
- Search & filter readers by name or ID

### 📘 Book Management
- Add, view, update, delete books  
- Search & filter books by title or author

### 📖 Lending Management
- Lend books to readers  
- Track lending & return status  
- Auto due-date calculation based on lending date

### ⚠️ Overdue Management
- Automatically detect overdue books  
- Send reminder emails via **SendGrid** or **Nodemailer**

### 🛡️ Audit Logging
- Logs major actions such as lending, returning, and deleting records for traceability

---

## 🧑‍💻 Tech Stack

| Layer    | Technology                  |
|----------|-----------------------------|
| Backend  | Node.js, Express, TypeScript |
| Database | MongoDB                     |
| Auth     | JWT                         |
| Email    | Nodemailer / SendGrid       |

---

## ⚙️ Installation & Setup

### ✅ Prerequisites
- Node.js `v18.x` or higher  
- MongoDB (local installation or MongoDB Atlas URI)

---

### 📥 Clone the Repository

```bash
git clone https://github.com/lakmal-yapa-22/book-club-library-management-backend.git
cd book-club-library-management-backend
```

### 📦 Install Dependencies

```bash
npm install
```

---

### 🧪 Environment Configuration

Create a `.env` file in the root directory with the following:

```ini
PORT=3000
MONGO_URI=mongodb://localhost:27017/bookclub_db
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

---

### 🚀 Start the Development Server

```bash
npm run dev
```

Your server will be running at: [http://localhost:3000](http://localhost:3000)

---

## 🔄 Sample Data & API Testing

### 📁 Postman Collection
- `src/postman/Library_React_backend.postman_collection.json` – Ready-to-use API testing collection

### 📁 Sample Data
- `src/postman/Library_React_backend.postman_collection.json` – Includes sample books, readers, and lending data  
- Use MongoDB Compass or Postman to import

### 🔐 JWT Authentication
- Login endpoint returns a token  
- Use the token in headers like this:

```http
Authorization: Bearer <your_token_here>
```

---

## 📸 API Testing Screenshots

| ![Postman](src/postman/screenshort/Screenshot%202025-07-27%20181240.png) |
|:--:|


![Postman](src/postman/screenshort/Screenshot%202025-07-27%20181317.png)
![Postman](src/postman/screenshort/Screenshot%202025-07-27%20181629.png)
![Postman](src/postman/screenshort/Screenshot%202025-07-27%20181800.png)
| *Lending API Test via Postman* |
---

## 📝 License

This project is intended **for educational purposes only**.

---

## 👨‍💻 Developed By

**Lakmal Kumarasiri Yapa**  
Student at **Institute of Software Engineering (IJSE)**, Sri Lanka  
🔗 [GitHub Profile](https://github.com/lakmal-yapa-22)

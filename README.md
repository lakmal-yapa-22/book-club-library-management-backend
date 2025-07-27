# 📚 Book Club Library Management – Backend

This is the backend server for the Book Club Library Management System built for a newly established library in Colombo, Sri Lanka. It supports managing readers, books, lending operations, overdue tracking, notifications, and secure authentication using JWT.

---

## 📌 Project Features

### 🔐 Authentication
- JWT-based secure login system for library staff

### 👤 Reader Management
- Add, view, update, delete readers
- Search & filter readers

### 📘 Book Management
- Add, view, update, delete books
- Search & filter books

### 📖 Lending Management
- Lend books to readers
- Track lending & return status
- Auto due-date calculation

### ⚠️ Overdue Management
- Detect overdue books
- Send email notifications using SendGrid/Nodemailer

### 🛡️ Audit Logging
- Logs for lending, returning, deleting actions

---

## 🧑‍💻 Tech Stack

| Layer       | Technology                  |
|-------------|------------------------------|
| Backend     | Node.js, Express, TypeScript |
| Database    | MongoDB                      |
| Auth        | JWT                          |
| Email       | Nodemailer / SendGrid        |

---

## ⚙️ Installation & Setup

### ✅ Prerequisites
- Node.js >= 18.x
- MongoDB installed locally or MongoDB Atlas URI

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

### 🧪 Environment Configuration
Create a `.env` file in the root directory with the following:

```ini
PORT=3000
MONGO_URI=mongodb://localhost:27017/bookclub_db
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

### 🚀 Start the Server
```bash
npm run dev
```
Server will run at: http://localhost:3000

---

## 🧪 API Testing

### 🔗 Postman Collection
A Postman collection is included to help test the API:

📁 `book-club-library.postman_collection.json`

### 🔄 Sample Data
A sample JSON file is included to populate initial test data:

📁 `sample_data.json`

You can import both files into Postman.

### 🔐 Authentication
- Login endpoint returns JWT token
- Use `Authorization: Bearer <token>` in header for all protected routes

---

## 📸 Screenshots

Screenshots from Postman (API testing):

| ![Postman](src/postman/screenshort/Screenshot%202025-07-27%20181240.png) (src/postman/screenshort/Screenshot 2025-07-27 181317.png)(src/postman/screenshort/Screenshot 2025-07-27 181629.png)(src/postman/screenshort/Screenshot 2025-07-27 181800.png) |
|:--:|
| *Postman – Lending API Test* |


---

## 📝 License
This project is for educational use only.

---

## 👨‍💻 Developed By
**Lakmal Kumarasiri Yapa**  
Student at IJSE, Sri Lanka  
[GitHub Profile](https://github.com/lakmal-yapa-22)

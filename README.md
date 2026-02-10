# Market-Direct

Market-Direct is a full-stack marketplace web application built using PostgreSQL, Node.js, Express.js, and React.js.
It enables users to browse products, manage listings, and perform secure transactions through a modern, scalable architecture.

This project follows industry best practices for backend API design, frontend UI structure, and environment-based configuration for security.

# Features

🔐 User Authentication & Authorization \
🛒 Product Listing & Management\
🔍 Search & Filter Products\
📦 Seller Dashboard\
🧾 Order & Cart Management\
⚡ RESTful API Architecture\
🌐 Responsive Frontend UI\
🔒 Secure Environment Variable Handling\

# Tech Stack

### Frontend
- React.js
- HTML, CSS, JavaScript
### Backend
- Node.js
- Express.js
### Database
- PostgreSQL
### Tools & Utilities
- npm
- Git & GitHub
- dotenv for environment variables

# Project Structure

```
Market-Direct/
├── client/                 # React frontend
├── server/                 # Node.js + Express backend
├── .gitignore              # Ignored files
├── run.bat                 # Windows startup script
└── README.md               # Project documentation
```

# Installation & Setup
🔹 **Prerequisites**\
  Make sure you have installed:
- Node.js (v14+)
- npm
- PostgreSQL

🔹 **Clone the repository**
   ```bash
   git clone https://github.com/ROOKIEEE12/Market-Direct.git
```
🔹 **Backend Setup**
 ```bash
cd server
npm install
```
 **Create a .env file inside server/:**
 ```env
PORT=5000
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_secret_key
```

**Start backend server:**
```bash
npm start
```

🔹 **Frontend Setup**
```bash
cd ../client
npm install
npm start
```

**Frontend will run at:**
```bash
http://localhost:3000
```

**Backend API will run at:**
```bash
http://localhost:5000
```


# Contributing

Contributions are welcome 

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

# License

This project is licensed under the MIT License.

# Author

Amit Mishra\
GitHub: https://github.com/ROOKIEEE12

# Support

If you like this project, please give it a ⭐ on GitHub — it motivates future development!

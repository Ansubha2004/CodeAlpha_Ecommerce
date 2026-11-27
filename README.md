
# 🛒 ShopxEase – Full Stack E-Commerce Web Application

ShopxEase is a full-stack e-commerce web application designed to provide users with a smooth and convenient online shopping experience. Users can explore products, browse categories, manage their shopping cart, and place orders through an intuitive interface.

The application is built using the MERN stack, providing a scalable backend and an interactive frontend.

---

## 🌐 Live Project Links

- **Frontend:** [ShopxEase](https://shopease-xi-three.vercel.app/)
- **Backend:** [ShopxEase API](https://shopeasebackend-fhhm.onrender.com)

---

## ✨ Features

### 👤 User Features
- User registration and login.
- Secure authentication using JWT.
- Browse and explore available products.
- Search and filter products.
- View individual product details.
- Add products to the shopping cart.
- Manage cart items and quantities.
- Place orders.
- View order details and order history.

### ⚙️ Admin Features
- Add new products.
- Update existing product details.
- Delete products.
- Manage product inventory.
- View and manage customer orders.

### 🔒 Security
- Password hashing using bcryptjs.
- JWT-based authentication.
- Protected routes for authorized users.
- Backend validation and error handling.

---

## 🛠️ Tech Stack

### Frontend
- React.js
- JavaScript
- HTML5
- CSS3
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcryptjs
- Multer
- Cloudinary

---

## 📂 Project Structure

```text
ShopxEase/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── assets/
│   │   └── App.jsx
│   └── package.json
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── package.json
│
└── README.md
```

*Note: Adjust the folder structure above to match your actual project.*

---

## 🚀 Getting Started

Follow these steps to run ShopxEase locally.

### 1. Clone the Repository

```bash
git clone https://github.com/Ansubha2004/CodeAlpha_Ecommerce.git
```

### 2. Navigate to the Project

```bash
cd ShopxEase
```

### 3. Install Backend Dependencies

```bash
cd backend
npm install
```

### 4. Configure Environment Variables

Create a `.env` file inside the backend directory.

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Add any additional environment variables required by your implementation.

### 5. Start the Backend

```bash
npm start
```

### 6. Install Frontend Dependencies

Open another terminal:

```bash
cd frontend
npm install
```

### 7. Start the Frontend

```bash
npm run dev
```

The application should now be accessible through the local development URL displayed in your terminal.

---

## ☁️ Deployment

ShopxEase uses separate frontend and backend deployment environments.

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas
- **Image Storage:** Cloudinary

---

## 🎯 Project Objective

The main objective of ShopxEase is to develop a practical full-stack e-commerce platform that demonstrates frontend development, REST API integration, database management, authentication, and product management.

---

## 👨‍💻 Developer

**Ansubha Dhar**

B.Tech in Electrical Engineering | MERN Stack Developer



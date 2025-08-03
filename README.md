# Grocery-MERN 🚀

A modern grocery ordering web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) and styled with Tailwind CSS.  
Users can browse products, manage their cart, and place orders using secure payment integration.

🌐 **Live Site**: [https://grocery-mern.onrender.com/](https://grocery-mern.onrender.com/)

---

## 🌟 Features

- User authentication (register, login, logout)
- Browse grocery products with search and filters
- Add-to-cart functionality and cart management
- Checkout with **payment integration**
- Admin dashboard to manage products and orders
- Fully responsive UI using **Tailwind CSS**

---

## 🛠️ Tech Stack

| Layer       | Technology             |
|-------------|------------------------|
| Frontend    | React.js, Axios, React Router, Tailwind CSS |
| Backend     | Node.js, Express.js    |
| Database    | MongoDB (Mongoose)     |
| Auth        | JWT tokens, bcrypt     |
| Payments    | Stripe                 |
| Deployment  | Render.com             |

---

## ⚙️ Installation

1. **Clone the repo**
     
   ```bash
   git clone https://github.com/priyank-code/Grocery-mern.git
   cd Grocery-mern
3. **Create .env files in both backend and client folders**
   
    ```bash
    # backend/.env

    PORT=3000
    MONGO_URI="mongodb://<your-mongodb-uri>"
    JWT_SECRET="<your-jwt-secret>"
    NODE_ENV="development"
    CORS_ORIGIN="http://localhost:5173"

    #admin credentials
    SELLER_EMAIL="<your-admin-email>"
    SELLER_PASSWORD="<your-admin-password>"

    #cloudinary credentials
    CLOUDINARY_CLOUD_NAME="<your-cloudinary-cloud-name>"
    CLOUDINARY_API_KEY="<your-cloudinary-api-key>"
    CLOUDINARY_API_SECRET="<your-cloudinary-api-secret>"

    #Stripe credentials
    STRIPE_PUBLISHABLE_KEY="<your-stripe-publishable-key>"
    STRIPE_SECRET_KEY="<your-stripe-secret-key>"

    # -----------------------------------------------------

    # client/.env

    VITE_BACKEND_URL="http://localhost:3000"
4. **Run the project**
   
   ```bash
   # Backend
   cd backend
   npm install
   npm run dev

   # Client
   cd ../client
   npm install
   npm run dev



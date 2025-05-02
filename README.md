# 📝 My Blog

Blog application built using the **MERN stack** with **Tailwind CSS** for styling. Users can **register, log in**, and **create or update posts**. MongoDB is used for storing both **user** and **post** data.

## 🌐 Demo

🔗 [Live Website](https://my-blog-psi-livid.vercel.app/)

## 🚀 Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose)
- **Authentication**: JSON Web Tokens (JWT)

## 🔐 Features

- User registration and login
- JWT-based authentication
- Create and update blog posts (auth required)
- View all posts on the homepage
- Tailwind-styled responsive UI

## ⚙️ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/reem2010/my-blog.git
cd my-blog
```

### 2. Setup Backend

```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend` folder:

```env
FrontHost=Frontend_URL
DATABASE_URL=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret
```

Start the backend:

```bash
npm start
```

### 3. Setup Frontend

```bash
cd ../Frontend
npm install
```

```env
VITE_API_URL=URL for your backend API
VITE_IMG_KEY=ImgBB API key for image uploads
```

```bash
npm run dev
```

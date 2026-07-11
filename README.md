# 🍽️ Recipe App

A full-stack Recipe Application built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**. Users can register, log in, create recipes, browse recipes, view recipe details, and save their favorite recipes.

---

## 🚀 Features

### Authentication
- User Registration
- User Login
- Password Encryption using bcrypt
- JWT Authentication
- Logout

### Recipe Management
- Create New Recipe
- View All Recipes
- View Recipe Details
- Save Favorite Recipes
- View Saved Recipes

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- Bootstrap

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- bcrypt
- cookie-parser
- CORS

---

# 📂 Project Structure

```
recipeapp
│
├── client
│   ├── src
│   │   ├── Components
│   │   │   ├── CreateRecipe.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Nav.jsx
│   │   │   ├── ReadRecipe.jsx
│   │   │   ├── Registration.jsx
│   │   │   └── SavedRecipe.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   └── package.json
│
├── server
│   ├── models
│   │   ├── Recipe.js
│   │   └── User.js
│   │
│   ├── Routes
│   │   ├── auth.js
│   │   └── reciper.js
│   │
│   ├── index.js
│   └── package.json
│
└── README.md
```

---

# 📸 Screens

- Login Page
- Registration Page
- Home Page
- Create Recipe Page
- Recipe Details Page
- Saved Recipes Page

---

# ⚙️ Installation

## 1. Clone Repository

```bash
git clone https://github.com/yourusername/recipe-app.git
```

Go inside the project

```bash
cd recipe-app
```

---

## 2. Install Client Dependencies

```bash
cd client

npm install
```

---

## 3. Install Server Dependencies

```bash
cd ../server

npm install
```

---

# ▶️ Run the Project

## Start Backend

```bash
cd server

npm run dev
```

Server runs on

```
http://localhost:3001
```

---

## Start Frontend

Open another terminal

```bash
cd client

npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

# 🗄️ MongoDB

Start MongoDB locally.

The project connects to

```javascript
mongodb://127.0.0.1:27017/recipeapp
```

Database Name

```
recipeapp
```

---

# 📦 Backend Packages

```text
express
mongoose
cors
bcrypt
jsonwebtoken
cookie-parser
nodemon
```

Install

```bash
npm install express mongoose cors bcrypt jsonwebtoken cookie-parser

npm install --save-dev nodemon
```

---

# 📦 Frontend Packages

```text
react
react-router-dom
axios
bootstrap
```

Install

```bash
npm install axios react-router-dom bootstrap
```

---

# 🔑 API Endpoints

## Authentication

### Register

```
POST /auth/register
```

Body

```json
{
  "username": "john",
  "password": "123456"
}
```

---

### Login

```
POST /auth/login
```

Body

```json
{
  "username": "john",
  "password": "123456"
}
```

---

### Logout

```
GET /auth/logout
```

---

## Recipes

### Create Recipe

```
POST /recipe/create-recipe
```

Body

```json
{
  "name": "Chicken Biryani",
  "description": "Delicious homemade biryani",
  "ingredients": "Rice, Chicken, Spices",
  "imageUrl": "image-url",
  "userId": "user-id"
}
```

---

### Get All Recipes

```
GET /recipe/recipes
```

---

### Get Recipe By ID

```
GET /recipe/recipe-by-id/:id
```

---

### Save Recipe

```
POST /recipe/saved-recipe/:recipeId
```

Body

```json
{
  "userId": "user-id"
}
```

---

### Get Saved Recipes

```
GET /recipe/saved-recipes/:userId
```

---

# 📄 Database Models

## User

```javascript
{
    username: String,
    password: String,
    savedRecipes: [ObjectId]
}
```

---

## Recipe

```javascript
{
    name: String,
    description: String,
    ingredients: String,
    imageUrl: String,
    userId: ObjectId
}
```

---

# 🔒 Authentication

- Passwords are encrypted using **bcrypt**
- JWT Token is generated after successful login
- Authentication token is stored in cookies
- User ID is stored in Local Storage

---

# 💻 Future Improvements

- Edit Recipe
- Delete Recipe
- Like Recipes
- Search Recipes
- Filter by Category
- Upload Images
- User Profile
- Pagination
- Dark Mode
- Responsive UI Improvements

---


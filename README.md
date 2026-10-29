# 🍽️ Food Recipe App

A full-stack web application that allows users to discover recipes, create and share their own recipes, view recipe details, and save their favorite recipes for later.

The application is built using **React.js, Node.js, Express.js, and MongoDB**. The frontend is deployed on Vercel, and the backend is hosted on Render.

## 🚀 Live Demo

- **Frontend:** https://recipe-o8ruig3pm-learning-portal.vercel.app/
- **Backend API:** https://recipe-app-api-qyk2.onrender.com

> Note: The backend is hosted on Render's free tier, so the first request after inactivity may take some time to respond.

## ✨ Features

- **User Registration:** Create a new account with a username and password.
- **User Login:** Authenticate using registered credentials.
- **Password Security:** Passwords are hashed using bcrypt before storage.
- **Browse Recipes:** View available recipes on the home page.
- **Create Recipes:** Add a recipe name, description, ingredients, and image URL.
- **View Recipe Details:** Open a recipe to see its information.
- **Save Favorite Recipes:** Save recipes for convenient access later.
- **Saved Recipes:** View recipes saved by the logged-in user.
- **Logout:** Sign out and clear the locally stored user ID.
- **Responsive UI:** Bootstrap styling for a mobile-friendly interface.
- **Cloud Deployment:** Frontend and backend hosted separately.

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- React Router DOM
- Axios
- Bootstrap
- JavaScript
- HTML5 and CSS3

### Backend
- Node.js
- Express.js
- REST API
- Mongoose
- JSON Web Token (JWT)
- bcrypt
- cookie-parser
- CORS

### Database
- MongoDB Atlas

### Deployment and Tools
- Git and GitHub
- Vercel
- Render
- MongoDB Atlas

## 🏗️ Project Structure

```text
Recipe_app/
├── recipeapp/
│   ├── public/
│   ├── src/
│   │   ├── Components/
│   │   │   ├── CreateRecipe.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Nav.jsx
│   │   │   ├── ReadRecipe.jsx
│   │   │   ├── Registration.jsx
│   │   │   └── SavedRecipe.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── vercel.json
├── server/
│   ├── Routes/
│   │   ├── auth.js
│   │   └── reciper.js
│   ├── models/
│   │   ├── Recipe.js
│   │   └── User.js
│   ├── index.js
│   └── package.json
└── README.md
```

## ⚙️ Getting Started

Follow these steps to run the project locally.

### Prerequisites

Install the following:

- Node.js and npm
- Git
- A MongoDB Atlas account or a local MongoDB instance
- A code editor such as Visual Studio Code

### 1. Clone the repository

```bash
git clone https://github.com/PN200203/Recipe_app.git
cd Recipe_app
```

### 2. Configure the backend

Open a terminal in the project root and run:

```bash
cd server
npm install
```

Create a `.env` file inside the `server/` directory:

```env
PORT=3001
MONGO_URI=your_mongodb_connection_string
FRONTEND_URL=http://localhost:5173
```

Replace `your_mongodb_connection_string` with your MongoDB connection string. Do not commit your actual credentials to GitHub.

### 3. Start the backend

From the `server/` directory, run:

```bash
npm start
```

If your `server/package.json` does not define a `start` script, use:

```bash
node index.js
```

The backend will run at:

```text
http://localhost:3001
```

### 4. Configure the frontend

Open a second terminal from the project root:

```bash
cd recipeapp
npm install
npm run dev
```

Vite will display the local development URL, normally:

```text
http://localhost:5173
```

Open that URL in your browser.

> Make sure the frontend API URLs point to `http://localhost:3001` for local development or the deployed Render URL for production.

## 🔌 REST API Endpoints

Base URL:

```text
https://recipe-app-api-qyk2.onrender.com
```

### Authentication APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Register a user |
| POST | `/auth/login` | Log in a user |
| GET | `/auth/logout` | Clear the authentication cookie |

### Recipe APIs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/recipe/recipes` | Retrieve all recipes |
| POST | `/recipe/create-recipe` | Create a recipe |
| GET | `/recipe/recipe-by-id/:id` | Retrieve a recipe by ID |
| POST | `/recipe/saved-recipe/:id` | Save a recipe for a user |
| GET | `/recipe/saved-recipes/:id` | Retrieve a user's saved recipes |

Replace `:id` with the appropriate MongoDB recipe or user ID.

## 🗄️ Database Models

### User

The user model stores account information and saved recipe references. Passwords are stored as bcrypt hashes.

Typical fields include:

- Username
- Password hash
- Saved recipe IDs

### Recipe

The recipe model stores recipe information, such as:

- Recipe name
- Description
- Ingredients
- Image URL
- User ID

The exact schema depends on the model definitions in the repository.

## ☁️ Deployment

### Frontend — Vercel

1. Import the GitHub repository into Vercel.
2. Set the root directory to `recipeapp`.
3. Select Vite as the framework preset.
4. Set the build command to `npm run build`.
5. Set the output directory to `dist`.
6. Deploy the project.
7. Keep `vercel.json` in the `recipeapp/` folder to support direct navigation to React routes.

### Backend — Render

1. Create a Web Service connected to the GitHub repository.
2. Set the root directory to `server`.
3. Set the build command to `npm install`.
4. Set the start command to `node index.js`.
5. Add the required environment variables:

```env
MONGO_URI=your_mongodb_connection_string
FRONTEND_URL=https://your-vercel-frontend-domain
```

6. Deploy the backend and confirm that the logs show a successful MongoDB connection.

Use the exact current production frontend domain for `FRONTEND_URL`. If the frontend domain changes, update the Render environment variable and redeploy or restart the service.

## 🔐 Security Notes

- Never commit `.env` files, MongoDB passwords, JWT secrets, or other credentials.
- Use environment variables for database credentials and JWT secrets.
- Use HTTPS for production API requests.
- Configure CORS to allow only trusted frontend origins.
- Validate request data on the backend.
- For production authentication, use a strong JWT secret and secure cookie settings.
- Protect user-specific recipe operations with proper authentication and authorization.

## 🧪 Testing Checklist

- [ ] Register a new user.
- [ ] Log in with valid credentials.
- [ ] Verify invalid login credentials are rejected.
- [ ] View recipes on the home page.
- [ ] Create a recipe with an image URL.
- [ ] Open a recipe and view its details.
- [ ] Save a recipe.
- [ ] Open the saved recipes page.
- [ ] Log out and confirm navigation to the login page.
- [ ] Refresh a nested route and confirm it does not return a Vercel 404.
- [ ] Test the application on desktop and mobile screen sizes.

## 🐛 Troubleshooting

**CORS errors**

- Check the Render `FRONTEND_URL` environment variable.
- Confirm that the backend allows the exact deployed frontend origin.
- Ensure the backend is running and redeployed after environment changes.

**MongoDB connection errors**

- Verify `MONGO_URI` in Render.
- Check the MongoDB Atlas database user credentials and network access settings.
- Review the Render application logs.

**Recipes are not loading**

- Check that the backend URL is correct in the frontend.
- Open browser Developer Tools and inspect the Console and Network tabs.
- Check the Render logs for API errors.

**Direct route returns 404**

- Confirm that `recipeapp/vercel.json` contains the React SPA rewrite configuration.
- Verify that the latest Vercel deployment is marked Ready.

**Logout does not work**

- Confirm that the frontend uses the deployed backend URL rather than `localhost`.
- Clear the locally stored user ID on logout.
- Ensure the login page route is configured in React Router and Vercel.

## 📸 Screenshots

Add screenshots of the following pages to your repository and link them here:

- Home page with recipes
- Registration page
- Login page
- Create Recipe page
- Recipe details page
- Saved Recipes page

Example:

```markdown
![Home Page](screenshots/home.png)
```

## 🎯 Future Improvements

- Add recipe search and category filters.
- Add edit and delete recipe functionality.
- Add image uploads instead of requiring image URLs.
- Add stronger authentication and protected routes.
- Add pagination and recipe ratings.
- Improve form validation and user-friendly error messages.
- Add automated frontend and backend tests.

## 👨‍💻 Author

**Praveen**

- GitHub: [PN200203](https://github.com/PN200203)

## 📄 License

This project is intended for learning and demonstration purposes. Add a license file if you want to distribute the project under a specific open-source license.

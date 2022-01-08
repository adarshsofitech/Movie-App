#### ----------------- Developer ------------------####
#### `Name` ------ `Ashish Pratap Singh` ----------####
#### `College` ------- `IIT Kharappur` ------------####
#### `Email` ----- `ashish2829001@gmail.com` ------####
#### `Contact` -------- `8709013012` --------------####


# React App

This project deals with the authentication (Login/Signup)

## Available Scripts

In development environment,

In the project directory (`/login_signup_app`), you can run:

### `npm install`

It install all the required modules for this web app

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!


## About this web App

In this webApp, only three features has been implemented 

1. Login Page - It deals with getting user credenntials from user and calling API hosted in backed server to verify for the details and on successful verification, it will redirect you to DashBoard.

2. Signup Page - It deals with getting the details of new user and calling register api from backend server and on successfully registering, it redirects you to login page.

3. Dashboard - It has only one functionality of Logout.

## Important Points 

Used localStorage and `Auth` API to check whether the user is already looed in.

Used `validator` module to validate the password ( Password entered must of atleast 6 characters with atleast one character of upperCase, lowerCase, symbol and number each ).
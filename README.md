# StudyNotion 🚀

[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)]()
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)]()
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)]()
[![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)]()
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)]()
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)]()
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description 📝

StudyNotion is a comprehensive platform designed to facilitate online learning and teaching. It provides features for user authentication, profile management, course creation and enrollment, payment processing, and more. Built with React, Tailwind CSS, Redux Toolkit, Node.js, Express.js, and MongoDB, StudyNotion offers a robust and scalable solution for creating and managing online courses. Whether you're an instructor looking to share your expertise or a student eager to learn, StudyNotion provides the tools and resources you need to succeed. 👨‍🏫👩‍🎓

## Table of Contents 📚

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [How to Use](#how-to-use)
- [Project Structure](#project-structure)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)
- [Important Links](#important-links)
- [Footer](#footer)

## Features ✨

- **User Authentication**: Secure signup, login, forgot password, update password, and email verification functionalities. 🔑
- **User Profiles**: Allows users to update their profile details, display pictures, and manage account settings. 👤
- **Course Management**: Enables instructors to create, edit, view, and delete courses, sections, and subsections. 📝
- **Payment Integration**: Seamless Razorpay integration for handling course payments. 💳
- **Student Features**: Students can enroll in courses, track their progress, and view enrolled courses. 🎓
- **Instructor Dashboard**: Provides instructors with an overview of their courses and the number of students enrolled. 📊
- **Rating and Reviews**: Implements a course rating and review system for student feedback. ⭐
- **Category Management**: Supports the creation and display of course categories for easy navigation. 🗂️
- **Responsive Design**: Utilizes Tailwind CSS for a responsive and visually appealing user interface. 📱💻
- **Redux Toolkit**: Uses Redux Toolkit for efficient state management in the frontend. 🧰
- **JWT Authentication**: Secure authentication using JSON Web Tokens. 🛡️
- **Cloudinary Integration**: For image and video storage. ☁️

## Tech Stack 💻

- **Frontend**: React, Redux Toolkit, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Payment**: Razorpay
- **Cloud Storage**: Cloudinary
- **Other**: bcrypt, bcryptjs, cookie-parser, cors, crypto-random-string, dotenv, express-fileupload, jsonwebtoken, mongoose, node-schedule, nodemailer, nodemon, otp-generator

## Installation 🛠️

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Dip6212/StudyNotion.git
   ```
2. **Navigate to the project directory:**
   ```sh
   cd StudyNotion
   ```
3. **Install client-side dependencies:**
   ```sh
   npm install
   ```
4. **Install server-side dependencies:**
   ```sh
   cd server && npm install
   ```
5. **Create `.env` files:**
   - Create `.env` in the root directory and `server/.env` and configure the necessary environment variables (e.g., database URL, API keys, etc.).
6. **Start the development server:**
   ```sh
   npm run dev
   ```
   (This command concurrently starts the client and server)

## Usage 🚀

1.  **Running the development server:**
    ```sh
    npm run dev
    ```
2.  **Accessing the frontend:** Open your browser and navigate to `http://localhost:3000`
3.  **Accessing the backend:** The backend server runs on `http://localhost:4000` (or the port specified in `.env`)
4.  **Creating a course (Instructor):** Navigate to the Add Course section in the dashboard
5.  **Enrolling in a course (Student):** Browse the catalog and purchase a course

## How to Use 👨‍🏫👩‍🎓

StudyNotion is designed to provide a seamless experience for both instructors and students:

- **For Instructors:**
  - Create and manage courses, sections, and subsections through the instructor dashboard.
  - Set course prices and manage enrollment.
  - Monitor student progress and engagement.

- **For Students:**
  - Browse the course catalog and enroll in desired courses.
  - Track your learning progress and access course materials.
  - Participate in discussions and provide feedback through ratings and reviews.

This platform can be used to create and sell online courses, manage student enrollments, process payments, and provide an engaging learning experience.

## Project Structure 📂

```text
StudyNotion/
├── .env                    # Environment variables (client)
├── .gitignore
├── README.md
├── package-lock.json
├── package.json
├── public/
│   └── ...
├── server/                 # Backend code
│   ├── .env                # Environment variables (server)
│   ├── config/
│   │   ├── cloudinary.js   # Cloudinary configuration
│   │   ├── database.js     # Database connection
│   │   └── razorpay.js     # Razorpay configuration
│   ├── controllers/        # Route handlers
│   ├── middlewares/
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   └── index.js            # Entry point for the backend server
├── src/                    # Frontend code
│   ├── App.css
│   ├── App.js              # Main application component
│   ├── components/
│   │   ├── common/        # Reusable components
│   │   └── cors/          # Course-related components
│   ├── context/
│   ├── data/
│   ├── hooks/
│   ├── index.css
│   ├── index.js            # Entry point for the frontend application
│   ├── pages/              # Page components
│   ├── reducer/            # Redux reducers
│   ├── services/           # API service functions
│   ├── slices/             # Redux slices
│   └── utils/              # Utility functions
└── tailwind.config.js      # Tailwind CSS configuration
```

## API Reference 🔗

- **Authentication API (`/api/v1/auth`)**:
  - `POST /sendotp`: Send OTP to email.
  - `POST /signup`: User signup.
  - `POST /login`: User login.
  - `POST /reset-password-token`: Generate token for password reset.
  - `POST /reset-password`: Reset user password.

- **Profile API (`/api/v1/profile`)**:
  - `GET /getUserDetails`: Get user details.
  - `POST /updateProfile`: Update user profile.
  - `POST /updateDisplayPicture`: Update user display picture.
  - `GET /getEnrolledCourses`: Get enrolled courses.
  - `GET /instructorDashboard`: Get instructor dashboard data.
  - `DELETE /deleteProfile`: Delete user profile.

- **Course API (`/api/v1/course`)**:
  - `GET /getAllCourses`: Get all courses.
  - `POST /getCourseDetails`: Get details of a specific course.
  - `POST /createCourse`: Create a new course.
  - `POST /addSection`: Add a section to a course.
  - `POST /addSubSection`: Add a subsection to a section.
  - `POST /updateSection`: Update a section.
  - `POST /updateSubSection`: Update a subsection.
  - `GET /getInstructorCourses`: Get courses created by an instructor.
  - `POST /deleteSection`: Delete a section from a course.
  - `POST /deleteSubSection`: Delete a subsection from a section.
  - `POST /deleteCourse`: Delete a course.
  - `POST /getFullCourseDetails`: Get full details of a course (authenticated).
  - `POST /updateCourseProgress`: Update course progress for a student.
  - `POST /createRating`: Create a rating for a course.
  - `GET /showAllCategories`: Show all categories.
  - `POST /getCategoryPageDetails`: Get category page details.

- **Payment API (`/api/v1/payment`)**:
  - `POST /capturePayment`: Capture payment for courses.
  - `POST /verifyPayment`: Verify payment.
  - `POST /sendPaymentSuccessEmail`: Send payment success email.

## Contributing 🙌

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License 📝

This project is open source and available under the [MIT License](LICENSE).

## Important Links 🔗

-   **Repository Link**: [https://github.com/Dip6212/StudyNotion](https://github.com/Dip6212/StudyNotion)
-   **Author's Profile**: [https://github.com/Dip6212](https://github.com/Dip6212)
-   **Live Demo**: [https://study-notion-puce.vercel.app](https://study-notion-puce.vercel.app) 

## Footer 🦶

- Repository Name: StudyNotion
- Repository URL: [https://github.com/Dip6212/StudyNotion](https://github.com/Dip6212/StudyNotion)
- Author: Dipan Mukherjee
- Contact: dipanmukherjee8482@gmail.com

⭐️ Like the project? Give it a star! 🌟
🍴 Fork the repository to contribute! 🚀
🐛 Report issues and suggest improvements! 🐞

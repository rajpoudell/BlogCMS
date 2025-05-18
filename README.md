# React + TypeScript + Vite

# BlogCMS

A modern and responsive blog content management system built with React.

## Features

- **Functional Dashboard with Authentication:** Securely manage your blog content with a dedicated dashboard accessible after authentication.
- **Responsive UI using Tailwind CSS:** Enjoy a clean and consistent user experience across all devices thanks to Tailwind CSS.
- **API-Powered CRUD:** Perform Create, Read, Update, and Delete operations for:
  - **Posts:** Manage your blog articles.
  - **Categories:** Organize your posts into relevant categories.
  - **Authors:** Keep track of the blog writers.
- **Form Validation:** Robust form validation using a schema-based validator ensures data integrity.
- **Proper Folder Structure:** Well-organized codebase for maintainability and scalability:
  - `components/`: Reusable UI components.
  - `hooks/`: Custom React hooks.
  - `pages/`: Application routes/pages.
  - `stores/`: API interaction logic with global state management.
  - `etc/`: Other utility files.
- **GitHub Repository:** Source code available on GitHub.
- **Zustand for Global State Management:** Simple and scalable state management.
- **Code Splitting and Lazy Loading:** Optimized application performance through on-demand loading of code.
- **Libraries:** Utilizes:
  - Tailwind CSS for styling.
  - React Hot Toast for user notifications.
  - Component-based architecture for better UX.
- **Admin Login:** Secure access for administrators to manage blog content.
- **Blog and Tag Editing:** Easily edit blog content and associated tags directly within the edit blog section.
- **Category CRUD:** Manage categories directly from a dedicated tag page.

## Technologies Used

- React
- Tailwind CSS
- MockApi
- Zustand
- React Hot Toast
- Jest
- React Testing Library
- React-hook-form and Yup

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/rajpoudell/BlogCMS
    cd ./
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up environment variables:**
    Create a `.env` file based on the `.env.example` file and configure your API endpoints and other necessary settings.
    `VITE_BLOG_API_BASE_URL = https://6826c619397e48c9131736e8.mockapi.io/api/v1`

4.  **Start the development server:**
    ```bash
    npm start
    # or
    yarn start
    ```
5.  **Login Credentials:**

```
"email": "Jena20@gmail.com",
"password": "Jena20@gmail.com",
```
Blog: https://6826c619397e48c9131736e8.mockapi.io/api/v1/blog
User: https://6826c619397e48c9131736e8.mockapi.io/api/v1/user

    Open your browser and navigate to `http://localhost:vite` (or the port specified in your environment).

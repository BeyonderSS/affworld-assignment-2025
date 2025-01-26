
```
░▒▓███████▓▒░░▒▓████████▓▒░▒▓█▓▒░░▒▓█▓▒░░▒▓██████▓▒░░▒▓███████▓▒░░▒▓███████▓▒░░▒▓████████▓▒░▒▓███████▓▒░  
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓███████▓▒░░▒▓██████▓▒░  ░▒▓██████▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓██████▓▒░ ░▒▓███████▓▒░  
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░         ░▒▓█▓▒░   ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░         ░▒▓█▓▒░   ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓███████▓▒░░▒▓████████▓▒░  ░▒▓█▓▒░    ░▒▓██████▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓███████▓▒░░▒▓████████▓▒░▒▓█▓▒░░▒▓█▓▒░ 
                                                                                                        
                                                                                                        
```

# Affworld Assignment 2025

## Overview

Affworld Assignment 2025 is a project designed as part of the application process for a Software Engineer position. It is a Next.js 15 application that leverages modern web development practices, including Server-Side Rendering (SSR), Incremental Static Regeneration (ISR), and various advanced features of the Next.js framework.

The project integrates:

* **ShadCN UI library** for a sleek and customizable design system.
* **MongoDB Atlas** as the database solution for efficient and scalable data management.
* **Custom authentication flow** with OAuth for Google login, and email-based forget and reset password functionality.
* A **Kanban board** for task management.
* **Zod** for state management and schema validation.
* **React Hook Form** for efficient form handling and validation.

This project highlights the use of state-of-the-art tools and libraries to build a robust, scalable, and performant web application.

---

## Features

1. **Framework and Architecture** :

* Built using [Next.js 15](https://nextjs.org/).
* Includes support for SSR and ISR.
* Turbopack for faster development.

1. **UI and Styling** :

* Integrated with the [ShadCN UI library](https://shadcn.dev/).
* Styled using [Tailwind CSS](https://tailwindcss.com/) and its extensions, such as `tailwind-merge` and `tailwind-scrollbar`.
* Animations powered by [Framer Motion](https://www.framer.com/motion/).

1. **Authentication and Security** :

* Custom authentication flow with OAuth for Google login.
* Email-based forget and reset password functionality.
* Secured with `bcrypt` for password hashing and `jsonwebtoken` for token management.

1. **Task Management** :

* Integrated Kanban board for managing tasks and workflows efficiently.

1. **Data Handling** :

* Database operations powered by [Mongoose](https://mongoosejs.com/) with MongoDB Atlas.
* State management and schema validation using [Zod](https://zod.dev/).
* Form handling via [React Hook Form](https://react-hook-form.com/) and `@hookform/resolvers` for schema validation.

1. **API Integration** :

* RESTful API communication enabled by [Axios](https://axios-http.com/).
* Support for Google APIs using `googleapis`.

1. **Additional Utilities** :

* File uploads handled by `uploadthing` and its React adapter.
* Email functionality implemented via [Nodemailer](https://nodemailer.com/).

1. **Development and Deployment** :

* Linting and code quality checks with ESLint.
* Compatible with modern browsers as per the `browserslist` configuration.

---

## Getting Started

### Prerequisites

* **Node.js** : Ensure you have Node.js version `>=18.0.0`.
* **NPM/Yarn** : Make sure your package manager is `>=9.0.0` (for NPM).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/BeyonderSS/affworld-assignment-2025
   cd affworld-assignment-2025
   ```
2. Install dependencies:
   ```bash
   yarn
   ```
3. Set up environment variables:
   * Rename `.env.example` to `.env.local`.
   * Fill out the required credentials in `.env.local`.
4. Run the development server:
   ```bash
   yarn dev
   ```
5. Open [http://localhost:3000](http://localhost:3000/) in your browser to view the application.

---

## Available Scripts

* ``: Starts the development server with Turbopack for hot reloading.
* ``: Builds the application for production.
* ``: Runs the built application in production mode.
* ``: Runs ESLint to check for code quality issues.

---

## Project Structure

```
├── public/             # Static assets like images, fonts, etc.
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Application pages (Next.js routing)
│   ├── scripts/        # Utility scripts for development
│   ├── styles/         # Global and modular styles
│   └── utils/          # Helper functions and utilities
├── .env.example        # Environment variable example file
├── package.json        # Project metadata and dependencies
├── README.md           # Project documentation
└── tailwind.config.js  # Tailwind CSS configuration
```

---

## Dependencies

### Main Dependencies:

* **React** : ^19.0.0
* **Next.js** : 15.1.5
* **Tailwind CSS** : ^3.4.1
* **Framer Motion** : ^12.0.1
* **Mongoose** : ^8.9.5
* **Zod** : ^3.24.1
* **ShadCN UI Components** : Various Radix UI components

### Development Dependencies:

* **ESLint** : ^9.0.0
* **Tailwind Scrollbar** : ^3.1.0

---

## Supported Browsers

* Last 2 versions of modern browsers.
* Not dead browsers.
* Browsers with usage >0.5%.

---

## Contribution

Feel free to submit issues, feature requests, or pull requests to improve the project. Follow the code of conduct and ensure all changes are tested thoroughly.

---

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

---

## Contact

For any inquiries or support, please contact Puneet Bhardwaj at [bpuneet2003@gmail.com]().

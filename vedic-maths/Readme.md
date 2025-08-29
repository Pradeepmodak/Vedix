
# Vedix Sutras




## Acknowledgements

That’s a beautiful acknowledgement 👏 — it shows your motivation and gives credit to the people who supported you.

Here’s how we can write your **Acknowledgements section** properly for the README:

---

## 🙏 Acknowledgements

* This project was inspired by my **Indian Knowledge System** subject in the 5th semester of Engineering and Computational Mechanics. Our professor encouraged us to explore **Vedic Sutras** as they significantly improve the speed and efficiency of mathematical computations compared to conventional methods.
* I would like to thank my professor for motivating me to bring this idea into practice and to preserve and promote the importance of **Vedic Mathematics**.
* Special thanks to my friend **Sonu Kumar Hansadha** who supported and guided me throughout this project, and encouraged me to make it **open-source** and welcoming for contributors.

---



## Introduction

Vedic Mathematics is an ancient system of calculation derived from 16 powerful sutras (formulas), gifted to us by Indian heritage and culture. These sutras provide elegant shortcuts and intuitive techniques to solve complex mathematical problems with ease.

This project aims to preserve, promote, and modernize Vedic Mathematics by bringing it to a digital platform. Through this website:

✨ Each sutra is explained in detail.

🧮 Users can customize inputs for any sutra.

🎬 The solution is shown step-by-step with interactive animations for better understanding.

🌍 Available in English and Hindi to reach a wider audience.

💡 Includes practical applications of each sutra, demonstrating how they save time and simplify learning.

Our mission is to connect ancient Indian wisdom with modern learning—making Vedic Mathematics accessible to learners of all ages, backgrounds, and cultures, while preserving its historical value.

This is an open-source project, and we warmly welcome contributors who are passionate about mathematics, culture, and education. Together, let’s spread the magic of Vedic Maths! 🚀
## Demo

You can see the demo here
https://vedixx-maths.vercel.app/
## Tech Stack

This project is built using modern web technologies:

Frontend: React
 + component-based UI

Styling: Tailwind CSS
 + utility-first styling

Animations: Framer Motion
 + smooth interactive animations for visualizing sutras

Backend:
 + Node.js
 + Express
 – API and server-side logic

Database: MongoDB
 + storing sutras, user inputs, and content
## Environment Variables

This project requires environment variables for both frontend and backend.

### frontend
VITE_BACKEND_URL=http://localhost:3000

### backend
#### Port on which the server runs
PORT=3000

#### MongoDB connection string
MONGO_URI=your_mongodb_connection_string

👉 For reference, check the provided .env.example files in the repo.
👉 Do not commit your actual .env files. They are already ignored via .gitignore.
👉 If you face any doubt, feel free to reach out by opening an issue.




## How to contribute
````markdown
## 🤝 Contributing  

We welcome contributions from everyone! 🎉  

### How to Contribute  
1. **Fork** the repository  
2. Create a **new branch**  

````

3. Make your changes (add sutras, improve UI, fix bugs, etc.)
4. **Commit** your changes

   ```bash
   git commit -m "Add: new sutra explanation"
   ```
5. **Push** to your fork

   ```bash
   git push origin feature-name
   ```
6. Open a **Pull Request** on GitHub 🚀

### Contribution Ideas

* Add more Vedic sutras and examples
* Improve animations and visualizations
* Add support for more languages (translations)
* Add more interesting features
* Write tests and improve documentation



## Folder structure

Perfect 👍 thanks for sharing the screenshot!
I’ll now explain your **folder structure** clearly so that new contributors understand **where to look**, **where to add**, and **how to maintain reusability + clean architecture**.

---

## 📂 Project Structure

```
vedic-maths/
│
├── backend/                     # Backend (Node.js + Express + MongoDB)
│   ├── config/                  # Database and environment configuration
│   ├── controllers/             # Controllers (business logic, API handling)
│   ├── middlewares/             # Custom middlewares (auth, validation, etc.)
│   ├── models/                  # MongoDB models (e.g., Visitor.js)
│   ├── routes/                  # Express route definitions (serviceRouter.js)
│   ├── utils/                   # Utility/helper functions
│   ├── server.js                # Backend entry point
│   ├── package.json             # Backend dependencies
│   └── .env.example             # Example env variables (PORT, MONGO_URI, etc.)
│
├── frontend/                    # Frontend (React + Vite + Tailwind + Framer Motion)
│   ├── public/                  # Static assets (favicon, index.html, etc.)
│   ├── src/                     # Source code
│   │   ├── assets/              # Images, icons, and static resources
│   │   ├── components/          # Reusable UI components
│   │   ├── data/                # Static data (sutras list, constants, etc.)
│   │   ├── locales/             # i18n language files (English, Hindi support)
│   │   ├── pages/               # Page-level components (Home, Sutras, About)
│   │   ├── styles/              # Global and component-specific styles
│   │   ├── utils/               # Frontend utility/helper functions
│   │   ├── App.jsx              # Main React app wrapper
│   │   ├── i18n.js              # i18n configuration
│   │   └── main.jsx             # React entry point
│   ├── package.json             # Frontend dependencies
│   ├── tailwind.config.js       # Tailwind CSS config
│   ├── vite.config.js           # Vite build config
│   └── .env.example             # Example env (backend API URL, etc.)
│
├── .gitignore                   # Git ignore file
├── README.md                    # Project documentation
└── LICENSE                      # Project license
```

---

## 📝 Explanation for Contributors

* **backend/**

  * Write all **server-side code** here.
  * If adding new features → create a **controller**, register a **route**, and update **models** if needed.
  * Keep logic **separated** (controllers handle business, routes only define endpoints).

* **frontend/**

  * Place **UI elements** inside `components/` (reusable buttons, cards, modals).
  * Add new **pages** inside `pages/` (e.g., `SutrasPage.jsx`).
  * Keep **animations** and **logic** modular → don’t mix inside big components.
  * Use `locales/` if you add translations.

* **utils/**

  * Both frontend & backend have a `utils/` folder → keep helper functions here.

* **.env.example**

  * Always update this file when you add a new environment variable so contributors know what to configure.

* **Best Practices**

  * Reuse components → don’t duplicate code.
  * Follow existing naming conventions.
  * Keep PRs small and modular → one feature per PR.

---




# React Client Guide

## Core Concepts: What is React and Vite?

**React** is a frontend library that builds your website using **Components** (like Lego blocks). Instead of the server sending a finished HTML file (like Express/EJS), React runs in the user's browser and "draws" the website on the fly. 

**Vite** is the "Engine" and "Translator." Browsers cannot read the `.jsx` files we write in React. Vite watches your code while you work, translates it into plain JavaScript, and hosts a local preview so you can see your changes instantly.

---

## Installation and Setup

* **npm create vite@latest . -- --template react**
    * Starts the Vite tool in the current directory (`.`) and sets up the React framework structure automatically.
* **npm install**
    * Downloads the actual code for React and Vite into your project (the `node_modules` folder).
* **npm install @supabase/supabase-js**
    * Adds the library that lets your JavaScript code talk to your Supabase database.
* **npm run dev**
    * Starts the Vite compiler. It’s like `nodemon`, but instead of running one file, it manages your whole `src` folder and hosts your site at `localhost:5173`.

---

## File and Directory Breakdown

### Root Configuration
* **index.html**: The only HTML file you need. It contains a single `<div id="root"></div>` where React injects your entire app.
* **vite.config.js**: The instruction manual for the Vite compiler.
* **eslint.config.js**: The "Grammar Police" that highlights coding errors in your editor.

### The /src Directory (The Workshop)
* **main.jsx**: The "Electrician." It plugs your React code (`App.jsx`) into the `index.html` file.
* **App.jsx**: The **Stage.** This is the single file that stays loaded in the browser. It acts like your "boilerplate" (similar to **ejs-mate**).
* **index.css vs App.css**: Global vs. Component styles. You can merge these or delete one to keep it simple.

### Assets vs. Public (Where do images go?)
* **assets/** (Inside `src`): Use this for images you want to **import** into your code. Vite makes these load faster.
* **public/** (Outside `src`): For static files like favicons that don't need processing. 
* **Simple Tip**: Just use **assets** for everything for now.

---

## Component Logic & Memory

### JSX Rules
* **The Return:** Every `.jsx` file **must** return HTML/JSX code. This is the blueprint for what the user sees.
* **Functions First:** In React, we define our logic (functions) *above* the return statement, not in a separate script tag at the bottom.

### Memory (The `useState` Hook)
In React, you don't use regular variables like `let x = 5` to change the UI. You use **State**.
* **The Variable (`tasks`):** The current value. You treat this as Read-Only.
* **The Setter (`setTasks`):** A function built automatically by React. This is the **only** way to change the variable and trigger the screen to refresh.
* **The Safety Net (`|| []`):** Always use `setTasks(data || [])`. This prevents your app from crashing if the database returns `null` or is empty.



### Triggers (The `useEffect` Hook)
* **`useEffect(() => { ... }, [])`**: This is the "On Page Load" trigger. It runs your code (like fetching data) exactly once as soon as the component appears on the screen.

---

## Component Architecture (Keeping Code Clean)

To avoid "File Bloat" in `App.jsx`, we break the UI into small pieces. These are all just `.jsx` files, but we organize them by purpose:

* **Separation of Concerns:** Each `.jsx` file should only do ONE thing.
* **Organization:** * `/src/components`: For small parts (Navbar, Footer, Button, Card).
    * `/src/pages`: For big views/screens (Login, Home, StudySpots).
* **Props (Passing Data):** Since components are isolated, the "Parent" page (like `TaskManager`) must pass data down to the "Children" components (like `TaskList`) using **Props**. Think of this like passing arguments to a function.

---

## Key Differences from Express

* **Client-Side**: The browser builds the page, not the server.
* **Import vs Require:** In React/Vite, we **must** use `import` (ES Modules). `require()` will cause an error in the browser.
* **No Refresh**: React only updates the specific parts of the screen that change.
* **Direct DB Access**: You talk to Supabase directly from the frontend using your **Anon Key** and **RLS Policies**.

---

> **Note:** Because React runs in the user's browser, never put your **Service Role Key** here. Only use the **Anon Key**.
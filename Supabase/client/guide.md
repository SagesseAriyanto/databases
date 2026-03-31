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

## The "Single Page" Mystery (Routing)

In Express, changing pages means the server sends a new file. In React, you only ever load `index.html` once. This is called a **Single Page Application (SPA)**.

* **The Picture Frame:** `App.jsx` holds the components that are **always visible** (like your Navbar and Footer), regardless of which "page" you are on.
* **The Swappable Content:** When you "change pages," React doesn't reload the site. It simply hides one component (e.g., `Home.jsx`) and shows another (e.g., `Login.jsx`) in the middle of the frame.
* **The Benefit:** This is why React feels so fast—there is no "white flash" or waiting for a server to send a new page. It works just like the `<%- body %>` tag in ejs-mate.

---

## Component Architecture (Keeping Code Clean)

To avoid "File Bloat" in `App.jsx`, we break the UI into small pieces. These are all just `.jsx` files, but we organize them by purpose:

* **Separation of Concerns:** Each `.jsx` file should only do ONE thing.
* **Organization:** * `/src/components`: For small parts (Navbar, Footer, Button, StudySpotCard).
    * `/src/pages`: For big views/screens (Login, Home, StudySpots).
* **Reusability:** Design one `StudySpotCard.jsx` and use it for every spot in **RexHub** by just passing in different data from your database.

---

## Key Differences from Express

* **Client-Side**: The browser builds the page, not the server.
* **No Refresh**: React only updates the specific parts of the screen that change.
* **Direct DB Access**: You talk to Supabase directly from the frontend using your **Anon Key** and **RLS Policies**.

---

> **Note:** Because React runs in the user's browser, never put your **Service Role Key** here. Only use the **Anon Key**.
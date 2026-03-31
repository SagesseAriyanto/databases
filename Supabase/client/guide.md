# 🧊 React Client Guide

## 🚀 Installation & Setup
1. `npm create vite@latest . -- --template react` (Scaffold the project)
2. `npm install` (Download the React engine)
3. `npm install @supabase/supabase-js` (Download the DB tool)
4. `npm run dev` (Turn on the "Vite Factory" to see the site)

---

## 📂 The File Map (What do these actually do?)

### Root Files (The "Engine" Parts)
* **index.html:** The ONLY HTML file. It has a `<div id="root"></div>`. React "injects" your code into this empty box.
* **package.json:** Your shopping list. It tells `npm install` exactly what to download.
* **vite.config.js:** The instruction manual for Vite. You almost never need to touch this.
* **eslint.config.js:** The "Grammar Police." It underlines your code in red if you make a typo or break a best practice.

### The `src/` Folder (The "Workshop")
This is where 99% of your work happens (similar to your `views` in Express).
* **main.jsx:** The "Electrician." It connects your React code (`App.jsx`) to the `index.html`.
* **App.jsx:** **The Main Component.** Think of this as your `index.ejs`. Everything starts here.
* **App.css / index.css:** Where your styles live.

### The `public/` Folder (The "Storage")
* This is for files the browser needs to access directly, like a **favicon.ico** (the tab icon) or large images. Unlike `src`, files here aren't "compiled" or changed by Vite.

---

## 💡 Key Concepts
* **Client-Side Rendering:** There is no `app.get()` on a server. React builds the HTML inside the user's browser.
* **Single Page Application (SPA):** You only ever load `index.html`. When you "change pages," React just wipes the screen and draws a new component instantly without a page reload.
* **No Backend?** For this experiment, the "Backend" is Supabase itself. We talk to it directly using the **Anon Key** and **RLS Policies**.
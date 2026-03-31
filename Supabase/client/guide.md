# 🧊 Client-Side (React) Guide

## What is this?
This is the **Frontend**. Unlike Express (which sends finished HTML), React sends a "JavaScript Engine" to the browser. The browser then builds the page on the fly using **Components**.

## Key Terms
* **Vite:** The "Builder." It translates our React code so the browser can read it.
* **Components:** Reusable UI blocks (Navbar, Footer, Button).
* **Client-Side Rendering (CSR):** The browser builds the page. This makes the app feel "snappy" because it doesn't refresh the whole page when you click a link.
* **JSX:** A way to write HTML-like code directly inside JavaScript.

## Why use React with Supabase?
Because we can use the **Anon Key** and **RLS Policies** to talk to the database directly from the browser, skipping the need for a "Middleman" server for simple tasks.
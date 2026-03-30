# ⚡ Supabase & Database Core Guide
A simple, effective breakdown of how Supabase works and how it compares to the NoSQL world (MongoDB).

## What is Supabase?
Supabase is an **Open Source** alternative to Firebase. It is built on **PostgreSQL**, a powerful relational database. 

* **The Translator:** When you use the Supabase JS Library, you are writing JavaScript that gets "translated" into **Raw SQL** queries behind the scenes.
* **Ownership:** Because it is Open Source, you aren't "locked in." You can export your data as a standard SQL file and run it on any server in the world.

### Supabase (SQL)
* **Organization:** Your account (The Building).
* **Project:** Your specific app (The Apartment). In Supabase, the Project *is* the Database.
* **Tables:** The "Excel Sheets" inside your project (e.g., `users`, `posts`).
* **Rows:** The individual entries of data.

### MongoDB Atlas (NoSQL)
* **Organization → Project:** (Same as above).
* **Cluster:** The "Engine Room." Atlas uses **3 Nodes** (3 separate computers) even on the free tier to ensure the database stays online if one fails.
* **Database:** A container inside the cluster.
* **Collections:** Equivalent to Tables.
* **Documents:** Equivalent to Rows (JSON format).

## Keys & Access
Supabase uses two specific keys to control who can talk to your data:

* **Anon Key (Public):** Used in the Frontend (React). It is limited by security rules you set in the dashboard.
* **Service Role Key (Secret):** Used in the Backend (Express). This is **Master Access**. It bypasses all security rules. **Never share this.**

## Constraints & Rules
* **Nullable:** If a column is "Not Null," you must provide a value or a **Default Value** (like `0` or `false`), otherwise the save will fail.
* **Create More:** In the Table Editor, this checkbox keeps the entry window open so you can add multiple rows quickly without re-clicking "Insert."
* **Project ID:** That long string of letters in your dashboard is your unique ID. It is used to build your **Project URL** (`https://[ID].supabase.co`).

> **Note:** Always keep your **Database Password** and **Service Keys** in a `.env` file to keep your project secure.
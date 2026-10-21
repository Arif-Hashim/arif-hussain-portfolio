# 🚀 Arif Hussain - Modern MERN Stack Portfolio

A high-performance, fully functional portfolio built with **Next.js 14 (App Router)**, **Tailwind CSS**, and **Lucide Icons**. It includes a full-featured, secure **Admin Panel** to upload and manage projects, update your resume/CV, and view inquiries from the interactive contact form.

---

## 🌟 Features

- **Dynamic Homepage**: High-impact developer hero section, interactive code config window, and spotlight creations.
- **Interactive Portfolio (`/portfolio`)**: Category filter tabs (*All*, *Full Stack*, *Front End*, *Backend & APIs*), real-time search bar, stats (views & likes), and direct action buttons for **Live Preview** and **Source Code**.
- **About & Background (`/about`)**: Full background including Virtual University BS Software Engineering, Nexskill Karachi MERN certification, categorized technical skills, and language proficiencies.
- **Direct CV Download & Management**: Download CV button linked directly to `/Arif_Hussain_Resume.pdf`, with the ability to upload a new PDF anytime from the Admin panel.
- **Interactive Contact Form (`/contact`)**: Instant message submission with validation, saving messages directly to your dashboard.
- **Secure Admin Panel (`/admin`)**:
  - Protected with User ID and Password stored securely in `.env.local`.
  - Add, edit, or delete projects with live image preview, tags, and category assignment.
  - Upload new PDF CV with a single click.
  - Review client inquiries with one-click direct email reply.

---

## 🔐 Admin Credentials (`.env.local`)

Default credentials set in `.env.local`:
- **Admin User ID:** `arif`
- **Admin Password:** `Arif@Karachi2026!`

*(Aap inhein `.env.local` file khol kar kisi bhi waqt change kar sakte hain).*

---

## 🛠️ Getting Started (Local Setup)

1. **Clone or extract repository** and navigate to the project directory:
   ```bash
   cd arif-hussain-portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   - Website: [http://localhost:3000](http://localhost:3000)
   - Portfolio: [http://localhost:3000/portfolio](http://localhost:3000/portfolio)
   - Admin Panel: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## 📤 Pushing to GitHub

1. Initialize git in your project:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Arif Hussain MERN Portfolio"
   ```
2. Link your GitHub repository:
   ```bash
   git remote add origin https://github.com/arifhashimi9090/<your-repo-name>.git
   git branch -M main
   git push -u origin main
   ```
*(Note: `.gitignore` will ensure that your private `.env.local` file is never pushed to public GitHub, keeping your password completely safe!)*

---

## 🚀 Deployment on Vercel

1. Push your code to GitHub.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Under **Environment Variables**, add:
   - `ADMIN_USERNAME` = `arif`
   - `ADMIN_PASSWORD` = `Arif@Karachi2026!`
   - `SESSION_SECRET` = `arif_secret_secure_key_9090_mern_stack_2026`
5. Click **Deploy**. Your portfolio is live!

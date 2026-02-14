# Enrique Lazo Bello - Senior Software Engineer Portfolio

A high-performance, fully responsive personal portfolio and resume website built with modern web technologies. Designed with a focus on speed, accessibility, and clean architecture utilizing the **Astro Islands** pattern.



## 🚀 Features

* **Blazing Fast Performance:** Built with Astro for static site generation (SSG) with zero JavaScript shipped by default for static sections (Hero, Experience, Projects).
* **Partial Hydration (React Islands):** Interactive components like the Theme Toggle, Contact Form, and floating AI Chatbot are built with React and only hydrate when necessary.
* **Custom AI Assistant:** An integrated floating chatbot connected to a custom knowledge base API. Supports querying profile details and uploading external files (CV/JSON) for deep context analysis.
* **Dynamic Blog Fetching:** Automatically pulls the latest articles from the Dev.to API.
* **Dark/Light Mode:** Native Tailwind CSS dark mode with system preference detection and `localStorage` persistence, avoiding FOUC (Flash of Unstyled Content).
* **Tailwind CSS & Custom Animations:** Highly maintainable utility-first styling with custom `@keyframes` (animated background blobs).

## 🛠️ Tech Stack

* **Framework:** [Astro](https://astro.build/)
* **UI Library:** [React](https://reactjs.org/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Icons:** [Lucide React](https://lucide.dev/)
* **Markdown Parsing:** [React Markdown](https://github.com/remarkjs/react-markdown)
* **Language:** [TypeScript](https://www.typescriptlang.org/)

## 📂 Project Structure

```text
src/
├── components/          # Reusable components
│   ├── ui/              # Atomic UI components (Buttons, Badges, Inputs)
│   ├── Chatbot.tsx      # Floating AI Assistant (React Island)
│   ├── Header.tsx       # Navigation and Theme toggle (React Island)
│   ├── ExperienceItem.astro # Static Timeline item
│   └── ProjectCard.astro    # Static Project showcase card
├── hooks/
│   └── useChat.ts       # Custom React hook for AI Assistant state management
├── layouts/
│   └── MainLayout.astro # Global shell (HTML head, SEO, background animations)
├── pages/
│   └── index.astro      # Main landing page orchestrating all components
└── styles/
    └── global.css       # Tailwind base, components, and custom keyframes
```

## ⚙️ Getting Started

### Prerequisites

* Node.js (v18 or higher)
* npm, pnpm, or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/enlabedev/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Environment Variables:
   Create a `.env` file in the root of the project and add your API endpoints for the custom Chatbot:
   ```env
   PUBLIC_API_URL=http://localhost:3000
   PUBLIC_API_CHAT=http://localhost:3001
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open `http://localhost:4321` in your browser to see the result.

## 📦 Building for Production

To create a production-ready build, run:

```bash
npm run build
```

You can preview the production build locally using:

```bash
npm run preview
```

## 🌐 Deployment

This project is optimized to be deployed on platforms like **Vercel**, **Netlify**, or **Cloudflare Pages**. 

For Vercel (Recommended):
1. Push your code to a GitHub repository.
2. Import the project in Vercel.
3. Vercel will automatically detect the Astro framework and configure the build settings.
4. Add your `PUBLIC_API_URL` and `PUBLIC_API_CHAT` in the Vercel Environment Variables settings.
5. Deploy!

# Pritesh Vadhel — Portfolio

[![Deploy to GitHub Pages](https://github.com/VPritesh/vpritesh.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/VPritesh/vpritesh.github.io/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-orange.svg)](./LICENSE)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF.svg?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.x-61DAFB.svg?logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38B2AC.svg?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

The source code for **[vpritesh.github.io](https://vpritesh.github.io)** — a high-performance, brutalist portfolio and engineering log built with React 19, TypeScript, Vite, and Tailwind CSS v4.

Designed with an intentional dual-theme architecture (**Ink Mode** & **Paper Mode**), raw developer aesthetics, and an interactive database-style terminal.

👉 **[Visit the live website →](https://vpritesh.github.io)**

---

## Architecture & Features

- **⚡ Lightning Fast Vite Build**: Sub-second dev HMR and ~1.4s optimized production bundling.
- **🎨 Custom Ink / Paper Design System**:
  - **Ink Mode**: Sleek brutalist dark mode with subtle grain, `#ff4d00` signal accents, and terminal styling.
  - **Paper Mode**: Warm tactile editorial palette (`#e4dfd1`) mimicking print media.
- **💻 Interactive SQL / Sysadmin Terminal**: In-browser emulator responding to custom commands (`whoami`, `skills`, `projects`, `uptime`, `bio`, SQL queries).
- **📊 Real-time Metric & History Cards**: Structured schema-inspired layouts showcasing production numbers and systems evolution.
- **🚀 Zero-Config CI/CD**: Automated GitHub Actions workflow compiling and deploying directly to GitHub Pages on every push to `main`.
- **📱 Fully Responsive**: Fluid typography, touch-optimized mobile navigation drawer, and accessible contrast ratios.

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [React 19](https://react.dev/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Bundler** | [Vite 8](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Deployment** | [GitHub Pages](https://pages.github.com/) via GitHub Actions |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20+ recommended)
- `npm`

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/VPritesh/vpritesh.github.io.git
   cd vpritesh.github.io
   ```

2. **Install dependencies:**
   ```bash
   npm ci
   ```

3. **Start the local dev server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```
   Generates a static production bundle in `dist/`.

---

## Project Structure

```text
├── .github/
│   └── workflows/
│       └── deploy.yml      # Automated GitHub Actions deployment
├── public/
│   ├── favicon.svg         # Dynamic SVG favicon
│   └── photo.png           # Profile photo asset
├── src/
│   ├── App.tsx             # Main application & sections
│   ├── data.json           # Content, experience, projects, & history
│   ├── index.css           # Global typography & Tailwind styles
│   └── main.tsx            # Application entry point
├── package.json
├── tsconfig.json
└── vite.config.ts          # Vite configuration
```

---

## Customization

All personal information, experience, projects, skills, and writings are decoupled in **`src/data.json`**.  
To customize the content for your own portfolio, edit `src/data.json` without needing to modify the React components.

---

## License

This project is open-source under the [MIT License](./LICENSE).

The source code and design architecture are available to fork and reuse. Personal copy, career history, and photography belong to Pritesh Vadhel—if you fork this repository, please update the content with your own information.

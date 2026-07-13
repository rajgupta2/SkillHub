# 🚀 SkillHub Frontend

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss" />
  <img src="https://img.shields.io/badge/Shadcn_UI-Components-black" />
  <img src="https://img.shields.io/badge/Docker-Supported-2496ED?logo=docker" />
</p>

A modern **Next.js** frontend powering the **SkillHub** platform. It provides an intuitive user interface for students to discover learning resources, tutorials, articles, colleges, and career opportunities while seamlessly interacting with the SkillHub Backend APIs.

---

# ✨ Features

- 🎓 Modern Student Dashboard
- 🔐 Authentication & Authorization
- 👤 User Profile Management
- 🏫 College Profiles
- 📚 Study Resources
- 📝 Articles & Blogs
- 🎥 Tutorials & Courses
- 🔍 Advanced Search & Filtering
- 📱 Responsive Design
- ⚡ Server-Side Rendering (SSR)
- 📈 SEO Optimized
- 🔗 REST API Integration
- 🐳 Docker Support

---

# 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js |
| Language | TypeScript |
| UI Library | React |
| Styling | Tailwind CSS |
| Components | shadcn/ui |
| Icons | Lucide React |
| Forms | React Hook Form |
| Deployment | Vercel |
| Containerization | Docker |

---

# 📂 Project Structure

```text
skillhub-frontend/
│
├── public/
│
├── app/
├── components/
├── package.json
├── next.config.ts
├── tsconfig.json
├── Dockerfile
├── .dockerignore
├── .gitignore
├── .env.local
└── README.md
```

---

# ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/rajgupta2/skillhub.git
```

Navigate to the project

```bash
cd skillhub
```

Install dependencies

```bash
npm install
```

---

# 🔑 Environment Variables

Create a `.env.local` file in the project root.

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_EMAIL=skillhub.student@gmail.com
NEXT_PUBLIC_SITE_URL=https://skillhub-student.vercel.app
NODE_ENV=production
#The jwt secret should be same in backend api and here.
JWT_SECRET=your-jwt-secret
```

---

# ▶️ Running the Application

Choose one of the following methods.

---

## 🚀 Option 1: Run Without Docker

### Start the development server

```bash
npm run dev
```

The application will be available at

```
http://localhost:3000
```

### Build for production

```bash
npm run build
```

### Start production server

```bash
npm start
```

---

## 🐳 Option 2: Run With Docker

### Build the Docker image

```bash
docker build -t skillhub-frontend .
```

### Run the Docker container

```bash
docker run -d --name skillhub-frontend -p 3000:3000 skillhub-frontend
```

The application will be available at

```
http://localhost:3000
```

---

# 📜 Available Scripts

| Command | Description |
|----------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build production application |
| `npm start` | Start production server |

---

# 🌐 Backend Configuration

The frontend communicates with the **SkillHub Backend** through REST APIs.

Configure the backend URL using:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

# 📱 Responsive Design

The application is fully responsive and optimized for:

- 💻 Desktop
- 💼 Laptop
- 📱 Mobile
- 📟 Tablet

---

# 🚀 Performance

- ⚡ Next.js App Router
- 🖥️ Server Components
- 📦 Code Splitting
- 🖼️ Image Optimization
- 📈 SEO Optimized
- ⚙️ Lazy Loading
- 🔄 Dynamic Imports

---

# 🎨 UI Components

The frontend uses:

- Tailwind CSS
- shadcn/ui
- Lucide Icons
- Responsive Layouts

---

# 🔒 Authentication

Authentication is handled using **JWT tokens** issued by the SkillHub Backend.

Protected pages require a valid access token.

---

# 🚀 Deployment

This frontend can be deployed on:

- Vercel ⭐ (Recommended)
- Docker
- AWS EC2
- Netlify
- Azure Static Web Apps
- DigitalOcean App Platform

---

# ❓ Troubleshooting

### Dependencies not installed

```bash
npm install
```

### Build failed

```bash
npm run build
```

### Docker container not starting

```bash
docker logs skillhub-frontend
```

### Port already in use

```bash
docker run -p 8080:3000 skillhub-frontend
```

Open

```
http://localhost:8080
```

---

# 📈 Future Enhancements

- 🤖 AI Study Assistant
- 📊 Student Analytics Dashboard
- 💬 Real-time Community Chat
- 🔔 Push Notifications
- 🌍 Multi-language Support
- 📱 Progressive Web App (PWA)

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository.

2. Create a feature branch.

```bash
git checkout -b feature/my-feature
```

3. Commit your changes.

```bash
git commit -m "Add my feature"
```

4. Push your branch.

```bash
git push origin feature/my-feature
```

5. Open a Pull Request.

---

## 🔗 Related Repositories

- **Frontend:** https://github.com/rajgupta2/skillhub
- **Backend:** https://github.com/rajgupta2/skillhub-backend

---

# 📄 License

This project is proprietary software.

- Copyright (c) 2026 Raj Gupta
- All rights reserved.

The source code is provided for viewing and educational purposes only.

---

# 👨‍💻 Author

**Raj Gupta**

- 🌐 GitHub: https://github.com/rajgupta2
- 💻 AWS | MERN | Next.js | TypeScript | Docker | PostgreSQL | MongoDB

---

# ⭐ Support

If you found this project helpful, consider giving it a **⭐ Star** on GitHub.

It helps others discover the project and motivates further development.

---
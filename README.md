
# 📝 ToDo List Web App

A full-stack ToDo List application with user authentication, built using Spring Boot (Java) for the backend and React.js for the frontend. This project supports user registration, login, and secure role-based task management.

## 🌐 Live Demo

- **FullStack live link (Netlify)**: [https://taskly01.netlify.app/](https://taskly01.netlify.app/)  


## 🛠️ Tech Stack

### Frontend:
- React.js
- Tailwind CSS
- Axios
- Netlify (Deployment)

### Backend:
- Spring Boot (Java)
- Spring Security + JWT Authentication
- Hibernate + JPA
- PostgreSQL (Neon DB)
- Render (Deployment)
- Docker (Containerization)

## 📦 Features

- 🔐 User Registration & Login
- 🧾 JWT-based Authentication
- 👥 Role-based Access Control (`User`, `Admin`)
- ✅ Create, View, Update, Delete ToDos
- 💾 PostgreSQL Database (Neon)
- 🚀 Fully deployed with CI/CD using Docker

## ⚙️ How to Run Locally

### Backend

```bash
git clone https://github.com/yourusername/todolist-backend.git
cd todolist-backend
docker build -t todo-backend .
docker run -p 3001:3001 todo-backend
```

Or run locally with Maven:

```bash
./mvnw spring-boot:run
```

Configure `.env` or `application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://your-neon-url
spring.datasource.username=your-username
spring.datasource.password=your-password
jwt.secret=your-secret-key
frontend.url=https://your-frontend.netlify.app
```

---

### Frontend

```bash
git clone https://github.com/yourusername/todolist-frontend.git
cd todolist-frontend
npm install
npm run dev
```

Update `.env`:

```env
VITE_BACKEND_URL=https://your-backend.onrender.com
```

## 📸 Screenshots

> _(Add screenshots or screen recordings of your app here.)_

## 📁 Project Structure

```
├── backend/
│   └── src/main/java/com/backend/todolist
├── frontend/
│   └── src/
│       └── components/
│       └── pages/
```

## ✅ Future Improvements

- Google OAuth integration
- Dark mode toggle
- Task prioritization feature
- Notifications & reminders

## 👨‍💻 Author

- **Your Name** – [@yourgithub](https://github.com/yourusername)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

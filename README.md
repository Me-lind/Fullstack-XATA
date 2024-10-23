# Fullstack-XATA
# 🛠 Task Management App

# 📋 Project Overview

Fullstack-XATA is a full-stack project built using **Next.js** on the frontend and **Express.js** on the backend. The project integrates **Xata** as the main database for managing user authentication, team creation, project management and task tracking.

The key features of the application include:

- User Registration and Login with JWT-based authentication.
- Role-based access for users and admins.
- Team, project, and task management functionality.
- Interactive dashboard for users to track their tasks, teams, and projects.

---

## 🛠️ Tech Stack
- ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
- Frontend: ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white), ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB), ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
- Backend: ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB), ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
- Testing: ![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
- Database: Xata (Serverless DB)
- Authentication: JWT

---
# 🚀 Features Implemented

## User Authentication
- **Register**: Users can register using their name, email, password, and role.
  ![registerpage](https://github.com/user-attachments/assets/44ee142f-7c7a-40f2-a7f4-f605f2b45c6b)
- **Login**: Secure login with token-based authentication.
  ![loginpage](https://github.com/user-attachments/assets/f4e4c809-dd70-462d-b3e0-b1c5ceb3931f)
- **Role-Based Access**: Admins have access to additional features, such as task management and status updates.
## Team and Project Management
- **Teams**: Users can view teams they belong to with admins managing team creation.
- **Projects**: Teams have multiple projects and users can track project details.
## Task Management
- **Task Board**: Displays tasks with statuses like "In Progress", "Completed", and "Overdue".
- **Task Assignment**: Tasks can be assigned to team members and admins can update task statuses.
![dashboard](https://github.com/user-attachments/assets/32ad35c3-f36f-4312-989b-75da5dd6ae5f)

---
# 📂 Folder Structure
``` markdown
.
├── backend
│   ├── controllers
│   ├── routes
│   ├── models
│   ├── middlewares
│   └── server.ts
├── frontend
│   ├── components
│   ├── pages
│   └── styles
└── README.md
```
---
# ⚙️ Setup and Installation
## Prerequisites
Make sure you have the following installed:   
- Node.js
- Git
### Backend Setup
1. Clone the repository:
```bash
git clone https://github.com/Me-lind/Fullstack-XATA.git
cd backend
```
2. Install dependencies:   
```bash
npm install
```
3. Set up environment variables in .env:   
```bash
XATA_API_KEY=<your-xata-api-key>
JWT_SECRET=<your-secret>
```
4. Run the backend server:
```bash
npm start
```
### Frontend Setup
1. Navigate to the frontend folder:
```bash
cd frontend
```
2. Install dependencies:
```bash
npm install
```
3. Run the frontend:
```bash
npm run dev
```
---
## 📝 API Endpoints
### Authentication
- POST /auth/register: Register a new user.
- POST /auth/login: Log in a user and get a token.
### Teams
- GET /teams: Fetch all teams for the logged-in user.
### Projects
- GET /projects: Fetch projects associated with the user's teams.
### Tasks
- GET /tasks: Fetch all tasks for the user.
- POST /tasks: Admins can create new tasks.
- PATCH /tasks/:id: Update task status (Admins only).

---
## 👨‍💻 Contributors

1. [Eammon Kiprotich](https://github.com/craizytech) - Backend  
2. [Favour Wanjui](https://github.com/wanjuifavour) - Testing & Frontend  
3. [Melinda Chebet](https://github.com/Me-lind) - Database intergration & Frontend   
4. [Clifford Kovulo](https://github.com/CliffordKovulo) - Frontend

---
## 🏗️ Future Improvements
- Add notifications for task updates.
- Implement real-time task updates using WebSockets.
- Improve task filtering and sorting.

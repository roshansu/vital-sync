# 🏥 ProDesk Capstone – Patient and Doctor Management System

## 📌 Project Overview

ERD overview: -
https://app.eraser.io/workspace/Ml3PmonmRyhjQZK8bKbF?origin=share

UI overview:-
https://stitch.withgoogle.com/projects/10214467356662349857

The **Hospital Management System (HMS)** is a full-stack web application designed to streamline and digitize hospital operations. It enables efficient management of patients, doctors, appointments, prescriptions, and billing while ensuring scalability, security, and real-time interaction.

This project is built as part of the **ProDesk Capstone** to demonstrate real-world system design, full-stack development, and scalable architecture.

---

## 🎯 Track

**Full Stack Development (MERN Stack)**

---

## 🛠️ Tech Stack

### Frontend:

* React.js (with Vite / Next.js optional)
* Tailwind CSS
* Axios
* React Router

### Backend:

* Node.js
* Express.js

### Database:

* MongoDB (Mongoose ODM)

### Caching & Performance:

* Redis (JWT Blacklisting + Rate Limiting)

### Architecture:

* Load Balancer (conceptual / Nginx / cloud-based)

### Other Tools:

* Cloudinary / AWS S3 (file uploads)
* Socket.io (real-time communication - optional)
* JWT (authentication)
* Multer (file uploads)

---

## 🚀 Core Features

### 🔐 Authentication & Authorization

* User Signup & Login
* JWT-based authentication
* Role-based access control (Admin, Doctor, Patient)
* Secure logout with Redis token blacklisting

---

### 👤 Patient Management

* Add / update patient details
* View patient profile
* Medical history tracking
* Upload & manage reports

---

### 👨‍⚕️ Doctor Management

* Add and manage doctors
* Specialization & experience tracking
* Availability scheduling

---

### 📅 Appointment System

* Book appointments
* Reschedule / cancel appointments
* Time-slot based booking
* Prevent double booking

---

### 💊 Prescription System

* Doctors can write prescriptions
* Add medicines, dosage, and notes
* Download prescription (PDF-ready UI)

---

### 💳 Billing & Payments

* Generate invoices
* Track payment status (paid/unpaid)
* Patient billing history

---

### 📊 Dashboard & Analytics

* Admin dashboard with:

  * Total patients
  * Appointments
  * Revenue
* Doctor dashboard:

  * Daily schedule
* Patient dashboard:

  * Upcoming visits

---

### 🔔 Notifications System

* Alerts for appointments
* Success/error feedback (UI toasts)

---

### 📁 File Management

* Upload medical reports
* Store securely using cloud storage

---

## ⚡ Advanced Features

### 🔄 Rate Limiting (Sliding Window)

* Prevent API abuse
* Redis-based sliding window implementation
* Limit requests per user/IP

---

### 🔐 Redis Token Blacklisting

* Secure logout system
* Block invalid JWT tokens
* Improve authentication security

---

### 🏗️ Scalable Architecture

* Load balancer distributes traffic across servers
* Multiple backend instances
* Stateless server design

---

### 💬 Real-time Communication (Optional)

* Chat between doctor and patient
* Emergency notifications

---

## 🧱 System Architecture (High-Level)

* Client (React App)
* Load Balancer
* Multiple Express Servers
* MongoDB Database
* Redis (Caching + Security)
* Cloud Storage (Reports)

---

## 🧩 Database Design (ERD Overview)

Entities:

* User
* Patient
* Doctor
* Appointment
* Prescription
* Payment
* Report

Relationships:

* One patient → many appointments
* One doctor → many appointments
* One appointment → one prescription
* One patient → many reports & payments

---

## 🎨 UI/UX Design

* Modern healthcare dashboard design
* Clean and minimal interface
* Role-based dashboards
* Responsive design (desktop + mobile)
* Interactive prototype built in Figma

---

## 📦 Folder Structure (Planned)

```
client/
  ├── components/
  ├── pages/
  ├── services/
  ├── hooks/

server/
  ├── controllers/
  ├── routes/
  ├── models/
  ├── middleware/
  ├── utils/
```

---

## 🔒 Security Features

* JWT Authentication
* Password hashing (bcrypt)
* Redis-based token blacklist
* Rate limiting (sliding window)
* Input validation & sanitization

---

## 🚀 Future Enhancements

* AI symptom checker chatbot
* Multi-hospital (SaaS) support
* Mobile app (React Native)
* Advanced analytics dashboard
* Role-based notification system

---

## 🎯 Goal of the Project

To build a **production-ready, scalable hospital management system** that demonstrates:

* Full-stack development skills
* System design knowledge
* Security best practices
* Real-world application architecture

---

## 👨‍💻 Author

**Roshan Kumar**

---

## ⭐ Final Note

This project is designed to go beyond a basic CRUD application and reflect a **real-world SaaS product**, focusing on scalability, performance, and user experience.

# Employee Management System

A simple **CRUD application** built with **React, Node.js, Express, and MySQL**, allowing users to manage employees, including image uploads and previews.

---

## Features
- Add, view, edit, and delete employees
- Upload and preview employee images
- Responsive UI with Tailwind CSS
- Search and filter employees

---

## Tech Stack
- **Frontend:** React, Tailwind CSS  
- **Backend:** Node.js, Express  
- **Database:** MySQL  
- **Others:** Axios, React Router, Multer (for image uploads)

---

## Getting Started

### Prerequisites
- Node.js installed  
- MySQL installed  
- Git installed

---

### 1. Clone the Repository
```bash
git clone https://github.com/karthikeyan80/Employee-management-system.git
cd Employee-management-system

```

2. Setup MySQL Database

Open MySQL Workbench or command line.

#Create a new database:
```
CREATE DATABASE employeedb;
```


#Create employee table:

```
CREATE TABLE `employee` (
  `employeeId` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) DEFAULT NULL,
  `department` varchar(30) DEFAULT NULL,
  `designation` varchar(30) DEFAULT NULL,
  `project` varchar(30) DEFAULT NULL,
  `type` enum('office','home') DEFAULT NULL,
  `status` enum('permanent','temporary') DEFAULT NULL,
  `image` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`employeeId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
```


---

3. Configure Environment Variables

#Create a .env file in the server folder:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_DATABASE=employeedb
PORT=5000
```
---


4. Install Dependencies

#Backend

cd server > npm install


#Frontend

cd client > npm install

---

5. Run the Project

#Backend

```
cd server
npm start
```


#Frontend

```
cd client
npm run dev
```

Frontend runs at: http://localhost:5000

Backend runs at: http://localhost:5173

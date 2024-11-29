

# Role based Access Control Backend System Documentation

## Introduction
This project implements a Role-Based Access Control (RBAC) system to manage user access to resources based on roles and permissions. It is built with Node.js and Express, using MongoDB as the database.







## Features
- User authentication and authorization via JWT.
- Role management (e.g., Admin, Moderator, User).
- Permission management (e.g., Create, Read, Update, Delete).
- Middleware for role-based access restrictions.

  






## System Architecture

The system follows a 3-layer architecture:

- Client: Sends API requests.
- Server: Processes requests and applies role-based restrictions.
- Database: Stores users, roles, and permissions.






## Database Design

The database consists of the following main collections:
- *Users (with role as user)*: Access to limited Routes.
- *Users (with role as admin)*: Access to Restricted Routes.
- *Users (with role as moderator)*: Access to to option of changing user role.





### User Schema
```js 
{
  name: String,
  email: String,
  hashedPassword: String,
  createdAt: Date,
  role: String,
  resetPasswordToken: String,
  resetPasswordExpire: Date
}
```






## Technology Stack
### Backend
- Node.js: JavaScript runtime for building server-side applications.
- Express.js: Web framework for handling routing, middleware, and HTTP requests.
### Database
- MongoDB: NoSQL database for storing users, roles, and permissions.
- Mongoose: ODM (Object Data Modeling) library for managing MongoDB interactions.
### Authentication
- JWT (JSON Web Tokens): Secure token-based authentication for session management.
- bcrypt: Library for hashing and securely storing user passwords.
### Middleware
- Custom Middleware: For handling authentication and role-based authorization.
Development Tools
- Postman: For API testing and debugging.
### Deployment
- dotenv: For managing environment variables securely.
### Version Control
- Git: For source code management and collaboration.
- GitHub: Repository hosting for codebase versioning.








## API Design

The system uses REST APIs built with Node.js for communication between the client and server.

### Endpoints

#### User Routes



- POST /register : Registers a new user<br/>
  Request Body:
```json
{
  "username": "johndoe",
  "email": "johndoe@example.com",
  "password": "securePassword123"
}
```
Response:<br/>
201 Created: User successfully registered.<br/>
400 Bad Request: Missing or invalid data.<br/>
<br/>
<br/>




- POST /login<br/>
Description: Authenticates a user and returns a JWT.<br/>
Request Body:
```
{
  "email": "johndoe@example.com",
  "password": "securePassword123"
}
```
Response:
```
{
  "token": "jwt_token_here",
  "user": {
    "id": "12345",
    "username": "johndoe",
    "role": "user"
  }
}
```
200 OK: Login successful.<br/>
401 Unauthorized: Invalid credentials.<br/>
<br/><br/>




- GET /logout<br/>
Description: Logs out the user and clears the session token.<br/><br/>
Response:<br/>
200 OK: Successfully logged out.<br/>
  
- GET /me<br/>
Description: Returns details of the currently logged-in user.<br/><br/>
Access: Requires authentication (auth.isAuthenticated).<br/><br/>
Response:
```
{
  "id": "12345",
  "username": "johndoe",
  "email": "johndoe@example.com",
  "role": "user"
}
```
200 OK: Returns user data.<br/>
401 Unauthorized: User is not authenticated.<br/>

#### Admin Routes

- GET /admin/user<br/>
Description: Retrieves a list of all users.<br/><br/>
Access: Requires authentication (auth.isAuthenticated) and admin role.<br/><br/>
Response:
```
[
  {
    "id": "12345",
    "username": "johndoe",
    "email": "johndoe@example.com",
    "role": "user"
  },
  ...
]
```
200 OK: Returns the list of users.<br/>
403 Forbidden: User lacks the admin role.<br/>
<br/><br/>


- GET /admin/user/:id<br/>
Description: Retrieves details of a specific user.<br/><br/>
Access: Requires authentication (auth.isAuthenticated) and admin role.<br/><br/>
Parameters:<br/>
id: User ID.<br/><br/>
Response:
```
{
  "id": "12345",
  "username": "johndoe",
  "email": "johndoe@example.com",
  "role": "user"
}
```
200 OK: Returns user data.<br/>
403 Forbidden: User lacks the admin role.<br/>
<br/><br/>

- PUT /admin/user/:id<br/>
Description: Updates details of a specific user.<br/><br/>
Access: Requires authentication (auth.isAuthenticated) and admin or moderator role.<br/><br/>
Parameters:<br/>
id: User ID.<br/><br/>
Request Body (example):
```
{
  "role": "moderator"
}
```
Response:<br/>
200 OK: User details updated successfully.<br/>
403 Forbidden: User lacks the required role.<br/>
<br/><br/>

- DELETE /admin/user/:id<br/>
Description: Deletes a specific user.<br/><br/>
Access: Requires authentication (auth.isAuthenticated) and admin role.<br/><br/>
Parameters:<br/>
id: User ID.<br/><br/>
Response:<br/>
200 OK: User deleted successfully.<br/>
403 Forbidden: User lacks the admin role.<br/>
<br/><br/>


## Authorization and Authentication

### Authentication
- Users log in using their username and password.
- A JWT token is generated and used for subsequent API requests.

### Authorization

- Middleware checks the user's role and permissions before processing a request:
  ```js
  const authorize = (requiredPermissions) => {
    return (req, res, next) => {
        const userPermissions = req.user.permissions;
        const hasPermission = requiredPermissions.every(p => userPermissions.includes(p));
        if (!hasPermission) return res.status(403).send("Access Denied");
        next();
    };
  };

 


## Future Scope

- Implement hierarchical roles.
- Add UI for managing roles and permissions.

## References
- <a href="https://expressjs.com/">Express.js Documentation</a>
- <a href="https://www.mongodb.com/docs/"> MongoDB Documentation<a/>
- <a href="https://jwt.io/"> JWT Guide</a>





### Environment Variables:
The following environment variables are required:
- MONGODB_URI
- PORT
- JWT_SECRET

## Project Setup

### Prerequisites

- Node.js (v16+)
- MongoDB (local or cloud)
- npm or yarn

### Installation Steps
1. Clone the project from the repository:
   bash
   git clone https://github.com/your-repo.git
   cd your-repo
   
2. Create a .env file. Inside the .env file, add the following environment variables:
   ```
   - MongoDB connection string
   - PORT on which server is listening (4000)
   - JWT_SECRET key```

     
3.   Install the dependencies:
  ``` npm install ```

4. Start the server:
   ``` npm start```



## Conclusion

This backend RBAC system is a robust and scalable solution for managing user authentication and authorization. It enforces secure access control by assigning roles and permissions to users, ensuring that resources are protected based on organizational policies.

By integrating features like middleware-based authorization, modular design, and comprehensive error handling, this project provides a strong foundation for applications requiring controlled access to sensitive data and actions. The API is designed to be easily extendable, allowing the addition of new roles, permissions, or modules with minimal effort.

Future enhancements such as hierarchical roles, detailed audit logs, and integration with frontend interfaces can further improve the system’s capabilities. This project demonstrates the power of RBAC in creating secure and maintainable backend solutions for modern web applications.

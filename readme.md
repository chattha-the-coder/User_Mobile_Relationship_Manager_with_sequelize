UserMobileManagementSystem
A Node.js-based project for managing the relationships between users, their contact details, and associated mobile devices. This system supports CRUD operations, allowing seamless data management and interaction between related entities.

Features
User Management: Create, read, update, and delete users.
Contact Management: Link contacts to users with one-to-one relationships.
Mobile Association: Associate multiple mobiles with users and manage these relationships dynamically.
Database Integration: Uses Sequelize ORM for database interaction.
RESTful API: Well-structured APIs for seamless integration with frontend or external systems.
Table of Contents
Installation
Technologies Used
Database Schema
API Endpoints
Usage
License
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/UserMobileManagementSystem.git  
cd UserMobileManagementSystem  
Install dependencies:

bash
Copy code
npm install  
Set up the database:

Use MySQL or a similar RDBMS.
Update database credentials in the Sequelize configuration file (config/config.js).
Run migrations to create tables:
bash
Copy code
npx sequelize-cli db:migrate  
Start the server:

bash
Copy code
npm start  
Technologies Used
Node.js: Server-side runtime.
Express.js: Framework for building APIs.
Sequelize: ORM for managing database models and relationships.
MySQL: Database system.
Database Schema
Tables and Relationships:
Users Table: Contains user information such as first name and last name.
Contacts Table: Stores contact details linked to users (one-to-one relationship).
Mobiles Table: Stores mobile details.
UserMobiles Table: Junction table for many-to-many relationships between users and mobiles.
API Endpoints
Method	Endpoint	Description
GET	/users	Fetch all users.
GET	/users/:id	Fetch user by ID.
POST	/users	Add a new user.
PATCH	/users/:id	Update user details.
DELETE	/users/:id	Delete a user.
POST	/users/:id/mobiles	Associate mobiles with a user.
GET	/users/:id/details	Get user details with contacts and mobiles.
Usage
Create a new user:

json
Copy code
POST /users  
{  
  "firstName": "John",  
  "lastName": "Doe",  
  "contactData": {  
    "permanent_add": "123 Main St",  
    "current_add": "456 Elm St"  
  },  
  "mobileid": [1, 2]  
}  
Fetch user details:

bash
Copy code
GET /users/1/details  
Update associated mobile details:

json
Copy code
PATCH /users/1/mobiles  
{  
  "mobileid": [3, 4]  
}  

# movies-management

## 🚀 Installation

### Prerequisites
- Node.js (v16 or later)
- PostgreSQL database

### Steps
1. Clone the repository
2. Install dependencies
```bash
npm install
```
   
3. Set up the environment variables: Create a .env file in the root directory
```bash
JWT_SECRET = 'movie-secret'
DATABASE_PORT = '5433'
DATABASE_NAME = 'movies-management'
DATABASE_USERNAME = 'postgres'
DATABASE_PASSWORD = 'admin'
```
   
4. Run database migrations and seeders:
```bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```
5. Start the server:
```bash
npm start
```

## 📚 API Documentation
Visit the Swagger UI at:
```bash
http://localhost:3000/api
```
![image](https://github.com/user-attachments/assets/2852638a-5f27-45bd-b71a-b6f657ecfdbc)


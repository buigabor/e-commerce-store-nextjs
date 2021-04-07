# 🖨️ 3D Printer E-commerce Project

I designed and developed an e-commerce website selling 3D printers and printing materials. 

## ✨ Features

- Catalogue for both printers and materials 📖 
- Shopping cart which stores the products in the cart even after refreshing the page 🛒
- Filter products by different properties 🤏
- Search for a specific product 🔎
- Checkout 🏁
- User authentication system (login, register) 🙎‍♂️
- Edit and delete products for admins ✍️
- REST API 🖥️ 

## 🕹️ Installation

Use the package manager [yarn](https://yarnpkg.com/) to install the dependencies.

```bash
yarn install
```

To run the development server:

```bash
npm run dev
# or
yarn dev
```

## API Routes

#### GET all materials
```bash
/api/materials
```

#### GET a material by id
```bash
/api/materials/1
```

#### GET all printers
```bash
/api/printers
```

#### GET a material by id
```bash
/api/printers/1
```

#### GET user by id
```bash
/api/users/1
```

#### GET user by cookie
```bash
/api/user
```

#### POST Login
```bash
/api/login
```
```bash
 axios.post('/api/login', {username:'', password:'', email:''})
```

#### POST Register
```bash
/api/register
```
```bash
 axios.post('/api/register', {username:'', password:'', email:'', token:''})
```

## 🖥️ Technologies Used

Frontend: Next.js, React, TypeScript, CSS, HTML5, React Context  
Backend: Node.js  
Database: PostgreSQL   
Testing: Cypress, Jest   
Miscellaneous: Emotion, Material UI 
 
## Preview

<img src="/public/previews/preview1.png">
<img src="/public/previews/preview3.png">
<img src="/public/previews/preview2.png">


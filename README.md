# Nurt 🌱

Nurt is a **mini CRM focused on lead capture and nurturing**, built with **Node.js + TypeScript**, following **Vertical Slice Architecture** and strong decoupling principles to support evolution, testing, and infrastructure changes.

---

## 📄 License

This project is open source and licensed under the **MIT License**.

You are free to use, modify, and distribute this software, provided that the original copyright and license notice are included.

See the [`LICENSE`](LICENSE.txt) file for more details.


## 🎯 Project Goals

- Capture leads in a simple and reliable way
- Prevent duplicate lead registrations
- Enable easy evolution through new features
- Keep low coupling with databases and external services
- Serve as a solid foundation for a lightweight CRM

---

## 🧱 Architecture

The project follows **Vertical Slice Architecture**, organizing the code by **features** instead of technical layers.

```text
src/
├── features/
│   └── leads/
│       └── create-lead/
│
├── shared/
│   └── domain/
│
├── config/
│
├── app.ts
└── server.ts
```

## Why Vertical Slice?

* Each feature is fully isolated
* Reduced coupling between business rules
* Easier to test
* Scales better than traditional layered architectures

## 🛠️ Tech Stack

* Node.js
* TypeScript
* Express
* MongoDB (initial persistence, designed to be replaceable)
* Nodemailer (email delivery)
* dotenv (local development only)

## 🚀 Running the project locally

**Prerequisites**

* Node.js (>= 18)
* npm

### 1️⃣ Clone the repository
 
```bash
git clone <REPOSITORY_URL>
cd nurt
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Configure environment variables

```bash
cp .env.example .env
```

⚠️ The .env file must not be committed.

### 4️⃣ Run in development mode

```bash
npm run dev
```

### 5️⃣ Run as local production

```bash
npm run start:local
```
This command builds the project and runs the compiled version.

**The API will be available at:**  
`http://localhost:3000`

## 📦 Available scripts

| Script | Description |
|------|-------------|
| `npm run dev` | Development with hot reload |
| `npm run build` | Compile the project to `/dist` |
| `npm start` | Run the compiled application |
| `npm run start:local` | Build + start (local production) |

## 🌍 Environments

Development: uses .env  
Production: environment variables are injected by infrastructure (Railway, Docker, VPS, CI/CD)  

The project does not use .env files in production.

## 🧪 Testing (planned)

The architecture was designed to support easy unit testing of use cases without database or external service dependencies.  

## 📌 Important conventions

* Feature-based organization
* process.env is accessed only inside src/config
* Features do not depend on database, email, or HTTP frameworks
* Infrastructure concerns live at the edges of the system

## Endpoints

* GET /health

## 🤝 Contributing

Contributions are welcome!  
Feel free to open an issue or pull request to discuss improvements.

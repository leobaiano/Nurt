# Nurt 🌱

Nurt is a mini CRM focused on lead capture and nurturing, built with Node.js + TypeScript, following Vertical Slice Architecture and strong decoupling principles to support evolution, testing, and infrastructure changes.

---

## 📄 License

This project is open source and licensed under the [MIT License](LICENSE.txt).

You are free to use, modify, and distribute this software, provided that the original copyright and license notice are included.

See the LICENSE file for more details.

---

## 🎯 Project Goals

- Capture leads in a simple and reliable way
- Prevent duplicate lead registrations
- Enable easy evolution through new features
- Keep low coupling with databases and external services
- Serve as a solid foundation for a lightweight CRM

---

## 🧱 Architecture

The project follows Vertical Slice Architecture, organizing the code by features instead of technical layers.

Project structure example:

```text
src/
├── features/
│   └── leads/
│       ├── create-lead/
│       └── search-leads/
│
├── shared/
│   ├── domain/
│   └── infra/
│
├── config/
│
├── app.ts
└── server.ts
```

### Why Vertical Slice?

- Each feature is fully isolated
- Business rules do not depend on frameworks
- Use cases are framework-agnostic and easy to test
- Infrastructure can be replaced without affecting domain logic
- Scales better than traditional layered architectures

---

## 🛠️ Tech Stack

- Node.js
- TypeScript
- Express
- MongoDB (initial persistence, designed to be replaceable)
- Zod (input validation)
- dotenv (local development only)

---

## 🚀 Running the project locally

### Prerequisites

- Node.js (>= 18)
- npm

### Clone the repository

git clone <REPOSITORY_URL>
cd nurt

### Install dependencies

npm install

### Configure environment variables

cp .env.example .env

⚠️ The .env file must not be committed.

### Run in development mode

npm run start:dev

### Run as local production

npm run start:local

This command builds the project and runs the compiled version.

The API will be available at:
http://localhost:3000

---

## 📦 Available scripts

`npm run start:dev`  
Development with hot reload

`npm run build`  
Compile the project to /dist

`npm start`  
Run the compiled application

`npm run start:local`  
Build + start (local production)

`npm run test`  
Run all tests with coverage

`npm run test:unit`  
Run unit tests only

`npm run test:integration`  
Run integration tests

`npm run create:feature`  
Scaffold a new feature using the project conventions

---

## 🧪 Testing

The architecture supports fast and isolated unit testing, focusing on business rules and use cases without database or framework dependencies.

Tests are written using Vitest.

To run unit tests:

`npm run test:unit`

Integration tests are also supported for infrastructure validation.

---

## 🩺 Health Check

The project exposes a health endpoint:

GET /health

This endpoint verifies:

- Database connectivity
- Presence of required MongoDB indexes

The system reports ok or degraded status depending on infrastructure readiness.

---

## 🗄️ Database & Indexes

MongoDB is used as the initial persistence layer.

Required indexes (including unique and wildcard indexes) are created automatically during application bootstrap.

Health checks validate their existence to ensure query performance and data integrity.

---

## 🌍 Environments

Development:
Uses .env

Production:
Environment variables are injected by infrastructure (Railway, Docker, VPS, CI/CD)

The project does not rely on .env files in production.

---

## 📌 Important conventions

- Feature-based organization (Vertical Slice)
- process.env is accessed only inside src/config
- Use cases do not depend on HTTP, database, or external services
- HTTP concerns are handled at the application edge
- Infrastructure failures should degrade the system, not crash it
- MongoDB indexes are managed during application startup
- Use cases never return HTTP status codes

---

## 📡 Endpoints

GET /health  
GET /leads/search  
POST /leads  

---

## 🚧 Project status

This project is under active development and is not intended to be production-ready yet.

Its primary goal is to serve as a clean, evolvable foundation for a lightweight CRM and as a reference for applying Vertical Slice Architecture in Node.js.

---

## 🤝 Contributing

Contributions are welcome!  
You can contribute to the project on our GitHub repository:
https://github.com/leobaiano/nurt

### How to contribute

1. Fork the repository  
https://help.github.com/articles/fork-a-repo/

2. Configure your fork locally  
https://help.github.com/articles/configuring-a-remote-for-a-fork/

3. Check the open issues and choose one that is not currently being worked on:  
https://github.com/leobaiano/nurt/issues

4. Create a new branch for your work:
```bash
git checkout -b issue-17
```

5. Make your changes following the project conventions:
- Feature-based organization (Vertical Slice Architecture)
- Clear separation between domain and infrastructure
- Small, focused commits

6. Commit your changes using a clear and meaningful message:
```bash
git commit -m "feat(leads): add search by custom fields"
```

7. Push your branch to your fork:
```bash
git push origin issue-17
```

8. Open a Pull Request:
https://help.github.com/articles/creating-a-pull-request/

---

### Important notes

- If you want to work on something that is not listed in the issues, please create an issue first to avoid duplicated work.
- Keep Pull Requests small and focused whenever possible.
- Feel free to ask questions or request feedback in the issue or PR discussion.

Thanks for contributing and helping Nurt grow 🌱


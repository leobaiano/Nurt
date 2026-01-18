# Nurt 🌱

Nurt is a mini CRM focused on lead capture and nurturing, built with Node.js + TypeScript, following Vertical Slice Architecture and strong decoupling principles to support evolution, testing, and infrastructure changes.

---

## 📄 License

This project is open source and licensed under the MIT License (LICENSE.txt).

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

src/
  features/
    leads/
      create-lead/
      search-leads/
    email/
      send-email/
  shared/
    domain/
    infra/
  config/
  app.ts
  server.ts

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

## 🔐 API Security (CORS + API Key)

This project applies explicit API security controls to prevent unauthorized access in production environments.

Requests are validated using:
- Allowed Origin validation
- API Key (x-api-key header)

More details can be found in the SECURITY.md documentation.

---

## ✉️ Email Sending (Send Email Feature)

Nurt provides a Send Email feature designed to support lead nurturing and transactional communication.

This feature allows clients to trigger email delivery by specifying:
- Destination email address
- Template identifier
- Optional template variables

### Email Provider Strategy

- In development environments, a Fake Email Provider is used.
  - No real emails are sent
  - Useful for local development and automated testing

- In production, the project is configured to use Resend as the email provider.

The email feature is provider-agnostic by design, allowing other email services to be integrated in the future without impacting business logic.

Detailed provider configuration and implementation specifics are intentionally not covered in this README and are documented separately.

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

WARNING: The .env file must not be committed.

### Run in development mode

npm run start:dev

### Run as local production

npm run start:local

This command builds the project and runs the compiled version.

The API will be available at:
http://localhost:3000

---

## 📦 Available scripts

npm run start:dev
Development with hot reload

npm run build
Compile the project to /dist

npm start
Run the compiled application

npm run start:local
Build + start (local production)

npm run test
Run all tests with coverage

npm run test:unit
Run unit tests only

npm run test:integration
Run integration tests

npm run create:feature
Scaffold a new feature using the project conventions

---

## 🧪 Testing

The architecture supports fast and isolated unit testing, focusing on business rules and use cases without database or framework dependencies.

Tests are written using Vitest.

To run unit tests:
npm run test:unit

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
- Uses .env

Production:
- Environment variables are injected by infrastructure (Railway, Docker, VPS, CI/CD)

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

GET  /health  
GET  /leads/search  
POST /leads  
POST /send-email

---

## 🚧 Project status

This project is under active development and is not intended to be production-ready yet.

Its primary goal is to serve as a clean, evolvable foundation for a lightweight CRM and as a reference for applying Vertical Slice Architecture in Node.js.

---

## 🤝 Contributing

Contributions are welcome.

Please read the CONTRIBUTING.md file to learn how to contribute to this project.

If you want to work on something that is not listed in the issues, please create an issue first to avoid duplicated work.

Keep Pull Requests small and focused whenever possible.

Thanks for contributing and helping Nurt grow 🌱

## 🔐 API Security (CORS + API Key)

This project applies explicit API security controls to prevent unauthorized access in production environments.

### Public vs Protected Routes

Routes are divided into public and protected layers:

Route                | Authentication
---------------------|-----------------------------
All other routes     | Protected (API Key required)

This separation is intentional and enforced at the routing level.

---

### 🔑 API Key Authentication

All protected routes require a valid API Key sent via HTTP header.

Header name:
X-API-KEY

Example:
X-API-KEY: your-api-key-here

The API key is validated against an environment variable and is never hardcoded.

---

### 🌍 Origin Validation (CORS)

In addition to the API Key, requests are validated by Origin.

Development / Test:
- localhost is allowed
- Requests from Postman, Insomnia and cURL work normally

Production:
- Only explicitly allowed domains can access the API

Allowed origins are defined using environment variables.

This prevents:
- Unauthorized websites from calling the API via browser
- Abuse through copied frontend requests

---

### 🧱 Why this approach?

This combination ensures:

- No open public endpoints except health check
- Protection against client-side abuse
- Safe usage in browsers and server-to-server calls
- Clear separation of concerns (no conditional logic in middleware)

Security is enforced through route topology, not exceptions.

---

### ⚠️ Important Notes

- The /health endpoint is intentionally public for monitoring and uptime checks
- API Keys must never be exposed in frontend repositories
- In production, API keys should be rotated periodically

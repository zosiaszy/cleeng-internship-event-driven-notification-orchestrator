# Cleeng Internship – Event-Driven Notification Orchestrator

A small event-driven notification service for the Cleeng internship task, built with **Node.js**, **TypeScript**, and **Express**.

It checks if a notification should be sent to a user based on their:
- **Event subscription preferences**
- **"Do Not Disturb" (DND) time window**

All preferences are stored in memory (using a `Map`), no database is used.

---

## ✨ Features

- ✅ Manage user preferences via REST API
- 🕒 Handle "Do Not Disturb" (DND) logic, including cross-midnight cases (e.g., `22:00`–`07:00`)
- ✅ Validate input using [Zod](https://zod.dev)
- ✅ In-memory storage with `Map`
- 🧪 Unit tested (Jest) – especially for time logic

---

## 📁 Project Structure

<pre lang="markdown"><code>
cleeng-internship-event-driven-notification-orchestrator/
│
├── src/
│ ├── controllers/
│ │ ├── events.controller.ts # POST /events
│ │ └── preferences.controller.ts # GET/POST /preferences/:userId
│ ├── utils/
│ │ ├── dnd-check.ts # DND time logic
│ │ └── should-process.ts # Notification decision logic
│ └── index.ts # Main Express app
│
├── tests/
│ ├── dnd.test.ts # Tests for DND logic
│ ├── schema.test.ts # Schema validation tests
│ └── decision.test.ts # shouldProcessNotification tests
│
├── package.json
├── tsconfig.json
├── jest.config.js
├── .gitignore
└── README.md

</code></pre>
---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/zosiaszy/cleeng-internship-event-driven-notification-orchestrator.git
```
```bash
cd cleeng-internship-event-driven-notification-orchestrator
```
### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```
Server will run at: [http://localhost:3000](http://localhost:3000)

### 4. Build 
```bash
npm run build
npm start
```

### 5. Run all tests
```bash
npm run test
```
This project uses **Jest** and **ts-jest** for testing.

---

##  API Endpoints

###  Save User Preferences

**POST** `/preferences/:userId`

```json
{
  "dnd": {
    "start": "22:00",
    "end": "07:00"
  },
  "eventSettings": {
    "item_shipped": { "enabled": true },
    "invoice_generated": { "enabled": false }
  }
}
```

---

### 🔍 Get User Preferences

**GET** `/preferences/:userId`

Example:

[http://localhost:3000/preferences/user123](http://localhost:3000/preferences/user123)

---

### Handle Event

**POST** `/events`

```json
{
  "eventId": "evt_001",
  "userId": "user123",
  "eventType": "item_shipped",
  "timestamp": "2025-07-28T23:00:00Z"
}
```

---

## Response Examples

When notification **should be sent**:

```json
{
  "decision": "PROCESS_NOTIFICATION"
}
```

When user **unsubscribed**:

```json
{
  "decision": "DO_NOT_NOTIFY",
  "reason": "USER_UNSUBSCRIBED_FROM_EVENT"
}
```

When inside **DND time**:

```json
{
  "decision": "DO_NOT_NOTIFY",
  "reason": "DND_ACTIVE"
}
```

---

## 📁 Project Structure

```
cleeng-internship-event-driven-notification-orchestrator/
│
├── src/
│   ├── controllers/
│   │   ├── events.controller.ts          # POST /events
│   │   └── preferences.controller.ts     # GET/POST /preferences/:userId
│   ├── utils/
│   │   ├── dnd-check.ts                  # DND time logic
│   │   └── should-process.ts             # Notification decision logic
│   └── index.ts                          # Main Express app
│
├── tests/
│   ├── dnd.test.ts                       # Tests for DND logic
│   ├── schema.test.ts                    # Schema validation tests
│   └── decision.test.ts                  # shouldProcessNotification tests
│
├── package.json
├── tsconfig.json
├── jest.config.js
├── .gitignore
└── README.md
```

---

## 📌 Notes

- In-memory store only (no DB)
- Full TypeScript setup
- Unit tested
- Follows clean folder structure and RESTful endpoints

## 🙋‍♀️ About the Author

### Built with ❤️ by Zosia Szyposzyńska
### For Cleeng Internship application ;)

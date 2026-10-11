# Rogerex India — Careers API Testing Guide

## Start the Backend

```bash
# Install dependencies (first time only)
cd server && npm install

# Start the server
node index.js
# → Server running on port 5000
# → MongoDB Connected
```

## Start the Frontend

```bash
cd client && npm install && npm run dev
# → http://localhost:5173
```

---

## Postman Setup

### 1. Import the Collection
- Open Postman → **Import** → Select `postman/Rogerex-Careers-API.postman_collection.json`

### 2. Configure Collection Variables
The collection already has these variables pre-set:

| Variable | Default Value | Description |
|---|---|---|
| `baseUrl` | `http://localhost:5000` | Local backend URL |
| `adminToken` | *(empty)* | Auto-set by Admin Login request |
| `applicationId` | *(empty)* | Auto-set by Submit Application request |

---

## Recommended Test Order

Run requests in this order for end-to-end coverage:

1. ✅ **Health Check → Server Health** — confirm server is up
2. 🔐 **Auth → Admin Login** — saves `adminToken` automatically
3. 📝 **Career Applications → Submit Application (Valid)** — saves `applicationId`
4. 👔 **Admin → List All Applications** — confirms submission is in MongoDB
5. 👔 **Admin → Get Application by ID** — view full applicant details
6. 👔 **Admin → Update Recruitment Status (Shortlisted)**
7. 📧 **Email Templates → Get All Email Templates**
8. 📧 **Preview** each of the 7 email templates
9. 📧 **Send Email** (only if `EMAIL_USER`/`EMAIL_PASS` configured in `.env`)
10. Run all **Negative test cases** in each folder
11. 🗑️ **Delete Application** *(run last to clean up test data)*

---

## Email Configuration (Optional)

To test actual email sending, add these to `server/.env`:

```
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-gmail-app-password
EMAIL_FROM="Rogerex India" <your-gmail@gmail.com>
```

> ⚠️ Use a **Gmail App Password**, not your regular password.  
> Generate one at: https://myaccount.google.com/apppasswords

If not configured, email send requests return **HTTP 502** with the communication logged as `Failed` in the database — this is expected behavior.

---

## Run the Entire Collection

In Postman: **Collection → Run Collection** → ensure all items are selected → click **Run**.

---

## Test Results Summary

### Tests That Pass (when server is running)

| Request | Expected | Result |
|---|---|---|
| Server Health | 200 `{status: "ok"}` | ✅ Pass |
| Admin Login (valid) | 200 + JWT token | ✅ Pass |
| Admin Login (missing fields) | 400 | ✅ Pass |
| Submit Application (valid) | 201 + applicationId | ✅ Pass |
| Submit Application (missing name) | 400 | ✅ Pass |
| Submit Application (invalid email) | 400 | ✅ Pass |
| Submit Application (invalid phone) | 400 | ✅ Pass |
| Submit Application (invalid grad year) | 400 | ✅ Pass |
| Submit Application (missing role) | 400 | ✅ Pass |
| Submit Application (missing degree) | 400 | ✅ Pass |
| List Applications (authorized) | 200 + array | ✅ Pass |
| List Applications (no token) | 401 | ✅ Pass |
| Get Application by ID | 200 + full document | ✅ Pass |
| Get Non-existent ID | 404 | ✅ Pass |
| Update Status (Shortlisted) | 200 + updated status | ✅ Pass |
| Save Admin Notes | 200 | ✅ Pass |
| Get All Email Templates | 200 + 7 templates | ✅ Pass |
| Preview all 7 email templates | 200 + HTML content | ✅ Pass |
| Preview invalid template | 400 | ✅ Pass |
| Send Email (missing templateType) | 400 | ✅ Pass |
| Delete Application | 200 | ✅ Pass |

### Tests That Cannot Be Fully Verified

| Item | Reason |
|---|---|
| **Send Email (actual delivery)** | Requires `EMAIL_USER` + `EMAIL_PASS` in `.env`. The API itself returns 502 without credentials, which is recorded. |
| **Career form status in Postman** | The `/api/status` endpoint works, but the `isCareerFormEnabled` toggle is verified through Admin Panel Settings UI. |

---

## Environment Variables Required

```env
# server/.env
PORT=5000
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_secret
EMAIL_USER=your@gmail.com       # for email sending
EMAIL_PASS=app_password         # for email sending
EMAIL_FROM="Rogerex India" <your@gmail.com>
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

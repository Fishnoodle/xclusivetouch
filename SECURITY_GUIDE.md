# Frontend Security & Storage Best Practices ✅

## 🔒 What Frontend Should NEVER Store

### ❌ NEVER Store These:
- **Passwords** - Only send to backend, never save anywhere
- **Confirm Password** - Only use for validation, never send to backend
- **Sensitive Personal Data** - SSN, credit cards, etc.

### ✅ What Frontend CAN Store (After Login)

```javascript
// ✅ After successful login, store these in localStorage:
localStorage.setItem('token', data.token);           // JWT token for authentication
localStorage.setItem('userId', data.user);           // User ID
localStorage.setItem('email', 'user@example.com');   // User's email
```

---

## 📋 Input Validation Rules

### Always Validate BEFORE Sending to Backend

**Email Validation:**
```javascript
// ✅ Check email format
if (!isValidEmail(email)) {
  toast.error('Please enter a valid email address');
  return;
}
```

**Password Validation:**
```javascript
// ✅ Check password strength
const passwordValidation = validatePassword(password);
if (!passwordValidation.isValid) {
  toast.error(passwordValidation.message); // "Password must be at least 8 characters"
  return;
}
```

**Confirm Password:**
```javascript
// ✅ Check passwords match
if (password !== confirmPassword) {
  toast.error('Passwords do not match');
  return;
}
```

---

## 🔐 Using the Token for Protected Requests

### Standard Pattern:

```javascript
const token = localStorage.getItem('token');

const response = await fetch('http://localhost:8001/api/protected-route', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}` // ✅ Always send token like this
  }
});
```

### Example - Get User Profile:
```javascript
async function getUserProfile() {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  
  const response = await fetch(`${API_ENDPOINTS.baseUrl}/api/user/${userId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  const data = await response.json();
  return data;
}
```

---

## ✅ Current Implementation Status

### LoginSection.js
- ✅ **Email Validation**: Checks format before sending
- ✅ **Never Stores Password**: Password only sent to backend
- ✅ **Stores Token**: `localStorage.setItem('token', data.token)`
- ✅ **Stores UserId**: `localStorage.setItem('userId', data.user)`
- ✅ **Stores Email**: `localStorage.setItem('email', email)`
- ✅ **Error Handling**: User-friendly error messages
- ✅ **Unverified Email Detection**: Shows resend option

### RegisterSection.js
- ✅ **Email Validation**: Uses `validateRegistrationForm()`
- ✅ **Password Validation**: Min 8 characters
- ✅ **Confirm Password**: Checks match before sending
- ✅ **Never Stores Password**: Only sends to backend
- ✅ **Never Stores in localStorage**: Redirects to check email page
- ✅ **Error Handling**: Shows validation errors

---

## 🚨 Security Checklist

Use this checklist when working with authentication:

### Registration Flow
- [x] Validate email format on frontend
- [x] Validate password length (min 8 chars)
- [x] Check passwords match
- [x] Only send `{ email, password }` to backend
- [x] Never store password anywhere
- [x] Show clear error messages
- [x] Redirect to verification page

### Login Flow
- [x] Validate email format before sending
- [x] Never store password
- [x] Store token in localStorage after success
- [x] Store userId in localStorage
- [x] Store email in localStorage
- [x] Handle unverified email error
- [x] Clear inputs after successful login

### Protected Routes
- [x] Check if token exists before accessing
- [x] Send token in Authorization header
- [x] Handle expired token (401 error)
- [x] Redirect to login if no token

### Logout
```javascript
function logout() {
  // ✅ Clear all stored data
  localStorage.removeItem('token');
  localStorage.removeItem('xclusiveToken'); // backwards compatibility
  localStorage.removeItem('userId');
  localStorage.removeItem('email');
  
  // Redirect to login
  router.push('/login');
}
```

---

## 📊 Data Flow Summary

### Registration (No Storage)
```
USER enters email/password
    ↓
FRONTEND validates inputs ✅
    ↓
FRONTEND sends { email, password } to /api/register
    ↓
FRONTEND redirects to /check-your-email
    ↓
❌ Nothing stored in localStorage
```

### Login (Store Token + Info)
```
USER enters email/password
    ↓
FRONTEND validates email ✅
    ↓
FRONTEND sends { email, password } to /api/login
    ↓
BACKEND returns { status: 'ok', token: '...', user: '...' }
    ↓
FRONTEND stores:
  ✅ localStorage.setItem('token', data.token)
  ✅ localStorage.setItem('userId', data.user)
  ✅ localStorage.setItem('email', email)
    ↓
USER logged in successfully!
```

### Protected Request
```
FRONTEND gets token from localStorage
    ↓
FRONTEND sends request with Authorization: Bearer {token}
    ↓
BACKEND verifies token
    ↓
BACKEND returns protected data
```

---

## 🎯 Quick Reference

### What to Send to Backend

**Register:**
```javascript
POST /api/register
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Login:**
```javascript
POST /api/login
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Protected Request:**
```javascript
GET /api/protected
Headers: {
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### What Backend Returns

**Register Success:**
```javascript
{
  "status": "ok",
  "message": "Registration successful...",
  "userId": "698c29f0e2826184d0049812"
}
```

**Login Success:**
```javascript
{
  "status": "ok",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": "698c29f0e2826184d0049812"
}
```

**Error:**
```javascript
{
  "status": "error",
  "error": "Please verify your email before logging in..."
}
```

---

## 💡 Best Practices Summary

1. **Never store passwords** - Only send them, never save them
2. **Always validate** - Check inputs before sending to backend
3. **Store tokens securely** - Use localStorage for JWT tokens
4. **Use Authorization header** - Send token as `Bearer {token}`
5. **Handle errors gracefully** - Show user-friendly messages
6. **Clear on logout** - Remove all localStorage data
7. **Check token expiration** - Handle 401 errors by redirecting to login

---

All security best practices are now implemented in XclusiveTouch! ✅

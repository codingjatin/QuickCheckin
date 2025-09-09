# QuickCheck API Documentation (Updated)

This document provides comprehensive documentation for all API routes in the QuickCheck backend application, a digital waitlist and reservation platform.

## Table of Contents
- [Authentication](#authentication)
- [Super Admin](#super-admin)
- [Restaurant Management](#restaurant-management)
- [Booking System](#booking-system)
- [Server-Sent Events (SSE)](#server-sent-events-sse)
- [Health Check](#health-check)
- [Issues and Fixes](#issues-and-fixes)

## Authentication

### Restaurant Admin Authentication
Routes for restaurant administrators to authenticate using OTP-based login.

#### POST /api/restaurant/request-login-otp
Request an OTP for restaurant admin login.

**Request Body:**
```json
{
  "restaurantId": "string",
  "phone": "string"
}
```

**Response (Success - 200):**
```json
{
  "message": "OTP sent successfully to your phone number"
}
```

**Purpose:** Initiates the login process by sending an OTP to the restaurant's registered phone number.

#### POST /api/restaurant/verify-login-otp
Verify the OTP and complete login.

**Request Body:**
```json
{
  "restaurantId": "string",
  "phone": "string",
  "otp": "string"
}
```

**Response (Success - 200):**
```json
{
  "message": "Login successful",
  "restaurant": {
    "id": "string",
    "name": "string",
    "city": "string",
    "email": "string",
    "phone": "string",
    "logo": "string"
  }
}
```

**Purpose:** Validates the OTP and returns restaurant details.

## Super Admin

### Super Admin Authentication
Routes for super administrators to manage the platform.

#### POST /api/super-admin/login
Super admin login with email and password.

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response (Success - 200):**
```json
{
  "message": "Login successful",
  "token": "string",
  "superAdmin": {
    "id": "string",
    "email": "string",
    "phone": "string"
  }
}
```

**Purpose:** Authenticates super admin and returns a JWT token.

#### POST /api/super-admin/request-password-reset-otp
Request OTP for password reset.

**Request Body:**
```json
{
  "email": "string"
}
```

**Response (Success - 200):**
```json
{
  "message": "OTP sent to your registered phone number"
}
```

**Purpose:** Initiates password reset process by sending OTP to super admin's phone.

#### POST /api/super-admin/reset-password-with-otp
Reset password using OTP.

**Request Body:**
```json
{
  "email": "string",
  "otp": "string",
  "newPassword": "string"
}
```

**Response (Success - 200):**
```json
{
  "message": "Password reset successfully"
}
```

**Purpose:** Resets the super admin password after OTP verification.

### Restaurant Management (Super Admin)
Routes for super admins to manage restaurants.

#### GET /api/super-admin/restaurants
Get all restaurants.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (Success - 200):**
```json
{
  "count": "number",
  "restaurants": [
    {
      "id": "string",
      "name": "string",
      "city": "string",
      "email": "string",
      "phone": "string",
      "businessNumber": "string",
      "isActive": "boolean",
      "logo": "string",
      "avgWaitTime": "number",
      "createdAt": "date",
      "createdBy": {
        "email": "string"
      }
    }
  ]
}
```

**Purpose:** Retrieves a list of all restaurants with their details.

#### POST /api/super-admin/restaurants
Add a new restaurant.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "name": "string",
  "city": "string",
  "email": "string",
  "phone": "string",
  "businessNumber": "string"
}
```

**Response (Success - 201):**
```json
{
  "message": "Restaurant added successfully",
  "restaurant": {
    "id": "string",
    "name": "string",
    "city": "string",
    "email": "string",
    "phone": "string",
    "businessNumber": "string",
    "isActive": "boolean",
    "logo": "string",
    "avgWaitTime": "number",
    "createdAt": "date"
  }
}
```

**Purpose:** Creates a new restaurant in the system.

#### PATCH /api/super-admin/restaurants/:restaurantId/toggle-status
Toggle restaurant active status.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Parameters:**
- `restaurantId`: Restaurant ID

**Response (Success - 200):**
```json
{
  "message": "Restaurant activated/deactivated successfully",
  "restaurant": {
    "id": "string",
    "name": "string",
    "isActive": "boolean"
  }
}
```

**Purpose:** Activates or deactivates a restaurant.

#### DELETE /api/super-admin/restaurants/:restaurantId
Delete a restaurant.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Parameters:**
- `restaurantId`: Restaurant ID

**Response (Success - 200):**
```json
{
  "message": "Restaurant deleted successfully"
}
```

**Purpose:** Permanently deletes a restaurant from the system.

## Restaurant Management

### Restaurant Operations
Routes for restaurant admins to manage their operations.

#### GET /api/restaurant/:restaurantId/dashboard
Get restaurant dashboard data.

**Request Body:**
```json
{
  "restaurantId": "string",
  "sessionToken": "string"
}
```

**Parameters:**
- `restaurantId`: Restaurant ID

**Response (Success - 200):**
```json
{
  "restaurant": {
    "name": "string",
    "logo": "string"
  },
  "dashboard": {
    "totalWaiting": "number",
    "availableTables": "number",
    "avgWaitTime": "number"
  },
  "bookings": [
    {
      "id": "string",
      "customerName": "string",
      "customerPhone": "string",
      "partySize": "number",
      "status": "string",
      "waitTime": "number",
      "estimatedSeatingTime": "date",
      "checkInTime": "date"
    }
  ],
  "tables": [
    {
      "id": "string",
      "capacity": "number",
      "quantity": "number",
      "isAvailable": "boolean"
    }
  ]
}
```

**Purpose:** Retrieves current dashboard information including bookings and table status.

#### PUT /api/restaurant/:restaurantId/tables
Update restaurant table configuration.

**Request Body:**
```json
{
  "restaurantId": "string",
  "sessionToken": "string",
  "tables": [
    {
      "capacity": "number",
      "quantity": "number"
    }
  ]
}
```

**Parameters:**
- `restaurantId`: Restaurant ID

**Response (Success - 200):**
```json
{
  "message": "Tables updated successfully"
}
```

**Purpose:** Updates the table configuration for the restaurant.

#### POST /api/restaurant/:restaurantId/logo
Update restaurant logo.

**Content-Type:** `multipart/form-data`

**Request Body:**
```
restaurantId: string
sessionToken: string
logo: file (image)
```

**Parameters:**
- `restaurantId`: Restaurant ID

**Response (Success - 200):**
```json
{
  "message": "Logo updated successfully",
  "logoUrl": "string"
}
```

**Purpose:** Uploads and updates the restaurant logo.

## Booking System

### Public Booking Routes
Routes for customers to create bookings.

#### POST /api/:restaurantId/bookings
Create a new booking.

**Parameters:**
- `restaurantId`: Restaurant ID

**Request Body:**
```json
{
  "customerName": "string",
  "customerPhone": "string",
  "partySize": "number"
}
```

**Response (Success - 201):**
```json
{
  "message": "Booking created successfully",
  "booking": {
    "id": "string",
    "customerName": "string",
    "customerPhone": "string",
    "partySize": "number",
    "waitTime": "number",
    "estimatedSeatingTime": "date"
  }
}
```

**Purpose:** Creates a new booking and sends confirmation SMS to the customer.

#### GET /api/:restaurantId/bookings/:bookingId
Get booking status.

**Parameters:**
- `restaurantId`: Restaurant ID
- `bookingId`: Booking ID

**Response (Success - 200):**
```json
{
  "booking": {
    "id": "string",
    "customerName": "string",
    "partySize": "number",
    "status": "string",
    "waitTime": "number",
    "estimatedSeatingTime": "date",
    "checkInTime": "date",
    "restaurant": {
      "name": "string",
      "logo": "string"
    }
  }
}
```

**Purpose:** Retrieves the current status of a booking.

### SMS Callback
Route for handling SMS responses from customers.

#### POST /api/sms-callback
Handle customer SMS response.

**Request Body:**
```json
{
  "from": "string",
  "body": "string"
}
```

**Response (Success - 200):**
```json
{
  "message": "Customer response processed successfully"
}
```

**Purpose:** Processes customer responses (Y/N) to booking notifications.

### Protected Booking Routes
Routes requiring restaurant admin authentication.

#### POST /api/:restaurantId/bookings/:bookingId/notify
Notify customer that table is ready.

**Request Body:**
```json
{
  "restaurantId": "string",
  "sessionToken": "string"
}
```

**Parameters:**
- `restaurantId`: Restaurant ID
- `bookingId`: Booking ID

**Response (Success - 200):**
```json
{
  "message": "Customer notified successfully"
}
```

**Purpose:** Sends notification SMS to customer when their table is ready.

## Server-Sent Events (SSE)

### SSE Connection
Real-time updates for restaurant dashboards.

#### GET /api/sse/:restaurantId/updates
Establish SSE connection for real-time updates.

**Parameters:**
- `restaurantId`: Restaurant ID

**Response:** Server-Sent Events stream

**Event Types:**
- `connected`: Connection established
- `new_booking`: New booking created
- `booking_update`: Booking status changed
- `table_update`: Table configuration changed

**Purpose:** Provides real-time updates to restaurant admin dashboards.

## Health Check

#### GET /health
Health check endpoint.

**Response (Success - 200):**
```json
{
  "message": "Server is running"
}
```

**Purpose:** Basic health check to verify server status.

## Issues and Fixes

### 1. Removed duplicate restaurant admin authentication routes
- Removed `/api/auth` routes and consolidated restaurant admin authentication under `/api/restaurant`.

### 2. Renamed controller file
- Renamed `restauratController.js` to `restaurantController.js` and updated all imports accordingly.

### 3. Consistent booking route paths
- Updated booking routes to consistently include `restaurantId` in all booking-related paths.

### 4. Authentication middleware consistency
- Ensured all protected routes have proper authentication middleware applied.

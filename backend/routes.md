# API Routes Documentation

## Super Admin Routes

| Endpoint                                      | Description                                  | Request Type | Headers / Body                                                                                   |
|-----------------------------------------------|----------------------------------------------|--------------|------------------------------------------------------------------------------------------------|
| /api/super-admin/login                         | Super Admin login                            | POST         | Body: { email, password }                                                                       |
| /api/super-admin/request-password-reset-otp   | Request OTP for password reset               | POST         | Body: { email }                                                                                 |
| /api/super-admin/reset-password-with-otp      | Reset password with OTP                       | POST         | Body: { email, otp, newPassword }                                                              |
| /api/super-admin/restaurants                   | Get all restaurants                          | GET          | Header: Authorization (Bearer token) required                                                 |
| /api/super-admin/restaurants                   | Add new restaurant                           | POST         | Header: Authorization (Bearer token) required, Body: { name, city, email, phone, businessNumber } |
| /api/super-admin/restaurants/:restaurantId/toggle-status | Toggle restaurant active status              | PATCH        | Header: Authorization (Bearer token) required                                                 |
| /api/super-admin/restaurants/:restaurantId    | Delete restaurant                            | DELETE       | Header: Authorization (Bearer token) required                                                 |

## Restaurant Admin Routes

| Endpoint                                      | Description                                  | Request Type | Headers / Body                                                                                   |
|-----------------------------------------------|----------------------------------------------|--------------|------------------------------------------------------------------------------------------------|
| /api/restaurant/request-login-otp              | Restaurant login - request OTP                | POST         | Body: { phone, role } (role: 'admin' or 'guest')                                              |
| /api/restaurant/verify-login-otp               | Restaurant login - verify OTP                 | POST         | Body: { phone, role, otp }                                                                     |
| /api/restaurant/:restaurantId/dashboard         | Get restaurant dashboard data                 | GET          | Body: { restaurantId, sessionToken }                                                           |
| /api/restaurant/:restaurantId/tables            | Update restaurant tables configuration        | PUT          | Body: { restaurantId, sessionToken, tables: [{ capacity, quantity }] }                          |
| /api/restaurant/:restaurantId/logo              | Update restaurant logo                        | POST         | Body: { restaurantId, sessionToken }, Multipart form-data: logo image                           |

## Restaurant Guest Routes

| Endpoint                                      | Description                                  | Request Type | Headers / Body                                                                                   |
|-----------------------------------------------|----------------------------------------------|--------------|------------------------------------------------------------------------------------------------|
| /api/:restaurantId/bookings                     | Create a booking                             | POST         | Body: { customerName, customerPhone, partySize }                                              |
| /api/:restaurantId/bookings/:bookingId          | Get booking status                           | GET          | No authentication required                                                                   |
| /api/sms-callback                               | Handle customer response (SMS callback)     | POST         | Body: { from, body } (from Twilio)                                                             |

## Booking Management Routes

| Endpoint                                      | Description                                  | Request Type | Headers / Body                                                                                   |
|-----------------------------------------------|----------------------------------------------|--------------|------------------------------------------------------------------------------------------------|
| /api/:restaurantId/bookings/:bookingId/notify   | Notify customer that table is ready          | POST         | Body: { restaurantId, sessionToken }                                                           |

## Real-time Updates Routes

| Endpoint                                      | Description                                  | Request Type | Headers / Body                                                                                   |
|-----------------------------------------------|----------------------------------------------|--------------|------------------------------------------------------------------------------------------------|
| /api/sse/:restaurantId/updates                 | Server-Sent Events (SSE) connection endpoint | GET          | No authentication required                                                                   |

## Health Check Route

| Endpoint                                      | Description                                  | Request Type | Headers / Body                                                                                   |
|-----------------------------------------------|----------------------------------------------|--------------|------------------------------------------------------------------------------------------------|
| /health                                       | Health check endpoint                        | GET          | No authentication required                                                                   |

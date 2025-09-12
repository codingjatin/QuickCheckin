# Auth Token Fix - TODO

## Completed Tasks
- [x] Identified issue: Auth token saved in sessionStorage ('qc_sa_token') but restaurants page looks in localStorage ('token' or 'preftech_token')
- [x] Updated app/(super)/super-admin/auth/page.tsx to save token to both sessionStorage and localStorage
- [x] Verified the change saves token under 'token' key in localStorage for restaurants page compatibility

## Next Steps
- [ ] Test the fix: Sign in to super admin and navigate to /super-admin/restaurants to confirm no "Missing auth token" error
- [ ] For production security: Consider migrating to HttpOnly cookies instead of localStorage for better security

## Notes
- The fix maintains backward compatibility by saving to both sessionStorage and localStorage
- Restaurants page now can retrieve the token from localStorage as expected
- In production, prioritize moving to secure HttpOnly cookies set by the backend

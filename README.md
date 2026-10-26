# Dog Dash Care — initial web app

Mobile-first web app for dog profiles, recurring care reminders, and care history.

## Files
- `index.html`: app UI and Supabase integration
- `manifest.json`: installable PWA metadata
- `sw.js`: basic app-shell caching (not a push notification scheduler)
- `icon.svg`: app icon

## Deploy on GitHub Pages
1. Upload all files in this folder to the root of `dog-dash-care` repository.
2. In GitHub, open **Settings → Pages**.
3. Choose **Deploy from a branch**, select `main` and `/(root)`, then Save.
4. Wait for deployment. Site should appear at `https://dogdashride.github.io/dog-dash-care/`.

## Supabase setup
The app is configured with the project URL and publishable key supplied by the owner.
The database tables and RLS policies should already exist. Ensure the `public` schema and tables are exposed to the Data API in Supabase settings if the client reports a schema/table error.
For sign-up confirmation, set the app URL under Supabase Authentication URL Configuration and allow the GitHub Pages URL as a redirect URL.

## Important limitations of this initial version
- User registration/login, dog profiles, reminders, care history, and WhatsApp links are implemented.
- Vet clinic directory is empty until real clinic records are added.
- This version does NOT yet send scheduled push notifications while the app is closed. Browser notification permission alone does not schedule server-delivered reminders. A secure backend scheduler and Web Push subscription storage/delivery must be implemented and tested before relying on notifications.
- This version is a starter implementation and needs real-device testing before public launch.
- Never add Supabase secret/service-role keys to frontend files. Only the publishable key belongs in browser code; access must be controlled by RLS.

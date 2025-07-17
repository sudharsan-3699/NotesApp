Personal Notes App
------------------

A simple full-stack notes application:

- Backend: Django + Django REST Framework
- Web App: React + TypeScript
- Mobile App: Expo (React Native + TypeScript)

Features:
- Create, view, edit, and delete notes with title, content, and optional tags
- Fast API syncing for both web and mobile

Getting Started
---------------

1. Backend (Django)
   - Go to the 'notes_backend' folder
   - Start the backend on your network with:
       python manage.py runserver 0.0.0.0:8000
   - Ensure CORS and ALLOWED_HOSTS are set for development

2. Web App (React)
   - In 'personal-notes-app/src/api.ts', set the API_BASE to your computer’s LAN IP (e.g., http://192.168.x.x:8000/api)
   - Install dependencies and run:
       npm install
       npm start

3. Mobile App (Expo)
   - In 'personal-notes-expo/utils/api.ts', set API_BASE to the SAME LAN IP as above (http://192.168.x.x:8000/api)
   - Install dependencies and run:
       npm install
       npx expo start
   - Launch with Expo Go (ensure phone and computer are on the same Wi-Fi)

IMPORTANT - API Address
-----------------------
The API address (API_BASE) for both web and mobile apps MUST MATCH your computer's LAN IP and should NOT be set as 'localhost'.  
Example:
    export const API_BASE = 'http://192.168.x.x:8000/api';

This allows both web and mobile apps to connect to the backend when on the same Wi-Fi.

Project Structure
-----------------
/notes_backend         - Django backend project
/personal-notes-app    - React + TypeScript web frontend
/personal-notes-expo   - Expo + React Native mobile app

Don't forget to update the API address if your network or computer changes!

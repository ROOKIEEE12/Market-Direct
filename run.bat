@echo off
echo Starting Nirbhaye Project...

start cmd /k "cd server && npm run dev"
start cmd /k "cd client && npm run dev"

echo Server and Client are starting in separate windows.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5174 (or 5173)

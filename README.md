# Real-Time Location Tracker Using Socket.IO & Leaflet.js

This is a simple real-time location tracking web application that displays the live position of multiple users on a map. Each user’s location is broadcast using **Socket.IO**, and visualized using **Leaflet.js** on the frontend.

---

##  Technologies Used
- Node.js
- Express.js
- Socket.IO
- Leaflet.js
- HTML/CSS/JS
- EJS Templating

---

##  Project Structure
realtimetracker/
│
├── app.js # Main server file
├── package.json # Project metadata and dependencies
│
├── views/
│ └── index.ejs # Main UI page
│
├── public/
│ ├── js/
│ │ └── script.js # Frontend JS (location, map, socket)
│ └── css/
│ └── style.css # Styling

-----

## Features
- Tracks each user's location in real time
- Displays all active users with separate markers
- Removes the user's marker on disconnect
- Automatically updates user position
- Built-in socket handling with unique `socket.id`s

--

## How to  Run
1.Install Dependecies
npm install

2.Start the server
node app.js

3.Test in Browser
Open tab on localhost:3000
Allow geolocation access


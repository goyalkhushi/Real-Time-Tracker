//Set options for high accuracy , a5-second time out (which means it send new coordinates every 5 seconds) and maximum age of 0 seconds (which means it will give us new coordinates after 5 seconds because earlier coordinates are invalid) and no caching
// exit the latitude and longitude via a socket  with "send-location"
// Initialize coordinates (0, 0) with zoom level .ADD street map tiles
// when receiving location data via socket,extract id,latitude and longitude
// update postion if marker exist,

const socket = io(); //send connection request to server

if(navigator.geolocation){
    navigator.geolocation.watchPosition(
        (position)=>{
        const{latitude,longitude}=position.coords;

        socket.emit("send-location", {latitude,longitude});
        },
        (error)=>{
            console.error("Error getting location:", error);
        },
        {
            enableHighAccuracy:true,
            maximumAge:0,
            timeout:5000 //5 seconds
        }
    );
}

const map = L.map("map").setView([0,0],10);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
    attribution:"OpenStreetMap"
}).addTo(map)

// const markers={};

// socket.on("receive-location", (data) => {
//     const{id,latitude,longitude}=data;
//     map.setView([latitude,longitude],16);
//     if(markers[id]){
//         markers[id].setLatLng([latitude,longitude]); //set longitude latitude
//     }
//     else{
//         markers[id] = L.marker([latitude,longitude]).addTo(map); //add marker to map
//     }
// });


const markers = {};
let myId = null;

socket.on("connect", () => {
    myId = socket.id;
});

socket.on("receive-location", (data) => {
    const { id, latitude, longitude } = data;
    if (markers[id]) {
        markers[id].setLatLng([latitude, longitude]);
    } else {
        markers[id] = L.marker([latitude, longitude]).addTo(map);
    }
    // Only center map for your own location
    if (id === myId) {
        map.setView([latitude, longitude], 16);
    }
});
socket.on("user-disconnect", (id) => {
   if(markers[id]){
    map.removeLayer (markers[id]); //remove marker from map
  delete markers[id]; //delete marker from markers object
   }
});
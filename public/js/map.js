

    let mapToken = mytoken;
    console.log(mapToken)
  const key = mapToken;

  const map = L.map('map').setView([19.0760, 72.8777], 10);

  L.tileLayer(`https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=${key}`, {
    attribution: '&copy; MapTiler & OpenStreetMap contributors'
  }).addTo(map);

  console.log(cordinate)
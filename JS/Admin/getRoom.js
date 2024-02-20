const baseUrl = "http://localhost:5022/Room";

async function fetchRoom() {
  try {
    const response = await fetch(baseUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const rooms = await response.json();

    rooms.map(getRoom);
    console.log(rooms);

    return rooms;
  }
  catch (error) {
    console.log(error);
  }
}

fetchRoom();

var itemContainer = document.getElementById("roomsContainer");

debugger;
function getRoom(item) {
  debugger;
  var html = `<div class="d-flex justify-content-evenly flex-wrap mt-3">

    <div class="card shadow-lg card mb-5" style="width: 18rem">
      <img src="${item.filePath}" class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">${item.roomType}</h5>
        <p class="card-text">${item.description}</p>
        <p class="card-text">Rs. ${item.price}</p>
      </div>

      <div class="card-body">
        <a href="/HTML/Firms/room.html">
        <button type="button" class="btn btn-info">Find More</button>
      </a>
      </div>
    </div>
  </div>`;

  itemContainer.innerHTML += html;

  // itemContainer.appendChild(content);
}

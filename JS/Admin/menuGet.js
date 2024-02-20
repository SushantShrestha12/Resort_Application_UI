// ---------------------------------------Menu--------------------------------------

const baseUrl = "http://localhost:5022/Menu";

async function fetchMenu() {
  try {
    const response = await fetch(baseUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const foodItems = await response.json();

    foodItems.map(getFoodItem);
    console.log(foodItems);
    //console.log(data);
    return foodItems;
  } catch (error) {
    console.log(error);
  }
}

var itemContainer = document.getElementById("menuitems-container");

function getFoodItem(item) {
  debugger;
  var html = `<div class="col">
  <div class="card shadow-lg p-3 mb-5 bg-body-tertiary rounded" style="width: 18rem;">
    <img src="${item.filePath}" class="card-img-top">
    <div class="card-body ">
      <h5 class="card-title">${item.foodName}</h5>
      <p class="card-text">${item.description}</p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Price: Rs. ${item.price}</li>
    </ul>
    <div class="form-check">
       <input class="form-check-input mx-1" type="checkbox" id="${item.foodName}">
       <label class="form-check-label" for="flexCheckDefault_${item.foodName}">
         Add Order
      </label>
     </div>

     <div class="quantity-container" id="quantity-container_${item.foodName}" style="display:none;">
        <label for="quantity">Quantity:</label>
        <div class = "col-8">
          <input type="number" class="form-control mx-4 quantity" id="quantity_${item.foodName}" aria-describedby="basic-addon3 basic-addon4" onblur="addOrder('${item.foodName}', this)">
         </div>
     </div>
    </div>
  </div>`;

  var tempContainer = document.createElement('div');
  tempContainer.innerHTML = html;
debugger;
  var checkbox = tempContainer.querySelector(`#${item.foodName}`);
  var quantityContainer = tempContainer.querySelector(`#quantity-container_${item.foodName}`);
  var quantity = tempContainer.querySelector(`#quantity_${item.foodName}`);

  checkbox.addEventListener("change", function () {
    handleCheckboxChange(item, quantityContainer, quantity);
  });

  itemContainer.appendChild(tempContainer.firstChild);
}

fetchMenu();


// -----------------------------------------Dropdown Change--------------------------------------
var orders = [];

function handleCheckboxChange(item, quantityContainer, quantity) {

  const checkbox = document.querySelector(`#${item.foodName}`);
  if (checkbox.checked) {
    quantityContainer.style.display = "block";
  } else if (!checkbox.checked) {
    quantity.value = "";
    quantityContainer.style.display = "none";
  }
}

function addOrder(id, el) {
  debugger;
  var existingOrderIndex = orders.findIndex(order => order.id === id);

  if (existingOrderIndex !== -1) {
    orders[existingOrderIndex].quantity = el.value;
  } else {
    var newOrder = {
      id: id,
      quantity: el.value
    };
    orders.push(newOrder);
  }
}


// --------------------------------------Save Order Button--------------------------------
document.getElementById("saveOrderBtn").addEventListener("click", async function (event) {
  event.preventDefault();
  console.log(orders);

  var bookingId = selectedCustomerId;

  await fetchBooking(url);
  try {
    const response = await fetch(baseUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch menu data');
    }

    const foodItems = await response.json();
    
    for (const selectedOrder of orders) {
      const selectedFoodItem = foodItems.find(item => item.foodName === selectedOrder.id);

      const order = {
        bookingId: bookingId,
        foodName: selectedFoodItem.foodName,
        description: selectedFoodItem.description,
        price: selectedFoodItem.price,
        quantity: selectedOrder.quantity,
      };

      const postUrl = `http://localhost:5022/Orders/${bookingId}`;
      const postResponse = await fetch(postUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      if (!postResponse.ok) {
        throw new Error(`Failed to post order for ${order.foodName}`);
      }
      else {
        alert("Added Successfully.");
      }

      const resData = await postResponse.json();
      console.log(resData);
    }
  } catch (err) {
    console.error(err);
  }
});

// ------------------------------------Fetching Booking Data-----------------------------
const url = "http://localhost:5022/Bookings";

async function fetchBooking(apiUrl) {
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// --------------------------------To create dropdown-------------------------------
async function dropdownOptions() {
  const bookings = await fetchBooking(url);
  const dropdown = document.getElementById("dropdown-menu");

  bookings.forEach((booking) => {
    const options = `<li class="dropdown-item" data-id="${booking.id}">${booking.name}</li>`;
    dropdown.insertAdjacentHTML("beforeend", options);
  });

  dropdown.addEventListener("click", handleDropdownClick);
}

dropdownOptions();

let selectedCustomerId;

function handleDropdownClick(event) {
  const selectedCustomer = event.target;
  selectedCustomerId = selectedCustomer.dataset.id;

  console.log(selectedCustomerId);

  const dropdownButton = document.getElementById("select-Customer");
  dropdownButton.textContent = selectedCustomer.textContent;

  return selectedCustomerId;
}

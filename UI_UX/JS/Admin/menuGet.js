const baseUrl = `http://localhost:5022/Menu`;

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
  var html = `<div class="col">
  <div class="card" style="width: 18rem;">
    <img src="${item.filePath}" class="card-img-top">
    <div class="card-body">
      <h5 class="card-title">${item.foodName}</h5>
      <p class="card-text">${item.description}</p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Price: Rs. ${item.price}</li>
    </ul>
    <div class="form-check">
       <input class="form-check-input mx-1" type="checkbox" id="flexCheckDefault_${item.foodName}">
       <label class="form-check-label" for="flexCheckDefault_${item.foodName}">
         Add Order
      </label>
     </div>
     <div class="quantity-container" id="quantity-container_${item.foodName}" style="display:none;">
     <label for="quantity">Quantity:</label>
     <input type="number" id="quantity" name="quantity" min="1">
   </div>
    </div>
  </div>`;

  var tempContainer = document.createElement('div');
  tempContainer.innerHTML = html;

  var checkbox = tempContainer.querySelector(`#flexCheckDefault_${item.foodName}`);
  var quantityContainer = tempContainer.querySelector(`#quantity-container_${item.foodName}`);

  checkbox.addEventListener("change", function () {

    if (checkbox.checked) {
      quantityContainer.style.display = "block";
    } else {
      quantityContainer.style.display = "none";
    }
  });

  itemContainer.appendChild(tempContainer.firstChild);

  debugger;
  document.getElementById("saveOrderBtn").addEventListener("click", async function (event) {
    event.preventDefault();

    const order = {
      bookingId: "f7244abd-f54c-4e52-8122-f54397aa1dec",
      foodName: item.foodName,
      price: item.price,
      quantity: item.quantity,
    }

    try {
      const baseUrl = `http://localhost:5022/Orders/${bookingId}`;
      res = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(order),
      });

      const resData = await res.json();
      console.log(resData);
    }
    catch (err) {
      console.error(err);
    }
  });
}

fetchMenu();




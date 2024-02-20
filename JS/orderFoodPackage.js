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

        
        foodItems.map(getBreakfastItem);
        foodItems.map(getLunchItem);
        foodItems.map(getSnackItem);
        foodItems.map(getDinnerItem);
        
        addGrandTotalRow(grandTotal);


        return foodItems;
    } catch (error) {
        console.log(error);
    }
}

var breakfastContainer = document.getElementById("breakfast-container");

function getBreakfastItem(item) {
    if (item.foodCategory == 0) {
        var html = `   
            <td>
            <h5>${item.foodName}</h5>
            </td>
            
            <td>
            <li class="list-group-item">Rs. ${item.price}</li>
            </td>

            <td>
             <div class="quantity-container" id="quantity-container_${item.foodName}">
                <input
                type="number"
                class="form-control quantity"
                id="quantity_${item.foodName}"
                aria-describedby="basic-addon3 basic-addon4"
                data-itemname = "${item.foodName}"
                data-rate = "${item.price}"
                
                />
            </div>
            </td>
    `;

        var tableRow = document.createElement('tr');
        tableRow.innerHTML = html;

        var quantity = tableRow.querySelector(`#quantity_${item.foodName}`);
        quantity.addEventListener("change", function () {
            var orderQuantity = parseInt(this.value);
            var rate = parseInt(this.dataset.rate);
            var name = this.dataset.itemname;

            var item = {
                foodName: name,
                quantity: orderQuantity,
                price: rate
            };
            addOrder(item, rate, orderQuantity);

            //handleQuanitiyChange(item, quantity, grandTotal);
        });

        var breakfastTable = document.getElementById("breakfastTable");
        breakfastTable.appendChild(tableRow);
    }
}


var lunchContainer = document.getElementById("lunch-container");
function getLunchItem(item) {
    if (item.foodCategory == 1) {
        var html = ` 
            <td>
            <h5>${item.foodName}</h5>
        
            </td>
            <td>
            <li class="list-group-item">Rs. ${item.price}</li>
            </td>

            <td>
            <div class="quantity-container" id="quantity-container_${item.foodName}">
                <input
                type="number"
                class="form-control quantity"
                id="quantity_${item.foodName}"
                aria-describedby="basic-addon3 basic-addon4"
                data-itemName = "${item.foodName}"
                data-rate = "${item.price}"
                
                />
            </div>
            </td>
    `;

        var tableRow = document.createElement('tr');
        tableRow.innerHTML = html;
    
        var quantity = tableRow.querySelector(`#quantity_${item.foodName}`);

        quantity.addEventListener("change, blur", function () {
            var orderQuantity = this.value;
            var rate = this.data("rate");
            var name = this.data("itemName");
            addOrder(name, rate, orderQuantity);

            //handleQuanitiyChange(item, quantity, grandTotal);
        });

        var breakfastTable = document.getElementById("lunchTable");
        breakfastTable.appendChild(tableRow);
    }
}

var snackContainer = document.getElementById("snack-container");
function getSnackItem(item) {
    if (item.foodCategory == 2) {
        var html = `   
            <td>
            <h5>${item.foodName}</h5>
            </td>
            <td>
            <li class="list-group-item">Rs. ${item.price}</li>
            </td>

            <td>
            <div class="quantity-container" id="quantity-container_${item.foodName}">
                <input
                type="number"
                class="form-control quantity"
                id="quantity_${item.foodName}"
                aria-describedby="basic-addon3 basic-addon4"
                data-itemName = "${item.foodName}"
                data-rate = "${item.price}"
                
                />
            </div>
            </td>
    `;

        var tableRow = document.createElement('tr');
        tableRow.innerHTML = html;
    
        var quantity = tableRow.querySelector(`#quantity_${item.foodName}`);

        console.log(quantity);

        quantity.addEventListener("change, blur", function () {
            console.log("triggered");
            var orderQuantity = this.value;
            var rate = this.data("rate");
            var name = this.data("itemName");
            addOrder(name, rate, orderQuantity);

            //handleQuanitiyChange(item, quantity, grandTotal);
        });

        var breakfastTable = document.getElementById("snackTable");
        breakfastTable.appendChild(tableRow);
    }
}

var dinnerContainer = document.getElementById("dinner-container");
function getDinnerItem(item) {
    if (item.foodCategory == 3) {
        var html = `   
            <td>
            <h5>${item.foodName}</h5>
            </td>
            <td>
            <li class="list-group-item">Rs. ${item.price}</li>
            </td>

            <td>
            <div class="quantity-container" id="quantity-container_${item.foodName}">
                <input
                type="number"
                class="form-control quantity"
                id="quantity_${item.foodName}"
                aria-describedby="basic-addon3 basic-addon4"
                data-itemName = "${item.foodName}"
                data-rate = "${item.price}"
                
                />
            </div>
            </td>
    `;

        var tableRow = document.createElement('tr');
        tableRow.innerHTML = html;

        var quantity = tableRow.querySelector(`#quantity_${item.foodName}`);

        quantity.addEventListener("change, blur", function () {
            var orderQuantity = this.value;
            var rate = this.data("rate");
            var name = this.data("itemName");
            addOrder(name, rate, orderQuantity);

            //handleQuanitiyChange(item, quantity, grandTotal);
        });

        var breakfastTable = document.getElementById("dinnerTable");
        breakfastTable.appendChild(tableRow);
    }
}

fetchMenu();

// -----------------------------------------Dropdown Change--------------------------------------
var orders = [];

function handleQuanitiyChange(item, quantity, grandTotal) {
    console.log(item, quantity, grandTotal);
    if (quantity > 0) {
        billTablePopulate(item, quantity);
    } else {
        var uncheckedRow = document.getElementById(`billRow_${item.foodName}`);
        if(uncheckedRow){
            var removedTotal = (uncheckedRow.querySelector('td:nth-child(5) p').textContent);
            grandTotal -= removedTotal;

            console.log(removedTotal, grandTotal);
            quantity.value = "";
            uncheckedRow.remove();
            updateGrandTotal(grandTotal);
        }
    }
}

function addOrder(item, rate, orderQuantity)
{
    handleQuanitiyChange(item, orderQuantity, rate*orderQuantity);
}

// function addOrder(id, el) {
//     var existingOrderIndex = orders.findIndex(order => order.id === id);

//     if (existingOrderIndex !== -1) {
//         orders[existingOrderIndex].quantity = el.value;
//     } else {
//         var newOrder = {
//             id: id,
//             quantity: el.value
//         };
//         orders.push(newOrder);
//     }
// }

// --------------------------------------Bill Table Populate--------------------------------
var grandTotal = 0;
var serialNumber = 0;
function billTablePopulate(item, actualQuantity){
    var total = actualQuantity * item.price;
    grandTotal += total;

    serialNumber++;

    var html = `   
            <td>
            <p> ${serialNumber} </p>
            </td>

            <td>
                <p>${item.foodName}</p>
            </td>

            <td>
                <p> Rs. ${item.price} </p>
            </td>

            <td>
                <p> ${actualQuantity} </p>
            </td>

            <td> 
               <p> ${actualQuantity * item.price} </p>
            </td>
    `;

    // var billTable = "";
    // const sn = /%sn%/g;
    // const particulars = /%particulars%/g;
    // const rate = /%rate%/g;
    // const quantity = /%quantity%/g;
    // const gTotal = /%total%/g;

    // var template = document.getElementById("orderBill").innerHTML;
    // template = template.replace(sn, "1");
    // template = template.replace(particulars, item.foodName);
    // template = template.replace(rate, item.price);
    // template = template.replace(quantity, actualQuantity);
    // template = template.replace(gTotal, total)

    // billTable += template;

    var tableRow = document.createElement("tr");
    tableRow.id = `billRow_${item.foodName}`;
    tableRow.innerHTML = html;

    var tableContainer = document.getElementById("billTable");
    billTable.insertBefore(tableRow, tableContainer.lastChild);

    updateGrandTotal(grandTotal);
}

// --------------------------------------Grandtotal--------------------------------------
function addGrandTotalRow(grandTotal) {
    var grandTotalRow = document.createElement("tr");
    grandTotalRow.id = "grandTotal";
    grandTotalRow.innerHTML = `
            <td scope="row"></td>
            <td colspan="3">Grand Total</td>
            <td id="total"><strong>Rs. ${grandTotal}</strong></td>
    `;

    var tableContainer = document.getElementById("billTable");
    tableContainer.appendChild(grandTotalRow);
}

function updateGrandTotal(grandTotal) {
    var total = document.getElementById("total");
    total.textContent = `Rs. ${grandTotal}`;
}

// --------------------------------------Save Order Button--------------------------------
document.getElementById("saveOrderBtn").addEventListener("click", async function (event) {
    event.preventDefault();
    console.log(orders);

    var bookingId = localStorage.getItem("bookingId");

    debugger;
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
                localStorage.clear("bookingId");
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
var deluxeQuantity = document.querySelector('#deluxeQuantity');
document.getElementById('deluxeIncrement').addEventListener('click', function () {
  deluxeQuantity.value = parseInt(deluxeQuantity.value) + 1;
});


document.getElementById('deluxeDecrement').addEventListener('click', function () {
  if (parseInt(deluxeQuantity.value) > 1) {
    deluxeQuantity.value = parseInt(deluxeQuantity.value) - 1;
   
  }
});

var premiumQuantity = document.querySelector('#premiumQuantity');
document.getElementById('premiumIncrement').addEventListener('click', function () {
  premiumQuantity.value = parseInt(premiumQuantity.value) + 1;
});

document.getElementById('premiumDecrement').addEventListener('click', function () {
  if (parseInt(premiumQuantity.value) > 1) {
    premiumQuantity.value = parseInt(premiumQuantity.value) - 1;
  }
});

var suiteQuantity = document.querySelector('#suiteQuantity');
document.getElementById('suiteIncrement').addEventListener('click', function () {
  suiteQuantity.value = parseInt(suiteQuantity.value) + 1;
});

document.getElementById('suiteDecrement').addEventListener('click', function () {
  if (parseInt(suiteQuantity.value) > 1) {
    suiteQuantity.value = parseInt(input.value) - 1;
  }
});

document.getElementById('adultIncrement').addEventListener('click', function () {
  var input = document.querySelector('#adultQuantity');
  input.value = parseInt(input.value) + 1;
});

document.getElementById('adultDecrement').addEventListener('click', function () {
  var input = document.querySelector('#adultQuantity');
  if (parseInt(input.value) > 1) {
    input.value = parseInt(input.value) - 1;
  }
});

document.getElementById('childrenIncrement').addEventListener('click', function () {
  var input = document.querySelector('#childrenQuantity');
  input.value = parseInt(input.value) + 1;
});

document.getElementById('childrenDecrement').addEventListener('click', function () {
  var input = document.querySelector('#childrenQuantity');
  if (parseInt(input.value) > 1) {
    input.value = parseInt(input.value) - 1;
  }
});

var deluxeCheckbox = document.getElementById("deluxeCheckbox");
var quantityInput = document.getElementById("deluxeQuantity");
var roomType = document.getElementById("roomType");
deluxeCheckbox.addEventListener("change", function () {
  if (deluxeCheckbox.checked) {
    updateQuantity();
    quantityInput.addEventListener("input", updateQuantity);
    localStorage.setItem("Deluxe", deluxeQuantity.value);
  } else {
    quantityInput.removeEventListener("input", updateQuantity);
    roomType.textContent = "Room Type";
  }
});

function updateQuantity() {
  var quantity = quantityInput.value;
  roomType.textContent = quantity + " Deluxe Room";
}

var premiumCheckbox = document.getElementById("premiumCheckbox");
var premiumQuantity = document.getElementById("premiumQuantity");
premiumCheckbox.addEventListener("click", function () {
  if (premiumCheckbox.checked) {
    var quantity = premiumQuantity.value;
    localStorage.setItem("Premium", quantity);
  }
});


  var suiteCheckbox = document.getElementById("suiteCheckbox");
  var suiteQuantity = document.getElementById("suiteQuantity");
  suiteCheckbox.addEventListener("click", function() {
    if(suiteCheckbox.checked)
    {
        var quantity = suiteQuantity.value;
        localStorage.setItem("Suite", quantity);
    }
  });



$(".dropdown-menu").on("click", function (e) {
  e.stopPropagation();
});
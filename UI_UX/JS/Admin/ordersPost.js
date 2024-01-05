// var checkbox = document.getElementById("quantity-checkbox");
// var quantityContainers = document.querySelectorAll(".quantity-container");

// checkbox.addEventListener("click", function () {
//     quantityContainers.forEach(function (container) {
//             container.style.display = checkbox.checked ? 'block' : 'none';
//     });
// });


// document.getElementById("saveBtn").addEventListener("click", async function(event){
//     event.preventDefault();

//     // let bookingId = document.getElementById("bookingId").value;
//     // let foodName = 
//     // let price = document.getElementById("price").value;
//     // let quantity = document.getElementById("quantity").value;

//     if(checkbox.checked)
//     {
//         var foodName = document.querySelector('h3').innerText;
//         console.log(foodName);        
//     }

//     const order = {
//         bookingId: bookingId,
//         foodName: foodName,
//         price: price,
//         quantity: quantity,
//     }

//     try {
//         const baseUrl = `http://localhost:5022/Orders/${bookingId}`;
//         res = await fetch (baseUrl, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },

//             body: JSON.stringify(order),
//         });

//         const resData = await res.json();
//         console.log(resData);
//     }
//     catch(err){
//         console.error(err);
//     }
// });











// function toggleQuantityContainer(checkbox){
//     console.log(checkbox);
//     var quantityContainer = checkbox.parentNode.querySelector(".quantity-container");
//     quantityContainer.style.display = checkbox.checked ? "block" : "none";
//     console.log(checkbox.checked ? 'true' : 'false');
// }

const orderUrl = `http://localhost:5022/Orders/${bookingId}`;

async function getOrderDetails(apiUrl) {

    try {
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function orderTablePopulate(){
    const orderTable = document.getElementById("orderTable").getElementsByTagName("tbody")[0];

    const order = await getOrderDetails(orderUrl);

    // order.forEach((order) => {
        // orderTable.insertAdjacentHTML("beforeend", createRow(order));
    // });
debugger;
    if (Array.isArray(order)) {
        order.forEach((order) => {
            orderTable.insertAdjacentHTML("beforeend", createRow(order));
        });
    } else if (order) {
        orderTable.insertAdjacentHTML("beforeend", createRow(order));
    } else {
        console.error("Error fetching order details");
    }
}

orderTablePopulate();

function createRow(order){
    return (
        "<tr>" +

        "<td>" + order.foodName + "</td>" +

        "<td>" + order.price + "</td>" +

        "<td>" + order.quantity + "</td>" +

        "<td>" + order.total + "</td>" +

        "</tr>"
    );
}
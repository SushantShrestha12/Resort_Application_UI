async function fetchOrderDetails(bookingId) {
    const apiUrl = `http://localhost:5022/Orders/${bookingId}`;

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

async function tablePopulate(bookingId) {
    const table = document.getElementById("orderTable").getElementsByTagName("tbody")[0];
    const order = await fetchOrderDetails(bookingId);

    order.forEach((order) => {
        table.insertAdjacentHTML("beforeend", CreateRow(order));
    });


}

tablePopulate(bookingId);


function CreateRow(order) {
    return (
        "<tr>" +
        "<td>" + order.foodName + "</td>" +
        "<td>" + order.price + "</td>" +
        "<td>" + order.quantity + "</td>" +
        "<td>" + order.total + "</td>" +
        "</tr>"
    );
}


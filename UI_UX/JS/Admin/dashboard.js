const baseUrl = "http://localhost:5022/Bookings";

async function fetchData(apiUrl) {
    try {
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        return data;
    }

    catch (error) {
        console.error(error);
        return [];
    }
}

async function tablePopulate() {
    const table = document.getElementById("customerTable").getElementsByTagName("tbody")[0];

    const booking = await fetchData(baseUrl);

    booking.forEach((booking) => {
        table.insertAdjacentHTML("beforeend", CreateRow(booking));
    });
}

tablePopulate();

document
    .getElementById("saveBtn")
    .addEventListener('click', async function () {
        debugger;

        var selectedStatus = document.getElementById("statusDropdown").value;
        if (selectedStatus == "Pending") {
            selectedStatus = 0
        }

        else if (selectedStatus == "Cancelled") {
            selectedStatus = 1
        }

        else if (selectedStatus == "Checked in") {
            selectedStatus = 2
        }

        else if (selectedStatus == "Paid") {
            selectedStatus = 3
        }

        const response = await fetchData(baseUrl, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(
                {
                    bookingId: "0074d29c-77a6-4396-9f4d-7bb2222891f5",
                    bookingStatus: selectedStatus
                }),
        });

        console.log(response);
    });


function CreateRow(customer) {
    if (customer.bookingStatus == 0) {
        customer.bookingStatus = "Pending";

    }
    else if (customer.bookingStatus == 1) {
        customer.bookingStatus = "Cancelled";
    }
    else if (customer.bookingStatus == 2) {
        customer.bookingStatus = "Checked In"
    }
    else if (customer.bookingStatus == 3) {
        customer.bookingStatus = "Paid"
    }

    const name= `<a href="/HTML/Admin/status.html?bookingId=${customer.id}" onclick="fetchBookingDetails('${customer.id}')">${customer.name}</a>`;
    return (
        "<tr>" + 
        
        "<td>" + name + "</td>" +

        "<td>" + customer.phoneNumber + "</td>" +

        "<td>" + customer.adults + "</td>" +

        "<td>" + customer.children + "</td>" +

        "<td>" + customer.checkin + "</td>" +

        "<td>" + customer.checkout + "</td>" +

        "<td>" + customer.bookingStatus + "</td>" +

        "</tr>"
    );
}
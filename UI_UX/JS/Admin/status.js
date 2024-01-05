const urlParams = new URLSearchParams(window.location.search);
const bookingId = urlParams.get('bookingId');
const baseUrl = "http://localhost:5022/Bookings";

async function fetchOrderDetails(bookingId) {
    const apiUrl = `http://localhost:5022/Bookings/${bookingId}`;

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

const fieldMappings = {
    name: "Name",
    adults: "Adults",
    children: "Children",
    phoneNumber: "Phone Number",
    checkin: "Check-in Date",
    checkout: "Check-out Date",
    bookingStatus: "Booking Status",
    id: "ID"
};



var statusOptions = ["Pending", "Cancelled", "Checked in", "Paid"];
var statusDropdown = "<select id='statusDropdown'>";

for (var i = 0; i < statusOptions.length; i++) {
    statusDropdown += "<option value='" + statusOptions[i] + "'>" + statusOptions[i] + "</option>";
}

function getCurrentDate() {
    debugger;
    var date = new Date();

    var year = date.getFullYear();
    var month = (date.getMonth() + 1).toString().padStart(2, "0");
    var day = date.getDate().toString().padStart(2, "0");

    var checkinTime = year + "-" + month + "-" + day;

    document.createElement("p");

    document.getElementsByTagName("p").innerHTML = checkinTime;

    return checkinTime;
}


async function tablePopulate(bookingId) {
    const container = document.getElementById("detailsContainer");
    var list = document.createElement("ul");

    debugger;
    const bookingDetails = await fetchOrderDetails(bookingId);
    // console.log(bookingDetails);

    for (var i in bookingDetails) {
        var fieldName = fieldMappings[i];

        var listItem = document.createElement("li");
        listItem.textContent = fieldName + ": " + bookingDetails[i];
        list.appendChild(listItem);

        if (i == "checkin") {
            listItem.innerHTML = fieldName + ": " + "";
        }

        if (i == "checkout") {
            listItem.innerHTML = fieldName + ": " + "";
        }

        // debugger;
        if (i == "bookingStatus") {
            listItem.innerHTML = fieldName + ": " + statusDropdown;
        }

        if (i == "id") {
            listItem.innerHTML = "";
        }
    }
    container.appendChild(list);


    // table.insertAdjacentHTML("beforeend", CreateRow(bookingDetails));
}

tablePopulate(bookingId);


async function updateBookingStatus(bookingId, selectedStatus, checkinDate, checkoutDate) {
    const apiUrl = `http://localhost:5022/Bookings/${bookingId}`;

    const requestBody = {
        status: selectedStatus,
    };

    if (checkinDate !== null) {
        requestBody.checkin = checkinDate;
    }

    if (checkoutDate !== null) {
        requestBody.checkout = checkoutDate;
    }

    try {
        const response = await fetch(apiUrl, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),

        });

        return response;
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Save Button
document
    .getElementById("saveBtn")
    .addEventListener('click', async function () {
        var selectedStatus = document.getElementById("statusDropdown").value;
        console.log(selectedStatus);

        if (selectedStatus == "Pending") {
            selectedStatus = 0;
            await updateBookingStatus(bookingId, selectedStatus, null, null);

        }

        else if (selectedStatus == "Cancelled") {
            selectedStatus = 1;
            await updateBookingStatus(bookingId, selectedStatus, null, null);
        }

        else if (selectedStatus == "Checked in") {
            selectedStatus = 2;

            var checkinDateElement = document.querySelector('#detailsContainer li:nth-child(5)');
            if (checkinDateElement) {
                checkinDate = getCurrentDate();
                checkinDateElement.textContent = "Check-in Date: " + checkinDate;
                await updateBookingStatus(bookingId, selectedStatus, checkinDate, null);
            }
        }

        else if (selectedStatus == "Paid") {
            selectedStatus = 3;

            var checkinDateElement = document.querySelector('#detailsContainer li:nth-child(6)');
            if (checkinDateElement) {
                checkoutDate = getCurrentDate();
                var checkoutDate = checkinDateElement.textContent = "Check-out Date: " + checkoutDate;
                await updateBookingStatus(bookingId, selectedStatus, null, checkoutDate);
            }
        }

        // const response = await updateBookingStatus(bookingId, selectedStatus, checkinDate, checkoutDate);
        // console.log(response);
    });

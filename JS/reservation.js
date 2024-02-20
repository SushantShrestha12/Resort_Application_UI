window.onload = function () {
    document.getElementById('adults').value = localStorage.getItem('adults');
    document.getElementById('children').value = localStorage.getItem('children');
    document.getElementById('roomType').value = localStorage.getItem('roomType');
    document.getElementById('checkin').value = localStorage.getItem('checkin');
    document.getElementById('checkout').value = localStorage.getItem('checkout');
};

var currentDate = new Date();

document
    .getElementById("reserveBtn")
    .addEventListener('click', async function (event) {
        event.preventDefault();
        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let phone = document.getElementById("phone").value;
        let adults = document.getElementById("adults").value;
        let children = document.getElementById("children").value;
        let roomType = document.getElementById("roomType").value;
        let checkin = document.getElementById("checkin").value;
        let checkout = document.getElementById("checkout").value;

        if (!name || !email || !phone || !adults || !children || !roomType || !checkin || !checkout) {
            window.alert("All fields are required.");
            return;
        }
    
        if (name.length < 3) {
            window.alert("Enter a valid username with at least 3 characters.");
            return;
        }

        if(phone.length < 10)
        {
            window.alert("Enter a valid phone number.");
            return;
        }

        if(adults < 0 || children < 0)
        {
            window.alert("Enter proper quantity.");
            return;
        }

        cIn = new Date(checkin);
        if(cIn < currentDate)
        {
            checkin = checkin.Date;
            window.alert("Enter a valid date.");
            return;
        }

        if(checkout < checkin)
        {
            window.alert("Enter a valid checkout date.")
            return;
        }

    
        if (roomType == 0) {
            roomType = "Standard";
        } else if (roomType == 1) {
            roomType = "Deluxe";
        } else if (roomType == 2) {
            roomType = "Suite";
        }

        const booking = {
            name: name,
            email: email,
            phone: phone,
            adults: adults,
            children: children,
            roomTypes: roomType,
            checkin: checkin,
            checkout: checkout,
        };

        let res;

        try {
            const baseUrl = "http://localhost:5022/Bookings";
            res = await fetch(baseUrl, {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(booking),
            });

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

               const resData = await res.json();
               console.log(resData);
        }
        catch (err) {
            console.error("Error", err);     
           }
    });
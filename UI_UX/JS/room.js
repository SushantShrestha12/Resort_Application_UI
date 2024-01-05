const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};

var currentDate = new Date();

document
    .getElementById("bookBtn")
    .addEventListener('click', async function (event) {
        event.preventDefault();

        let name = document.getElementById("name").value;
        let phone = document.getElementById("phone").value;
        let adults = document.getElementById("adults").value;
        let children = document.getElementById("children").value;

        let dates = document.getElementById("daterange-check").value;
        let date = dates.split("-");

        let checkin = date[0].trim();
        let checkout = date[1].trim();

        if (!name || !phone || !adults || !children || !checkin || !checkout) {
            window.alert("All fields are required.");
            return;
        }

        if (name.length < 3) {
            window.alert("Enter a valid username with at least 3 characters.");
            return;
        }



        if (adults < 0 || children < 0) {
            window.alert("Error! It can't be in negative.");
            return;
        }

        const booking = {
            name: name,
            phoneNumber: phone,
            adults: adults,
            children: children,
            checkin: formatDate(checkin),
            checkout: formatDate(checkout),
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

            console.log(res);
            const resData = await res.json();
            console.log(resData);
        }
        catch (err) {
            console.error("Error", err);
        }
    });
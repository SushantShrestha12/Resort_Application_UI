window.onload = function() {
    document.getElementById('adults').value = localStorage.getItem('adults');
    document.getElementById('children').value = localStorage.getItem('children');
    document.getElementById('room').value = localStorage.getItem('room');
    document.getElementById('checkin').value = localStorage.getItem('checkin');
    document.getElementById('checkout').value = localStorage.getItem('checkout');
};

document
    .getElementById("reserveBtn")
    .addEventListener('click', async function()
{
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let adults = document.getElementById("adults").value;
    let children = document.getElementById("children").value;
    let room = document.getElementById("room").value;
    let checkin = document.getElementById("checkin").value;
    let checkout = document.getElementById("checkout").value;

    const booking = { 
        name: name, 
        email: email, 
        phone: phone,
        adults: adults,
        children: children,
        room: room,
        checkin: checkin,
        checkout: checkout
    };

    try{
        const baseUrl = "https://localhost:7207/Bookings";
        const res = await fetch(baseUrl, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(booking),
        });

        if (res.ok) {
            const resData = await res.json();
            console.log(resData);
        } else {
            console.error('Error:', res.status, res.statusText);
        }

    //    const resData = await res.json();
    //    console.log(resData);
    }
    catch (err)
    {
        console.error(err);
    }
});
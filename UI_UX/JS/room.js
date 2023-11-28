document.getElementById('.bookBtn').addEventListener('click', function() {
    let adults = document.getElementById("adults").value;
    let children = document.getElementById("children").value;
    let roomType = document.getElementById("room").value;
    let checkInDate = document.getElementById("checkin").value;
    let checkOutDate = document.getElementById("checkout").value;

    localStorage.setItem('adults', adults);
    localStorage.setItem('children', children);
    localStorage.setItem('room', roomType);
    localStorage.setItem('checkin', checkInDate);
    localStorage.setItem('checkout', checkOutDate);
});


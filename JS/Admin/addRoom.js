document
    .getElementById("addItemBtn")
    .addEventListener("click", async function (event) {
        event.preventDefault();

        let roomType = document.getElementById("roomType").value;
        let description = document.getElementById("description").value;
        let price = document.getElementById("price").value;
        let fileInput = document.getElementById("inputGroupFile02");
        let file = fileInput.files[0];
debugger;
        const menu = new FormData();
        menu.append("roomType", roomType);
        menu.append("description", description);
        menu.append("price", price);
        menu.append("file", file);

        try {
            const baseUrl = "http://localhost:5022/Room"
            const res = await fetch(baseUrl, {
                method: "POST",
                body: menu,
            });

            const resData = await res.json();
            console.log(resData);


            alert("Added Successfully");

        } catch (err) {
            console.error(err);
        }
    });

let selectedCategory = "";

const dropdownItems = document.querySelectorAll("#dropdown-menu .dropdown-item");
const dropdownButton = document.getElementById("select-category");

dropdownItems.forEach(function(dropdownItem) {
  dropdownItem.addEventListener("click", function() {
    selectedCategory = this.textContent;
    dropdownButton.textContent = selectedCategory;
  });
});

document
    .getElementById("addItemBtn")
    .addEventListener("click", async function (event) {
        event.preventDefault();

        if(selectedCategory == "Breakfast")
        {
            selectedCategory = 0;
        }
        else if (selectedCategory == "Lunch")
        {
            selectedCategory = 1;
        }
        else if(selectedCategory == "Snack")
        {
            selectedCategory = 2;
        }
        else if(selectedCategory == "Dinner")
        {
            selectedCategory = 3;
        }

debugger;
        let foodName = document.getElementById("foodName").value;
        let description = document.getElementById("description").value;
        let price = document.getElementById("price").value;
        let foodCategory = selectedCategory;
        let fileInput = document.getElementById("inputGroupFile02");
        let file = fileInput.files[0];

        const menu = new FormData();
        menu.append("foodName", foodName);
        menu.append("description", description);
        menu.append("price", price);
        menu.append("foodCategory", foodCategory);
        menu.append("file", file);

        try {
            const baseUrl = "http://localhost:5022/Menu"
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



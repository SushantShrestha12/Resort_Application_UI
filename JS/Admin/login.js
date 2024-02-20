const baseUrl = "http://localhost:5022/Login"




document
    .getElementById("loginBtn")
    .addEventListener("click", async function (event) {
        event.preventDefault();

        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;

        const login = {
            username: username,
            password: password
        }


        debugger;
        try {
            const loginResponse = await fetch(baseUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(login),
            });
            const resData = await loginResponse.json();
            console.log(resData);
            if (resData == true) {
                window.location.href = "/HTML/Admin/dashboard.html";
            }
        }
        catch (err) {
            console.error(err);
        }

    });


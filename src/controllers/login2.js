export default () => {
    const loginpag = `<div class="login">
    <h2>Registrar-se</h2>
    <form id="formRegistre">
        <div class="container">
            <div id="logins">
                <label for="email"><b>Username</b></label>
                <input type="text" placeholder="Enter Username" name="email" required />

                <label for="password"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="password" required />

                <button type="submit">Login</button>
                <label>
        <input type="checkbox" checked="checked" name="remember" />
        Remember me
      </label>
            </div>

            <div class="container" style="background-color: #f1f1f1">
                <button type="button" class="cancelbtn">Cancel</button>
                <span class="psw">Forgot <a href="#">password?</a></span>
            </div>
    </form>
    </div>
    <div class="login">
        <h2>Entrar</h2>
        <form id="formLogin">
            <div class="container">
                <input type="text" placeholder="Enter Username" name="email" required />

                <label for="password"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="password" required />

                <button type="submit">Login</button>
                <label>
        <input type="checkbox" checked="checked" name="remember" />
        Remember me
      </label>
            </div>

            <div class="container" style="background-color: #f1f1f1">
                <button type="button" class="cancelbtn">Cancel</button>
                <span class="psw">Forgot <a href="#">password?</a></span>
            </div>
        </form>
    </div>
</div>
<div id="contents">
    <div id="user"></div>
    <button id="obtindre">Obtindre</button>
    <div id="resultats"></div>
</div>`;
    const divElement = document.createElement('div');
    divElement.innerHTML = loginpag;

    document.addEventListener("DOMContentLoaded", () => {
        let resultats = document.querySelector("#resultats");
        let user = document.querySelector("#user");

        if (localStorage.getItem("idToken")) {
            user.innerHTML = `Logged: ${localStorage.getItem("email")}`;
        }

        // Enviar registre d'usuaris
        document
            .querySelector("#formRegistre")
            .addEventListener("submit", function(event) {
                // Primer a formData, despres a objecte i despres a JSON
                // fromEntries funciona perquè formData és un iterable
                let datosFormData = new FormData(this);
                let objecteFormData = Object.fromEntries(datosFormData);
                objecteFormData.returnSecureToken = true;
                delete objecteFormData.remember;
                let datos = JSON.stringify(objecteFormData);
                console.log(datos);
                event.preventDefault();
                //console.log(this);
                fetch(
                        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD8hfH8YVdrzF4LkhLi4q5lKhVludOeG_k", {
                            method: "post",
                            headers: {
                                "Content-type": "application/json; charset=UTF-8",
                            },
                            body: datos,
                        }
                    )
                    .then((response) => {
                        if (response.ok) return response.json();
                        // else throw Error(response.statusText);
                        else {
                            return response.json().then((text) => {
                                console.log(text);
                                throw new Error(text.error.message);
                            });
                        }
                    })
                    .then((datos) => {
                        resultats.innerHTML = JSON.stringify(datos);
                        console.log(datos);
                    })
                    .catch((error) => {
                        console.error("Error;", error);
                        resultats.innerHTML = error;
                    });
            });

        /// Login  //////////////

        document
            .querySelector("#formLogin")
            .addEventListener("submit", function(event) {
                // Primer a formData, despres a objecte i despres a JSON
                // fromEntries funciona perquè formData és un iterable
                let datosFormData = new FormData(this);
                let objecteFormData = Object.fromEntries(datosFormData);
                objecteFormData.returnSecureToken = true;
                delete objecteFormData.remember;
                let datos = JSON.stringify(objecteFormData);
                console.log(datos);
                event.preventDefault();
                //console.log(this);
                fetch(
                        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD8hfH8YVdrzF4LkhLi4q5lKhVludOeG_k", {
                            method: "post",
                            headers: {
                                "Content-type": "application/json; charset=UTF-8",
                            },
                            body: datos,
                        }
                    )
                    .then((response) => {
                        if (response.ok) return response.json();
                        // else throw Error(response.statusText);
                        else {
                            return response.json().then((text) => {
                                console.log(text);
                                throw new Error(text.error.message);
                            });
                        }
                    })
                    .then((datos) => {
                        resultats.innerHTML = JSON.stringify(datos);
                        user.innerHTML = `Login: ${datos.email}`;

                        localStorage.setItem("idToken", datos.idToken);
                        localStorage.setItem("email", datos.email);

                        console.log(datos);
                    })
                    .catch((error) => {
                        console.error("Error;", error);
                        resultats.innerHTML = error;
                    });
            });

    });
    return divElement;
};
import view from '../views/login.html'

export default () => {
    const loginPage = document.createElement('div');
    loginPage.innerHTML = view;

    loginPage
        .querySelector("#formLogin")
        .addEventListener("submit", function(event) {

            let datosFormData = new FormData(this);
            let objecteFormData = Object.fromEntries(datosFormData);
            objecteFormData.returnSecureToken = true;
            delete objecteFormData.remember;
            let datos = JSON.stringify(objecteFormData);
            console.log(datos);
            event.preventDefault();

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

                    else {
                        return response.json().then((text) => {
                            console.log(text);
                            throw new Error(text.error.message);
                        });
                    }
                })
                .then((datos) => {

                    localStorage.setItem("idToken", datos.idToken);
                    localStorage.setItem("email", datos.email);

                    console.log(datos);
                })
                .catch((error) => {
                    console.error("Error;", error);

                });
        });
    return loginPage;
};
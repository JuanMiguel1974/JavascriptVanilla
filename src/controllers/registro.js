import view from '../views/registro.html'

export default () => {
    const registroPage = document.createElement('div');
    registroPage.innerHTML = view;

    let user = registroPage.querySelector("#user");

    if (localStorage.getItem("idToken")) {
        user.innerHTML = `Logged: ${localStorage.getItem("email")}`;
    }

    registroPage
        .querySelector("#formRegistre")
        .addEventListener("submit", function(event) {

            let datosFormData = new FormData(this);
            let objecteFormData = Object.fromEntries(datosFormData);
            objecteFormData.returnSecureToken = true;
            delete objecteFormData.remember;
            let datos = JSON.stringify(objecteFormData);
            console.log(datos);
            event.preventDefault();
            console.log(this);
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
                    else {
                        return response.json().then((text) => {
                            console.log(text);
                            throw new Error(text.error.message);
                        });
                    }
                })
        });
    return registroPage;
};
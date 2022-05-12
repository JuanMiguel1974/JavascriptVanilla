import view from '../views/estadios.html'
export default () => {

    const estadiosPage = document.createElement('div');
    estadiosPage.innerHTML = view;

    const url = "https://futbol-7727b-default-rtdb.firebaseio.com/estadios";

    function encodeImageFileAsURL(element) {
        var file = element.files[0];
        var reader = new FileReader();
        reader.onloadend = function() {
            console.log("RESULT", reader.result);
            element.imagen = reader.result;
        };
        reader.readAsDataURL(file);
    }

    estadiosPage.querySelector("#crear").addEventListener("click", function(event) {
        event.preventDefault();
        let estdioNuevo = {
            nombre: estadiosPage.querySelector("#nombre").value,
            aforo: estadiosPage.querySelector("#aforo").value,
            imagen: estadiosPage.querySelector("#imagen").value,
            ciudad: estadiosPage.querySelector("#ciudad").value,
            pais: estadiosPage.querySelector("#pais").value,
        };
        console.log(estdioNuevo);

        fetch(url + ".json", {
                method: "post",
                headers: { "Content-type": "application/json; charset=UTF-8" },
                body: JSON.stringify(estdioNuevo),
            })
            .then((response) => response.json())
    });
    return estadiosPage;
}
export default () => {
    const estadiosPage = ` 
    <div id="estadios"></div>
    <form method="post" enctype=multipart/form-data>
      <label for="nombre">Nombre</label> <input type="text" id="nombre" name="nombre" />
      <label for="ciudad">Ciudad</label><input type="text" id="ciudad" name="ciudad" />
      <label for="imagen">Imagen</label><input type="file" id="imagen" name="imagen" /><br><br>
      <label for="aforo">Aforo</label><input type="number" id="aforo" name="aforo" /><br><br>
      <label for="pais">Pais</label><input type="text" id="pais" name="pais" /><br><br>
      <button id="crear">Crear</button>
    </form>
    
    `;

    const url = "https://futbol-7727b-default-rtdb.firebaseio.com/estadios.json";

    let estadios = [];

    async function firebaseEstadios() {
        await fetch(url + ".json")
            .then((response) => response.json())
            .then((datos) => {
                console.log(datos);
                for (let key in datos) {
                    datos[key].id = key;
                    productes.push(datos[key]);
                }
                let divEstadios = document.querySelector("#estadios");
                divEstadios.innerHTML = "";
                estadios.map((p) => {
                    let divEstadio = document.createElement("div");
                    divEstadio.innerHTML = `<h2>${e.nombre}</h2><img src="${e.imagen}"/><p>${e.aforo}</p><p>${e.ciudad}</p><p>${e.pais}</p>`;
                    divEstadios.append(divEstadio);
                });
            });
    }

    const divElement = document.createElement('div');
    divElement.innerHTML = estadiosPage;

    function encodeImageFileAsURL(element) {
        var file = element.files[0];
        var reader = new FileReader();
        reader.onloadend = function() {
            console.log("RESULT", reader.result);
            element.imagen = reader.result;
        };
        reader.readAsDataURL(file);
    }

    document.addEventListener("DOMContentLoaded", () => {
        firebaseEstadios();
        document.querySelector("#imagen").addEventListener("change", function() {
            encodeImageFileAsURL(this);
        });
        document.querySelector("#crear").addEventListener("click", function(event) {
            event.preventDefault();
            let estdioNuevo = {
                nombre: document.querySelector("#nombre").value,
                aforo: document.querySelector("#aforo").value,
                imagen: document.querySelector("#imagen").imagen,
                ciudad: document.querySelector("#ciudad").imagen,
                pais: document.querySelector("#pais").imagen,
            };
            console.log(estdioNuevo);

            fetch(url + ".json", {
                    method: "post",
                    headers: { "Content-type": "application/json; charset=UTF-8" },
                    body: JSON.stringify(estdioNuevo),
                })
                .then((response) => response.json())
                .then((datos) => {
                    firebaseEstadios();
                });
        });
    });

    return divElement;
}
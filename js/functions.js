var segundoParcialRecu;
(function (segundoParcialRecu) {
    window.addEventListener("load", function () {
        var botonAgregar = document.getElementById("id-botonAgregar");
        var botonEliminar = document.getElementById("id-botonEliminar");
        var botonLimpiar = document.getElementById("id-botonLimpiar");
        var botonPromedio = document.getElementById("id-calcularPromedio");
        var idCount = 0;
        var id = document.getElementById("id-id");
        var nombre = document.getElementById("id-nombre");
        var apellido = document.getElementById("id-apellido");
        var edad = document.getElementById("id-edad");
        var sexo = document.getElementById("id-sexo");
        var checkBoxId = document.getElementById("id-checkBoxId");
        var checkBoxNombre = document.getElementById("id-checkBoxNombre");
        var checkBoxApellido = document.getElementById("id-checkBoxApellido");
        var checkBoxEdad = document.getElementById("id-checkBoxEdad");
        var columnId = document.getElementById("id-thId");
        var columnNombre = document.getElementById("id-thNombre");
        var columnApellido = document.getElementById("id-thApellido");
        var columnEdad = document.getElementById("id-thEdad");
        var trSeleccionado = null;
        var filtro = document.getElementById("id-filtrar");
        var promedioEdad = document.getElementById("id-promedioEdad");
        var tcuerpo = document.getElementById("tcuerpo");
        var arrayClientes = new Array();
        botonEliminar.addEventListener("click", eliminarFila);
        botonAgregar.addEventListener("click", agregarCliente);
        botonLimpiar.addEventListener("click", limpiarTabla);
        filtro.addEventListener("change", filtrarPor);
        botonPromedio.addEventListener("click", calcularPromedio);
        checkBoxId.addEventListener("change", filtroColumnas);
        checkBoxNombre.addEventListener("change", filtroColumnas);
        checkBoxApellido.addEventListener("change", filtroColumnas);
        checkBoxEdad.addEventListener("change", filtroColumnas);
        function agregarCliente() {
            calcularId();
            console.log(sexo.value);
            if (sexo.value == "Femenino" || sexo.value == "Masculino") {
                var cliente = new segundoParcialRecu.Cliente(idCount, nombre.value, apellido.value, edad.value, sexo.value);
                arrayClientes.push(cliente);
            }
            else {
                return;
            }
            refrescarTabla(arrayClientes);
            limpiarContenedor();
        }
        function generarRow(item) {
            var row = document.createElement("tr");
            row.addEventListener("dblclick", traerFila);
            var tdId = document.createElement("td");
            var textId = document.createTextNode(item.id.toString());
            tdId.appendChild(textId);
            if (!checkBoxId.checked) {
                tdId.hidden = true;
            }
            var tdNombre = document.createElement("td");
            var textNombre = document.createTextNode(item.nombre);
            tdNombre.appendChild(textNombre);
            if (!checkBoxNombre.checked) {
                tdNombre.hidden = true;
            }
            var tdApellido = document.createElement("td");
            var textApellido = document.createTextNode(item.apellido);
            tdApellido.appendChild(textApellido);
            if (!checkBoxApellido.checked) {
                tdApellido.hidden = true;
            }
            var tdEdad = document.createElement("td");
            var textEdad = document.createTextNode(item.edad.toString());
            tdEdad.appendChild(textEdad);
            if (!checkBoxEdad.checked) {
                tdEdad.hidden = true;
            }
            var tdSexo = document.createElement("td");
            var textSexo = document.createTextNode(item.sexo);
            tdSexo.appendChild(textSexo);
            row.appendChild(tdId);
            row.appendChild(tdNombre);
            row.appendChild(tdApellido);
            row.appendChild(tdEdad);
            row.appendChild(tdSexo);
            tcuerpo.appendChild(row);
        }
        function traerFila(event) {
            trSeleccionado = event.target.parentNode; //tr
            var filaHijos = trSeleccionado.childNodes;
            id.value = filaHijos[0].childNodes[0].textContent;
            nombre.value = filaHijos[1].childNodes[0].textContent;
            apellido.value = filaHijos[2].childNodes[0].textContent;
            edad.value = filaHijos[3].childNodes[0].textContent;
            if (filaHijos[4].childNodes[0].textContent == "Masculino") {
                sexo.value = "Masculino";
            }
            else if (filaHijos[4].childNodes[0].textContent == "Femenino") {
                sexo.value = "Femenino";
            }
        }
        function limpiarContenedor() {
            nombre.value = "";
            apellido.value = "";
            edad.value = "";
        }
        function refrescarTabla(array) {
            tcuerpo.innerHTML = '';
            array.forEach(function (cliente) { generarRow(cliente); });
        }
        function eliminarFila(event) {
            event.preventDefault();
            tcuerpo.removeChild(trSeleccionado);
            arrayClientes.forEach(function (item) {
                if (item.id == Number(id.value)) {
                    arrayClientes.splice(arrayClientes.indexOf(item), 1);
                }
            });
            console.log(arrayClientes);
        }
        function limpiarTabla() {
            tcuerpo.innerHTML = '';
            arrayClientes = new Array();
        }
        function calcularId() {
            var idMayor = arrayClientes.map(function (item) {
                return item.id;
            }).reduce(function (mayor, num) {
                if (num > mayor) {
                    mayor = num;
                }
                return mayor;
            }, 0);
            idCount = idMayor + 1;
        }
        function filtrarPor() {
            if (filtro.value == "Masculino") {
                var arrayFiltrado = arrayClientes.filter(function (item) {
                    return item.sexo.toString() == "Masculino";
                });
                refrescarTabla(arrayFiltrado);
            }
            else if (filtro.value == "Femenino") {
                var arrayFiltrado = arrayClientes.filter(function (item) {
                    return item.sexo.toString() == "Femenino";
                });
                refrescarTabla(arrayFiltrado);
            }
            else {
                refrescarTabla(arrayClientes);
            }
        }
        function filtroColumnas() {
            if (!checkBoxId.checked) {
                columnId.hidden = true;
            }
            else {
                columnId.hidden = false;
            }
            if (!checkBoxNombre.checked) {
                columnNombre.hidden = true;
            }
            else {
                columnNombre.hidden = false;
            }
            if (!checkBoxApellido.checked) {
                columnApellido.hidden = true;
            }
            else {
                columnApellido.hidden = false;
            }
            if (!checkBoxEdad.checked) {
                columnEdad.hidden = true;
            }
            else {
                columnEdad.hidden = false;
            }
            refrescarTabla(arrayClientes);
        }
        function calcularPromedio() {
            if (filtro.value == "Masculino") {
                var arrayFiltrado = arrayClientes.filter(function (item) {
                    return item.sexo.toString() == "Masculino";
                }).map(function (item) {
                    return item.edad;
                });
                promedioEdad.value = (arrayFiltrado.reduce(function (total, number) {
                    return Number(total) + Number(number);
                }, 0) / arrayFiltrado.length).toString();
            }
            else if (filtro.value == "Femenino") {
                var arrayFiltrado = arrayClientes.filter(function (item) {
                    return item.sexo.toString() == "Femenino";
                }).map(function (item) {
                    return item.edad;
                });
                promedioEdad.value = (arrayFiltrado.reduce(function (total, number) {
                    return Number(total) + Number(number);
                }, 0) / arrayFiltrado.length).toString();
            }
            else {
                var arrayFiltrado = arrayClientes.map(function (item) {
                    return item.edad;
                });
                promedioEdad.value = (arrayFiltrado.reduce(function (total, number) {
                    return Number(total) + Number(number);
                }, 0) / arrayFiltrado.length).toString();
            }
        }
    });
})(segundoParcialRecu || (segundoParcialRecu = {}));

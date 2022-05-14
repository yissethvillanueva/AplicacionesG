
let modal = document.getElementById('myModal');
let addButton = document.getElementById('AddButton');
let table = document.getElementById('PersonTable');
let selectedRowIndex = -1;

// Referencia a los botnes del modal
let insertButton = document.getElementById('InsertButton');
let updateButton = document.getElementById('InsertButton');

//Eventos de los Botones del modal

insertButton.addEventListener('click', function () {
    InsertarRegistro();
});


// referencia del formulario 
let form = document.getElementById('myFrom');
let span = document.getElementsByClassName("close")[0];

// Evento para hacer visible el modal
addButton.addEventListener('click', () => {
    modal.style.display = "block";
    clearFrom();
});
span.addEventListener('click', () => {
    modal.style.display = "none";
});

// funcion para obtener todos los checkedbox marcados
function getCheckedRadioValue(RadioName = '') {
    let radios = document.getElementsByName(RadioName);
    var selectedOption = '';
    radios.forEach((radio, index) => {
        if (radio.checked) {
            selectedOption = radio.value;
        }
    });
    return selectedOption;
}
// deshabilita los checkbox and radio
function deshabilitarCheckBoxAndRadio(checkBoxName = '') {
    let check = document.getElementsByName(checkBoxName);
    // deshabilitar cada item
    check.forEach(item => {
        item.checked = false;
    })
}
// habilita los checkbox and radio
function habilitarCheckBoxAndRadio(checkBoxName = '', value = '') {
    let check = document.getElementsByName(checkBoxName);
    for (let i = 0; i < check.length; i++) {
        if (check[i].value === value) {
            check[i].checked = true;
            break;
        }
    }
    return;
}
function getCheckedBoxesValue(CheckBoxName = '') {
    let checkBox = document.getElementsByName(CheckBoxName);
    var selectedOption = '';
    checkBox.forEach((check) => {
        if (check.checked) {
            selectedOption = selectedOption.concat(check.value).concat(',');
        }
    });
    selectedOption = selectedOption.trim().substring(0, selectedOption.trim().length - 1);
    console.log(selectedOption);
    return selectedOption.length > 0 ? selectedOption : 'No tiene pasatiempos';
}

// funcion para insertar registro de la tabla
function InsertarRegistro() {

    let cedula = document.getElementById('IDTextBox').value;
    let firtName = document.getElementById('FirstNameTextBox').value;
    let lastName = document.getElementById('LastNameTextBox').value;


    if (cedula == null || cedula.toString().length !== 14) { // se tiene que reemplazar por la validacion de la cedula
        console.log('Esta mierda esta mal');
    } else {
        let a = document.getElementById('PersonTable').insertRow(1);
        let img = a.insertCell(0); // donde se muestra la imagnen
        let b = a.insertCell(1);  // Numero de cedula
        let c = a.insertCell(2);  // Primer nombre
        let d = a.insertCell(3);  // Apellido
        let e = a.insertCell(4);  // Sexo
        let edad = a.insertCell(5);  // Edad
        let zona = a.insertCell(6);  // Zona
        let f = a.insertCell(7);  // Pasatiempos
        let g = a.insertCell(8);  // Botones para la acciones


        b.innerHTML = document.getElementById('IDTextBox').value;
        c.innerHTML = document.getElementById('FirstNameTextBox').value;
        d.innerHTML = document.getElementById('LastNameTextBox').value;

        // Genero
        let genero = getCheckedRadioValue('Sexo');
        e.innerHTML = genero;
        if (genero === 'Masculino') {
            img.innerHTML = `<img src="./assets/img/young-man.png" id="imgT" class="imgTable" alt="" >`;
        } else {
            img.innerHTML = `<img src="./assets/img/woman.png" id="imgT" class="imgTable" alt="" >`;
        }

        // para establer la edad en años
        let fechaActual = parseInt(new Date().getFullYear());
        let sAnio = cedula.toString().substring(7, 9);
        let aa = parseInt(sAnio);
        if (aa >= 0 && aa <= 29) {
            aa += 2000;
        } else {
            aa += 1900;
        }
        let resultado = fechaActual - aa;
        edad.innerHTML = resultado;

        //  para establecer la zona
        let z = cedula.toString().substring(0, 1);
        switch (z) {
            case '0':
                zona.innerHTML = 'Capital';
                break;
            case '1':
                zona.innerHTML = 'Zona 1';
                break;
            case '2':
                zona.innerHTML = 'Zona 2';
                break;
            case '3':
                zona.innerHTML = 'Zona 3';
                break;
            case '4':
                zona.innerHTML = 'Zona 4';
                break;
            case '5':
                zona.innerHTML = 'Zona 5';
                break;
            case '6':
                zona.innerHTML = 'Zona 6';
                break;
            case '7':
                zona.innerHTML = 'Zona 7';
                break;
            case '8':
                zona.innerHTML = 'Zona 8';
                break;
            case '9':
                zona.innerHTML = 'Zona 9';
                break;
        }


        // Pasatiempos
        f.innerHTML = getCheckedBoxesValue('Pasatiempos');

        // let buttons = `<button name="EditButton" onclick='ShowModalForEdit(this)'>Editar</button> `;
        // buttons = buttons.concat("&nbsp;").concat(`<button name="DeleteButton" onclick='deleteRow(this)'>Eliminar</button>`);
        // g.innerHTML = buttons;


        let buttons = `<button type="button" class="btnLite" name="EditButton" onclick='ShowModalForEdit(this)'>&nbsp; 
        <img src="./assets/img/edit.png" id="imgT" class="imgAction" alt="" >
    </button>`;
        buttons = buttons.concat("&nbsp;").concat(`<button type="button" class="btnLite" name="DeleteButton" onclick='deleteRow(this)'>
        <img src="./assets/img/delete.png" id="imgT" class="imgAction" alt="" >
    </button>`);
        g.innerHTML = buttons;

        let modal = document.getElementById('myModal');
        modal.style.display = "none";
        selectedRowIndex = -1;
    }

}

function deleteRow(sender) {
    let i = sender.parentNode.parentNode.rowIndex;
    document.getElementById('PersonTable').deleteRow(i);
}

function clearFrom() {
    document.getElementById('IDTextBox').value = '';
    document.getElementById('FirstNameTextBox').value = '';
    document.getElementById('LastNameTextBox').value = '';
    deshabilitarCheckBoxAndRadio('Sexo');
    deshabilitarCheckBoxAndRadio('Pasatiempos');
}

function ShowModalForEdit(sender) {
    modal.style.display = "block";
    clearFrom();

    selectedRowIndex = sender.parentNode.parentNode.rowIndex;

    let cedula = table.rows[selectedRowIndex].cells[1].innerHTML.toString();
    let firstName = table.rows[selectedRowIndex].cells[2].innerHTML.toString();
    let lastName = table.rows[selectedRowIndex].cells[3].innerHTML.toString();

    document.getElementById('IDTextBox').value = cedula;
    document.getElementById('FirstNameTextBox').value = firstName;
    document.getElementById('LastNameTextBox').value = lastName;

    let genero = table.rows[selectedRowIndex].cells[4].innerHTML.toString();
    habilitarCheckBoxAndRadio('Sexo', genero);

    // pasatiempo
    let pasatiempos = table.rows[selectedRowIndex].cells[7].innerHTML.toString();
    let pasatiemposArray = pasatiempos.split(',');

    pasatiemposArray.forEach(item => {
        habilitarCheckBoxAndRadio('Pasatiempos', item);
    });
}

function ActualizarRegistro() {

    if (selectedRowIndex !== -1) {
        // hacer la actualizacion del registro
        let cedula = document.getElementById('IDTextBox').value;
        table.rows[selectedRowIndex].cells[1].innerHTML = cedula;
        table.rows[selectedRowIndex].cells[2].innerHTML = document.getElementById('FirstNameTextBox').value;
        table.rows[selectedRowIndex].cells[3].innerHTML = document.getElementById('LastNameTextBox').value;

        // para sexo y pasatiempo
        table.rows[selectedRowIndex].cells[4].innerHTML = getCheckedRadioValue('Sexo');
        let genero = getCheckedRadioValue('Sexo');
        if (genero === 'Masculino') {
            table.rows[selectedRowIndex].cells[0].innerHTML = `<img src="./assets/img/young-man.png" id="imgT" class="imgTable" alt="" >`;
        } else {
            table.rows[selectedRowIndex].cells[0].innerHTML = `<img src="./assets/img/woman.png" id="imgT" class="imgTable" alt="" >`;
        }

        // para establer la edad en años
        let fechaActual = parseInt(new Date().getFullYear());
        let sAnio = cedula.toString().substring(7, 9);
        let aa = parseInt(sAnio);
        if (aa >= 0 && aa <= 29) {
            aa += 2000;
        } else {
            aa += 1900;
        }
        let resultado = fechaActual - aa;
        table.rows[selectedRowIndex].cells[5].innerHTML = resultado;

        //  para establecer la zona
        let z = cedula.toString().substring(0, 1);
        switch (z) {
            case '0':
                table.rows[selectedRowIndex].cells[6].innerHTML = 'Capital';
                break;
            case '1':
                table.rows[selectedRowIndex].cells[6].innerHTML = 'Zona 1';
                break;
            case '2':
                table.rows[selectedRowIndex].cells[6].innerHTML = 'Zona 2';
                break;
            case '3':
                table.rows[selectedRowIndex].cells[6].innerHTML = 'Zona 3';
                break;
            case '4':
                table.rows[selectedRowIndex].cells[6].innerHTML = 'Zona 4';
                break;
            case '5':
                table.rows[selectedRowIndex].cells[6].innerHTML = 'Zona 5';
                break;
            case '6':
                table.rows[selectedRowIndex].cells[6].innerHTML = 'Zona 6';
                break;
            case '7':
                table.rows[selectedRowIndex].cells[6].innerHTML = 'Zona 7';
                break;
            case '8':
                table.rows[selectedRowIndex].cells[6].innerHTML = 'Zona 8';
                break;
            case '9':
                table.rows[selectedRowIndex].cells[6].innerHTML = 'Zona 9';
                break;
        }

        // pasatiempo
        table.rows[selectedRowIndex].cells[7].innerHTML = getCheckedBoxesValue('Pasatiempos');

        modal.style.display = "none";
        selectedRowIndex = -1;
    } else {
        alert('Seleccione un registro para actualizar');
    }
}


























let showModal = document.getElementById('AddButton');
let modal = document.getElementById('myModal');

showModal.addEventListener('click', () => {
    modal.style.display = "block";
});

function InsertarRegistro() {
    console.log("Has intentado insertar un nuevo registro");
}
ActualizarRegistro = () => {
    console.log("Has intentado actualizar un registro");
}

function ShowModalForEdit(param) {
    console.log(param);
}

window.onclick = function (event) {
    
}
window.addEventListener('click',(event) => {
    console.log(event.target);
    if(event.target == modal){
        modal.style.display = "none";
    }
});
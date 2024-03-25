document.getElementById('home').addEventListener('click', () => {
    window.location.href = "../index.html"
})

const form = document.getElementById('formSurg')
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Evita que el formulario se envíe normalmente
    let sugTitle = document.getElementById('titSug').value
    let sugDesc = document.getElementById('descSug').value
    let sugEsq = document.getElementById('selectEsq').value
    let sugSer = document.getElementById('selectSer').value
    
    console.log(sugTitle, sugDesc, sugEsq, sugSer);
    sendSugerencia(sugTitle, sugDesc, sugSer)
})

function cargarDatos(){
    let listCont = new XMLHttpRequest();
    listCont.open('GET', 'https://titulosmda.c1.is/app/main.php');
    listCont.onload = function() {
        if (listCont.status == 200) {
            let json = listCont.responseText;
            preocesarJsonMain(json);
        } else {
            document.getElementById('contenedor').innerHTML = '<div class="alert alert-danger text-center" role="alert">No se pudo cargar los datos.</div>';
        }
    };
    listCont.onerror = function() {
        document.getElementById('contenedor').innerHTML = '<div class="alert alert-danger text-center" role="alert">No hay conexión con el servidor.</div>';
    };
    listCont.send();
}

document.addEventListener('DOMContentLoaded', () => {
    cargarDatos();
});

const preocesarJsonMain = (json) => {
    const raw = JSON.parse(json);

    const select1 = document.getElementById('selectEsq');

    const select2 = document.getElementById('selectSer');
   

    raw.forEach(element => {
        const esquema = document.createElement('option');
        esquema.value = element.id_esq;
        esquema.textContent = element.nombre;
        select1.appendChild(esquema);
    });
    
    select1.addEventListener('change', () => {
        let selectValue = select1.value;
        let servicios = raw.find(element => element.id_esq === selectValue).listservice;
        select2.textContent="";
        servicios.forEach(element => {
            let option = document.createElement('option');
            option.value = element.id_ser;
            option.textContent = element.nombre;
            select2.appendChild(option);
        })
    })
    let servicios = raw.find(element => element.id_esq === select1.value).listservice;
        select2.textContent="";
        servicios.forEach(element => {
            let option = document.createElement('option');
            option.value = element.id_ser;
            option.textContent = element.nombre;
            select2.appendChild(option);
        })
}

function sendSugerencia(sugTitle, sugDesc, sugSer) {
  
    const data = {
        sugtit: sugTitle,
        sugdesc: sugDesc,
        sugser: sugSer 
    };

    fetch('https://titulosmda.c1.is/app/cargarsugerencia.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        
    })
    .then(response => response.text())
    .then(result => {
        console.log(result)
        if(result == "false" || result == false){
            document.getElementById("bodySurg").innerHTML = '<div class="alert alert-danger text-center" role="alert">No se pudo cargar la sugerencia</div>'
        }else{
            document.getElementById("bodySurg").innerHTML = '<div class="alert alert-success text-center" role="alert">¡Se envio la sugerencia correctamente!</div>'
        }        
    })
    .catch(error => {
        document.getElementById("bodySurg").innerHTML = '<div class="alert alert-danger text-center" role="alert">No se pudo enviar la sugerencia</div>'
        console.error('Error:', error);
    });
  }

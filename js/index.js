//a.innerHTML = '<div class="alert alert-secondary text-center" role="alert">Todavía no hay esquemas para ver.</div>'
function cargarDatos(){
    let listCont = new XMLHttpRequest();
    listCont.open('GET', 'https://titulosmda.infinityfreeapp.com/main.php');
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

function goAdmin(user,psw){
    localStorage.setItem('usuario', user);
    localStorage.setItem('contraseña', psw);
    window.location.href = "views/admin.html";
}

function goSugerencia(){   
    window.location.href = "views/sugerencias.html";
}

function preocesarJsonMain(json){
    let raw = JSON.parse(json);
    let esq = document.getElementById("selecionables");
    raw.forEach(element => {
        const btnEsq = document.createElement('div');
        btnEsq.innerHTML = element.img;
        btnEsq.classList.add('btmEsq');
        btnEsq.id = "btn" + raw.indexOf(element);
        btnEsq.addEventListener('click', () => listServicios(btnEsq.id, raw));

        // Agregar tooltip
        btnEsq.setAttribute('data-bs-toggle', 'tooltip');
        btnEsq.setAttribute('data-bs-placement', 'top');
        btnEsq.setAttribute('title', element.nombre);

        // Inicializar tooltip de Bootstrap
        new bootstrap.Tooltip(btnEsq);

        esq.appendChild(btnEsq);
    });    
}

const listServicios = (id, raw) => {
    const btnindex = id.slice(3);
    let list = raw[btnindex].listservice;
    let ser = document.getElementById('ser');
    const selSer = document.createElement("select");
    selSer.classList.add('form-select');
   
    const listS = document.createElement('option');
    listS.textContent = "Selecione un servicio";
    listS.selected = true;
    listS.disabled = true;
    selSer.appendChild(listS);

    list.forEach(element => {
        const listSer = document.createElement('option');
        listSer.textContent = element.nombre;
        selSer.appendChild(listSer);        
    });
    selSer.addEventListener('change', () => {
        const selectedIndex = selSer.selectedIndex - 1;
        if (selectedIndex !== -1) {
            listTitulos(list[selectedIndex].listtitulos);
        }}); 
    document.getElementById('tit').innerHTML='';
    document.getElementById('btnCopy').innerHTML = '';
    ser.innerHTML = '';
    ser.appendChild(selSer);
}

const listTitulos = (list) => {
    let tit = document.getElementById('tit');
    const selSer = document.createElement("select");
    selSer.classList.add('form-select');
    const listS = document.createElement('option');
    listS.textContent = "Selecione un titulo";
    listS.selected = true;
    listS.disabled = true;
    selSer.appendChild(listS);
    if (list !== undefined) {
        list.forEach(element => {
            const listSer = document.createElement('option');
            listSer.textContent = element.nombre;
            selSer.appendChild(listSer);
        });
    };
    tit.innerHTML='';
    tit.appendChild(selSer);
    selSer.addEventListener('change', () => {
        const selectedOption = selSer.options[selSer.selectedIndex];
        const copyButton = document.createElement('button');
        copyButton.textContent = 'Copiar al portapapeles';
        copyButton.classList.add('btn');
        copyButton.classList.add('btn-outline-dark');
        copyButton.addEventListener('click', () => {
            let textCopy = selectedOption.textContent;
            navigator.clipboard.writeText(textCopy);
        });
        document.getElementById('btnCopy').innerHTML = '';
        document.getElementById('btnCopy').appendChild(copyButton);
    });
};        

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('loginForm');

    form.addEventListener('submit', function (event) {
      event.preventDefault(); // Evita que el formulario se envíe normalmente
      
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      validarDatos(username, password);      
    });
  });

  const validarDatos = (user, psw) => {
      const data = { user: user, password: psw };
      fetch('https://titulosmda.infinityfreeapp.com/validation.php', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(result => {
        console.log(result)
          if (result === true) {
            // Usuario y contraseña válidos
            goAdmin(user, psw);
          } else {
            // Usuario y contraseña inválidos
              msjerror = document.getElementById("loginerror");
              msjerror.style.display = 'block';
          }
      })
      .catch(error => {
          console.error('Error:', error);
      });
  };

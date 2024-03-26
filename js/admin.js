const validarDatos = () => {
    const user = localStorage.getItem('usuario');
    const psw = localStorage.getItem('contraseña');
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
        if (result === true) {
            // Usuario y contraseña validos
            //document.getElementById('contenedor').innerHTML = '';
          console.log("todo ok")
        } else {
            // Usuario o contraseña inválidos
            document.getElementById('contenedor').innerHTML = '<div class="alert alert-danger text-center" role="alert">¡No tiene permisos para ver está pagina!</div>';
            console.log("todo mal");
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
};
document.addEventListener('DOMContentLoaded', () => {
    validarDatos();
});

function cargarDatos(callback){
  let listCont = new XMLHttpRequest();
  listCont.open('GET', 'https://titulosmda.infinityfreeapp.com/main.php');
  listCont.onload = function() {
      if (listCont.status == 200) {
          let json = listCont.responseText;
          callback(json);
      } else {
          document.getElementById('contenedor').innerHTML = '<div class="alert alert-danger text-center" role="alert">No se pudo cargar los datos.</div>';
      }
  };
  listCont.onerror = function() {
      document.getElementById('contenedor').innerHTML = '<div class="alert alert-danger text-center" role="alert">No hay conexión con el servidor.</div>';
  };
  listCont.send();
}

document.getElementById('home').addEventListener('click', () => {
    localStorage.setItem('usuario', '');
    localStorage.setItem('contraseña', '');
    window.location.href = "../index.html"
})

document.getElementById('btmSugerencias').addEventListener('click', () =>{
    const headAdm = document.getElementById('headAdm');
    headAdm.innerHTML='<h3 class="text-center">Lista de sugerencias</h3>';
    document.getElementById('bodyAdm').innerHTML = '';
    cargarSugerencias();
})

document.getElementById('btmServicios').addEventListener('click', () =>{
    const headAdm = document.getElementById('headAdm'); 
    headAdm.innerHTML = "";
    document.getElementById('bodyAdm').innerHTML = "";
    headAdm.classList.add('d-flex', 'justify-content-around', 'my-3');
    
    
    const btnAddSer = document.createElement('button');
    btnAddSer.setAttribute('class', 'btn btn-secondary');
    btnAddSer.textContent = "Nuevo servicios";
    btnAddSer.addEventListener('click', formAddSer);
    headAdm.appendChild(btnAddSer);

    const btnDelSer = document.createElement('button');
    btnDelSer.setAttribute('class', 'btn btn-secondary');
    btnDelSer.textContent = "Eliminar servicio";
    btnDelSer.addEventListener('click', formDelSer);
    headAdm.appendChild(btnDelSer);

})

document.getElementById('btmTitulos').addEventListener('click', () =>{
    const headAdm = document.getElementById('headAdm');
    headAdm.innerHTML='';
    document.getElementById('bodyAdm').innerHTML = '';
    headAdm.classList.add('d-flex', 'justify-content-around', 'my-3');

    // Crear los botones
    const nuevoTituloBtn = document.createElement('button');
    nuevoTituloBtn.textContent = 'Nuevo título';
    nuevoTituloBtn.classList.add('btn', 'btn-secondary');
    nuevoTituloBtn.addEventListener('click', AddTitleForm);
    headAdm.appendChild(nuevoTituloBtn);

    const modificarTituloBtn = document.createElement('button');
    modificarTituloBtn.textContent = 'Modificar título';
    modificarTituloBtn.classList.add('btn', 'btn-secondary');
    modificarTituloBtn.addEventListener('click', updateTitleForm)
    headAdm.appendChild(modificarTituloBtn);

    const eliminarTituloBtn = document.createElement('button');
    eliminarTituloBtn.textContent = 'Eliminar título';
    eliminarTituloBtn.classList.add('btn', 'btn-secondary');
    eliminarTituloBtn.addEventListener('click', deleteTitleForm);
    headAdm.appendChild(eliminarTituloBtn);

})

function AddTitleForm() {
    const bodyAbm = document.getElementById('bodyAdm');
    bodyAbm.innerHTML='';
    const form = document.createElement('form');
    form.innerHTML= '<h3 class="text-center">Alta de titulo</h3>';

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar que el formulario se envíe
    
        const nameTitle = document.getElementById('addTitle').value;
        const addDescTitle = document.getElementById('addDescTitle').value;
        const selecServicio = document.getElementById('selecServicio').value;
    
        // Llamar a la función que maneja los datos
        addTitle(nameTitle, addDescTitle, selecServicio);
      });
  
    const label1 = document.createElement('label');
    label1.setAttribute('for', 'addTitle');
    label1.textContent = 'Escriba un titulo:';
    form.appendChild(label1);
  
    const input1 = document.createElement('input');
    input1.setAttribute('type', 'text');
    input1.setAttribute('id', 'addTitle');
    input1.setAttribute('name', 'addTitle');
    input1.setAttribute('class', 'form-control');
    input1.setAttribute('required', 'true');
    form.appendChild(input1);
  
    const label2 = document.createElement('label');
    label2.setAttribute('for', 'addDescTitle');
    label2.textContent = 'Escriba una descripción del titulo:';
    form.appendChild(label2);
  
    const textarea = document.createElement('textarea');
    textarea.setAttribute('id', 'addDescTitle');
    textarea.setAttribute('name', 'addDescTitle');
    textarea.setAttribute('class', 'form-control my-2');
    textarea.setAttribute('style', 'height: 150px');
    textarea.setAttribute('required', 'true');
    form.appendChild(textarea);
  
    const div1 = document.createElement('div');
    div1.setAttribute('class', 'd-flex justify-content-evenly');
    form.appendChild(div1);
  
    const label3 = document.createElement('label');
    label3.setAttribute('for', 'selecEsquema');
    label3.setAttribute('class', 'form-label my-3');
    label3.textContent = 'Selecione para que esquema:';
    div1.appendChild(label3);
  
    const select1 = document.createElement('select');
    select1.setAttribute('id', 'selecEsquema');
    select1.setAttribute('name', 'selecEsquema');
    select1.setAttribute('class', 'form-select w-50 my-2');
    select1.setAttribute('required', 'true');
    div1.appendChild(select1);
  
    const div2 = document.createElement('div');
    div2.setAttribute('class', 'd-flex justify-content-evenly');
    form.appendChild(div2);
  
    const label4 = document.createElement('label');
    label4.setAttribute('for', 'selecServicio');
    label4.setAttribute('class', 'form-label my-3');
    label4.textContent = 'Selecione para que servicio:';
    div2.appendChild(label4);
  
    const select2 = document.createElement('select');
    select2.setAttribute('id', 'selecServicio');
    select2.setAttribute('name', 'selecServicio');
    select2.setAttribute('class', 'form-select w-50 my-2');
    select2.setAttribute('required', 'true');    
    div2.appendChild(select2);
  
    const button = document.createElement('button');
    button.setAttribute('type', 'submit');
    button.setAttribute('id', 'sendTitle');
    button.setAttribute('class', 'btn btn-outline-dark float-end');
    button.textContent = 'Cargar';
    form.appendChild(button);

    creatOptionEsque(select1, select2);
  
    bodyAbm.appendChild(form);
  }

  function addTitle(addTitle, addDescTitle, selecServicio) {
    let user = localStorage.getItem('usuario');
    let password = localStorage.getItem('contraseña');

    const data = {
        user: user,
        password: password,
        id_ser: selecServicio,
        titulo: addTitle,
        descripcion: addDescTitle
    };

    fetch('https://titulosmda.infinityfreeapp.com/agregartitulo.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log(result);
        if(result == false){
            document.getElementById("bodyAdm").innerHTML = '<div class="alert alert-danger text-center" role="alert">No se pudo agregar el titulo</div>'
        }else{
            document.getElementById("bodyAdm").innerHTML = '<div class="alert alert-success text-center" role="alert">¡Se agregó el titulo correctamente!</div>'
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
  }
  
  const updateTitleForm = () => {
    const bodyAdm = document.getElementById('bodyAdm');
    bodyAdm.innerHTML = '';
    const form = document.createElement('form');
    form.setAttribute('class', 'formdel')
    form.innerHTML= '<h3 class="text-center">Modificación de titulo</h3>';

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar que el formulario se envíe

        const id_tit = document.getElementById('selecTitulo').value;
        const nombre = document.getElementById('upTitleNombre').value;
        const desc = document.getElementById('upTitleDec').value;

        // Llamar a la función que maneja los datos
        updateTitle(id_tit, nombre, desc);
    });

    const select1 = document.createElement('select');
    select1.setAttribute('id', 'selecEsquema');
    select1.setAttribute('name', 'selecEsquema');
    select1.setAttribute('class', 'form-select w-50 my-2');

    cargarDatos(function(json) {
        const raw = JSON.parse(json);

        let init = document.createElement('option');
        init.textContent = 'Selecione un esquema';
        init.selected = true;
        init.disabled = true;
        select1.appendChild(init);

        raw.forEach(element => {
            let option = document.createElement('option');
            option.value = element.id_esq;
            option.textContent = element.nombre;
            select1.appendChild(option);
        });

        select1.addEventListener('change', () => {
            const existingSelect2 = form.querySelector('#selecServicio');
            if (existingSelect2) {
                form.removeChild(existingSelect2);
            }
            const existingSelect3 = form.querySelector('#selecTitulo');
            if (existingSelect3) {
                form.removeChild(existingSelect3);
            }
            const existingButton = form.querySelector('button[type="submit"]');
            if (existingButton) {
                form.removeChild(existingButton);
            }
            const existingTitle = form.querySelector('#upTitleNombre');
            if (existingTitle) {
                form.removeChild(existingTitle);
            }
            const existingDesc = form.querySelector('#upTitleDec');
            if (existingDesc) {
                form.removeChild(existingDesc);
            }
            

            const select2 = document.createElement('select');
            select2.setAttribute('id', 'selecServicio');
            select2.setAttribute('name', 'selecServicio');
            select2.setAttribute('class', 'form-select w-50 my-2');

            let init2 = document.createElement('option');
            init2.textContent = 'Selecione un Servicio';
            init2.selected = true;
            init2.disabled = true;
            select2.appendChild(init2);

            let selectedValue = select1.value;
            let selectedElement = raw.find(element => element.id_esq === selectedValue).listservice;
            selectedElement.forEach(element => {
                let option = document.createElement('option');
                option.value = element.id_ser;
                option.textContent = element.nombre;
                select2.appendChild(option);
            });

            select2.addEventListener('change', () => {
                const existingSelect3 = form.querySelector('#selecTitulo');
                if (existingSelect3) {
                    form.removeChild(existingSelect3);
                }
                const existingButton = form.querySelector('button[type="submit"]');
                if (existingButton) {
                    form.removeChild(existingButton);
                }
                const existingTitle = form.querySelector('#upTitleNombre');
                if (existingTitle) {
                    form.removeChild(existingTitle);
                }
                const existingDesc = form.querySelector('#upTitleDec');
                if (existingDesc) {
                    form.removeChild(existingDesc);
                }

                const select3 = document.createElement('select');
                select3.setAttribute('id', 'selecTitulo');
                select3.setAttribute('name', 'selecTitulo');
                select3.setAttribute('class', 'form-select w-50 my-2');

                let init3 = document.createElement('option');
                init3.textContent = 'Selecione un Titulo';
                init3.selected = true;
                init3.disabled = true;
                select3.appendChild(init3);

                let selectedService = select2.value;
                let selectedTitles = raw.flatMap(element => element.listservice).find(service => service.id_ser === selectedService).listtitulos;
                selectedTitles.forEach(element => {
                    let option = document.createElement('option');
                    option.value = element.id_tit;
                    option.textContent = element.nombre;
                    select3.appendChild(option);
                });

                select3.addEventListener('change', () => {
                    const existingButton = form.querySelector('button[type="submit"]');
                    if (existingButton) {
                        form.removeChild(existingButton);
                    }
                    const existingTitle = form.querySelector('#upTitleNombre');
                    if (existingTitle) {
                        form.removeChild(existingTitle);
                    }
                    const existingDesc = form.querySelector('#upTitleDec');
                    if (existingDesc) {
                        form.removeChild(existingDesc);
                    }

                    let titleID = select3.value;
                    let titleObj = selectedTitles.find(titulo => titulo.id_tit === titleID);

                    const titleNombre = document.createElement('input');
                    titleNombre.setAttribute('id', 'upTitleNombre');
                    titleNombre.setAttribute('name', 'upTitleNombre');
                    titleNombre.setAttribute('type', 'text');
                    titleNombre.setAttribute('class', 'form-control');
                    titleNombre.setAttribute('required', 'true');
                    titleNombre.value = titleObj.nombre;
                    form.appendChild(titleNombre);

                    const textarea1 = document.createElement('textarea');
                    textarea1.setAttribute('id', 'upTitleDec');
                    textarea1.setAttribute('name', 'upTitleDec');
                    textarea1.setAttribute('class', 'form-control my-2');
                    textarea1.setAttribute('style', 'height: 150px');
                    textarea1.setAttribute('required', 'true');
                    textarea1.textContent = titleObj.descrip;
                    form.appendChild(textarea1);

                    const btndelet = document.createElement('button');
                    btndelet.setAttribute('type', 'submit');
                    btndelet.setAttribute('class', 'btn btn-outline-dark');
                    btndelet.textContent = 'Modificar titulo';
                    form.appendChild(btndelet);
                });

                form.appendChild(select3);
            });

            form.appendChild(select2);
        });

        form.appendChild(select1);
    });

    bodyAdm.appendChild(form);
};


  function updateTitle(id_tit, nombre, desc) {
    let user = localStorage.getItem('usuario');
    let password = localStorage.getItem('contraseña');

    const data = {
        user: user,
        password: password,
        id_tit: id_tit,
        nombre: nombre,
        descrip: desc
    };

    fetch('https://titulosmda.infinityfreeapp.com/modificartitulo.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        
    })
    .then(response => response.text())
    .then(result => {
        console.log(result)
        if(result == "false" || result == false || result == 0){
            document.getElementById("bodyAdm").innerHTML = '<div class="alert alert-danger text-center" role="alert">No se pudo modificar el titulo</div>'
        }else{
            document.getElementById("bodyAdm").innerHTML = '<div class="alert alert-success text-center" role="alert">¡Se modifico el titulo correctamente!</div>'
        }        
    })
    .catch(error => {
        console.error('Error:', error);
    });
  }

  const deleteTitleForm = () => {
    const bodyAdm = document.getElementById('bodyAdm');
    bodyAdm.innerHTML = '';
    const form = document.createElement('form');
    form.setAttribute('class', 'formdel');
    form.innerHTML= '<h3 class="text-center">Eliminación de titulo</h3>';


    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar que el formulario se envíe

        const id_tit = document.getElementById('selecTitulo').value;
        // Llamar a la función que maneja los datos
        deleteTitle(id_tit);
    });

    const select1 = document.createElement('select');
    select1.setAttribute('id', 'selecEsquema');
    select1.setAttribute('name', 'selecEsquema');
    select1.setAttribute('class', 'form-select w-50 my-2');

    cargarDatos(function(json) {
        const raw = JSON.parse(json)

        let init = document.createElement('option');
        init.textContent = 'Selecione un esquema';
        init.selected = true;
        init.disabled = true;
        select1.appendChild(init);

        raw.forEach(element => {
            let option = document.createElement('option');
            option.value = element.id_esq;
            option.textContent = element.nombre;
            select1.appendChild(option);
        })

        select1.addEventListener('change', () => {
            // Eliminar el select de servicio si ya existe
            const existingSelect2 = form.querySelector('#selecServicio');
                if (existingSelect2) {
                    form.removeChild(existingSelect2);
                }
            const existingSelect3 = form.querySelector('#selecTitulo');
                if (existingSelect3) {
                    form.removeChild(existingSelect3);
                }
            const existingButton = form.querySelector('button[type="submit"]');
                if (existingButton) {
                    form.removeChild(existingButton);
                }

            const select2 = document.createElement('select');
            select2.setAttribute('id', 'selecServicio');
            select2.setAttribute('name', 'selecServicio');
            select2.setAttribute('class', 'form-select w-50 my-2');

            let init2 = document.createElement('option');
            init2.textContent = 'Selecione un Servicio';
            init2.selected = true;
            init2.disabled = true;
            select2.appendChild(init2);

            let selectedValue = select1.value;
            let selectedElement = raw.find(element => element.id_esq === selectedValue).listservice;
            selectedElement.forEach(element => {
                let option = document.createElement('option');
                option.value = element.id_ser;
                option.textContent = element.nombre;
                select2.appendChild(option);
            })

            select2.addEventListener('change', () => {
                // Eliminar el select de título si ya existe
                const existingSelect3 = form.querySelector('#selecTitulo');
                if (existingSelect3) {
                    form.removeChild(existingSelect3);
                }
                const existingButt = form.querySelector('button[type="submit"]');
                if (existingButt) {
                    form.removeChild(existingButt);
                }

                const select3 = document.createElement('select');
                select3.setAttribute('id', 'selecTitulo');
                select3.setAttribute('name', 'selecTitulo');
                select3.setAttribute('class', 'form-select w-50 my-2');

                let init3 = document.createElement('option');
                init3.textContent = 'Selecione un Titulo';
                init3.selected = true;
                init3.disabled = true;
                select3.appendChild(init3);

                let selectedService = select2.value;
                let selectedTitles = raw.flatMap(element => element.listservice).find(service => service.id_ser === selectedService).listtitulos;
                selectedTitles.forEach(element => {
                    let option = document.createElement('option');
                    option.value = element.id_tit;
                    option.textContent = element.nombre;
                    select3.appendChild(option);
                })

                form.appendChild(select3);

                // Eliminar el botón de eliminar título si ya existe
                const existingButton = form.querySelector('button[type="submit"]');
                if (existingButton) {
                    form.removeChild(existingButton);
                }

                const btndelet = document.createElement('button');
                btndelet.setAttribute('type', 'submit');
                btndelet.setAttribute('class', 'btn btn-outline-dark');
                btndelet.textContent = 'Eliminar titulo';
                form.appendChild(btndelet);
            })

            form.appendChild(select2);
        })

        form.appendChild(select1);
    })

    bodyAdm.appendChild(form);
}

  function deleteTitle(id_tit) {
    let user = localStorage.getItem('usuario');
    let password = localStorage.getItem('contraseña');

    const data = {
        user: user,
        password: password,
        id_tit: id_tit
    };

    fetch('https://titulosmda.infinityfreeapp.com/eliminartitulo.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        
    })
    .then(response => response.json())
    .then(result => {
        console.log(result)
        if(result == "false"){
            document.getElementById("bodyAdm").innerHTML = '<div class="alert alert-danger text-center" role="alert">No se pudo eliminar el titulo</div>'
        }else{
            document.getElementById("bodyAdm").innerHTML = '<div class="alert alert-success text-center" role="alert">¡Se elimino el titulo correctamente!</div>'
        }        
    })
    .catch(error => {
        console.error('Error:', error);
    });
  }


  const creatOptionEsque = (selectEsq, selectTit) => {
    cargarDatos(function(json) {
        let raw = JSON.parse(json);
        selectEsq.innerHTML = '';
        selectTit.innerHTML = '';
        let init = document.createElement('option');
        init.textContent = 'Abrir lista';
        init.selected = true;
        init.disabled = true;
        selectEsq.appendChild(init);

        raw.forEach(element => {
            let option = document.createElement('option');
            option.value = element.id_esq;
            option.textContent = element.nombre;
            selectEsq.appendChild(option);
        });

        selectEsq.addEventListener('change', () => {
            // Obtener el valor de la opción seleccionada en selectEsq
            let selectedValue = selectEsq.value;
            if (selectedValue !== 'Abrir lista') {
                // Encontrar el elemento correspondiente en raw
                let selectedElement = raw.find(element => element.id_esq === selectedValue);
                if (selectedElement) {
                    let listServices = selectedElement.listservice;
                    
                    // Limpiar selectTit y agregar las opciones de listServices
                    selectTit.innerHTML = '';
                    let init2 = document.createElement('option');
                    init2.textContent = 'Abrir lista';
                    init2.selected = true;
                    init2.disabled = true;
                    selectTit.appendChild(init2);
                    listServices.forEach(service => {
                        let option = document.createElement('option');
                        option.value = service.id_ser;
                        option.textContent = service.nombre; 
                        selectTit.appendChild(option);
                    });
                }
            }
        });
    });
};

const cargarSugerencias = () => {
    let user = localStorage.getItem('usuario');
    let password = localStorage.getItem('contraseña');

    const data = {
        user: user,
        password: password
    };

    fetch('https://titulosmda.infinityfreeapp.com/listadesugerencias.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        
    })
    .then(response => response.json())
    .then(result => {
        console.log(result)
        if(result == "false" || result == false){
            if(result.length !== 0){            
                document.getElementById("bodyAdm").innerHTML = '<div class="alert alert-danger text-center" role="alert">No se pudo listar las sugerencias</div>'
            }else{
                document.getElementById("bodyAdm").innerHTML ='<div class="alert alert-secondary text-center" role="alert">No hay sugerencias para mostrar.</div>'
            }    
        }else{
            adminSugerencias(result);
        }        
    })
    .catch(error => {
        console.error('Error:', error);
    });
};

const adminSugerencias = (list) => {
    console.log(list)
    listSug = list
    const ul = document.createElement('ul');
    ul.setAttribute('class', 'list-group');
    ul.setAttribute('style', "max-height: 200px; overflow-y: auto;");
    if(listSug.length !== 0)
        listSug.forEach(result => {
            const li = document.createElement('li');
            li.innerHTML = `<span>${result.nombre}</span>
                            <span class="float-end ms-2" onClick="delSug(${result.id_sug})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                </svg></span>
                            <span class="float-end ms-2" onClick="addSug(${result.id_sug}, ${result.id_ser}, '${result.nombre}', '${result.descrip}')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-square" viewBox="0 0 16 16">
                                <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5z"/>
                                <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0"/>
                                </svg></span>
                            <span class="float-end" onClick="viewSug(${result.id_sug}, '${result.nombreser}', '${result.nombre}', '${result.descrip}')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                                </svg></span>
                            `
            li.id = result.id_sug;
            li.setAttribute("class", 'list-group-item mb-1');
            ul.appendChild(li);
            
        });    
    document.getElementById("bodyAdm").appendChild(ul);
};

const delSug = (id_sug) => {
    if(confirmacion("Estas seguro/a de rechazar la sugerencia?")){
        let user = localStorage.getItem('usuario');
        let password = localStorage.getItem('contraseña');

        const data = {
            user: user,
            password: password,
            id_sug: id_sug
        };

        fetch('https://titulosmda.infinityfreeapp.com/eliminarsugerencia.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)

        })
        .then(response => response.json())
        .then(result => {
            document.getElementById("bodyAdm").innerHTML ="";
            cargarSugerencias();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}

const addSug = (id_sug, id_ser, nombreSug, descSug)=>{
    if(confirmacion("Estas seguro/a de aceptar la sugerencia?")){
        addTitle(nombreSug, descSug, id_ser);
        let user = localStorage.getItem('usuario');
        let password = localStorage.getItem('contraseña');

        const data = {
            user: user,
            password: password,
            id_sug: id_sug
        };

        fetch('https://titulosmda.infinityfreeapp.com/eliminarsugerencia.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)

        })
        .then(response => response.json())
        .then(result => {
            document.getElementById("bodyAdm").innerHTML ="";
            cargarSugerencias();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}

function confirmacion(mensaje) {
    return confirm(mensaje);
}

const viewSug = (id_sug, nombreser, nombreSug, descSug) => {
    // Crear el modal
    const modal = document.createElement('div');
    modal.classList.add('modal', 'fade');
    modal.id = 'modalSug';
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('aria-labelledby', 'exampleModalLabel');
    modal.setAttribute('aria-hidden', 'true');
    
    const modalDialog = document.createElement('div');
    modalDialog.classList.add('modal-dialog');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const modalHeader = document.createElement('div');
    modalHeader.classList.add('modal-header');
    modalHeader.innerHTML = `
        <h5 class="modal-title">${nombreSug}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    `;

    const modalBody = document.createElement('div');
    modalBody.classList.add('modal-body');
    modalBody.innerHTML = `
        <p><strong>Servicio:</strong> ${nombreser}</p>
        <p><strong>Descripción:</strong> ${descSug}</p>
    `;

    const modalFooter = document.createElement('div');
    modalFooter.classList.add('modal-footer');
    modalFooter.innerHTML = `
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
    `;

    // Agregar elementos al modal
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);
    modalDialog.appendChild(modalContent);
    modal.appendChild(modalDialog);

    // Mostrar el modal
    document.body.appendChild(modal);
    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
}

const formAddSer = () => {
    const bodyAdm = document.getElementById('bodyAdm');
    bodyAdm.innerHTML = '<h3 class="text-center">Agregar nuevo Servicio</3>'    

    const form = document.createElement('form');
    form.setAttribute('class', 'formdel');
    form.style = "gap: 8px;"

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar que el formulario se envíe

        const id_esq = document.getElementById('selectEsq').value;
        const nombre = document.getElementById('nameSer').value;
        // Llamar a la función que maneja los datos
        addSer(id_esq, nombre);
    });

    const labelEsq = document.createElement('label');
    labelEsq.setAttribute('for', 'selectEsq');
    labelEsq.textContent = '¿Para qué esquema?:';
    form.appendChild(labelEsq);

    const selectEsq = document.createElement('select');
    selectEsq.setAttribute('id', 'selectEsq');
    selectEsq.setAttribute('class', 'form-select w-50');

    const raw = cargarDatos(function(json){
        const raw = JSON.parse(json);

        raw.forEach(element => {
            const option = document.createElement('option');
            option.value = element.id_esq;
            option.textContent = element.nombre;
            selectEsq.appendChild(option);
        })
    })

    form.appendChild(selectEsq);

    const labelNameSer = document.createElement('label');
    labelNameSer.setAttribute('for', 'nameSer');
    labelNameSer.textContent = 'Escriba nombre del servicio:';
    form.appendChild(labelNameSer);

    const nameSer = document.createElement('input');
    nameSer.setAttribute('id', 'nameSer');
    nameSer.setAttribute('type', 'text');
    nameSer.setAttribute('class', 'form-control w-75')
    nameSer.required = true;

    const btnSend = document.createElement('button');
    btnSend.setAttribute('class', 'btn btn-outline-dark');
    btnSend.setAttribute('type', 'submit');
    btnSend.textContent = 'Agregar'

    form.appendChild(nameSer);
    form.appendChild(btnSend);

    bodyAdm.appendChild(form);

}

const addSer = (id_esq, name)=>{
    if(confirmacion("Estas seguro/a de agregar el servicio?")){
        let user = localStorage.getItem('usuario');
        let password = localStorage.getItem('contraseña');

        const data = {
            user: user,
            password: password,
            id_esq: id_esq,
            nombre: name,
            descrip: name
        };

        fetch('https://titulosmda.infinityfreeapp.com/addservicio.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)

        })
        .then(response => response.json())
        .then(result => {
            if(result == "false" || result == false){
                document.getElementById("bodyAdm").innerHTML = '<div class="alert alert-danger text-center" role="alert">No se pudo agregar el servicio</div>'
            }else{
                document.getElementById("bodyAdm").innerHTML = '<div class="alert alert-success text-center" role="alert">¡Se agrego el servicio correctamente!</div>'
            }   
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}

const formDelSer = () => {
    const bodyAdm = document.getElementById('bodyAdm');
    bodyAdm.innerHTML = '<h3 class="text-center">Eliminar Servicio</h3>';

    const form = document.createElement('form');
    form.setAttribute('class', 'formdel');
    form.style = "gap: 8px;"

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar que el formulario se envíe

        const id_ser = document.getElementById('selectSer').value;
        // Llamar a la función que maneja los datos
        delSer(id_ser);
        console.log(id_ser);
    });

    const labelEsq = document.createElement('label');
    labelEsq.setAttribute('for', 'selectEsq');
    labelEsq.textContent = '¿De qué esquema?:';
    form.appendChild(labelEsq);

    const selectEsq = document.createElement('select');
    selectEsq.setAttribute('id', 'selectEsq');
    selectEsq.setAttribute('class', 'form-select w-50');

    const init = document.createElement('option')
    init.textContent = "Seleccione Esquema"
    init.selected = true;
    init.disabled = true;
    selectEsq.appendChild(init)

    // Cargar datos y crear selectEsq
    cargarDatos(function(json){
        const raw = JSON.parse(json);
        raw.forEach(element => {
            const option = document.createElement('option');
            option.value = element.id_esq;
            option.textContent = element.nombre;
            selectEsq.appendChild(option);
        });

        // Agregar evento change al selectEsq
        selectEsq.addEventListener('change', () => {
            const valueEsq = selectEsq.value
            const listServices = raw.find(element => element.id_esq === valueEsq).listservice;

            // Limpiar selectSer
            let selectSer = document.getElementById('selectSer');
            if (selectSer) {
                selectSer.innerHTML = '';
            } else {
                const labelSelectSer = document.createElement('label');
                labelSelectSer.setAttribute('for', 'selectSer');
                labelSelectSer.textContent = '¿Cual servicio?:';
                form.appendChild(labelSelectSer);

                selectSer = document.createElement('select');
                selectSer.setAttribute('id', 'selectSer');
                selectSer.setAttribute('class', 'form-select w-50');
                selectSer.required = true;
            }

            // Crear opciones para selectSer
            listServices.forEach(element => {
                const option = document.createElement('option');
                option.value = element.id_ser;
                option.textContent = element.nombre;
                selectSer.appendChild(option);
            });

            // Agregar selectSer al formulario
            form.appendChild(selectSer);
            let btnSend = document.getElementById('btnSend');
            if (btnSend) {
            form.removeChild(btnSend); // Eliminar btnSend si ya existe
            }
            // Agregar botón de enviar
            btnSend = document.createElement('button');
            btnSend.id = "btnSend"
            btnSend.setAttribute('class', 'btn btn-outline-dark');
            btnSend.setAttribute('type', 'submit');
            btnSend.textContent = 'Eliminar';
            form.appendChild(btnSend);
        });
    });

    form.appendChild(selectEsq);
    bodyAdm.appendChild(form);
};

const delSer = (id_ser) => {
    if(confirmacion("Estas seguro/a de eliminar el servicio?")){
        let user = localStorage.getItem('usuario');
        let password = localStorage.getItem('contraseña');

        const data = {
            user: user,
            password: password,
            id_ser: id_ser,
        };

        fetch('https://titulosmda.infinityfreeapp.com/delservicio.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)

        })
        .then(response => response.json())
        .then(result => {
            if(result == "false" || result == false){
                document.getElementById("bodyAdm").innerHTML = '<div class="alert alert-danger text-center" role="alert">No se pudo eliminar el servicio</div>'
            }else{
                document.getElementById("bodyAdm").innerHTML = '<div class="alert alert-success text-center" role="alert">¡Se elimino el servicio correctamente!</div>'
            }   
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}
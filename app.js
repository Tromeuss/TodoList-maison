    const input = document.querySelector('.inp')
    const toute = document.querySelector('.toutes')
    const faire = document.querySelector('.faire')
    const faite = document.querySelector('.faite')
    let checks = document.querySelectorAll('.chek')
    let text = document.querySelectorAll('.text')
    let poubelle = document.querySelectorAll('.poub')
    const ok = document.querySelector('.ok')
    const none = document.querySelector('.none')
    let lists = document.querySelectorAll('.list')
    const rien = document.querySelector('.rien')
    const container = document.querySelector('.todo')
    const checkok = document.querySelectorAll('.fa-check')

    function change() {
        const checks = document.querySelectorAll('.chek');
        const checkok = document.querySelectorAll('.fa-check');
        const lists = document.querySelectorAll('.list');
      
        for (let i = 0; i < checks.length; i++) {
          if (checks[i].checked) {
            checkok[i].classList.add("fa-solid");
            checkok[i].classList.remove("none");
            lists[i].classList.add('ok');
          } else {
            checkok[i].classList.remove("fa-solid");
            checkok[i].classList.add("none");
            lists[i].classList.remove('ok');
          }
        }
    }

    function aFaire(){
        rien.classList.add("none")
        let number = checks.length
        for(let i = 0; i< number; i++){
            if(checks[i].checked){
                lists[i].classList.add("none")
            } else {
                lists[i].classList.remove("none")
            }
        }
    }


    function Fait(){
        let number = checks.length
        let verif = 0
        for(let i = 0; i< number; i++){
            if(checks[i].checked){
                lists[i].classList.remove("none")
                verif++
            } else {
                lists[i].classList.add("none")
            }
            
            if(i >= number-1) {
                if(verif === 0){
                    rien.classList.remove("none")
                }
            }
        }

    }

    function All(){
        rien.classList.add("none")
        let number = checks.length
        for(let i = 0; i< number; i++){
            lists[i].classList.remove("none")
        }
    }



function Add() {
    const message = input.value;
    const div = document.createElement("div");
    div.classList.add("list");
    const i = document.createElement("i");
    i.classList.add("none");
    i.classList.add("fa-check");
    const cont = document.createElement("div");
    cont.classList.add("cont_check");
    const inp = document.createElement("input");
    inp.setAttribute('type', 'checkbox');
    inp.classList.add("chek");
    const p = document.createElement("p");
    p.classList.add("text");
    p.innerText = `${message}`;
    const ii = document.createElement("i");
    ii.classList.add("fa-solid");
    ii.classList.add("fa-trash-can");
    ii.classList.add("poub");
      
    container.appendChild(div);
    div.appendChild(i);
    div.appendChild(cont);
    div.appendChild(ii);
    cont.appendChild(inp);
    cont.appendChild(p);
      
    const checks = document.querySelectorAll('.chek');
    const poubelle = document.querySelectorAll('.poub');
    const lists = document.querySelectorAll('.list');
      
    for (let i = 0; i < checks.length; i++) {
        checks[i].addEventListener('click', change);
        poubelle[i].addEventListener('click', function() {
        lists[i].remove();
        });
    }
    }
      


    function addList() {
        const inputValue = input.value.trim();
        if (inputValue !== "") {
          Add();
          input.value = "";
          const newCheck = container.lastChild.querySelector(".chek");
          const newPoubelle = container.lastChild.querySelector(".poub");
          const newCheckOk = container.lastChild.querySelector(".fa-check");
          newCheck.addEventListener('click', change);
          newPoubelle.addEventListener('click', function (){
            container.lastChild.remove()
          });
          newCheckOk.addEventListener('click', function() {
            newCheck.click();
          });
        }
    }
      


    faire.addEventListener('click', aFaire)
    faite.addEventListener('click', Fait)
    toute.addEventListener('click', All)



    for(let i = 0; i < checks.length; i++){
        checks[i].addEventListener('click', change)   
    }

    for(let i = 0; i < poubelle.length; i++){
    poubelle[i].addEventListener('click', function (){
        lists[i].remove()
    })
    } 
    
    input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
          addList();
        }
      })
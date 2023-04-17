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



async function appel () {
    try{
        const r = await fetch("https://jsonplaceholder.typicode.com/posts")
        if(!r.ok){
            throw new Error("Erreur serveur...")
        }
        return await r.json()

    }catch(e){
        console.log(e)
    }
}
 

async function reload () {
    for(let i = 0; i<3; i++){
        Add()
    }
    const NewText = document.querySelectorAll(".text")
    try{
        const data = await appel()
        for(let i = 0; i<NewText.length; i++){
            NewText[i].innerHTML = data[i].title
        }
    } catch(e){
        console.log(e)
    }
}




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
        Update()
    }

    function aFaire(){
        const newCheck = document.querySelectorAll('.chek')
        const newList = document.querySelectorAll(".list")
        rien.classList.add("none")
        let number = newCheck.length
        for(let i = 0; i< number; i++){
            if(newCheck[i].checked){
                newList[i].classList.add("none")
            } else {
                newList[i].classList.remove("none")
            }
        }
    }


    function Fait(){
        const newCheck = document.querySelectorAll('.chek')
        const newList = document.querySelectorAll(".list")
        let number = newCheck.length
        let verif = 0
        for(let i = 0; i< number; i++){
            if(newCheck[i].checked){
                newList[i].classList.remove("none")
                verif++
            } else {
                newList[i].classList.add("none")
            }
            
            if(i >= number-1) {
                if(verif === 0){
                    rien.classList.remove("none")
                }
            }
        }

    }

    function All(){
        const newCheck = document.querySelectorAll('.chek')
        const newList = document.querySelectorAll(".list")
        rien.classList.add("none")
        let number = newCheck.length
        for(let i = 0; i< number; i++){
            newList[i].classList.remove("none")
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
    Update()
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
      

    function Update() {
        localStorage.setItem('todo', JSON.stringify(lists))
    }




reload()


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


    


// initialisation des variables //

const input = document.querySelector('.inp')
const colonneTouteLesTodos = document.querySelector('.toutes')
const colonneTodoAFaire = document.querySelector('.faire')
const colonneTodoFaite = document.querySelector('.faite')
let checks = document.querySelectorAll('.chek')
let text = document.querySelectorAll('.text')
let poubelle = document.querySelectorAll('.poub')
let lists = document.querySelectorAll('.list')
const rienFait = document.querySelector('.rien')
const container = document.querySelector('.todo')
            
//                -              //







 // on charge la page de base avec 3 todo génerer par l'api jsonplaceholder //
 start()

async function start () {
    for(let i = 0; i<3; i++){
        addList()
    }
    const NewText = document.querySelectorAll(".text")
    try{
        const data = await appelFetch()
        for(let i = 0; i<NewText.length; i++){
            NewText[i].innerHTML = data[i].title
        }
    } catch(e){
        console.log(e)
    }
}
// function ou on recup les info de l'api //
async function appelFetch () {
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
 


// function pour add une nouvelle todo // 
function addList() {
    const inputValue = input.value.trim();
        Add();
        input.value = "";
        const newCheck = container.lastChild.querySelector(".chek")
        const newPoubelle = container.lastChild.querySelector(".poub")
        newCheck.addEventListener('click', changeCouleur);
        newPoubelle.addEventListener('click', function (){
            container.lastChild.remove()
        })
    }
    


// ajoute la nouvelle todo ( j'aurais du le faire avec une template )//
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
}



// listener pour savoir quelle todos est autoriser a apparaitre dans quelle colonnes//

colonneTodoAFaire.addEventListener('click', todosAFaire)
function todosAFaire(){
    const newCheck = document.querySelectorAll('.chek')
    const newList = document.querySelectorAll(".list")
    rienFait.classList.add("none")
    let number = newCheck.length
    for(let i = 0; i< number; i++){
        if(newCheck[i].checked){
            newList[i].classList.add("none")
        } else {
            newList[i].classList.remove("none")
        }
    }
}


colonneTodoFaite.addEventListener('click', todoFaite)
function todoFaite(){
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
                rienFait.classList.remove("none")
            }
        }
    }

}

colonneTouteLesTodos.addEventListener('click', touteLesTodos)
function touteLesTodos(){
    const newCheck = document.querySelectorAll('.chek')
    const newList = document.querySelectorAll(".list")
    rienFait.classList.add("none")
    let number = newCheck.length
    for(let i = 0; i< number; i++){
        newList[i].classList.remove("none")
    }
}

//               -                //




// détect si une des input est check //
for(let i = 0; i < checks.length; i++){
    checks[i].addEventListener('click', changeCouleur)   
}

// si oui il met la couleur vert + logo validé //
function changeCouleur() {
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




// détect quand une poubelle est cliquer // 
for(let i = 0; i < poubelle.length; i++){
poubelle[i].addEventListener('click', function (){
    // si oui il supp la todo //
    lists[i].remove()
})
} 



// il detecte quand une valeur est entrer dans le input //

input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      addList();
    }
  })
// si oui il crée une nouvelle todo et initialise les variables //


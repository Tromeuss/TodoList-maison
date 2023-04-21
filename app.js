

// initialisation des variables //

const input = document.querySelector('.inp')
const colonneTouteLesTodos = document.querySelector('.toutes')
const colonneTodoAFaire = document.querySelector('.faire')
const colonneTodoFaite = document.querySelector('.faite')
let checks = document.querySelectorAll('.chek')
let text = document.querySelectorAll('.text')
let poubelle = document.querySelectorAll('.poub')
const rienFait = document.querySelector('.rien')
const container = document.querySelector('.todo')
let lists = document.querySelectorAll('.list')
            
//                -              //

// on charge la page a partir du localstorage //
let local = []

start()

async function start () {
  try {
    const data = await appelFetch()
    for (let i = 0; i < 3; i++) {
      addList(data[i].title)
    }
  } catch (e) {
    console.log(e)
  }

  console.log(local)
}


// function pour recup les info de l'api //
async function appelFetch () {
  try {
    const r = await fetch("https://jsonplaceholder.typicode.com/posts")
    if (!r.ok) {
      throw new Error("Erreur serveur...")
    }
    return await r.json()

  } catch (e) {
    console.log(e)
  }
}
 
// function pour ajouter une nouvelle todo, lui ajouter les classes et les listeners // 
function addList(inputValue) {
  Add(inputValue);
  input.value = "";
  const newCheck = container.lastChild.querySelector(".chek");
  const newPoubelle = container.lastChild.querySelector(".poub");
  const index = local.length;
  lists = document.querySelectorAll('.list')
  newPoubelle.setAttribute('data-index', lists.length - 1);
  newCheck.addEventListener('click', changeCouleur);
  newPoubelle.addEventListener('click', function() {
    const index = parseInt(newPoubelle.getAttribute('data-index'));
    local.splice(index, 1);
    lists[index].remove();
    updateIndexes();
  });
  local.push(inputValue);
}

// mettre à jour les attributs "data-index" de chaque icône de poubelle
function updateIndexes() {
  poubelle = document.querySelectorAll('.poub');
  for (let i = 0; i < poubelle.length; i++) {
    poubelle[i].setAttribute('data-index', i);
  }
}

// ajouter une nouvelle todo (avec une template) //
function Add(message) {
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
  ii.setAttribute('data-index',  local.length);
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

// variable qui va stock les todo qui sont cocher //
let checkk = []

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
        if (!checkk.includes(i)) {
            checkk.push(i);
        }
      } else {
        checkok[i].classList.remove("fa-solid");
        checkok[i].classList.add("none");
        lists[i].classList.remove('ok');
        if (checkk.includes(i)) {
            const index = checkk.indexOf(i);
            checkk.splice(index, 1);
        }

        
      }
    }
    console.log(checkk)
}



// détect quand une poubelle est cliquer // 
for(let i = 0; i < poubelle.length; i++){
    poubelle[i].addEventListener('click', function () {
        
    })

}


// il detecte quand une valeur est entrer dans le input //

input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        const inputValue = input.value.trim();
        addList(inputValue)
        console.log(local)
    }
  })
// si oui il crée une nouvelle todo et initialise les variables //




// ----------------- Local Storage -----------//


localStorage.setItem('checkk', checkk);
localStorage.setItem('todo', local)

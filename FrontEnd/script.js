async function init(){
let token = localStorage.getItem("token");

const reponses = await fetch("http://localhost:5678/api/works");
const works = await reponses.json();

// si le token est different de nul afficher les elements modifier
if (token != null) {
  let blackMenu = document.getElementById("modalLink");
  blackMenu.style.display = "block";

  let buttonEdit1 = document.getElementById("edit1");
  buttonEdit1.style.display = "block";

  let buttonEdit2 = document.getElementById("edit2");
  buttonEdit2.style.display = "block";

  let buttonEdit = document.getElementsByClassName("buttonEdit");
  for (let i = 0; i < buttonEdit.length; i += 1) {
    buttonEdit[i].style.display = "block";
  }

  

  document.getElementById("aLogin").innerHTML = "";
  
  let logout = document.createElement("a");
  logout.innerHTML = "logout";
  document.getElementById("aLogin").appendChild(logout);

  logout.addEventListener("click", function (event){
    // event.preventDefault();
    localStorage.removeItem("token");
    
    // localStorage.clear();
  });
}


// activer la modal et l'overlay sur le l'element "modifier"
let buttonEditClick = document.getElementsByClassName("buttonEdit");

for (var i = 0; i < buttonEditClick.length; i++) {
  buttonEditClick[i].addEventListener("click", function () {
    let activateModal = document.getElementById("modal");

    activateModal.style.visibility = "visible";

    document.getElementById("overlay").style.display = "block";
  });
  displayModalGallery(works);
}

// affichage de la gallery avec les icones ...etc
function displayModalGallery(works) {
  for (let work of works) {
    let categoryModal = work.imageUrl;

    let divCategory = document.createElement("div");
    divCategory.setAttribute("id", "divCategory");

    let imageCategory = document.createElement("img");
    imageCategory.setAttribute("data-id", work.id);
    imageCategory.src = categoryModal;
    divCategory.appendChild(imageCategory);

    let iconCross = document.createElement("i");
    iconCross.setAttribute("class", `fa-solid fa-arrows-up-down-left-right`);
    divCategory.appendChild(iconCross);

    let iconWasteBin = document.createElement("i");
    iconWasteBin.setAttribute("class", "fa-sharp fa-regular fa-trash-can");
    divCategory.appendChild(iconWasteBin);

    let edit = document.createElement("p");
    edit.innerHTML = "Editer";
    divCategory.appendChild(edit);

    document.getElementById("galleryModal").appendChild(divCategory);

    iconWasteBin.addEventListener("click", async function (event) {
      event.preventDefault();
      
      let id = imageCategory.getAttribute("data-id");

      await fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: { Authorization: `AuthBearer ${token}` },
      });
    });
  }
}

// fermer la modal et l'overlay
let closedButton = document.getElementById("closed");

closedButton.addEventListener("click", function () {
  let closedModal = document.getElementById("modal");

  closedModal.style.visibility = "hidden";

  document.getElementById("overlay").style.display = "none";
});

// au clic sur ajouter une photo passer a la modal Formulaire
let buttonAdd = document.createElement("button");
buttonAdd.innerHTML = "Ajouter une photo";
document.getElementById("modalFooter").appendChild(buttonAdd);

buttonAdd.addEventListener("click", function () {
  document.getElementById("modal").style.visibility = "hidden";
  // displayModalForm();
  document.getElementById("modalForm").style.visibility = "visible";
});

// element cliquable "supprimer la galerie"
let deleteGallery = document.createElement("p");
deleteGallery.innerHTML = "Supprimer la galerie";
document.getElementById("modalFooter").appendChild(deleteGallery);

deleteGallery.addEventListener("click", function () {
  alert("clic valide");
});
// function displayModalForm() {

// }

// fermer la modal de formulaire et l'overlay
let closedButton2 = document.getElementById("closed2");

closedButton2.addEventListener("click", function () {
  let closedModal = document.getElementById("modalForm");

  closedModal.style.visibility = "hidden";

  document.getElementById("overlay").style.display = "none";
});

// revenir a la modal précédente
let backModal = document.getElementById("back");

backModal.addEventListener("click", function () {
  document.getElementById("modalForm").style.visibility = "hidden";

  document.getElementById("modal").style.visibility = "visible";
});

// let iconPicture = document.createElement("i");
// iconPicture.setAttribute("class", `fa-regular fa-image`);
// document.getElementById("addContent").appendChild(iconPicture);

// let addPictures = document.createElement("button");
// addPictures.innerHTML = "+ Ajouter photo";
// document.getElementById("addContent").appendChild(addPictures);

// let infosPicture = document.createElement("p");
// infosPicture.innerHTML = "jpg, png : 4mo max";
// document.getElementById("addContent").appendChild(infosPicture);

// let buttonValidate = document.createElement("button");
// buttonValidate.innerHTML = "Valider";
// document.getElementById("validateForm").appendChild(buttonValidate);

// let buttonValidate = document.createElement("button");
let form = document.getElementById("form");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  let formData = new FormData(form);

  let picture = formData.get("picture");
  let title = formData.get("title");
  let category = formData.get("category");

  console.log("picture", "title", "category", { picture, title, category });

  console.log("test");

  let response = await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: { Authorization: `AuthBearer ${token}` },
    body: new FormData(form),
  });

  let result = await response.json();

  console.log(response);
  console.log(result);
});

// appel à l'api grace  fetch
const reponse = await fetch("http://localhost:5678/api/categories");
const categories = await reponse.json();

console.log(categories);

let buttonAll = document.createElement("button");
buttonAll.innerText = "Tous";
buttonAll.setAttribute("data-id", 0);
document.getElementById("filters").appendChild(buttonAll);

buttonAll.addEventListener("click", function (event) {
  displayWorks(works);
});

// on creer une boucle pour parcourir le tableau
for (let categorie of categories) {
  // on cherche name dans le tableau categorie
  let categorieName = categorie.name;

  // ajout des elements options dans le select
  let selectCategory = document.createElement("option");
  selectCategory.innerHTML = categorieName;
  selectCategory.setAttribute("value", categorie.id);
  document.getElementById("category").appendChild(selectCategory);

  // on creer un boutton dans HTML
  // grace a createElement
  let button = document.createElement("button");
  // sur le boutton on associe name du tableau categorie
  button.innerText = categorieName;
  // setAttibute vas creer "data-id" et l'id des elements dans le tableau
  button.setAttribute("data-id", categorie.id);
  // on cherche l'id fileters dans HTML et on y associe l'element buttton creer
  document.getElementById("filters").appendChild(button);

  // on ajoute un click sur "button"
  // on y ajoute une fonction et en parametre un evenement
  button.addEventListener("click", function (event) {
    // on cible avec currentTarget sur chaques evenements click sur bouton
    let target = event.currentTarget;
    // on appel a l'evenement click l'id du tableau creer grace setAttribute
    //
    let categorieId = target.getAttribute("data-id");

    // la fonction filter : La méthode filter() sur tableau crée un nouveau tableau avec des éléments
    // qui répondent à un critère donné à partir d’un tableau existant

    // sur le tableau works on filtre chaque elements work categoryId
    // on associe a chaque boutton son tableau correspondant avec le contenu recuperé
    // puis on affiche ce contenu
    let worksFiltered = works.filter(function (work) {
      if (work.categoryId == categorieId) {
        return works;
      }
    });
    displayWorks(worksFiltered);
  });
}

// console.log(works);

displayWorks(works);

function displayWorks(worksArray) {
  document.getElementById("gallery").innerHTML = "";

  for (let work of worksArray) {
    let imageUrl = work.imageUrl;
    let figcaption = work.title;

    let figure = document.createElement("figure");

    let image = document.createElement("img");
    image.src = imageUrl;
    // image.setAttribute("img-id", work.categoryId);
    figure.appendChild(image);

    let figcaptionImg = document.createElement("figcaption");
    figcaptionImg.innerHTML = figcaption;
    figure.appendChild(figcaptionImg);

    document.getElementById("gallery").appendChild(figure);
  }
}

document
  .getElementById("inputImage")
  .addEventListener("change", function (event) {
    let image = document.createElement("img");
    image.setAttribute("id", "img");
    document.getElementById("imgContent").style.display = "none";
    document.getElementById("")
    document.getElementById("addContent").appendChild(image);
    const picture = event.target.files[0];

    if (picture) {
      let reader = new FileReader();

      reader.onload = function (event) {
        image.src = event.target.result;
      };

      reader.readAsDataURL(picture);
    }

    let types = ["image/jpg", "image/jpeg", "image/png"];

    if (types.includes(picture.type)) {
      // On affiche l'image sur la page ...
    }
  });
}

init()
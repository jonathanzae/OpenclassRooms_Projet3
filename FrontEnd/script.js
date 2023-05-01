let token = localStorage.getItem("token");

const reponses = await fetch("http://localhost:5678/api/works");
const works = await reponses.json();

console.log(token);

if (token != null) {
  let buttonEdit = document.getElementsByClassName("buttonEdit");
  for (let i = 0; i < buttonEdit.length; i += 1) {
    buttonEdit[i].style.display = "block";
  }
}

let buttonEditClick = document.getElementsByClassName("buttonEdit");

for (var i = 0; i < buttonEditClick.length; i++) {
  buttonEditClick[i].addEventListener("click", function () {
    let activateModal = document.getElementById("modal");

    activateModal.style.visibility = "visible";

    document.getElementById("overlay").style.display = "block";
  });
  displayModalGallery(works);
}

let closedButton = document.getElementById("closed");

closedButton.addEventListener("click", function () {
  let closedModal = document.getElementById("modal");

  closedModal.style.visibility = "hidden";

  document.getElementById("overlay").style.display = "none";
});

let buttonAdd = document.createElement("button");
buttonAdd.innerHTML = "Ajouter une photo";
document.getElementById("modalFooter").appendChild(buttonAdd);

buttonAdd.addEventListener("click", function () {
  document.getElementById("modal").style.visibility = "hidden";
  // displayModalForm();
  document.getElementById("modalForm").style.visibility = "visible";
});

let deleteGallery = document.createElement("p");
deleteGallery.innerHTML = "Supprimer la galerie";
document.getElementById("modalFooter").appendChild(deleteGallery);

deleteGallery.addEventListener("click", function () {
  alert("clic valide");
});

function displayModalGallery(works) {
  for (let work of works) {
    let categoryModal = work.imageUrl;

    let divCategory = document.createElement("div");

    let imageCategory = document.createElement("img");
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
  }
}

// function displayModalForm() {

// }
let closedButton2 = document.getElementById("closed2");

closedButton2.addEventListener("click", function () {
  let closedModal = document.getElementById("modalForm");

  closedModal.style.visibility = "hidden";

  document.getElementById("overlay").style.display = "none";
});

let backModal = document.getElementById("back");

backModal.addEventListener("click", function () {
  document.getElementById("modalForm").style.visibility = "hidden";

  document.getElementById("modal").style.visibility = "visible";
});

// let addPictures = document.createElement("button");
// addPictures.innerHTML = "+ Ajouter photo";
// document.getElementById("addContent").appendChild(addPictures);

let infosPicture = document.createElement("p");
infosPicture.innerHTML = "jpg, png : 4mo max";
document.getElementById("addContent").appendChild(infosPicture);

// let buttonValidate = document.createElement("button");
// buttonValidate.innerHTML = "Valider";
// document.getElementById("validateForm").appendChild(buttonValidate);

// let buttonValidate = document.createElement("button");
let form = document.getElementById("form");

form.addEventListener("submit", function (event) {
  event.preventDefault;

  // console.log("test");
  // let formData = new FormData(form);

  // let title = formData.get("title");
  // let category = formData.get("category");

  // console.log("title", "category", {title, category});
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

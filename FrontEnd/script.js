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
    displayModalGallery(works);
    activateModal.style.visibility = "visible";

    document.getElementById("overlay").style.display = "block";

  });
  
}

let closedButton = document.getElementById("closed");

closedButton.addEventListener("click", function () {
  let closedModal = document.getElementById("modal");

  closedModal.style.visibility = "hidden";

  document.getElementById("overlay").style.display = "none";
});

function displayModalGallery(works) {
  for (let work of works) {
  let categoryModal = work.imageUrl;

  let divCategory = document.createElement("div");

  // let iconCross = document.createElement("i");
  // iconCross.innerHTML = camera;
  // divCategory.appendChild(iconCross);

  let imageCategory = document.createElement("img");
  imageCategory.src = categoryModal;
  divCategory.appendChild(imageCategory);

  let edit = document.createElement("p");
  edit.innerHTML = "Editer";
  divCategory.appendChild(edit);

  document.getElementById("galleryModal").appendChild(divCategory);
}

let buttonAdd = document.createElement("button");
buttonAdd.innerHTML = "Ajouter une photo";
document.getElementById("modalFooter").appendChild(buttonAdd);

buttonAdd.addEventListener("click", function () {
  document.getElementById("modal").style.visibility = "hidden";
  displayModalForm();
});

let deleteGallery = document.createElement("p");
deleteGallery.innerHTML = "Supprimer la galerie";
document.getElementById("modalFooter").appendChild(deleteGallery);

deleteGallery.addEventListener("click", function () {
  alert("clic valide");
});
}


function displayModalForm() {

  document.getElementById("modalForm").style.visibility = "visible";

  // let crossClosed = document.createElement("a");
  // crossClosed.innerHTML = "X";
  // document.getElementById("modalHeader").appendChild(crossClosed);

  // let titleForm = document.createElement("h2");
  // titleForm.innerHTML = "Ajout photo";
  // document.getElementById("modalHeader").appendChild(titleForm);
}

// appel à l'api grace  fetch
const reponse = await fetch("http://localhost:5678/api/categories");
const categories = await reponse.json();

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

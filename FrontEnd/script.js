// appel à l'api grace  fetch
const reponse = await fetch("http://localhost:5678/api/categories");
const categories = await reponse.json();

// console.log(categories);

let buttonAll = document.createElement("button");
buttonAll.innerText = "Tous";
buttonAll.setAttribute("data-id", 0);
document.getElementById("filters").appendChild(buttonAll);

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
        return work;
      }
    });
    let deleteArray = works.splice();
    console.log(deleteArray);

    let viewNewArray = worksFiltered.splice(worksFiltered);
    console.log(viewNewArray);
  });
}

const reponses = await fetch("http://localhost:5678/api/works");
const works = await reponses.json();

for (let work of works) {
  let imageUrl = work.imageUrl;
  let figcaption = work.title;

  let figure = document.createElement("figure");

  let image = document.createElement("img");
  image.src = imageUrl;
  image.setAttribute("img-id", work.categoryId);
  figure.appendChild(image);

  let figcaptionImg = document.createElement("figcaption");
  figcaptionImg.innerHTML = figcaption;
  figure.appendChild(figcaptionImg);

  document.getElementById("gallery").appendChild(figure);
}

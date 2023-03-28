// appel à l'api grace  fetch
const reponse = await fetch("http://localhost:5678/api/categories");
const categories = await reponse.json();

// on creer une boucle pour parcourir le tableau
for (let categorie of categories) {
  // on cherche name dans le tableau categorie 
  let categorieName = categorie.name;
  
  // on creer un boutton dans HTML
  // grace a createElement 
  let button = document.createElement("button");
  // sur le boutton on associe name du tableau categorie
  button.innerText = categorieName;
  // sur boutton on associe data-id (html) a l'id dans le tableau categorie
  button.setAttribute("data-id", categorie.id);
  // on cherche l'id fileters dans HTML et on y associe l'element buttton creer
  document.getElementById("filters").appendChild(button);


  // on ajoute un click sur "button"
  // on y ajoute une fonction et en parametre un evenement
  button.addEventListener("click", function (event) {
    // on cible avec currentTarget sur chaques evenements click sur bouton
    let target = event.currentTarget;
    let categorieId = target.getAttribute("data-id");
    
    // la fonction filter : La méthode filter() sur tableau crée un nouveau tableau avec des éléments 
    // qui répondent à un critère donné à partir d’un tableau existant
    
    // sur le tableau works on filtre chaque elements work categoryId 
    // on associe a chaque boutton son tableau correspondant avec le contenu recuperé
    // puis on affiche ce contenu 
    let worksFiltered = works.filter(function (work) {
      if(work.categoryId == categorieId){
        return work;
      }
    });
    console.log(worksFiltered);
  });
}

const reponses = await fetch("http://localhost:5678/api/works");
const works = await reponses.json();

for (let work of works) {
  let worksProjects = work.imageUrl;
  let figcaption = work.title;
  // let figureImg = work.;
  
  // console.log(works);
 

  // let figure = document.createElement("figure");
  // figure.innerHTML = figureImg;
  // document.getElementById("gallery").appendChild(figure);

  let project = document.createElement("img");
  project.src = worksProjects;
  document.getElementById("gallery").appendChild(project);

  let figcaptionImg = document.createElement("figcaption");
  figcaptionImg.innerHTML = figcaption;
  document.getElementById("gallery").appendChild(figcaptionImg);
  

  
}

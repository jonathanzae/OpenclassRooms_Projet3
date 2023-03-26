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
    // 
    let target = event.currentTarget;
    let categorieId = target.getAttribute("data-id");
    
    let worksFiltered = works.filter(function (work) {
      // console.log(work);
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

  let projects = document.createElement("img");
  projects.src = worksProjects;
  document.getElementById("gallery").appendChild(projects);

  
}

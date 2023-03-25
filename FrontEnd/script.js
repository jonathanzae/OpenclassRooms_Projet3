// appel à l'api grace  fetch
const reponse = await fetch("http://localhost:5678/api/categories");
const categories = await reponse.json();

// on creer une boucle pour parcourir le tableau
for (let categorie of categories){
    
    let categorieName = categorie.name;

    let button = document.createElement("button");
    button.innerText = categorieName;
    document.getElementById('filters').appendChild(button);

    button.addEventListener("click", function () {
      let categoriesFiltrees = works.filter(function (categorie) {
      return categorie;
    
    });

    console.log(categorie);
    
    });
    
}

const reponses = await fetch("http://localhost:5678/api/works");
const works = await reponses.json();

for (let work of works){

  let worksProjects = work.imageUrl;

  let projects = document.createElement("img")
  projects.src = worksProjects;
  document.getElementById('gallery').appendChild(projects);

  console.log(projects);
}
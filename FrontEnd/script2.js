let image = document.getElementById("img");

function previewImg(event) {

  const [picture] = event.files

  if (picture) {

    let reader = new FileReader();

    reader.onload = function (event) {
      image.src = event.target.result
    }

    reader.readAsDataURL(picture)
  }
  
  let types = [ "image/jpg", "image/jpeg", "image/png" ]; 
  
  
  if (types.includes(picture.type)) {
      // On affiche l'image sur la page ...
  }
}
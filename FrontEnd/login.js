function form(){

    let mail = document.getElementById("email").value;

    let password = document.getElementById("password").value;

    console.log(mail);

    console.log(password);

    // if((mail == "") && (password == "")){
    //     let errorMail = document.getElementById("errorMail");
    //     errorMail.innerHTML = "Remplir Champs";
    //     errorMail.style.color="red";

    //     let errorPass = document.getElementById("errorPass");
    //     errorPass.innerHtml = "";
    //     errorPass.style.color = "red";
    // }

}


// let cors = function (req, reponse) {
//   if (req.method === "OPTIONS"){
    // reponse.setHeader('Acces-control-Allow-Headers', 'Accept, Content-Type')
//   }
// }

const reponse = fetch('http://localhost:5678/api/users/login',{
  method: 'POST',
  // mode:'cors',
  // cache:'no-cache',
  // credentials: 'same-origin',
  headers: {
    'content-type' : 'application/json'
  },
  body: JSON.stringify()
});

console.log(reponse);



// console.log(response);



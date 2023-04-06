function form(){

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

}


let mail = document.getElementById("email").value;

let password = document.getElementById("password").value;

console.log(mail);

console.log(password);


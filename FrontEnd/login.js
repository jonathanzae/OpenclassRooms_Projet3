async function form(){

const reponse = await fetch('http://localhost:5678/api/users/login/posts',{
method: 'POST',
// mode:'cors',
// cache:'no-cache',
// credentials: 'same-origin',
headers: {
  'Accept' : 'application/json',
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

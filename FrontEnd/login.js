let buttonSubmit = document.getElementById("form");

buttonSubmit.addEventListener("submit", async function (event) {
  event.preventDefault();

  let mail = document.getElementById("email").value;

  let password = document.getElementById("password").value;

  console.log(mail);

  console.log(password);

  let body = {
    email: mail,
    password: password,
  };

  const reponse = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    // mode:'cors',
    // cache:'no-cache',
    // credentials: 'same-origin',
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const login = await reponse.json();

  console.log(login);
  console.log(body);

  // let storageToken = window.localStorage.getItem(login.token);

  if (reponse.status == 404) {
    alert("Erreur dans l’identifiant ou le mot de passe");
  } else {
    window.localStorage.setItem("token", login.token);
    document.location = "index.html";
  }
});

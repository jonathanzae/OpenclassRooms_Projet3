let buttonSubmit = document.getElementById("form");

buttonSubmit.addEventListener("submit", async function (event) {
  event.preventDefault();

  let mail = document.getElementById("email").value;

  let password = document.getElementById("password").value;

  let body = {
    email: mail,
    password: password,
  };

  const reponse = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const login = await reponse.json();

  if (reponse.status == 404) {
    error = document.getElementById("error");
    error.innerHTML = "Erreur dans l’identifiant ou le mot de passe";
    error.style.color = "red";
    
  } else {
    window.localStorage.setItem("token", login.token);
    document.location = "index.html";
  }
});

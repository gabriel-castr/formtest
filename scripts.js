const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const gender = document.getElementById("gender");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkInputs();
});

function checkInputs() {
  const usernameValue = username.value;
  const emailValue = email.value;
  const phoneValue = phone.value;
  const genderValue = gender.value;

  if (usernameValue === "") {
    setErrorFor(username, "O nome de utilizador é obrigatório.");
  } else {
    setSuccessFor(username);
  }

  if (emailValue === "") {
    setErrorFor(email, "O email é obrigatório.");
  } else if (!checkEmail(emailValue)) {
    setErrorFor(email, "Por favor, insira um email válido.");
  } else {
    setSuccessFor(email);
  }

  if (phoneValue === "") {
    setErrorFor(phone, "O contacto é obrigatório.");
  } else if (phoneValue.length != 9) {
    setErrorFor(phone, "O contacto precisa de ter no mínimo 9 dígitos.");
  } else {
    setSuccessFor(phone);
  }

  if(genderValue === "") {
    setErrorFor(gender, "Selecione uma opção.");
  } else {
    setSuccessFor(gender);
  }

  const formControls = form.querySelectorAll(".form-control");

  const formIsValid = [...formControls].every((formControl) => {
    return formControl.className === "form-control success";
  });

  if (formIsValid) {
    saveFile();
  }
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");

  // Adiciona a mensagem de erro
  small.innerText = message;

  // Adiciona a classe de erro
  formControl.className = "form-control error";
}

function setSuccessFor(input) {
  const formControl = input.parentElement;

  // Adicionar a classe de sucesso
  formControl.className = "form-control success";
}

function checkEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

// Script de download

let saveFile = () => {
    // Receber os dados de cada elemento.
    const username = document.getElementById("username");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const gender = document.getElementById("gender");
  
    // Esta variavel guarda todos os dados.
    let data =
      "\r Nome: " +
      username.value +
      " \r\n " +
      "Email: " +
      email.value +
      " \r\n " +
      "Telefone: " +
      phone.value +
      " \r\n " +
      "Sexo: " +
      gender.value;
    console.log(data); 
    // Converção de texto para BLOB.
    const textToBLOB = new Blob([data], { type: "text/plain" });
    var filename = "formulario";
  
    let newLink = document.createElement("a");
    newLink.download = "formulario";
  
    if (window.webkitURL != null) {
      newLink.href = window.webkitURL.createObjectURL(textToBLOB);
    } else {
      newLink.href = window.URL.createObjectURL(textToBLOB);
      newLink.style.display = "none";
      document.body.appendChild(newLink);
    }
  
    newLink.click();
  };
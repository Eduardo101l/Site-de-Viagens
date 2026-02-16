const form = document.getElementById("formCadastro");

if (form) {
form.addEventListener("submit", async function(e) {


  e.preventDefault();

  const pessoa = {
    nome: document.getElementById("nome").value,
    telefone: document.getElementById("telefone").value,
    cpf: document.getElementById("cpf").value,
    cidade: document.getElementById("cidade").value
  };

  await fetch("http://localhost:3000/passageiros", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(pessoa)
  });

  alert("Passageiro salvo no banco de dados!");
  form.reset();
});
}



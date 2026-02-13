const SENHA_ADMIN = "1234";
let modoAdmin = false;

const form = document.getElementById("formCadastro");

if (form) {
  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const pessoa = {
      nome: document.getElementById("nome").value,
      telefone: document.getElementById("telefone").value,
      cpf: document.getElementById("cpf").value,
      cidade: document.getElementById("cidade").value
    };

    let passageiros = JSON.parse(localStorage.getItem("passageiros")) || [];
    passageiros.push(pessoa);
    localStorage.setItem("passageiros", JSON.stringify(passageiros));

    alert("Passageiro cadastrado com sucesso!");
    form.reset();
  });
}
const btnAdmin = document.getElementById("btnAdmin");

if (btnAdmin) {
  btnAdmin.addEventListener("click", function() {
    window.location.href = "admin.html";
  });
}

function ativarAdmin() {
  const senha = document.getElementById("senhaAdmin").value;

  if (senha === SENHA_ADMIN) {
    modoAdmin = true;
    mostrarListaAdmin();
  } else {
    alert("Senha incorreta!");
  }
}

function mostrarListaAdmin() {
  const listaDiv = document.getElementById("listaAdmin");
  let passageiros = JSON.parse(localStorage.getItem("passageiros")) || [];

  if (passageiros.length === 0) {
    listaDiv.innerHTML = "Nenhum passageiro cadastrado.";
    return;
  }

  let tabela = `
    <table border="1" width="100%" style="border-collapse: collapse; text-align: center;">
      <tr style="background:#2a5298; color:white;">
        <th>Nome</th>
        <th>Telefone</th>
        <th>CPF</th>
        <th>Cidade</th>
        <th>Ação</th>
      </tr>
  `;

  passageiros.forEach((p, index) => {
    tabela += `
      <tr>
        <td>${p.nome}</td>
        <td>${p.telefone}</td>
        <td>${p.cpf}</td>
        <td>${p.cidade}</td>
        <td>
          <button onclick="excluir(${index})" style="background:red;">Excluir</button>
        </td>
      </tr>
    `;
  });

  tabela += "</table>";
  listaDiv.innerHTML = tabela;
}

function excluir(index) {
  if (!modoAdmin) return;

  let passageiros = JSON.parse(localStorage.getItem("passageiros")) || [];
  passageiros.splice(index, 1);
  localStorage.setItem("passageiros", JSON.stringify(passageiros));
  mostrarListaAdmin();
}


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

// --- SLIDES LATERAIS SUAVES ---

const imagens = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
  "https://images.unsplash.com/photo-1526772662000-3f88f10405ff"
];

const esqImgs = [document.getElementById("imgEsq1"), document.getElementById("imgEsq2")];
const dirImgs = [document.getElementById("imgDir1"), document.getElementById("imgDir2")];

let indexImg = 0;
let ativo = 0;

function trocarImagensSuave() {
  if (!esqImgs[0] || !dirImgs[0]) return;

  let prox = 1 - ativo;

  esqImgs[prox].src = imagens[indexImg % imagens.length];
  dirImgs[prox].src = imagens[(indexImg + 2) % imagens.length];

  esqImgs[prox].classList.add("ativa");
  dirImgs[prox].classList.add("ativa");

  esqImgs[ativo].classList.remove("ativa");
  dirImgs[ativo].classList.remove("ativa");

  ativo = prox;
  indexImg++;
}

trocarImagensSuave();
setInterval(trocarImagensSuave, 5000);


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/viagens");

const PassageiroSchema = new mongoose.Schema({
  nome: String,
  telefone: String,
  cpf: String,
  cidade: String
});

const Passageiro = mongoose.model("Passageiro", PassageiroSchema);

// Rota para cadastrar passageiro
app.post("/passageiros", async (req, res) => {
  const novo = new Passageiro(req.body);
  await novo.save();
  res.json({ mensagem: "Passageiro salvo no banco!" });
});

// Rota para listar passageiros
app.get("/passageiros", async (req, res) => {
  const lista = await Passageiro.find();
  res.json(lista);
});

// Rota para deletar
app.delete("/passageiros/:id", async (req, res) => {
  await Passageiro.findByIdAndDelete(req.params.id);
  res.json({ mensagem: "Excluído com sucesso" });
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});

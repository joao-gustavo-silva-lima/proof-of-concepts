import express, { type Request } from "express";
import cors, { type CorsOptions, type CorsOptionsDelegate } from "cors";

const app = express();

const routesWhiteList = new Map([
  ["/api/produtos", "https://loja-parceira.com"],
]);

const corsOptionsDelegate: CorsOptionsDelegate = (req, callback) => {
  const currentPath = (req as Request).path;

  var corsOptions: CorsOptions = {
    origin: routesWhiteList.get(currentPath) || "*",
  };

  callback(null, corsOptions);
};

app.use(cors(corsOptionsDelegate));

app.get("/api/produtos", (req, res) => {
  res.json({ produto: "Notebook Gamer", preco: 4500 });
});

app.get("/api/status", (req, res) => {
  res.json({ status: "Online e operando livremente para todos!" });
});

app.listen(3000, () => {
  console.log("Servidor de desafio rodando na porta 3000");
});

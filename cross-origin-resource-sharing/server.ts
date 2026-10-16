import express, { type Request } from "express";
import cors, { type CorsOptions, type CorsOptionsDelegate } from "cors";

const app = express();

const originsWhiteList = new Map([
  ["/api/produtos", /^https\:\/\/(?:.+\.)*loja-parceira\.com$/],
]);
const credentialedRoutes = new Set(["/api/produtos"]);

const corsOptionsDelegate: CorsOptionsDelegate = (req, callback) => {
  const currentPath = (req as Request).path;
  const isCredentialedRoute = credentialedRoutes.has(currentPath);

  var corsOptions: CorsOptions = {
    credentials: isCredentialedRoute,
    origin:
      originsWhiteList.get(currentPath) || (isCredentialedRoute ? false : "*"),
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

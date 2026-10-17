import express from "express";

const app = express();

const routesCoops = new Map([
  ["/dashboard", "same-origin"],
  ["/auth/login", "same-origin-allow-popups"],
]);

app.use((req, res, next) => {
  res.setHeader(
    "cross-origin-opener-policy",
    routesCoops.get(req.path) || "same-origin",
  );

  next();
});

app.get("/dashboard", (req, res) => {
  res.send("Painel de Controle Altamente Isolado");
});

app.get("/auth/login", (req, res) => {
  res.send("Página de Login com suporte a Pop-ups");
});

app.listen(3000, () => {
  console.log("Servidor de COOP rodando na porta 3000");
});

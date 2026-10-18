import express from "express";
const app = express();

const frameableRoutes = new Set(["/widgets/public-feed"]);

app.use((req, res, next) => {
  const isFrameableRoute = frameableRoutes.has(req.path);

  res.setHeader("X-Frame-Options", isFrameableRoute ? "SAMEORIGIN" : "DENY");

  next();
});

app.get("/admin/settings", (req, res) => {
  res.send("Painel Administrativo - Proteção máxima contra iframes");
});

app.get("/widgets/public-feed", (req, res) => {
  res.send("Feed embutível - Permitido apenas na mesma origem");
});

app.get("/sobre", (req, res) => {
  res.send("Página institucional padrão");
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});

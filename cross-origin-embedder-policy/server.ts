import express from "express";

const app = express();

const isolatedRoutes = new Set(["/heavy-processing"]);

app.use((req, res, next) => {
  const isIsolatedRoute = isolatedRoutes.has(req.path);

  res.setHeader(
    "Cross-Origin-Embedder-Policy",
    isIsolatedRoute ? "require-corp" : "unsafe-none",
  );
  res.setHeader(
    "Cross-Origin-Opener-Policy",
    isIsolatedRoute ? "same-origin" : "unsafe-none",
  );

  next();
});

app.get("/", (req, res) => {
  res.send("Página normal da aplicação");
});

app.get("/heavy-processing", (req, res) => {
  // Esta rota DEVE estar totalmente isolada (COOP: same-origin e COEP: require-corp)
  res.send("Ambiente de alta performance ativado com SharedArrayBuffer!");
});

app.listen(3000, () => {
  console.log("Servidor de Cross-Origin Isolation rodando na porta 3000");
});

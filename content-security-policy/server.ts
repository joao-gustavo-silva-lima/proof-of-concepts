import nodeHttp = require("node:http");

const server = nodeHttp.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self'",
  );

  res.end(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <title>Desafio CSP</title>
    </head>
    <body>
        <h1>Servidor Nativo com CSP Ativo!</h1>
        <script>
            // Este script inline deve ser bloqueado pelo CSP se configurado corretamente
            console.log('Script inline executado!');
        </script>
    </body>
    </html>
  `);
});

server.listen(8080, () => console.log("Server running locally at PORT 8080"));

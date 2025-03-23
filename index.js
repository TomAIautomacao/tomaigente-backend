const express = require('express');
const app = express();

app.use(express.json());

app.post('/', (req, res) => {
  const { jid, text } = req.body;
  console.log(`Mensagem recebida: jid=${jid} | text=${text}`);
  return res.status(200).json({
    status: 'recebido',
    para: jid,
    texto: text
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

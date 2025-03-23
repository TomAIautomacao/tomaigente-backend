const express = require('express');
const axios = require('axios');
require('dotenv').config(); // para ler a variável APIKEY do Railway

const app = express();
app.use(express.json());

app.post('/', async (req, res) => {
  const { session, number, text } = req.body;

  console.log(`Mensagem recebida => número: ${number} | texto: ${text}`);

  try {
    const response = await axios.post('https://evolucionai-evolutionapi.avbrhj.easypanel.host/message/send-text', {
      session,
      number,
      text,
    }, {
      headers: {
        'apikey': process.env.APIKEY,
        'Content-Type': 'application/json'
      }
    });

    console.log('Resposta da API:', response.data);

    return res.status(200).json({
      status: 'sucesso',
      enviado_para: number,
      resposta_da_api: response.data,
    });

  } catch (error) {
    console.error('Erro ao enviar mensagem:', error.response?.data || error.message);
    return res.status(500).json({
      status: 'erro',
      mensagem: 'Falha ao enviar mensagem via EvolutionAPI',
      erro: error.response?.data || error.message
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

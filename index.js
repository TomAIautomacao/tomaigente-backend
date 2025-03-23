const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post('/', async (req, res) => {
  const { number, text, session } = req.body;

  console.log(`➡️ Mensagem recebida para envio: ${number} | ${text}`);

  try {
    const response = await axios.post(
      'https://evolucionai-evolutionapi.avbrhj.easypanel.host/message/sendText',
      {
        session, // Ex: "teste"
        number,  // Ex: "5527998369293@s.whatsapp.net"
        text     // Ex: "Olá! Aqui está sua resposta..."
      },
      {
        headers: {
          'apikey': process.env.APIKEY, // ⚠️ configure no Railway em "Variables"
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('✅ Mensagem enviada com sucesso:', response.data);

    return res.status(200).json({
      status: 'mensagem enviada',
      para: number,
      texto: text,
      response: response.data
    });

  } catch (error) {
    console.error('❌ Erro ao enviar mensagem:', error.message);

    return res.status(500).json({
      status: 'erro ao enviar',
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

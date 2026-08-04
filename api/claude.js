// Esta función corre en el servidor de Vercel, nunca en el navegador.
// Por eso la clave de Anthropic (ANTHROPIC_API_KEY) está a salvo aquí.
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Falta configurar ANTHROPIC_API_KEY en Vercel' });
  }

  try {
    const { system, messages, max_tokens } = req.body;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-5',
        max_tokens: max_tokens || 1000,
        system,
        messages
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Error de Anthropic:', data);
      return res.status(response.status).json({ error: data.error || 'Error al llamar a la IA' });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

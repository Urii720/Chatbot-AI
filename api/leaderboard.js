import { createClient } from '@supabase/supabase-js';

function getClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export default async function handler(req, res) {
  const supabase = getClient();
  if (!supabase) {
    return res.status(500).json({ error: 'Falta configurar SUPABASE_URL / SUPABASE_SERVICE_KEY en Vercel' });
  }

  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('leaderboard')
      .select('name, score, product')
      .order('score', { ascending: false })
      .limit(5);

    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'No se pudo leer el ranking' });
    }
    return res.status(200).json(data);
  }

  if (req.method === 'POST') {
    try {
      const { name, score, product } = req.body;

      // Validación básica: nunca te fíes de lo que llega del navegador.
      const cleanName = String(name || 'anónimo').trim().slice(0, 24);
      const cleanScore = Math.max(0, Math.min(10, Number(score) || 0));
      const cleanProduct = String(product || '').trim().slice(0, 60);

      const { error } = await supabase
        .from('leaderboard')
        .insert({ name: cleanName, score: cleanScore, product: cleanProduct });

      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'No se pudo guardar en el ranking' });
      }
      return res.status(200).json({ ok: true });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Petición inválida' });
    }
  }

  res.status(405).json({ error: 'Método no permitido' });
}

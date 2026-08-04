# Puerta Fría — cómo publicarla como web real

Vas a necesitar tres cuentas gratuitas: **Anthropic** (la IA), **Supabase**
(el ranking) y **Vercel** (donde vive la web). Ninguna te pide tarjeta para
el nivel gratuito, excepto Anthropic, que sí, porque la IA se paga por uso
(pero es céntimos: cada partida cuesta una fracción de céntimo).

## 1. Clave de Anthropic

1. Ve a https://console.anthropic.com y crea una cuenta.
2. En el menú, entra en **API Keys** → **Create Key**. Cópiala, la
   necesitarás en el paso 4. Guárdala en un sitio seguro, no la compartas.
3. En **Billing**, añade una forma de pago y un límite de gasto pequeño
   (por ejemplo, 5€) para no llevarte sorpresas.

## 2. Base de datos en Supabase (el ranking)

1. Ve a https://supabase.com, crea una cuenta y un proyecto nuevo
   (elige la región más cercana a ti).
2. En el menú lateral, abre **SQL Editor** → **New query**.
3. Copia y pega el contenido del archivo `supabase-setup.sql` que te he
   dado, y pulsa **Run**. Esto crea la tabla del ranking.
4. Ve a **Project Settings** → **API**. Ahí tienes dos datos que necesitas:
   - **Project URL**
   - **service_role key** (no la "anon key" — la "service_role", que es
     secreta y solo se usa en el servidor)

## 3. Subir el código a GitHub

1. Ve a https://github.com, crea una cuenta si no tienes.
2. Crea un repositorio nuevo (el botón verde "New").
3. Sube ahí todos los archivos que te he dado en esta carpeta
   (`index.html`, la carpeta `api`, `package.json`) — puedes arrastrarlos
   directamente a la página de GitHub, en "uploading an existing file".

## 4. Desplegar en Vercel

1. Ve a https://vercel.com y crea una cuenta con tu GitHub (botón
   "Continue with GitHub").
2. Pulsa **Add New → Project**, y elige el repositorio que acabas de subir.
3. Antes de darle a "Deploy", abre **Environment Variables** y añade estas
   tres (nombre a la izquierda, valor a la derecha):
   - `ANTHROPIC_API_KEY` → la clave del paso 1
   - `SUPABASE_URL` → la URL del paso 2
   - `SUPABASE_SERVICE_KEY` → la service_role key del paso 2
4. Pulsa **Deploy**. En un par de minutos te da una URL tipo
   `puerta-fria.vercel.app` — esa ya es tu web real, funcionando de verdad.

## Si cambias el código más adelante

Cada vez que subas cambios nuevos al repositorio de GitHub, Vercel vuelve a
desplegar la web sola, automáticamente. No hace falta repetir estos pasos.

## Nota sobre costes

- Vercel y Supabase: gratis para este uso (tráfico bajo/medio).
- Anthropic: unos pocos céntimos por cada partida jugada (llamada de
  conversación + llamada de evaluación). Si la web la usan pocas personas,
  esto no debería pasar de un par de euros al mes.

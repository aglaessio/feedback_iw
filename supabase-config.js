import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://your-supabase-url.supabase.co'; // Substitua pelo seu URL do Supabase
const supabaseKey = 'your-supabase-key'; // Substitua pela sua chave do Supabase

if (!supabaseUrl || !supabaseKey) {
    console.error("Erro: As credenciais do Supabase não foram definidas corretamente.");
}

const supabase = createClient(supabaseUrl, supabaseKey);
console.log("Supabase inicializado com sucesso:", supabase);

export default supabase;
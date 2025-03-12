import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://seu-supabase-url.supabase.co'; // Substitua pelo seu URL do Supabase
const supabaseKey = 'sua-chave-publica'; // Substitua pela sua chave pública do Supabase

if (!supabaseUrl || !supabaseKey) {
    console.error("Erro: As credenciais do Supabase não foram definidas corretamente.");
}

const supabase = createClient(supabaseUrl, supabaseKey);
console.log("Supabase inicializado com sucesso:", supabase);

export default supabase;

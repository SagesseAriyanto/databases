/* 
  Supabase uses standard PostgreSQL. You own your data. 
  The JS library is a portable "translator" that stays in 
  your project even if you stop paying for the hosting.
*/

// THE TRANSLATOR: Load the tool that turns JS into SQL
const { createClient } = require('@supabase/supabase-js');

// The location of your database
const supabaseUrl = 'https://xyz.supabase.co';

/* THE KEYS (choose one):
   - Service Role Key: Best for Express. Master access (Master Badge).
   - Anon Key: Best for React. Limited access (Visitor Badge).
*/
const ANON_KEY = 'your-anon-key';
const SERVICE_KEY = 'your-service-role-key';

// The active connection object used to send commands (toggle between anon or service key)
const supabase = createClient(supabaseUrl, ANON_KEY);

module.exports = supabase;
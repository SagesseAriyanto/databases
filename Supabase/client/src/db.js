/* Supabase uses standard PostgreSQL. You own your data. 
  The JS library is a portable "translator" that stays in 
  your project even if you stop paying for the hosting.
*/

// THE TRANSLATOR: Load the tool using "import" (The React Way)
import { createClient } from '@supabase/supabase-js';

// The location of your database
const supabaseUrl = 'https://iyumkgakqnfzgaduygad.supabase.co';

/* THE KEYS (choose one):
   - Service Role Key: Best for Express. Master access (Master Badge).
   - Anon Key: Best for React. Limited access (Visitor Badge).
*/
const ANON_KEY = 'sb_publishable_t_0gFNCHpX1WbX_YwxcIiQ_ZuiQG68H';

// The active connection object used to send commands
// Note: We use "export" so App.jsx can use this connection
export const supabase = createClient(supabaseUrl, ANON_KEY);
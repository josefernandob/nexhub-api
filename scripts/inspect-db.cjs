require('dotenv').config({ quiet: true });
const fs = require('node:fs');
const { Client } = require('pg');
const url = new URL(process.env.DATABASE_URL);
for (const key of ['sslmode', 'sslrootcert', 'sslcert', 'sslkey']) url.searchParams.delete(key);
const client = new Client({ connectionString: url.toString(), ssl: { ca: fs.readFileSync(process.env.DATABASE_CA_PATH || 'C:/Users/Fernando/Downloads/prod-ca-2021.crt', 'utf8'), rejectUnauthorized: true }, connectionTimeoutMillis: 12000 });
(async () => {
  try {
    await client.connect();
    const result = await client.query("SELECT table_schema, table_name FROM information_schema.tables WHERE table_schema IN ('public','nexhub') ORDER BY 1,2");
    console.log(JSON.stringify(result.rows));
    const security = await client.query("SELECT c.relname AS table_name, c.relrowsecurity AS rls, has_table_privilege('anon', c.oid, 'SELECT') AS anon_read, has_table_privilege('authenticated', c.oid, 'SELECT') AS authenticated_read FROM pg_class c JOIN pg_namespace n ON n.oid=c.relnamespace WHERE n.nspname='nexhub' AND c.relkind='r'");
    console.log(JSON.stringify(security.rows));
  } catch (error) { console.error('Inspeção falhou:', error.code || 'connection'); process.exitCode = 1; }
  finally { await client.end(); }
})();

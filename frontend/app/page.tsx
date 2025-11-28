// We use the internal docker URL because this runs on the server
import { Condominium } from './types/page';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

const STRAPI_URL = process.env.INTERNAL_API_URL || 'http://backend:1337';

async function getCondominiums() {
  const res = await fetch(`${STRAPI_URL}/api/condominiums`, { 
    cache: 'no-store' // Only for dev: ensures we always get fresh data
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch condominiums');
  }
 
  return res.json();
}

export default async function Home() {
  const { data: condominiumData } = await getCondominiums();
  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>My Dockerized Condominiums</h1>
      <p>Fetching data from: {STRAPI_URL}</p>
      
      <div style={{ marginTop: '2rem' }}>
        {condominiumData.map((condominium: Condominium) => (
          <div key={condominium.id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem', borderRadius: '8px' }}>
            <h2>{condominium.project_title}</h2>
            {/* Note: Strapi usually returns markdown or blocks for content, we just dump it here for testing */}
            <BlocksRenderer content={condominium.content as any} />
          </div>
        ))}
      </div>
    </main>
  );
}
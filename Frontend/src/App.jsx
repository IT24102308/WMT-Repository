import { useState } from 'react';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';
import './App.css';

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleItemAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>WMT Item Manager</h1>
        <p className="subtitle">Manage your inventory with style</p>
      </header>

      <main className="app-main">
        <aside className="sidebar">
          <ItemForm onItemAdded={handleItemAdded} />
        </aside>
        
        <section className="content">
          <ItemList refreshTrigger={refreshTrigger} />
        </section>
      </main>

      <footer className="app-footer">
        <p>&copy; 2024 WMT Lab. Built with MERN Stack.</p>
      </footer>

      <style>{`
        :root {
          --primary-bg: #0f172a;
          --accent-color: #646cff;
        }
        
        body {
          margin: 0;
          background-color: var(--primary-bg);
          color: #f8fafc;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .app-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .app-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .app-header h1 {
          font-size: 3rem;
          margin: 0;
          background: linear-gradient(135deg, #fff 0%, #94a3b8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: -0.02em;
        }

        .subtitle {
          color: #94a3b8;
          font-size: 1.1rem;
          margin-top: 0.5rem;
        }

        .app-main {
          display: grid;
          grid-template-columns: 350px 1fr;
          gap: 3rem;
          flex: 1;
        }

        @media (max-width: 900px) {
          .app-main {
            grid-template-columns: 1fr;
          }
          .sidebar {
            order: 1;
          }
          .content {
            order: 2;
          }
        }

        .app-footer {
          margin-top: 4rem;
          text-align: center;
          padding: 2rem 0;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          color: #64748b;
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
}

export default App;

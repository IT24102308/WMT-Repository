import { useEffect, useState } from 'react';
import { getItems, deleteItem } from '../api';

export default function ItemList({ refreshTrigger }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, [refreshTrigger]);

  const fetchItems = async () => {
    try {
      const { data } = await getItems();
      setItems(data);
    } catch (err) {
      console.error('Error fetching items:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteItem(id);
        fetchItems();
      } catch (err) {
        console.error('Error deleting item:', err);
      }
    }
  };

  if (loading) return <div className="loading">Loading items...</div>;

  return (
    <div className="item-list-container">
      <h2>Current Inventory</h2>
      <div className="items-grid">
        {items.length === 0 ? (
          <p className="no-items">No items found. Add some!</p>
        ) : (
          items.map((item) => (
            <div key={item._id} className="item-card">
              <div className="item-info">
                <h3>{item.name}</h3>
                <p className="description">{item.description}</p>
                <p className="price">${item.price?.toFixed(2)}</p>
              </div>
              <button 
                onClick={() => handleDelete(item._id)} 
                className="delete-btn"
                title="Delete item"
              >
                &times;
              </button>
            </div>
          ))
        )}
      </div>

      <style>{`
        .item-list-container h2 {
          margin-bottom: 1.5rem;
          color: #fff;
          font-weight: 600;
        }
        .items-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }
        .item-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border-radius: 12px;
          padding: 1.5rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          position: relative;
          transition: transform 0.3s, box-shadow 0.3s;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .item-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
          border-color: rgba(100, 108, 255, 0.5);
        }
        .item-info h3 {
          margin: 0 0 0.5rem 0;
          color: #fff;
          font-size: 1.25rem;
        }
        .description {
          color: #aaa;
          font-size: 0.9rem;
          margin-bottom: 1rem;
          line-height: 1.4;
        }
        .price {
          color: #646cff;
          font-weight: 700;
          font-size: 1.1rem;
          margin: 0;
        }
        .delete-btn {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          background: none;
          border: none;
          color: #ff4d4d;
          font-size: 1.5rem;
          cursor: pointer;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: background 0.2s;
        }
        .delete-btn:hover {
          background: rgba(255, 77, 77, 0.1);
        }
        .no-items {
          color: #888;
          font-style: italic;
          grid-column: 1 / -1;
          text-align: center;
          padding: 2rem;
        }
        .loading {
          text-align: center;
          color: #888;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
}

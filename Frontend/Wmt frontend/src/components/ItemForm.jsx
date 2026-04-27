import { useState } from 'react';
import { createItem } from '../api';

export default function ItemForm({ onItemAdded }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createItem({ name, description, price: Number(price) });
      setName('');
      setDescription('');
      setPrice('');
      onItemAdded();
    } catch (err) {
      console.error('Error adding item:', err);
      alert('Failed to add item');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="item-form">
        <h2>Add New Item</h2>
        <div className="input-group">
          <label htmlFor="name">Item Name</label>
          <input
            id="name"
            placeholder="Enter item name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="description">Description</label>
          <input
            id="description"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="price">Price ($)</label>
          <input
            id="price"
            type="number"
            step="0.01"
            placeholder="0.00"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Add Item</button>
      </form>

      <style>{`
        .form-container {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          padding: 2rem;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          margin-bottom: 2rem;
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
        }
        .item-form h2 {
          margin-top: 0;
          margin-bottom: 1.5rem;
          color: #fff;
          font-weight: 600;
        }
        .input-group {
          margin-bottom: 1.2rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .input-group label {
          color: #ccc;
          font-size: 0.9rem;
        }
        .input-group input {
          padding: 0.8rem 1rem;
          border-radius: 8px;
          border: 1px solid #444;
          background: #1a1a1a;
          color: #fff;
          font-size: 1rem;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .input-group input:focus {
          outline: none;
          border-color: #646cff;
          box-shadow: 0 0 0 2px rgba(100, 108, 255, 0.3);
        }
        .submit-btn {
          width: 100%;
          padding: 0.8rem;
          border-radius: 8px;
          border: none;
          background: linear-gradient(135deg, #646cff 0%, #535bf2 100%);
          color: white;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          margin-top: 0.5rem;
        }
        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(100, 108, 255, 0.4);
        }
        .submit-btn:active {
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}
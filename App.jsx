import React, { useState } from 'react';
import './App.css';

// 9 Unique Futuristic Gadgets & Tech Accessories under Rs. 4000
const initialProducts = [
  { id: 1, name: "Smart AI Audio Glasses", price: 3900, img: "https://unsplash.com" },
  { id: 2, name: "Cyberpunk Mechanical Keyboard", price: 3400, img: "https://unsplash.com" },
  { id: 3, name: "Holographic RGB Desk Lamp", price: 2100, img: "https://unsplash.com" },
  { id: 4, name: "Transparent Wireless Earbuds", price: 2800, img: "https://unsplash.com" },
  { id: 5, name: "RGB Ergonomic Gaming Mouse", price: 1650, img: "https://unsplash.com" },
  { id: 6, name: "Magnetic Floating Globe", price: 3500, img: "https://unsplash.com" },
  { id: 7, name: "Smart Fitness Tracker Band", price: 2400, img: "https://unsplash.com" },
  { id: 8, name: "Portable Mini Drone Quadcopter", price: 3850, img: "https://unsplash.com" },
  { id: 9, name: "Retro Pixel Art Display Box", price: 3200, img: "https://unsplash.com" }
];

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newImg, setNewImg] = useState('');

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newName || !newPrice) return alert("Please fill Name and Price!");
    if (Number(newPrice) > 4000) return alert("System Overload: Budget limit must be under Rs. 4000!");
    
    const newProduct = {
      id: Date.now(),
      name: newName,
      price: Number(newPrice),
      img: newImg || "https://unsplash.com"
    };

    setProducts([...products, newProduct]);
    setNewName('');
    setNewPrice('');
    setNewImg('');
  };

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.qty), 0);

  return (
    <div>
      <nav className="navbar">
        <h2>⚡ NEXUS LABS</h2>
        <div>
          <strong>System Cart:</strong> {cart.reduce((a, b) => a + b.qty, 0)}
        </div>
      </nav>

      {/* Admin Panel */}
      <div className="admin-section">
        <h3>🌌 Developer Console: Inject New Tech Asset</h3>
        <form onSubmit={handleAddProduct} style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center' }}>
          <input type="text" placeholder="Gadget Name (e.g. VR Set)" value={newName} onChange={(e) => setNewName(e.target.value)} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ff007f', flex: 1, background: '#111', color: '#fff' }} />
          <input type="number" placeholder="Price (Max 4000)" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ff007f', width: '150px', background: '#111', color: '#fff' }} />
          <input type="text" placeholder="Image Asset URL" value={newImg} onChange={(e) => setNewImg(e.target.value)} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ff007f', flex: 1, background: '#111', color: '#fff' }} />
          <button type="submit" className="btn" style={{ width: 'auto', background: '#00ffff', color: '#000', fontWeight: 'bold' }}>Deploy Code</button>
        </form>
      </div>

      {/* Tech Cards Grid */}
      <div className="product-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.img} alt={product.name} />
            <h3>{product.name}</h3>
            <p>Rs. {product.price}</p>
            <button className="btn" onClick={() => addToCart(product)}>Add To Cart</button>
          </div>
        ))}
      </div>

      {/* Checkout Terminal */}
      <div className="cart-section">
        <h2>🛰️ Core Processing Terminal (Cart)</h2>
        {cart.length === 0 ? <p style={{color: '#666'}}>No data streams in cart memory.</p> : (
          <div>
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <div>
                  <h4>{item.name} (x{item.qty})</h4>
                  <p style={{color: '#00ffff'}}>Rs. {item.price * item.qty}</p>
                </div>
                <button className="btn" style={{ backgroundColor: '#ff0055', color: 'white', border: 'none', width: 'auto' }} onClick={() => removeFromCart(item.id)}>Terminate</button>
              </div>
            ))}
            <h3 style={{ marginTop: '20px', color: '#fff' }}>Total Buffer Output: Rs. {cartTotal}</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
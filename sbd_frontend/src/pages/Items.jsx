import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Items = () => {
  const [barangBarang, setBarangBarang] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const ambilDataBarang = async () => {
      try {
        const response = await axios.get('http://localhost:3000/items');
        // Masukin data dari backend ke statenyaa
        setBarangBarang(response.data.payload);
      } catch (error) {
        console.error('Error ngambil barang:', error);
      }
    };

    ambilDataBarang();
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <h2>Etalase Barang Keren</h2>
      {/* kita mapping statenyaa biar nampil kotak kotak gitu */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {barangBarang.map((item) => (
          <div key={item.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ margin: '0 0 10px 0' }}>{item.name}</h3>
              <p style={{ color: 'green', fontWeight: 'bold' }}>Rp {item.price.toLocaleString('id-ID')}</p>
              <p style={{ margin: '0 0 15px 0', color: 'gray' }}>Sisa stok: {item.stock}</p>
            </div>
            <button 
              onClick={() => navigate(`/items/${item.id}`)}
              style={{ padding: '8px', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Liat Detailnyaa
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Items;
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [itemnyaa, setItemnyaa] = useState(null);

  useEffect(() => {
    const ambilDetailBarang = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/items/${id}`);
        setItemnyaa(response.data.payload);
      } catch (error) {
        console.error('Waduh error ngambil detail barang:', error);
      }
    };

    ambilDetailBarang();
  }, [id]);

  if (!itemnyaa) {
    return <h3 style={{ textAlign: 'center', marginTop: '50px' }}>Tunggu bentar yaa lagi ngambilin barangnyaa...</h3>;
  }

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto', padding: '20px', border: '2px solid #2196F3', borderRadius: '10px' }}>
      <h2>Info Lengkap Barangnyaa</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ color: '#333', margin: '0 0 10px 0' }}>{itemnyaa.name}</h1>
        <h2 style={{ color: 'green', margin: '0 0 15px 0' }}>Rp {itemnyaa.price.toLocaleString('id-ID')}</h2>
        <div style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '5px' }}>
          <p style={{ margin: '5px 0' }}><strong>Sisa Stok di Gudang:</strong> {itemnyaa.stock} unit</p>
          <p style={{ margin: '5px 0' }}><strong>Tanggal Masuk:</strong> {new Date(itemnyaa.created_at).toLocaleDateString('id-ID')}</p>
          <p style={{ margin: '5px 0' }}><strong>Kode ID Barang:</strong> {itemnyaa.id}</p>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button 
          onClick={() => navigate('/items')} 
          style={{ padding: '10px 20px', backgroundColor: '#607D8B', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Balik ke Rak Barang
        </button>
        {/* nantii kalo mau dikembangin, tombol beli bisa ditaruh di sini */}
        <button style={{ padding: '10px 20px', backgroundColor: '#FF9800', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Beli Sekarang
        </button>
      </div>
    </div>
  );
};

export default ItemDetail;
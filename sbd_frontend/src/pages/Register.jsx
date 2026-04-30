import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://cs-sbd10-4e680dcc94e1.herokuapp.com/user/register', formData);
      alert('Wih daftar berhasil banget! ' + response.data.message);
      navigate('/login');
    } catch (error) {
      alert('Duh gagal daftarin user: ' + error.response?.data?.message || error.message);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <h2>Bikin Akun Dulu Yukk</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input type="text" name="name" placeholder="Nama Lengkap" onChange={handleChange} required />
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email (kyak budi@gmail.com)" onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Nomor HP (+62...)" onChange={handleChange} />
        <input type="text" name="password" placeholder="Password (minimal 10 huruf & unik)" onChange={handleChange} required />
        <button type="submit" style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white' }}>Daftar Sekarang</button>
      </form>
    </div>
  );
};

export default Register;
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://cs-sbd10-4e680dcc94e1.herokuapp.com//auth/login', credentials);
    
      const tokennyaa = response.data.payload.token;
      localStorage.setItem('token', tokennyaa);
      alert('Asik login sukses banget!');
      navigate('/items');
    } catch (error) {
      alert('Waduh gagal login: ' + error.response?.data?.message || error.message);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <h2>Login Dulu Bosku</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input type="email" name="email" placeholder="Masukin Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Masukin Password" onChange={handleChange} required />
        <button type="submit" style={{ padding: '10px', backgroundColor: '#2196F3', color: 'white' }}>Gas Login</button>
      </form>
      <p>Belom punya akun? <a href="/register">Daftar sini deh</a></p>
    </div>
  );
};

export default Login;
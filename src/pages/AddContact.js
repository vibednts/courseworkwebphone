import React, { useState, useContext } from 'react';
import { ContactContext } from '../context/ContactContext';
import { useNavigate } from 'react-router-dom';
import { FaUserPlus, FaArrowLeft } from 'react-icons/fa';
import { COUNTRY_CODES } from '../constants'; 

const AddContact = () => {
  const { addContact } = useContext(ContactContext);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [phoneCode, setPhoneCode] = useState('+380');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [category, setCategory] = useState('Друзі');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && phoneNumber.trim()) {
      const fullPhone = `${phoneCode} ${phoneNumber}`;
      
      const success = addContact({ name, phone: fullPhone, category });
      if (success) navigate('/');
    } else {
      alert('Заповніть ім\'я та номер телефону!');
    }
  };

  return (
    <div className="page-container">
      <div className="form-card card">
        <button className="btn-back" onClick={() => navigate('/')}>
          <FaArrowLeft /> Назад
        </button>
        
        <h2><FaUserPlus /> Новий контакт</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Ім'я</label>
            <input 
              type="text" 
              placeholder="Іван Петренко"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Телефон</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <select 
                value={phoneCode}
                onChange={(e) => setPhoneCode(e.target.value)}
                style={{ width: '100px' }}
              >
                {COUNTRY_CODES.map((item) => (
                  <option key={item.code} value={item.code}>
                    {item.country} ({item.code})
                  </option>
                ))}
              </select>

              <input 
                type="number" 
                placeholder="99 123 45 67"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Категорія</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="Друзі">Друзі</option>
              <option value="Робота">Робота</option>
              <option value="Сім'я">Сім'я</option>
              <option value="Інше">Інше</option>
            </select>
          </div>

          <button type="submit" className="btn-primary">Зберегти</button>
        </form>
      </div>
    </div>
  );
};

export default AddContact;
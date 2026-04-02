import React, { useContext, useState } from 'react';
import { ContactContext } from '../context/ContactContext';
import { FaSearch, FaPhone, FaStar, FaTrash, FaEdit, FaCheck, FaTimes, FaUserCircle,FaTelegramPlane } from 'react-icons/fa';
import { COUNTRY_CODES } from '../constants';

const Home = () => {
  const { contacts, deleteContact, toggleFavorite, updateContact } = useContext(ContactContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  const [editingId, setEditingId] = useState(null);
  
  const [editName, setEditName] = useState('');
  const [editPhoneCode, setEditPhoneCode] = useState('');
  const [editPhoneNumber, setEditPhoneNumber] = useState('');
  const [editCategory, setEditCategory] = useState('');

  const startEditing = (contact) => {
    setEditingId(contact.id);
    setEditName(contact.name);
    setEditCategory(contact.category);

    const foundCode = COUNTRY_CODES.find(c => contact.phone.startsWith(c.code));
    
    if (foundCode) {
      setEditPhoneCode(foundCode.code);
      setEditPhoneNumber(contact.phone.replace(foundCode.code, '').trim());
    } else {
      setEditPhoneCode('+380');
      setEditPhoneNumber(contact.phone);
    }
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  const saveContact = () => {
    const fullPhone = `${editPhoneCode} ${editPhoneNumber}`;
    updateContact(editingId, {
      name: editName,
      phone: fullPhone,
      category: editCategory
    });
    setEditingId(null);
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          contact.phone.includes(searchTerm);
    const matchesCategory = filterCategory === 'All' || contact.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getBadgeClass = (cat) => {
    switch(cat) {
      case 'Робота': return 'badge-blue';
      case 'Сім\'я': return 'badge-pink';
      case 'Друзі': return 'badge-green';
      default: return 'badge-gray';
    }
  };

  return (
    <div className="page-container">
      {}
      <div className="search-bar card">
        <div className="search-input-wrapper">
          <FaSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Пошук..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="filter-select">
          <option value="All">Всі</option>
          <option value="Робота">Робота</option>
          <option value="Сім'я">Сім'я</option>
          <option value="Друзі">Друзі</option>
        </select>
      </div>

      <div className="contacts-grid">
        {filteredContacts.map(contact => (
          <div key={contact.id} className={`contact-card card ${editingId === contact.id ? 'editing-mode' : ''}`}>
            
            {editingId === contact.id ? (
          
              <div className="edit-form">
                <input 
                  type="text" 
                  value={editName} 
                  onChange={e => setEditName(e.target.value)}
                  className="edit-input"
                  placeholder="Ім'я"
                />
                
                <div style={{display: 'flex', gap: '5px', margin: '5px 0'}}>
                  <select 
                    value={editPhoneCode} 
                    onChange={e => setEditPhoneCode(e.target.value)}
                    className="edit-input"
                    style={{width: '90px', padding: '5px'}}
                  >
                    {COUNTRY_CODES.map(c => <option key={c.code} value={c.code}>{c.code}</option>)}
                  </select>
                  <input 
                    type="text" 
                    value={editPhoneNumber} 
                    onChange={e => setEditPhoneNumber(e.target.value)}
                    className="edit-input"
                    placeholder="Номер"
                  />
                </div>

                <select 
                  value={editCategory} 
                  onChange={e => setEditCategory(e.target.value)}
                  className="edit-input"
                >
                  <option value="Друзі">Друзі</option>
                  <option value="Робота">Робота</option>
                  <option value="Сім'я">Сім'я</option>
                  <option value="Інше">Інше</option>
                </select>

                <div className="edit-actions">
                  <button onClick={saveContact} className="btn-icon save-btn"><FaCheck /></button>
                  <button onClick={cancelEditing} className="btn-icon cancel-btn"><FaTimes /></button>
                </div>
              </div>
            ) : (
              <>
                <div className="card-header">
                  <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                    <FaUserCircle size={30} color="#ccc"/> {/* Аватарка-заглушка */}
                    <div>
                        <div className="name">{contact.name}</div>
                        <span className={`badge ${getBadgeClass(contact.category)}`}>{contact.category}</span>
                    </div>
                  </div>
                </div>
                
                <div className="card-body">
                  <p className="phone"><FaPhone className="icon" /> {contact.phone}</p>
                </div>

                <div className="card-footer">
                  <button 
                    className={`btn-icon ${contact.isFavorite ? 'star-active' : ''}`}
                    onClick={() => toggleFavorite(contact.id)}
                    title="У вибране"
                  >
                    <FaStar />
                  </button>
                  
                  {}
                  <button className="btn-icon edit-btn" onClick={() => startEditing(contact)} title="Редагувати">
                    <FaEdit />
                  </button>

                  <button className="btn-icon btn-delete" onClick={() => deleteContact(contact.id)} title="Видалити">
                    <FaTrash />
                  </button>
                    {contact.phone && (
                  <a
                  href={`tg://resolve?phone=${contact.phone.replace(/\D/g, '')}`} 
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Відкрити в Telegram"
                  className="btn-icon"
                >
      <FaTelegramPlane color="#0088cc" />
    </a>
  )}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
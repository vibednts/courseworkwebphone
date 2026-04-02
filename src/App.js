import React, { useContext } from 'react'; // Додано useContext сюди
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { ContactContext, ContactProvider } from './context/ContactContext'; // Додано ContactContext
import Home from './pages/Home';
import AddContact from './pages/AddContact';
import Stats from './pages/Stats';
import Login from './pages/Login'; // Додано імпорт сторінки Login
import { auth } from './firebase'; // Імпорт для виходу
import { FaAddressBook, FaPlusCircle, FaChartBar, FaSignOutAlt } from 'react-icons/fa';
import './App.css';

// Створюємо окремий компонент для контенту, щоб useContext працював правильно
const AppContent = () => {
  const { user, loading } = useContext(ContactContext);

  if (loading) return <div className="page-container">Завантаження...</div>;

  return (
    <Router>
      {!user ? (
        <Routes>
          <Route path="*" element={<Login />} />
        </Routes>
      ) : (
        <div className="app-wrapper">
          <nav className="navbar">
            <div className="logo">PhoneBook 📒</div>
            <div className="nav-links">
              <NavLink to="/" className={({ isActive }) => (isActive ? "link active" : "link")}>
                <FaAddressBook /> Контакти
              </NavLink>
              <NavLink to="/add" className={({ isActive }) => (isActive ? "link active" : "link")}>
                <FaPlusCircle /> Додати
              </NavLink>
              <NavLink to="/stats" className={({ isActive }) => (isActive ? "link active" : "link")}>
                <FaChartBar /> Статистика
              </NavLink>
              {/* Кнопка виходу */}
              <button 
                onClick={() => auth.signOut()} 
                className="link" 
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }}
              >
                <FaSignOutAlt /> Вихід
              </button>
            </div>
          </nav>

          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add" element={<AddContact />} />
              <Route path="/stats" element={<Stats />} />
            </Routes>
          </main>
        </div>
      )}
    </Router>
  );
};

function App() {
  return (
    <ContactProvider>
      <AppContent />
    </ContactProvider>
  );
}

export default App;
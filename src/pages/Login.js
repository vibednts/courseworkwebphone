import React from 'react';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { FaGoogle } from 'react-icons/fa';

const Login = () => {
  const loginWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .catch((error) => console.error("Помилка входу:", error));
  };

  return (
    <div className="page-container">
      <div className="form-card card" style={{ textAlign: 'center' }}>
        <h2>Вітаємо у PhoneBook 📒</h2>
        <p>Будь ласка, увійдіть, щоб керувати своїми контактами</p>
        <button onClick={loginWithGoogle} className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          <FaGoogle /> Увійти через Google
        </button>
      </div>
    </div>
  );
};

export default Login;
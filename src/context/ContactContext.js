import React, { createContext, useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  where, 
  doc, 
  deleteDoc, 
  updateDoc 
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Відстеження авторизації
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 2. Отримання контактів саме цього користувача з Firestore
  useEffect(() => {
    if (!user) {
      setContacts([]);
      return;
    }

    const q = query(collection(db, "contacts"), where("userId", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setContacts(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    });

    return () => unsubscribe();
  }, [user]);

  // 3. CRUD методи тепер ідуть в хмару
  const addContact = async (newContact) => {
    try {
      await addDoc(collection(db, "contacts"), {
        ...newContact,
        userId: user.uid,
        isFavorite: false,
        createdAt: new Date().toISOString()
      });
      return true;
    } catch (e) {
      console.error("Error adding contact: ", e);
      return false;
    }
  };

  const updateContact = async (id, updatedData) => {
    const contactRef = doc(db, "contacts", id);
    await updateDoc(contactRef, updatedData);
  };

  const deleteContact = async (id) => {
    if (window.confirm('Видалити цей контакт?')) {
      await deleteDoc(doc(db, "contacts", id));
    }
  };

  const toggleFavorite = async (id) => {
    const contact = contacts.find(c => c.id === id);
    const contactRef = doc(db, "contacts", id);
    await updateDoc(contactRef, { isFavorite: !contact.isFavorite });
  };

  const getStats = () => {
    return {
      total: contacts.length,
      favorites: contacts.filter(c => c.isFavorite).length,
      work: contacts.filter(c => c.category === 'Робота').length,
      family: contacts.filter(c => c.category === 'Сім\'я').length,
      friends: contacts.filter(c => c.category === 'Друзі').length,
    };
  };

  return (
    <ContactContext.Provider value={{ 
      contacts, user, loading, 
      addContact, updateContact, deleteContact, toggleFavorite, getStats 
    }}>
      {!loading && children}
    </ContactContext.Provider>
  );
};
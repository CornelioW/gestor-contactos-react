import { useEffect, useState } from 'react';
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom';
import useLocalStorage from './hooks/useLocalStorage';
import ContactList from './pages/ContactList';
import ContactEditor from './pages/ContactEditor';

function Application() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [notice, setNotice] = useState('');
  const location = useLocation();

  useEffect(() => {
    setNotice(location.state?.notice || '');
  }, [location]);

  function createContact(data) {
    setContacts((previous) => [...previous, { id: crypto.randomUUID(), ...data }]);
  }
  function updateContact(id, data) {
    setContacts((previous) => previous.map((contact) => contact.id === id ? { ...contact, ...data } : contact));
  }
  function deleteContact(id) {
    setContacts((previous) => previous.filter((contact) => contact.id !== id));
    setNotice('Contacto eliminado correctamente.');
  }

  return <><header className="site-header"><Link to="/" className="brand"><span className="brand-icon">C</span> Contactos<span className="brand-muted">App</span></Link><span className="header-note">Agenda personal · React</span></header><main className="container">{notice && <div className="notice" role="status">{notice}<button type="button" aria-label="Cerrar mensaje" onClick={() => setNotice('')}>×</button></div>}<Routes>
    <Route path="/" element={<ContactList contacts={contacts} onDelete={deleteContact} />} />
    <Route path="/nuevo" element={<ContactEditor contacts={contacts} onCreate={createContact} />} />
    <Route path="/editar/:id" element={<ContactEditor contacts={contacts} onUpdate={updateContact} editing />} />
    <Route path="*" element={<section className="panel empty"><h1>Página no encontrada</h1><Link to="/">Volver al inicio</Link></section>} />
  </Routes></main><footer>Gestor de contactos · Datos almacenados localmente en tu navegador</footer></>;
}

export default function App() { return <BrowserRouter><Application /></BrowserRouter>; }

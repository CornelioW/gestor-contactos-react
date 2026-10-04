import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ContactList({ contacts, onDelete }) {
  const [search, setSearch] = useState('');
  const filtered = contacts.filter((contact) =>
    `${contact.nombre} ${contact.email}`.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase())
  );

  function confirmDelete(contact) {
    if (window.confirm(`¿Seguro que deseas eliminar a ${contact.nombre}?`)) onDelete(contact.id);
  }

  return (
    <>
      <div className="heading"><div><h1>Mis contactos</h1><p>Administra tu agenda desde un solo lugar.</p></div><Link className="button" to="/nuevo">+ Nuevo contacto</Link></div>
      <section className="panel">
        <div className="toolbar"><input aria-label="Buscar contactos" type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar por nombre o correo..." /><span>{filtered.length} contacto(s)</span></div>
        {filtered.length === 0 ? <div className="empty"><h2>{search ? 'Sin resultados' : 'Tu agenda está vacía'}</h2><p>{search ? 'Prueba con otro nombre o correo.' : 'Agrega tu primer contacto con el botón Nuevo contacto.'}</p></div> : (
          <div className="table-scroll"><table><thead><tr><th>Nombre</th><th>Correo electrónico</th><th>Teléfono</th><th>Acciones</th></tr></thead><tbody>
            {filtered.map((contact) => <tr key={contact.id}><td><strong>{contact.nombre}</strong></td><td>{contact.email}</td><td>{contact.telefono}</td><td className="row-actions"><Link className="button small secondary" to={`/editar/${contact.id}`}>Editar</Link><button className="small danger" onClick={() => confirmDelete(contact)}>Eliminar</button></td></tr>)}
          </tbody></table></div>
        )}
      </section>
    </>
  );
}

import { Link, useNavigate, useParams } from 'react-router-dom';
import ContactForm from '../components/ContactForm';

export default function ContactEditor({ contacts, onCreate, onUpdate, editing = false }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const existing = editing ? contacts.find((contact) => contact.id === id) : null;
  if (editing && !existing) return <section className="panel empty"><h1>Contacto no encontrado</h1><p>El registro no existe o fue eliminado.</p><Link to="/">Volver al listado</Link></section>;

  function save(data) {
    if (editing) onUpdate(id, data);
    else onCreate(data);
    navigate('/', { state: { notice: editing ? 'Contacto actualizado correctamente.' : 'Contacto creado correctamente.' } });
  }

  return <><div className="heading"><div><h1>{editing ? 'Editar contacto' : 'Nuevo contacto'}</h1><p>Completa los datos solicitados para continuar.</p></div></div><ContactForm key={existing?.id || 'new'} initialContact={existing} onSave={save} /></>;
}

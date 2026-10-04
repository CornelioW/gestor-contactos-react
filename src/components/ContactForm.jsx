import { useState } from 'react';
import { Link } from 'react-router-dom';

const EMPTY = { nombre: '', email: '', telefono: '' };

export default function ContactForm({ initialContact, onSave }) {
  const [form, setForm] = useState(() => ({ ...EMPTY, ...initialContact }));
  const [touched, setTouched] = useState({});
  const errors = {
    nombre: form.nombre.trim().length < 2 ? 'El nombre debe tener al menos 2 caracteres.' : '',
    email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()) ? 'Introduce un correo electrónico válido.' : '',
    telefono: !/^\d{7,}$/.test(form.telefono) ? 'El teléfono debe contener solo dígitos (mínimo 7).' : '',
  };
  const valid = Object.values(errors).every((error) => !error);

  function change(event) {
    const { name, value } = event.target;
    if (name === 'telefono' && !/^\d*$/.test(value)) return;
    setForm((previous) => ({ ...previous, [name]: value }));
  }

  function submit(event) {
    event.preventDefault();
    setTouched({ nombre: true, email: true, telefono: true });
    if (!valid) return;
    onSave({ nombre: form.nombre.trim(), email: form.email.trim(), telefono: form.telefono });
  }

  return (
    <form className="panel form" onSubmit={submit} noValidate>
      {[
        { name: 'nombre', label: 'Nombre completo', type: 'text', placeholder: 'Ej. Ana Pérez' },
        { name: 'email', label: 'Correo electrónico', type: 'email', placeholder: 'ana@ejemplo.com' },
        { name: 'telefono', label: 'Teléfono', type: 'tel', placeholder: '0991234567' },
      ].map(({ name, label, type, placeholder }) => (
        <div className="field" key={name}>
          <label htmlFor={name}>{label}</label>
          <input id={name} name={name} type={type} value={form[name]} onChange={change}
            onBlur={() => setTouched((previous) => ({ ...previous, [name]: true }))}
            placeholder={placeholder} aria-invalid={Boolean(touched[name] && errors[name])}
            aria-describedby={`${name}-error`} autoComplete="off" />
          <small className="error" id={`${name}-error`}>{touched[name] ? errors[name] : ''}</small>
        </div>
      ))}
      <div className="actions"><Link className="button secondary" to="/">Cancelar</Link><button type="submit" disabled={!valid}>Guardar contacto</button></div>
    </form>
  );
}

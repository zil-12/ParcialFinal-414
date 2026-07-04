import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [piezas, setPiezas] = useState([]);
  const [formulario, setFormulario] = useState({
    nombre: '', tipo: 'Moneda', periodo: 'Republicano', anio: '', descripcion: '', urlImagen: ''
  });
  const [mostrarAdmin, setMostrarAdmin] = useState(false);

  const API_URL = "http://localhost:8080/api/piezas";

  useEffect(() => {
    cargarPiezas();
  }, []);

  const cargarPiezas = async () => {
    try {
      const res = await axios.get(API_URL);
      setPiezas(res.data);
    } catch (error) {
      console.error("Error al conectar con el backend:", error);
    }
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, formulario);
      setFormulario({ nombre: '', tipo: 'Moneda', periodo: 'Republicano', anio: '', descripcion: '', urlImagen: '' });
      cargarPiezas();
      setMostrarAdmin(false);
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  const eliminarPieza = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      cargarPiezas();
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };
  return (
      <div style={{ backgroundColor: '#2b0404', minHeight: '100vh', fontFamily: 'Arial, sans-serif', color: '#ffffff', margin: 0, padding: '0 0 40px 0' }}>

        <button
            onClick={() => setMostrarAdmin(!mostrarAdmin)}
            style={{ position: 'fixed', top: '10px', right: '10px', backgroundColor: '#d93838', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', zIndex: 1000 }}
        >
          {mostrarAdmin ? "🔄 Ver Vista de Blog" : "⚙️ Modo Administrador (Agregar Piezas)"}
        </button>

        <header style={{ maxWidth: '980px', margin: '0 auto', textAlign: 'center', padding: '40px 20px', borderBottom: '1px dashed #5e1111' }}>
          <div style={{ border: '4px double #801818', padding: '20px', display: 'inline-block', backgroundColor: '#3d0808' }}>
            <h1 style={{ margin: '0 0 5px 0', fontSize: '2.8rem', letterSpacing: '2px', color: '#ffcccc', textTransform: 'uppercase' }}>Bolivia Numismática</h1>
            <p style={{ margin: '0 0 15px 0', fontSize: '1rem', color: '#ffaaaa', fontStyle: 'italic', letterSpacing: '1px' }}>ESPACIO DE PUBLICACIÓN DE TRABAJOS DE INVESTIGACIÓN Y PROPUESTA</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
              <span style={{ backgroundColor: '#5c0f0f', padding: '5px 15px', borderRadius: '3px', fontSize: '0.85rem', fontWeight: 'bold' }}>APUNTES DE NOTAFILIA Y NUMISMÁTICA</span>
            </div>
          </div>
        </header>

        <main style={{ maxWidth: '980px', margin: '20px auto', padding: '0 20px', display: 'grid', gridTemplateColumns: '2.3fr 1.2fr', gap: '30px' }}>

          <section style={{ backgroundColor: '#ffffff', color: '#333333', padding: '30px', borderRadius: '4px', boxShadow: '0px 0px 10px rgba(0,0,0,0.5)' }}>
            {mostrarAdmin ? (
                <div>
                  <h2 style={{ color: '#8b1414', borderBottom: '2px solid #8b1414', paddingBottom: '10px', marginTop: 0 }}>Panel de Control (API Backend)</h2>
                  <form onSubmit={manejarEnvio} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
                    <input type="text" placeholder="Título del Artículo" value={formulario.nombre} onChange={e => setFormulario({...formulario, nombre: e.target.value})} style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }} required />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <select value={formulario.tipo} onChange={e => setFormulario({...formulario, tipo: e.target.value})} style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: 'white' }}>
                        <option value="Moneda">Moneda</option>
                        <option value="Billete">Billete</option>
                        <option value="Medalla">Medalla</option>
                      </select>
                      <input type="number" placeholder="Año" value={formulario.anio} onChange={e => setFormulario({...formulario, anio: e.target.value})} style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }} required />
                    </div>
                    <input type="text" placeholder="Periodo" value={formulario.periodo} onChange={e => setFormulario({...formulario, periodo: e.target.value})} style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }} required />
                    <textarea placeholder="Contenido del artículo..." value={formulario.descripcion} onChange={e => setFormulario({...formulario, descripcion: e.target.value})} style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '4px', minHeight: '200px', fontFamily: 'inherit', lineHeight: '1.6' }} required />
                    <input type="text" placeholder="URL de la Foto (Opcional)" value={formulario.urlImagen} onChange={e => setFormulario({...formulario, urlImagen: e.target.value})} style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }} />
                    <button type="submit" style={{ backgroundColor: '#2a7a3e', color: 'white', padding: '12px', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem' }}>Publicar en el Blog</button>
                  </form>
                </div>
            ) : (
                <div>
                  {piezas.length === 0 ? (
                      <div style={{ textAlign: 'center', padding: '40px 0', color: '#666' }}>
                        <h3>No hay investigaciones publicadas aún.</h3>
                        <p>Usa el Modo Administrador para empezar a subir tus artículos históricos.</p>
                      </div>
                  ) : (
                      piezas.map(pieza => (
                          <article id={`articulo-${pieza.id}`} key={pieza.id} style={{ marginBottom: '45px', paddingBottom: '35px', borderBottom: '1px solid #eeeeee' }}>
                            <div style={{ color: '#999999', fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '5px' }}>
                              Catálogo {pieza.tipo} — {pieza.periodo}
                            </div>
                            <h2 style={{ color: '#8b1414', margin: '0 0 15px 0', fontSize: '1.6rem', borderBottom: '1px solid #f2d6d6', paddingBottom: '5px', lineHeight: '1.3' }}>
                              {pieza.nombre} ({pieza.anio})
                            </h2>
                            {pieza.urlImagen && (
                                <div style={{ textAlign: 'center', margin: '20px 0', backgroundColor: '#f9f9f9', padding: '10px', borderRadius: '4px' }}>
                                  <img src={pieza.urlImagen} alt={pieza.nombre} style={{ maxWidth: '100%', maxHeight: '350px', objectFit: 'contain' }} />
                                </div>
                            )}
                            <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: '#333333', textAlign: 'justify', whiteSpace: 'pre-line' }}>
                              {pieza.descripcion}
                            </p>
                            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                              <button onClick={() => eliminarPieza(pieza.id)} style={{ backgroundColor: '#f2dede', color: '#a94442', border: '1px solid #ebccd1', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}>
                                🗑️ Eliminar Entrada
                              </button>
                            </div>
                          </article>
                      ))
                  )}
                </div>
            )}
          </section>
          <aside style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ backgroundColor: '#3d0808', border: '1px solid #5e1111', padding: '20px', borderRadius: '4px' }}>
              <h3 style={{ color: '#ffcccc', margin: '0 0 15px 0', fontSize: '1rem', borderBottom: '1px dashed #5e1111', paddingBottom: '5px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Otros Artículos del Autor
              </h3>
              {piezas.length === 0 ? (
                  <p style={{ fontSize: '0.85rem', color: '#dfaaaa', fontStyle: 'italic' }}>No hay enlaces todavía.</p>
              ) : (
                  <ul style={{ listStyleType: 'square', paddingLeft: '18px', margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {piezas.map(pieza => (
                        <li key={`link-${pieza.id}`} style={{ fontSize: '0.85rem', color: '#ffaaaa', lineHeight: '1.4' }}>
                          <a href={`#articulo-${pieza.id}`} style={{ color: '#ffcccc', textDecoration: 'none', fontWeight: 'bold' }}>
                            {pieza.nombre.toUpperCase()}
                          </a>
                        </li>
                    ))}
                  </ul>
              )}
            </div>

            <div style={{ backgroundColor: '#3d0808', border: '1px solid #5e1111', padding: '20px', borderRadius: '4px' }}>
              <h3 style={{ color: '#ffcccc', margin: '0 0 15px 0', fontSize: '1rem', borderBottom: '1px dashed #5e1111', paddingBottom: '5px', textTransform: 'uppercase' }}>
                Datos Personales
              </h3>
              <div style={{ textAlign: 'center', marginBottom: '15px' }}>
                <div style={{ width: '80px', height: '80px', backgroundColor: '#5c1f1f', borderRadius: '50%', margin: '0 auto 10px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: '2px solid #ffaaaa' }}>
                  👤
                </div>
                <h4 style={{ margin: '0', color: '#ffffff', fontSize: '0.95rem' }}>Investigador Numismático</h4>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#dfaaaa', lineHeight: '1.5', textAlign: 'center', margin: 0 }}>
                Espacio dedicado a la recopilación, estudio y catalogación de la historia monetaria y de billetes de Bolivia.
              </p>
            </div>
          </aside>

        </main>
      </div>
  );
}

export default App;
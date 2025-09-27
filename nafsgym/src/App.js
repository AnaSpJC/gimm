// 📦 Curatorial Block
// Proyecto: NAFS Gym App
// Autor original: Nazareno Franco
// Adaptación: Ana Sposito
// Descripción: Prototipo React con Bootstrap, Lucide y Recharts
// Fecha: 25/09/2025

import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import {
  Calendar, Users, Dumbbell, CreditCard, BarChart2, Bell,
  CheckCircle, XCircle, ClipboardList, UserCheck, UserPlus
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import logo from "./assets/logo.png";

// --- Datos ficticios ---
const actividades = [
  { id: 1, nombre: "Spinning", hora: "08:00", profe: "Lucía", cupo: 15, inscriptos: 12, salon: "Spinning" },
  { id: 2, nombre: "Musculación", hora: "Libre", profe: "Germán", cupo: 30, inscriptos: 20, salon: "Musculación" },
  { id: 3, nombre: "Funcional", hora: "10:00", profe: "Diego", cupo: 15, inscriptos: 14, salon: "Musculación" },
  { id: 4, nombre: "Yoga", hora: "19:00", profe: "María", cupo: 15, inscriptos: 15, salon: "Spinning" },
  { id: 5, nombre: "HIIT", hora: "18:00", profe: "Paula", cupo: 15, inscriptos: 9, salon: "Musculación" },
];

const pagos = [
  { socio: "Juan Pérez", estado: "Pendiente", vence: "10/09", monto: 15000 },
  { socio: "María López", estado: "Pagado", vence: "05/09", monto: 15000 },
];

const profs = [
  { nombre: "Lucía", dias: ["L", "M", "X", "J"], ausente: false },
  { nombre: "María", dias: ["M", "J"], ausente: true },
];

const statsAsistencia = actividades.map(a => ({ name: a.nombre, alumnos: a.inscriptos }));
const statsOcupacion = [
  { name: "Ocupado", value: 60 },
  { name: "Libre", value: 20 },
];

export default function GymAppBootstrap() {
  const [tab, setTab] = useState("socio");
  const [inscripciones, setInscripciones] = useState([1]); // ✅ sin anotación de tipo

  const handleInscribir = (id) => { // ✅ sin anotación de tipo
    if (!inscripciones.includes(id)) setInscripciones([...inscripciones, id]);
  };

  return (
    <div className="min-vh-100 bg-light d-flex flex-column">
      {/* Header */}
      <header className="bg-white border-bottom sticky-top shadow-sm">
        <div className="container py-3 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3">
            <img src={logo} width={70} />
            <div>
              <h1 className="h5 fw-bold mb-0">NAFS · Prototipo</h1>
              <small className="text-muted">Caso: <span className="fw-medium">Toro´s Gym</span></small>
            </div>
          </div>
          <div className="d-none d-md-flex align-items-center text-muted small">
            <Dumbbell size={18} className="me-1"/> 8:00–23:00 · Guardia Nacional & Tapalqué
          </div>
        </div>
      </header>

      {/* Tabs */}
      <main className="container my-4 flex-grow-1">
        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <button className={`nav-link ${tab==="socio" && "active"}`} onClick={()=>setTab("socio")}>Socio</button>
          </li>
          <li className="nav-item">
            <button className={`nav-link ${tab==="staff" && "active"}`} onClick={()=>setTab("staff")}>Staff</button>
          </li>
          <li className="nav-item">
            <button className={`nav-link ${tab==="admin" && "active"}`} onClick={()=>setTab("admin")}>Dueños</button>
          </li>
        </ul>

        {/* --- SOCIO --- */}
        {tab==="socio" && (
          <div className="row g-4">
            {/* Login */}
            <div className="col-md-6">
              <div className="card shadow-sm rounded-4">
                <div className="card-body">
                  <h2 className="h4 text-center">Toro´s Gym</h2>
                  <p className="text-center text-muted small">App presentada por NAFS</p>
                  <div className="mt-3 d-grid gap-2">
                    <input className="form-control" placeholder="Usuario"/>
                    <input type="password" className="form-control" placeholder="Contraseña"/>
                    <button className="btn btn-dark">Ingresar</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Clases */}
            <div className="col-md-6">
              <div className="card shadow-sm rounded-4">
                <div className="card-body">
                  <h5 className="d-flex align-items-center gap-2"><Calendar size={18}/> Clases de hoy</h5>
                  {actividades.map(a=>{
                    const ya = inscripciones.includes(a.id);
                    return (
                      <div key={a.id} className="p-3 border rounded-3 bg-white d-flex justify-content-between align-items-center mt-2">
                        <div>
                          <p className="mb-0 fw-medium">{a.nombre} · {a.hora} · Prof: {a.profe}</p>
                          <small className="text-muted">{a.inscriptos}/{a.cupo} en {a.salon}</small>
                        </div>
                        {ya ? (
                          <span className="badge bg-success d-flex align-items-center gap-1"><CheckCircle size={14}/> Inscripto</span>
                        ) : (
                          <button onClick={()=>handleInscribir(a.id)} className="btn btn-sm btn-primary">Inscribirme</button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- STAFF --- */}
        {tab==="staff" && (
          <div className="row g-4">
            <div className="col-md-6">
              <div className="card shadow-sm rounded-4">
                <div className="card-body">
                  <h5 className="d-flex align-items-center gap-2"><UserCheck size={18}/> Disponibilidad profesores</h5>
                  {profs.map(p=>(
                    <div key={p.nombre} className="p-3 border rounded-3 d-flex justify-content-between align-items-center mt-2">
                      <div>
                        <p className="mb-0 fw-medium">{p.nombre}</p>
                        <small className="text-muted">Días: {p.dias.join(" · ")}</small>
                      </div>
                      {p.ausente ? (
                        <span className="badge bg-danger d-flex align-items-center gap-1"><XCircle size={14}/> Ausente</span>
                      ) : (
                        <span className="badge bg-success d-flex align-items-center gap-1"><CheckCircle size={14}/> Disponible</span>
                      )}
                    </div>
                  ))}
                  <div className="alert alert-warning d-flex align-items-center gap-2 mt-3">
                    <Bell size={16}/> Alerta: María ausente jueves → sugerir reemplazo: Paula
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card shadow-sm rounded-4">
                <div className="card-body">
                  <h5 className="d-flex align-items-center gap-2"><CreditCard size={18}/> Cuotas y pagos</h5>
                  {pagos.map(p=>(
                    <div key={p.socio} className="p-3 border rounded-3 d-flex justify-content-between align-items-center mt-2">
                      <div>
                        <p className="mb-0 fw-medium">{p.socio}</p>
                        <small className="text-muted">Vence: {p.vence} · ${p.monto.toLocaleString()}</small>
                      </div>
                      {p.estado==="Pagado" ? (
                        <span className="badge bg-secondary">Pagado</span>
                      ) : (
                        <button className="btn btn-sm btn-primary">Pagar</button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- ADMIN --- */}
        {tab==="admin" && (
          <div className="row g-4">
            <div className="col-md-6">
              <div className="card shadow-sm rounded-4">
                <div className="card-body">
                  <h5 className="d-flex align-items-center gap-2"><BarChart2 size={18}/> Asistencia por actividad</h5>
                  <div style={{height:240}}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={statsAsistencia}>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <Tooltip/>
                        <Bar dataKey="alumnos" fill="#0d6efd"/>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card shadow-sm rounded-4">
                <div className="card-body">
                  <h5>Ocupación total del día</h5>
                  <div style={{height:240}}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={statsOcupacion} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90}>
                          <Cell fill="#0d6efd"/>
                          <Cell fill="#dee2e6"/>
                        </Pie>
                        <Tooltip/>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="container py-3 border-top text-muted small d-flex justify-content-between">
        <span>© {new Date().getFullYear()} NAFS Consultora</span>
        <span>Prototipo demostrativo – No contractual</span>
      </footer>
    </div>
  );
}


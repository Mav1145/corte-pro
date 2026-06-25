import { useState, useEffect } from "react";

const SERVICES_EN = [
  "Weekly Lawn Mowing",
  "Bi-Weekly Lawn Mowing",
  "Lawn Edging",
  "Aeration",
  "Dethatching",
  "Sod Installation",
  "Mulch Installation",
  "Shrub Trimming",
  "Hedge Trimming",
  "Tree Planting",
  "Shrub Planting",
  "Materials Delivery",
  "Retaining Wall Installation",
  "Landscaping Project",
  "Spring Cleanup",
  "Fall Cleanup",
  "Snow Plowing",
  "Snow Salting",
  "Sidewalk Shoveling",
  "Full Snow Service",
  "Other Service",
];

const SERVICES_ES = [
  "Corte de Césped Semanal",
  "Corte de Césped Quincenal",
  "Bordeado de Césped",
  "Aireación",
  "Descopete",
  "Instalación de Césped",
  "Instalación de Mantillo",
  "Poda de Arbustos",
  "Poda de Setos",
  "Plantación de Árboles",
  "Plantación de Arbustos",
  "Entrega de Materiales",
  "Instalación de Muro de Contención",
  "Proyecto de Paisajismo",
  "Limpieza de Primavera",
  "Limpieza de Otoño",
  "Limpieza de Nieve (Plow)",
  "Sal para Nieve",
  "Palada de Banqueta",
  "Servicio Completo de Nieve",
  "Otro Servicio",
];

const TRANSLATIONS = {
  en: {
    appName: "Corte Pro",
    tagline: "Manage Your Crew. Grow Your Business.",
    tabs: ["Route", "Clients", "Invoices", "Estimates", "Billing"],
    route: { title: "Today's Route", addStop: "Add Stop", address: "Address", client: "Client Name", addBtn: "Add", noStops: "No stops added yet. Add a client stop to begin.", navigate: "Start GPS", remove: "Remove", stop: "Stop" },
    clients: { title: "Clients", addClient: "Add Client", name: "Full Name", phone: "Phone Number", address: "Address", email: "Email (optional)", save: "Save Client", update: "Update Client", noClients: "No clients yet. Add your first client.", call: "Call", directions: "Directions", edit: "Edit", delete: "Delete", confirmDelete: "Delete this client?" },
    invoices: { title: "Invoices", create: "Create Invoice", client: "Select Client", service: "Service", amount: "Amount ($)", date: "Date", send: "Save Invoice", paid: "Paid", pending: "Pending", noInvoices: "No invoices yet. Create your first invoice.", total: "Total", services: SERVICES_EN, markPaid: "Mark Paid", review: "Request Google Review", addLine: "+ Add Service Line", removeLine: "Remove", lineItems: "Service Lines" },
    estimates: { title: "Estimates", create: "Create Estimate", client: "Select Client", service: "Service Description", amount: "Estimated Amount ($)", notes: "Notes", save: "Save Estimate", convert: "Convert to Invoice", noEstimates: "No estimates yet.", approved: "Approved", pending: "Pending" },
    billing: { title: "Billing & Reports", totalEarned: "Total Earned", totalPending: "Pending", thisMonth: "This Month", lastMonth: "Last Month", export: "Export Report", plan: "Current Plan", monthly: "$24.99/month", annual: "$199/year" },
    access: { title: "Enter Access Code", subtitle: "Enter your Corte Pro access code to get started.", placeholder: "", btn: "Unlock App", error: "Invalid access code. Please try again.", codes: ["CP-2025-LAUNCH","CP-2025-BETA1","CP-2025-BETA2"] },
    lang: "Español",
  },
  es: {
    appName: "Corte Pro",
    tagline: "Maneja Tu Equipo. Haz Crecer Tu Negocio.",
    tabs: ["Ruta","Clientes","Facturas","Estimados","Facturación"],
    route: { title: "Ruta de Hoy", addStop: "Agregar Parada", address: "Dirección", client: "Nombre del Cliente", addBtn: "Agregar", noStops: "No hay paradas. Agrega una parada para comenzar.", navigate: "Iniciar GPS", remove: "Eliminar", stop: "Parada" },
    clients: { title: "Clientes", addClient: "Agregar Cliente", name: "Nombre Completo", phone: "Teléfono", address: "Dirección", email: "Correo (opcional)", save: "Guardar Cliente", update: "Actualizar Cliente", noClients: "No hay clientes. Agrega tu primer cliente.", call: "Llamar", directions: "Direcciones", edit: "Editar", delete: "Eliminar", confirmDelete: "¿Eliminar este cliente?" },
    invoices: { title: "Facturas", create: "Crear Factura", client: "Seleccionar Cliente", service: "Servicio", amount: "Monto ($)", date: "Fecha", send: "Guardar Factura", paid: "Pagado", pending: "Pendiente", noInvoices: "No hay facturas. Crea tu primera factura.", total: "Total", services: SERVICES_ES, markPaid: "Marcar como Pagado", review: "Pedir Reseña en Google", addLine: "+ Agregar Servicio", removeLine: "Quitar", lineItems: "Servicios" },
    estimates: { title: "Estimados", create: "Crear Estimado", client: "Seleccionar Cliente", service: "Descripción del Servicio", amount: "Monto Estimado ($)", notes: "Notas", save: "Guardar Estimado", convert: "Convertir a Factura", noEstimates: "No hay estimados.", approved: "Aprobado", pending: "Pendiente" },
    billing: { title: "Facturación y Reportes", totalEarned: "Total Ganado", totalPending: "Pendiente", thisMonth: "Este Mes", lastMonth: "Mes Pasado", export: "Exportar Reporte", plan: "Plan Actual", monthly: "$24.99/mes", annual: "$199/año" },
    access: { title: "Ingresa tu Código", subtitle: "Ingresa tu código de acceso de Corte Pro para comenzar.", placeholder: "", btn: "Desbloquear App", error: "Código inválido. Intenta de nuevo.", codes: ["CP-2025-LAUNCH","CP-2025-BETA1","CP-2025-BETA2"] },
    lang: "English",
  },
};

const C = { green: "#2D6A1F", greenDark: "#1a4011", greenPale: "#f0ebd8", tan: "#d4c5a0", tanLight: "#f0ebd8", tanDark: "#a8946b", white: "#ffffff", gray: "#f5f0e6", grayMid: "#d4c5a0", grayDark: "#666", text: "#1a1a1a", black: "#0d0d0d", red: "#c0392b", orange: "#e67e22", blue: "#2980b9" };

// Storage helpers — saves data so it doesn't disappear when switching tabs
const save = (key, val) => { try { localStorage.setItem(key, JSON.stringify(val)); } catch(e){} };
const load = (key, fallback) => { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch(e){ return fallback; } };

function AccessGate({ onUnlock, t }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const handleUnlock = () => {
    if (t.access.codes.includes(code.trim().toUpperCase())) { onUnlock(); }
    else { setError(true); setTimeout(() => setError(false), 2000); }
  };
  return (
    <div style={{ minHeight:"100vh", background:C.black, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:24 }}>
      <div style={{ background:C.white, borderRadius:16, padding:36, maxWidth:380, width:"100%", textAlign:"center", boxShadow:"0 8px 32px rgba(0,0,0,0.4)", borderTop:`4px solid ${C.green}` }}>
        <img src="/logo.png" alt="Corte Pro" style={{ width:220, marginBottom:20 }} />
        <div style={{ fontSize:15, fontWeight:700, color:C.black, marginBottom:8, letterSpacing:0.5 }}>{t.access.title}</div>
        <div style={{ fontSize:13, color:C.grayDark, marginBottom:16 }}>{t.access.subtitle}</div>
        <input value={code} onChange={e => setCode(e.target.value)} onKeyDown={e => e.key==="Enter" && handleUnlock()} placeholder={t.access.placeholder} style={{ width:"100%", padding:"12px 14px", borderRadius:8, border:`2px solid ${error ? C.red : C.grayMid}`, fontSize:15, marginBottom:12, boxSizing:"border-box", outline:"none", textAlign:"center", letterSpacing:1 }} />
        {error && <div style={{ color:C.red, fontSize:13, marginBottom:8 }}>{t.access.error}</div>}
        <button onClick={handleUnlock} style={{ width:"100%", background:C.black, color:C.white, border:`2px solid ${C.green}`, borderRadius:8, padding:"14px 0", fontSize:16, fontWeight:800, cursor:"pointer", letterSpacing:0.5 }}>{t.access.btn}</button>
      </div>
    </div>
  );
}

function RouteTab({ t, clients }) {
  const [stops, setStops] = useState(() => load("cp_stops", []));
  const [form, setForm] = useState({ client:"", address:"" });
  const [showForm, setShowForm] = useState(false);
  useEffect(() => { save("cp_stops", stops); }, [stops]);
  const addStop = () => { if (!form.address) return; setStops([...stops, { ...form, id:Date.now(), done:false }]); setForm({ client:"", address:"" }); setShowForm(false); };
  // GPS auto-start: dir/ format opens Google Maps directly in navigation mode
  const startGPS = (address) => { window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}&travelmode=driving&dir_action=navigate`, "_blank"); };
  return (
    <div style={{ padding:16 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
        <h2 style={{ margin:0, color:C.green, fontSize:20, fontWeight:800 }}>{t.route.title}</h2>
        <button onClick={() => setShowForm(!showForm)} style={{ background:C.green, color:C.white, border:"none", borderRadius:8, padding:"8px 14px", fontWeight:700, cursor:"pointer", fontSize:13 }}>+ {t.route.addStop}</button>
      </div>
      {showForm && (
        <div style={{ background:C.greenPale, borderRadius:12, padding:16, marginBottom:16 }}>
          <select value={form.client} onChange={e => { const c=clients.find(cl=>cl.name===e.target.value); setForm({ client:e.target.value, address:c?c.address:form.address }); }} style={{ width:"100%", padding:"10px 12px", borderRadius:8, border:`1px solid ${C.grayMid}`, fontSize:14, marginBottom:10, boxSizing:"border-box" }}>
            <option value="">-- {t.route.client} --</option>
            {clients.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
          </select>
          <input value={form.address} onChange={e => setForm({ ...form, address:e.target.value })} placeholder={t.route.address} style={{ width:"100%", padding:"10px 12px", borderRadius:8, border:`1px solid ${C.grayMid}`, fontSize:14, marginBottom:10, boxSizing:"border-box" }} />
          <button onClick={addStop} style={{ width:"100%", background:C.green, color:C.white, border:"none", borderRadius:8, padding:"11px 0", fontWeight:700, cursor:"pointer" }}>{t.route.addBtn}</button>
        </div>
      )}
      {stops.length === 0 ? <div style={{ textAlign:"center", color:C.grayDark, padding:"40px 16px", fontSize:14 }}>{t.route.noStops}</div> : stops.map((s,i) => (
        <div key={s.id} style={{ background:s.done?C.grayMid:C.white, borderRadius:12, padding:14, marginBottom:10, border:`1px solid ${C.grayMid}`, display:"flex", alignItems:"center", gap:12 }}>
          <input type="checkbox" checked={s.done} onChange={() => setStops(stops.map(x=>x.id===s.id?{...x,done:!x.done}:x))} style={{ width:20, height:20, accentColor:C.green }} />
          <div style={{ flex:1 }}>
            <div style={{ fontWeight:700, color:s.done?C.grayDark:C.text, textDecoration:s.done?"line-through":"none", fontSize:14 }}>{t.route.stop} {i+1}{s.client?` — ${s.client}`:""}</div>
            <div style={{ color:C.grayDark, fontSize:13 }}>{s.address}</div>
          </div>
          <button onClick={() => startGPS(s.address)} style={{ background:C.blue, color:C.white, border:"none", borderRadius:6, padding:"6px 10px", fontSize:12, fontWeight:600, cursor:"pointer" }}>🚗 {t.route.navigate}</button>
          <button onClick={() => setStops(stops.filter(x=>x.id!==s.id))} style={{ background:C.red, color:C.white, border:"none", borderRadius:6, padding:"6px 10px", fontSize:12, fontWeight:600, cursor:"pointer" }}>{t.route.remove}</button>
        </div>
      ))}
    </div>
  );
}

function ClientsTab({ t, clients, setClients }) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name:"", phone:"", address:"", email:"" });
  const openAdd = () => { setEditingId(null); setForm({ name:"", phone:"", address:"", email:"" }); setShowForm(true); };
  const openEdit = (c) => { setEditingId(c.id); setForm({ name:c.name, phone:c.phone, address:c.address, email:c.email }); setShowForm(true); };
  const saveClient = () => {
    if (!form.name) return;
    if (editingId) { setClients(clients.map(c => c.id === editingId ? { ...form, id:editingId } : c)); }
    else { setClients([...clients, { ...form, id:Date.now() }]); }
    setForm({ name:"", phone:"", address:"", email:"" }); setEditingId(null); setShowForm(false);
  };
  const deleteClient = (id) => { if (window.confirm(t.clients.confirmDelete)) setClients(clients.filter(c => c.id !== id)); };
  return (
    <div style={{ padding:16 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
        <h2 style={{ margin:0, color:C.green, fontSize:20, fontWeight:800 }}>{t.clients.title}</h2>
        <button onClick={openAdd} style={{ background:C.green, color:C.white, border:"none", borderRadius:8, padding:"8px 14px", fontWeight:700, cursor:"pointer", fontSize:13 }}>+ {t.clients.addClient}</button>
      </div>
      {showForm && (
        <div style={{ background:C.greenPale, borderRadius:12, padding:16, marginBottom:16 }}>
          {[["name",t.clients.name],["phone",t.clients.phone],["address",t.clients.address],["email",t.clients.email]].map(([key,label]) => (
            <input key={key} value={form[key]} onChange={e => setForm({ ...form, [key]:e.target.value })} placeholder={label} style={{ width:"100%", padding:"10px 12px", borderRadius:8, border:`1px solid ${C.grayMid}`, fontSize:14, marginBottom:10, boxSizing:"border-box" }} />
          ))}
          <button onClick={saveClient} style={{ width:"100%", background:C.green, color:C.white, border:"none", borderRadius:8, padding:"11px 0", fontWeight:700, cursor:"pointer" }}>{editingId ? t.clients.update : t.clients.save}</button>
        </div>
      )}
      {clients.length === 0 ? <div style={{ textAlign:"center", color:C.grayDark, padding:"40px 16px", fontSize:14 }}>{t.clients.noClients}</div> : clients.map(c => (
        <div key={c.id} style={{ background:C.white, borderRadius:12, padding:14, marginBottom:10, border:`1px solid ${C.grayMid}` }}>
          <div style={{ fontWeight:700, fontSize:15, color:C.text, marginBottom:2 }}>{c.name}</div>
          <div style={{ color:C.grayDark, fontSize:13, marginBottom:2 }}>{c.phone}</div>
          <div style={{ color:C.grayDark, fontSize:13, marginBottom:8 }}>{c.address}</div>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {c.phone && <a href={`tel:${c.phone}`} style={{ background:C.green, color:C.white, borderRadius:6, padding:"6px 12px", fontSize:12, fontWeight:600, textDecoration:"none" }}>{t.clients.call}</a>}
            {c.address && <a href={`https://maps.google.com/?q=${encodeURIComponent(c.address)}`} target="_blank" rel="noreferrer" style={{ background:C.blue, color:C.white, borderRadius:6, padding:"6px 12px", fontSize:12, fontWeight:600, textDecoration:"none" }}>{t.clients.directions}</a>}
            <button onClick={() => openEdit(c)} style={{ background:C.orange, color:C.white, border:"none", borderRadius:6, padding:"6px 12px", fontSize:12, fontWeight:600, cursor:"pointer" }}>{t.clients.edit}</button>
            <button onClick={() => deleteClient(c.id)} style={{ background:C.red, color:C.white, border:"none", borderRadius:6, padding:"6px 12px", fontSize:12, fontWeight:600, cursor:"pointer" }}>{t.clients.delete}</button>
          </div>
        </div>
      ))}
    </div>
  );
}

function InvoicesTab({ t, clients, invoices, setInvoices }) {
  const [showForm, setShowForm] = useState(false);
  const emptyLine = () => ({ service:"", amount:"", date:new Date().toISOString().split("T")[0], id:Date.now()+Math.random() });
  const [form, setForm] = useState({ client:"", lines:[emptyLine()] });
  const addLine = () => setForm({ ...form, lines:[...form.lines, emptyLine()] });
  const removeLine = (id) => setForm({ ...form, lines:form.lines.filter(l => l.id !== id) });
  const updateLine = (id, field, val) => setForm({ ...form, lines:form.lines.map(l => l.id === id ? { ...l, [field]:val } : l) });
  const lineTotal = (lines) => lines.reduce((s,l) => s+parseFloat(l.amount||0), 0);
  const create = () => {
    if (!form.client) return;
    const validLines = form.lines.filter(l => l.amount && parseFloat(l.amount) > 0);
    if (validLines.length === 0) return;
    const total = lineTotal(validLines);
    setInvoices([...invoices, { id:Date.now(), client:form.client, lines:validLines, total, status:"pending", date:new Date().toISOString().split("T")[0] }]);
    setForm({ client:"", lines:[emptyLine()] }); setShowForm(false);
  };
  const total = invoices.reduce((s,i) => s+parseFloat(i.total||0),0);
  const paid = invoices.filter(i=>i.status==="paid").reduce((s,i) => s+parseFloat(i.total||0),0);
  return (
    <div style={{ padding:16 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
        <h2 style={{ margin:0, color:C.green, fontSize:20, fontWeight:800 }}>{t.invoices.title}</h2>
        <button onClick={() => setShowForm(!showForm)} style={{ background:C.green, color:C.white, border:"none", borderRadius:8, padding:"8px 14px", fontWeight:700, cursor:"pointer", fontSize:13 }}>+ {t.invoices.create}</button>
      </div>
      <div style={{ display:"flex", gap:10, marginBottom:16 }}>
        <div style={{ flex:1, background:C.greenPale, borderRadius:10, padding:12, textAlign:"center" }}>
          <div style={{ fontSize:11, color:C.grayDark, marginBottom:2 }}>{t.invoices.total}</div>
          <div style={{ fontSize:20, fontWeight:800, color:C.green }}>${total.toFixed(2)}</div>
        </div>
        <div style={{ flex:1, background:"#fff8e1", borderRadius:10, padding:12, textAlign:"center" }}>
          <div style={{ fontSize:11, color:C.grayDark, marginBottom:2 }}>{t.invoices.paid}</div>
          <div style={{ fontSize:20, fontWeight:800, color:C.orange }}>${paid.toFixed(2)}</div>
        </div>
      </div>
      {showForm && (
        <div style={{ background:C.greenPale, borderRadius:12, padding:16, marginBottom:16 }}>
          <select value={form.client} onChange={e => setForm({ ...form, client:e.target.value })} style={{ width:"100%", padding:"10px 12px", borderRadius:8, border:`1px solid ${C.grayMid}`, fontSize:14, marginBottom:12, boxSizing:"border-box" }}>
            <option value="">-- {t.invoices.client} --</option>
            {clients.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
          </select>
          <div style={{ fontSize:12, fontWeight:700, color:C.grayDark, marginBottom:8 }}>{t.invoices.lineItems}</div>
          {form.lines.map((line, idx) => (
            <div key={line.id} style={{ background:C.white, borderRadius:8, padding:10, marginBottom:8, border:`1px solid ${C.grayMid}` }}>
              <select value={line.service} onChange={e => updateLine(line.id, "service", e.target.value)} style={{ width:"100%", padding:"8px 10px", borderRadius:6, border:`1px solid ${C.grayMid}`, fontSize:13, marginBottom:6, boxSizing:"border-box" }}>
                <option value="">-- {t.invoices.service} --</option>
                {t.invoices.services.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <input value={line.date} onChange={e => updateLine(line.id, "date", e.target.value)} type="date" style={{ width:"100%", padding:"8px 10px", borderRadius:6, border:`1px solid ${C.grayMid}`, fontSize:13, marginBottom:6, boxSizing:"border-box" }} />
              <input value={line.amount} onChange={e => updateLine(line.id, "amount", e.target.value)} placeholder={t.invoices.amount} type="number" style={{ width:"100%", padding:"8px 10px", borderRadius:6, border:`1px solid ${C.grayMid}`, fontSize:13, marginBottom:6, boxSizing:"border-box" }} />
              {form.lines.length > 1 && <button onClick={() => removeLine(line.id)} style={{ background:C.red, color:C.white, border:"none", borderRadius:6, padding:"6px 10px", fontSize:11, fontWeight:600, cursor:"pointer" }}>{t.invoices.removeLine}</button>}
            </div>
          ))}
          <button onClick={addLine} style={{ width:"100%", background:C.white, color:C.green, border:`2px dashed ${C.green}`, borderRadius:8, padding:"10px 0", fontWeight:700, cursor:"pointer", marginBottom:10, fontSize:13 }}>{t.invoices.addLine}</button>
          <div style={{ background:C.white, padding:"10px 12px", borderRadius:8, marginBottom:10, textAlign:"right", fontWeight:700, color:C.green, fontSize:15 }}>{t.invoices.total}: ${lineTotal(form.lines).toFixed(2)}</div>
          <button onClick={create} style={{ width:"100%", background:C.green, color:C.white, border:"none", borderRadius:8, padding:"11px 0", fontWeight:700, cursor:"pointer" }}>{t.invoices.send}</button>
        </div>
      )}
      {invoices.length === 0 ? <div style={{ textAlign:"center", color:C.grayDark, padding:"40px 16px", fontSize:14 }}>{t.invoices.noInvoices}</div> : invoices.map(inv => (
        <div key={inv.id} style={{ background:C.white, borderRadius:12, padding:14, marginBottom:10, border:`1px solid ${C.grayMid}` }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
            <div style={{ fontWeight:700, fontSize:15, color:C.text }}>{inv.client}</div>
            <div style={{ fontSize:17, fontWeight:800, color:C.green }}>${parseFloat(inv.total).toFixed(2)}</div>
          </div>
          {inv.lines && inv.lines.map(l => (
            <div key={l.id} style={{ display:"flex", justifyContent:"space-between", color:C.grayDark, fontSize:13, marginBottom:3, paddingLeft:8, borderLeft:`2px solid ${C.greenPale}` }}>
              <div>{l.service} <span style={{ fontSize:11 }}>({l.date})</span></div>
              <div>${parseFloat(l.amount).toFixed(2)}</div>
            </div>
          ))}
          <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginTop:10 }}>
            <span style={{ background:inv.status==="paid"?"#e8f5e3":"#fff3cd", color:inv.status==="paid"?C.green:C.orange, borderRadius:6, padding:"4px 10px", fontSize:12, fontWeight:600 }}>
              {inv.status==="paid"?t.invoices.paid:t.invoices.pending}
            </span>
            {inv.status!=="paid" && <button onClick={() => setInvoices(invoices.map(x=>x.id===inv.id?{...x,status:"paid"}:x))} style={{ background:C.green, color:C.white, border:"none", borderRadius:6, padding:"4px 10px", fontSize:12, fontWeight:600, cursor:"pointer" }}>{t.invoices.markPaid}</button>}
            <a href="https://g.page/r/review" target="_blank" rel="noreferrer" style={{ background:C.blue, color:C.white, borderRadius:6, padding:"4px 10px", fontSize:12, fontWeight:600, textDecoration:"none" }}>⭐ {t.invoices.review}</a>
          </div>
        </div>
      ))}
    </div>
  );
}

function EstimatesTab({ t, clients, estimates, setEstimates }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ client:"", service:"", amount:"", notes:"" });
  const saveEst = () => { if (!form.client || !form.amount) return; setEstimates([...estimates, { ...form, id:Date.now(), status:"pending" }]); setForm({ client:"", service:"", amount:"", notes:"" }); setShowForm(false); };
  return (
    <div style={{ padding:16 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
        <h2 style={{ margin:0, color:C.green, fontSize:20, fontWeight:800 }}>{t.estimates.title}</h2>
        <button onClick={() => setShowForm(!showForm)} style={{ background:C.green, color:C.white, border:"none", borderRadius:8, padding:"8px 14px", fontWeight:700, cursor:"pointer", fontSize:13 }}>+ {t.estimates.create}</button>
      </div>
      {showForm && (
        <div style={{ background:C.greenPale, borderRadius:12, padding:16, marginBottom:16 }}>
          <select value={form.client} onChange={e => setForm({ ...form, client:e.target.value })} style={{ width:"100%", padding:"10px 12px", borderRadius:8, border:`1px solid ${C.grayMid}`, fontSize:14, marginBottom:10, boxSizing:"border-box" }}>
            <option value="">-- {t.estimates.client} --</option>
            {clients.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
          </select>
          <input value={form.service} onChange={e => setForm({ ...form, service:e.target.value })} placeholder={t.estimates.service} style={{ width:"100%", padding:"10px 12px", borderRadius:8, border:`1px solid ${C.grayMid}`, fontSize:14, marginBottom:10, boxSizing:"border-box" }} />
          <input value={form.amount} onChange={e => setForm({ ...form, amount:e.target.value })} placeholder={t.estimates.amount} type="number" style={{ width:"100%", padding:"10px 12px", borderRadius:8, border:`1px solid ${C.grayMid}`, fontSize:14, marginBottom:10, boxSizing:"border-box" }} />
          <input value={form.notes} onChange={e => setForm({ ...form, notes:e.target.value })} placeholder={t.estimates.notes} style={{ width:"100%", padding:"10px 12px", borderRadius:8, border:`1px solid ${C.grayMid}`, fontSize:14, marginBottom:10, boxSizing:"border-box" }} />
          <button onClick={saveEst} style={{ width:"100%", background:C.green, color:C.white, border:"none", borderRadius:8, padding:"11px 0", fontWeight:700, cursor:"pointer" }}>{t.estimates.save}</button>
        </div>
      )}
      {estimates.length === 0 ? <div style={{ textAlign:"center", color:C.grayDark, padding:"40px 16px", fontSize:14 }}>{t.estimates.noEstimates}</div> : estimates.map(est => (
        <div key={est.id} style={{ background:C.white, borderRadius:12, padding:14, marginBottom:10, border:`1px solid ${C.grayMid}` }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
            <div style={{ fontWeight:700, fontSize:15, color:C.text }}>{est.client}</div>
            <div style={{ fontSize:16, fontWeight:800, color:C.green }}>${parseFloat(est.amount).toFixed(2)}</div>
          </div>
          <div style={{ color:C.grayDark, fontSize:13, marginBottom:8 }}>{est.service}</div>
          <div style={{ display:"flex", gap:8 }}>
            <span style={{ background:est.status==="approved"?"#e8f5e3":"#fff3cd", color:est.status==="approved"?C.green:C.orange, borderRadius:6, padding:"4px 10px", fontSize:12, fontWeight:600 }}>
              {est.status==="approved"?t.estimates.approved:t.estimates.pending}
            </span>
            {est.status!=="approved" && <button onClick={() => setEstimates(estimates.map(x=>x.id===est.id?{...x,status:"approved"}:x))} style={{ background:C.green, color:C.white, border:"none", borderRadius:6, padding:"4px 10px", fontSize:12, fontWeight:600, cursor:"pointer" }}>{t.estimates.convert}</button>}
          </div>
        </div>
      ))}
    </div>
  );
}

function BillingTab({ t, invoices }) {
  const total = invoices.reduce((s,i) => s+parseFloat(i.total||0), 0);
  const paid = invoices.filter(i=>i.status==="paid").reduce((s,i) => s+parseFloat(i.total||0), 0);
  const pending = total - paid;
  const thisMonth = invoices.filter(i => { const d = new Date(i.date); const n = new Date(); return d.getMonth() === n.getMonth() && d.getFullYear() === n.getFullYear(); }).reduce((s,i) => s+parseFloat(i.total||0), 0);
  return (
    <div style={{ padding:16 }}>
      <h2 style={{ margin:"0 0 16px", color:C.green, fontSize:20, fontWeight:800 }}>{t.billing.title}</h2>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:20 }}>
        {[[t.billing.totalEarned, `$${paid.toFixed(2)}`, C.green],[t.billing.totalPending, `$${pending.toFixed(2)}`, C.orange],[t.billing.thisMonth, `$${thisMonth.toFixed(2)}`, C.blue],["Total Invoices", `${invoices.length}`, C.grayDark]].map(([label,val,color]) => (
          <div key={label} style={{ background:C.white, border:`1px solid ${C.grayMid}`, borderRadius:12, padding:14, textAlign:"center" }}>
            <div style={{ fontSize:11, color:C.grayDark, marginBottom:4 }}>{label}</div>
            <div style={{ fontSize:22, fontWeight:800, color }}>{val}</div>
          </div>
        ))}
      </div>
      <div style={{ background:C.greenPale, borderRadius:12, padding:16, marginBottom:12 }}>
        <div style={{ fontSize:13, color:C.grayDark, marginBottom:4 }}>{t.billing.plan}</div>
        <div style={{ fontWeight:800, fontSize:16, color:C.green, marginBottom:2 }}>{t.billing.monthly}</div>
        <div style={{ fontSize:12, color:C.grayDark }}>{t.billing.annual} — save $100/year</div>
      </div>
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState(() => load("cp_lang", "en"));
  const [unlocked, setUnlocked] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [clients, setClients] = useState(() => load("cp_clients", []));
  const [invoices, setInvoices] = useState(() => load("cp_invoices", []));
  const [estimates, setEstimates] = useState(() => load("cp_estimates", []));
  const t = TRANSLATIONS[lang];

  useEffect(() => { if (load("cp_unlocked", false)) setUnlocked(true); }, []);
  useEffect(() => { save("cp_lang", lang); }, [lang]);
  useEffect(() => { save("cp_clients", clients); }, [clients]);
  useEffect(() => { save("cp_invoices", invoices); }, [invoices]);
  useEffect(() => { save("cp_estimates", estimates); }, [estimates]);

  const handleUnlock = () => { setUnlocked(true); save("cp_unlocked", true); };

  if (!unlocked) return (
    <div>
      <div style={{ position:"fixed", top:12, right:16, zIndex:99 }}>
        <button onClick={() => setLang(lang==="en"?"es":"en")} style={{ background:"rgba(255,255,255,0.2)", color:C.white, border:"1px solid rgba(255,255,255,0.4)", borderRadius:20, padding:"6px 14px", fontWeight:700, cursor:"pointer", fontSize:13 }}>{t.lang}</button>
      </div>
      <AccessGate onUnlock={handleUnlock} t={t} />
    </div>
  );

  const tabs = [
    <RouteTab t={t} clients={clients} key="route" />,
    <ClientsTab t={t} clients={clients} setClients={setClients} key="clients" />,
    <InvoicesTab t={t} clients={clients} invoices={invoices} setInvoices={setInvoices} key="invoices" />,
    <EstimatesTab t={t} clients={clients} estimates={estimates} setEstimates={setEstimates} key="estimates" />,
    <BillingTab t={t} invoices={invoices} key="billing" />,
  ];

  return (
    <div style={{ maxWidth:480, margin:"0 auto", minHeight:"100vh", background:C.gray, fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", paddingBottom:80 }}>
      <div style={{ background:C.white, padding:0, display:"flex", justifyContent:"space-between", alignItems:"center", position:"sticky", top:0, zIndex:10, borderBottom:`3px solid ${C.green}` }}>
        <img src="/header.png" alt="Corte Pro" style={{ height:70, width:"auto", maxWidth:"calc(100% - 80px)", objectFit:"contain" }} />
        <button onClick={() => setLang(lang==="en"?"es":"en")} style={{ background:C.green, color:C.white, border:`1px solid ${C.greenDark}`, borderRadius:20, padding:"6px 14px", fontWeight:700, cursor:"pointer", fontSize:12, marginRight:12 }}>{t.lang}</button>
      </div>
      <div>{tabs[activeTab]}</div>
      <div style={{ position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:480, background:C.black, borderTop:`3px solid ${C.green}`, display:"flex", zIndex:10 }}>
        {t.tabs.map((tab,i) => (
          <button key={tab} onClick={() => setActiveTab(i)} style={{ flex:1, padding:"10px 0", background:"none", border:"none", color:activeTab===i?C.green:"rgba(255,255,255,0.6)", fontWeight:activeTab===i?800:500, fontSize:11, cursor:"pointer", borderTop:activeTab===i?`2px solid ${C.green}`:"2px solid transparent" }}>
            {["🗺️","👥","📄","📋","💰"][i]}<br />{tab}
          </button>
        ))}
      </div>
    </div>
  );
}

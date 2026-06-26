import React, { useState, useEffect, useRef } from "react";

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
  "Corte de Pasto Semanal",
  "Corte de Pasto Quincenal",
  "Orillado del Pasto",
  "Aireación",
  "Limpieza del Pasto",
  "Instalación de Pasto en Rollo",
  "Instalación de Mulch",
  "Podar Arbustos",
  "Podar Setos",
  "Plantar Árboles",
  "Plantar Arbustos",
  "Entrega de Materiales",
  "Instalación de Muro de Contención",
  "Proyecto de Jardinería",
  "Limpieza de Primavera",
  "Limpieza de Otoño",
  "Quitar Nieve",
  "Echar Sal",
  "Limpiar Banquetas",
  "Servicio Completo de Nieve",
  "Otro Servicio",
];

const TRANSLATIONS = {
  en: {
    appName: "Corte Pro",
    tagline: "Manage Your Crew. Grow Your Business.",
    tabs: ["Route", "Clients", "Invoices", "Estimates", "Billing"],
    route: { title: "Today's Route", addStop: "Add Stop", address: "Address", client: "Client Name", addBtn: "Add", noStops: "No stops added yet. Add a client stop to begin.", navigate: "Start GPS", remove: "Remove", stop: "Stop", loadToday: "Load Today's Route", noScheduled: "No clients scheduled for today.", clearRoute: "Clear Route", optimize: "⚡ Optimize Order", optimized: "✓ Route optimized!" },
    clients: { title: "Clients", addClient: "Add Client", name: "Full Name", phone: "Phone Number", address: "Address", email: "Email (optional)", save: "Save Client", update: "Update Client", noClients: "No clients yet. Add your first client.", call: "Call", directions: "Directions", edit: "Edit", delete: "Delete", confirmDelete: "Delete this client?", schedule: "Service Schedule", weekly: "Weekly", biweeklyA: "Bi-Weekly (Week A)", biweeklyB: "Bi-Weekly (Week B)", oneTime: "One-Time / No Schedule", days: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"], daysFull: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], import: "📥 Import CSV", downloadTemplate: "📄 Download Template", importTitle: "Import Clients from CSV", importBlurb: "Upload a CSV file to add many clients at once. Download the template below, fill in your clients in Excel or Google Sheets, save as CSV, then upload it here.", importSuccess: "clients imported!", importError: "Could not read this file. Make sure it's a CSV file.", schedHelp: "Schedule: weekly, biweeklyA, biweeklyB, or oneTime. Days: comma-separated like Mon,Wed,Fri" },
    invoices: { title: "Invoices", create: "Create Invoice", client: "Select Client", service: "Service", amount: "Amount ($)", date: "Date", send: "Save Invoice", paid: "Paid", pending: "Pending", noInvoices: "No invoices yet. Create your first invoice.", total: "Total", services: SERVICES_EN, markPaid: "Mark Paid", review: "Request Review", addLine: "+ Add Service Line", removeLine: "Remove", lineItems: "Service Lines", from: "From", to: "Bill To", setup: "Set up your company info in Settings to show your business name on invoices.", invoiceNum: "Invoice #", textInv: "📱 Text", emailInv: "✉️ Email", deleteInv: "Delete", confirmDelInv: "Delete this invoice?" },
    estimates: { title: "Estimates", create: "Create Estimate", client: "Select Client", service: "Service Description", amount: "Estimated Amount ($)", notes: "Notes", save: "Save Estimate", convert: "Convert to Invoice", noEstimates: "No estimates yet.", approved: "Approved", pending: "Pending", convertConfirm: "Convert this estimate to an invoice?", converted: "✓ Estimate converted to invoice!", textEst: "📱 Text", emailEst: "✉️ Email", deleteEst: "Delete", confirmDelEst: "Delete this estimate?" },
    billing: { title: "Billing & Reports", totalEarned: "Total Earned", totalPending: "Pending", thisMonth: "This Month", lastMonth: "Last Month", export: "📊 Export Invoices to CSV", exportEstimates: "📋 Export Estimates to CSV", plan: "Current Plan", monthly: "$24.99/month", annual: "$199/year", settings: "Company Settings", companyName: "Company Name", ownerName: "Owner Name", phone: "Phone Number", email: "Email", address: "Business Address", license: "License # (optional)", saveSettings: "Save Settings", saved: "Settings saved!", exportTitle: "Accounting Export", exportBlurb: "Download your invoices as a CSV file. You can then upload this file directly into QuickBooks, Wave, FreshBooks, Xero, or your accountant's software. Most accounting platforms have a 'Import from CSV' option in their invoices section.", noData: "No data to export yet.", paymentsTitle: "Payment Methods Accepted", paymentsBlurb: "Select which payment methods you accept. These will be shown on every invoice so clients know how to pay you.", check: "Check", cash: "Cash", zelle: "Zelle", venmo: "Venmo", cashapp: "Cash App", creditCard: "Credit Card", paymentHandle: "Handle/Number (e.g. @Yourname or phone)", reviewTitle: "Google Review Link", reviewBlurb: "Paste your Google Business review link here. Get it free at business.google.com → Get more reviews → Share review form. Without this, the 'Request Review' button on invoices won't work.", reviewPlaceholder: "https://g.page/r/YOUR-CODE/review" },
    access: { title: "Enter Access Code", subtitle: "Enter your Corte Pro access code to get started.", placeholder: "", btn: "Unlock App", error: "Invalid access code. Please try again.", codes: ["CP-2025-LAUNCH","CP-2025-BETA1","CP-2025-BETA2"] },
    setup: { title: "Welcome to Corte Pro!", subtitle: "Let's set up your business. This info will appear on your invoices and estimates.", companyName: "Company Name", ownerName: "Your Name", phone: "Business Phone", email: "Business Email", address: "Business Address", continue: "Continue to App", skip: "Skip for now", payments: "Payment Methods You Accept" },
    pdf: "🖨️ Print/PDF",
    lang: "Español",
  },
  es: {
    appName: "Corte Pro",
    tagline: "Maneja Tu Equipo. Haz Crecer Tu Negocio.",
    tabs: ["Ruta","Clientes","Facturas","Estimados","Facturación"],
    route: { title: "Ruta de Hoy", addStop: "Agregar Parada", address: "Dirección", client: "Nombre del Cliente", addBtn: "Agregar", noStops: "No hay paradas. Agrega una parada para comenzar.", navigate: "Iniciar GPS", remove: "Eliminar", stop: "Parada", loadToday: "Cargar Ruta de Hoy", noScheduled: "No hay clientes programados para hoy.", clearRoute: "Borrar Ruta", optimize: "⚡ Optimizar Orden", optimized: "✓ ¡Ruta optimizada!" },
    clients: { title: "Clientes", addClient: "Agregar Cliente", name: "Nombre Completo", phone: "Teléfono", address: "Dirección", email: "Correo (opcional)", save: "Guardar Cliente", update: "Actualizar Cliente", noClients: "No hay clientes. Agrega tu primer cliente.", call: "Llamar", directions: "Direcciones", edit: "Corregir", delete: "Eliminar", confirmDelete: "¿Eliminar este cliente?", schedule: "Horario de Servicio", weekly: "Semanal", biweeklyA: "Quincenal (Semana A)", biweeklyB: "Quincenal (Semana B)", oneTime: "Una Vez / Sin Horario", days: ["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"], daysFull: ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"], import: "📥 Importar CSV", downloadTemplate: "📄 Descargar Plantilla", importTitle: "Importar Clientes desde CSV", importBlurb: "Sube un archivo CSV para agregar muchos clientes a la vez. Descarga la plantilla, llena tus clientes en Excel o Google Sheets, guarda como CSV, y súbelo aquí.", importSuccess: "¡clientes importados!", importError: "No se pudo leer este archivo. Asegúrate que sea un archivo CSV.", schedHelp: "Horario: weekly, biweeklyA, biweeklyB, o oneTime. Días: separados por comas como Lun,Mié,Vie" },
    invoices: { title: "Facturas", create: "Crear Factura", client: "Seleccionar Cliente", service: "Servicio", amount: "Cantidad ($)", date: "Fecha", send: "Guardar Factura", paid: "Pagado", pending: "Pendiente", noInvoices: "No hay facturas. Crea tu primera factura.", total: "Total", services: SERVICES_ES, markPaid: "Marcar Pagado", review: "Pedir Reseña", addLine: "+ Agregar Servicio", removeLine: "Quitar", lineItems: "Servicios", from: "De", to: "Para", setup: "Configura los datos de tu negocio en Ajustes para que aparezcan en tus facturas.", invoiceNum: "Factura #", textInv: "📱 Mensaje", emailInv: "✉️ Correo", deleteInv: "Eliminar", confirmDelInv: "¿Eliminar esta factura?" },
    estimates: { title: "Estimados", create: "Crear Estimado", client: "Seleccionar Cliente", service: "Descripción del Servicio", amount: "Cantidad Estimada ($)", notes: "Notas", save: "Guardar Estimado", convert: "Convertir a Factura", noEstimates: "No hay estimados.", approved: "Aprobado", pending: "Pendiente", convertConfirm: "¿Convertir este estimado a factura?", converted: "✓ ¡Estimado convertido a factura!", textEst: "📱 Mensaje", emailEst: "✉️ Correo", deleteEst: "Eliminar", confirmDelEst: "¿Eliminar este estimado?" },
    billing: { title: "Facturación y Reportes", totalEarned: "Total Ganado", totalPending: "Pendiente", thisMonth: "Este Mes", lastMonth: "Mes Pasado", export: "📊 Exportar Facturas a CSV", exportEstimates: "📋 Exportar Estimados a CSV", plan: "Plan Actual", monthly: "$24.99/mes", annual: "$199/año", settings: "Información del Negocio", companyName: "Nombre del Negocio", ownerName: "Nombre del Dueño", phone: "Teléfono", email: "Correo", address: "Dirección del Negocio", license: "Licencia # (opcional)", saveSettings: "Guardar Información", saved: "¡Información guardada!", exportTitle: "Exportar para Contabilidad", exportBlurb: "Descarga tus facturas en un archivo CSV. Después puedes subir este archivo directamente a QuickBooks, Wave, FreshBooks, Xero, o el programa de tu contador. La mayoría de los programas de contabilidad tienen una opción de 'Importar desde CSV' en su sección de facturas.", noData: "No hay datos para exportar todavía.", paymentsTitle: "Métodos de Pago Aceptados", paymentsBlurb: "Selecciona qué métodos de pago aceptas. Estos van a salir en cada factura para que los clientes sepan cómo pagarte.", check: "Cheque", cash: "Efectivo", zelle: "Zelle", venmo: "Venmo", cashapp: "Cash App", creditCard: "Tarjeta de Crédito", paymentHandle: "Usuario/Número (ej. @TuNombre o teléfono)", reviewTitle: "Link de Reseñas de Google", reviewBlurb: "Pega aquí el link de reseñas de tu Negocio en Google. Consíguelo gratis en business.google.com → Conseguir más reseñas → Compartir formulario. Sin este link, el botón 'Pedir Reseña' en las facturas no va a funcionar.", reviewPlaceholder: "https://g.page/r/TU-CODIGO/review" },
    access: { title: "Ingresa tu Código", subtitle: "Ingresa tu código de acceso de Corte Pro para comenzar.", placeholder: "", btn: "Desbloquear App", error: "Código inválido. Intenta de nuevo.", codes: ["CP-2025-LAUNCH","CP-2025-BETA1","CP-2025-BETA2"] },
    setup: { title: "¡Bienvenido a Corte Pro!", subtitle: "Configura tu negocio. Estos datos van a salir en tus facturas y estimados.", companyName: "Nombre del Negocio", ownerName: "Tu Nombre", phone: "Teléfono del Negocio", email: "Correo del Negocio", address: "Dirección del Negocio", continue: "Continuar a la App", skip: "Saltar por ahora", payments: "Métodos de Pago que Aceptas" },
    pdf: "🖨️ Imprimir/PDF",
    lang: "English",
  },
};

const C = { green: "#2D6A1F", greenDark: "#1a4011", greenPale: "#f0ebd8", tan: "#d4c5a0", tanLight: "#f0ebd8", tanDark: "#a8946b", white: "#ffffff", gray: "#f5f0e6", grayMid: "#d4c5a0", grayDark: "#666", text: "#1a1a1a", black: "#0d0d0d", red: "#c0392b", orange: "#e67e22", blue: "#2980b9" };

// Storage helpers — saves data so it doesn't disappear when switching tabs
const save = (key, val) => { try { localStorage.setItem(key, JSON.stringify(val)); } catch(e){} };
const load = (key, fallback) => { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch(e){ return fallback; } };

// Helper: Format ISO date (YYYY-MM-DD) as M/D/YYYY
const formatDate = (iso) => {
  if (!iso) return "";
  const parts = String(iso).split("-");
  if (parts.length !== 3) return iso;
  const [y, m, d] = parts;
  const monthNum = parseInt(m, 10);
  const dayNum = parseInt(d, 10);
  if (isNaN(monthNum) || isNaN(dayNum)) return iso;
  return `${monthNum}/${dayNum}/${y}`;
};

// Helper: Format invoice as plain text for SMS/Email
const formatInvoiceText = (inv, company, t) => {
  let text = "";
  if (company.companyName) text += `${company.companyName}\n`;
  if (company.ownerName) text += `${company.ownerName}\n`;
  if (company.phone) text += `${company.phone}\n`;
  text += `\n${t.invoices.invoiceNum}: ${inv.id}\n${t.invoices.date}: ${formatDate(inv.date)}\n\n`;
  text += `${t.invoices.to}: ${inv.client}\n\n`;
  if (inv.lines) {
    inv.lines.forEach(l => { text += `• ${l.service} (${formatDate(l.date)}) — $${parseFloat(l.amount).toFixed(2)}\n`; });
  }
  text += `\n${t.invoices.total}: $${parseFloat(inv.total).toFixed(2)}\n`;
  text += `${t.invoices.paid}/${t.invoices.pending}: ${inv.status}\n`;
  return text;
};

// Helper: Send via SMS (opens phone's texting app)
const sendSMS = (phone, body) => {
  const cleanPhone = (phone || "").replace(/[^\d+]/g, "");
  window.location.href = `sms:${cleanPhone}?body=${encodeURIComponent(body)}`;
};

// Helper: Send via Email (opens phone's email app)
const sendEmail = (email, subject, body) => {
  window.location.href = `mailto:${email||""}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

// Helper: Simple route optimization using nearest-neighbor based on text-similarity of addresses
// Since we don't have GPS coords, we group by ZIP code or city name when possible
const optimizeRoute = (stops) => {
  if (stops.length < 2) return stops;
  // Extract ZIP codes if present, else use full address as grouping key
  const getKey = (s) => {
    const zipMatch = (s.address||"").match(/\b\d{5}\b/);
    if (zipMatch) return zipMatch[0];
    // Fall back to extracting city name (text after second comma)
    const parts = (s.address||"").split(",");
    return parts.length > 1 ? parts[1].trim().toLowerCase() : (s.address||"").toLowerCase();
  };
  // Group stops by key, then return groups in order
  const grouped = {};
  stops.forEach(s => { const k = getKey(s); if (!grouped[k]) grouped[k] = []; grouped[k].push(s); });
  const sortedKeys = Object.keys(grouped).sort();
  const result = [];
  sortedKeys.forEach(k => grouped[k].forEach(s => result.push(s)));
  return result;
};

// Helper: Print invoice as PDF (uses browser's built-in print-to-PDF)
const printInvoice = (inv, company, t) => {
  const win = window.open("", "_blank");
  if (!win) return;
  const payments = company.payments || {};
  const enabledPayments = Object.entries(payments).filter(([k,v]) => v && v.enabled);
  const paymentsHtml = enabledPayments.length > 0 ? `
    <div style="margin-top:30px;padding:16px;background:#f0ebd8;border-radius:8px;border-left:4px solid #2D6A1F;">
      <div style="font-weight:bold;color:#2D6A1F;margin-bottom:8px;">${t.billing.paymentsTitle}:</div>
      ${enabledPayments.map(([k,v]) => `<div style="margin:4px 0;font-size:14px;">✓ <strong>${t.billing[k]||k}</strong>${v.handle ? ` — ${v.handle}` : ''}</div>`).join("")}
    </div>` : "";
  const linesHtml = (inv.lines||[]).map(l => `<tr><td style="padding:8px;border-bottom:1px solid #eee;">${l.service||""}</td><td style="padding:8px;border-bottom:1px solid #eee;">${formatDate(l.date)}</td><td style="padding:8px;border-bottom:1px solid #eee;text-align:right;">$${parseFloat(l.amount||0).toFixed(2)}</td></tr>`).join("");
  const html = `<!DOCTYPE html><html><head><title>${t.invoices.invoiceNum} ${inv.id}</title><meta charset="UTF-8"></head>
    <body style="font-family:Arial,sans-serif;max-width:800px;margin:30px auto;padding:30px;color:#1a1a1a;">
      <div style="border-bottom:3px solid #2D6A1F;padding-bottom:20px;margin-bottom:30px;">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;">
          <div>
            <div style="font-size:28px;font-weight:800;color:#2D6A1F;">${company.companyName||"Your Company"}</div>
            ${company.ownerName?`<div style="color:#666;">${company.ownerName}</div>`:""}
            ${company.phone?`<div style="color:#666;">📞 ${company.phone}</div>`:""}
            ${company.email?`<div style="color:#666;">✉️ ${company.email}</div>`:""}
            ${company.address?`<div style="color:#666;">${company.address}</div>`:""}
            ${company.license?`<div style="color:#666;font-size:11px;">License: ${company.license}</div>`:""}
          </div>
          <div style="text-align:right;">
            <div style="font-size:24px;font-weight:800;color:#1a1a1a;">INVOICE</div>
            <div style="color:#666;">#${inv.id}</div>
            <div style="color:#666;">${formatDate(inv.date)}</div>
          </div>
        </div>
      </div>
      <div style="margin-bottom:24px;">
        <div style="font-size:12px;color:#666;font-weight:bold;">${t.invoices.to}:</div>
        <div style="font-size:18px;font-weight:bold;">${inv.client}</div>
      </div>
      <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
        <thead><tr style="background:#2D6A1F;color:white;"><th style="padding:10px;text-align:left;">${t.invoices.service}</th><th style="padding:10px;text-align:left;">${t.invoices.date}</th><th style="padding:10px;text-align:right;">${t.invoices.amount}</th></tr></thead>
        <tbody>${linesHtml}</tbody>
      </table>
      <div style="text-align:right;font-size:22px;font-weight:800;color:#2D6A1F;padding:14px;background:#e8f5e3;border-radius:8px;">${t.invoices.total}: $${parseFloat(inv.total||0).toFixed(2)}</div>
      <div style="margin-top:14px;text-align:right;font-size:14px;font-weight:600;color:${inv.status==='paid'?'#2D6A1F':'#e67e22'};">${inv.status==='paid'?t.invoices.paid.toUpperCase():t.invoices.pending.toUpperCase()}</div>
      ${paymentsHtml}
      <div style="margin-top:40px;padding-top:20px;border-top:1px solid #eee;text-align:center;color:#999;font-size:11px;">Generated by Corte Pro · cortepro.app</div>
    </body></html>`;
  win.document.write(html);
  win.document.close();
  setTimeout(() => { win.print(); }, 500);
};

// Helper: Print estimate as PDF (uses browser's built-in print-to-PDF)
const printEstimate = (est, company, t) => {
  const win = window.open("", "_blank");
  if (!win) return;
  const payments = company.payments || {};
  const enabledPayments = Object.entries(payments).filter(([k,v]) => v && v.enabled);
  const paymentsHtml = enabledPayments.length > 0 ? `
    <div style="margin-top:30px;padding:16px;background:#f0ebd8;border-radius:8px;border-left:4px solid #2D6A1F;">
      <div style="font-weight:bold;color:#2D6A1F;margin-bottom:8px;">${t.billing.paymentsTitle}:</div>
      ${enabledPayments.map(([k,v]) => `<div style="margin:4px 0;font-size:14px;">✓ <strong>${t.billing[k]||k}</strong>${v.handle ? ` — ${v.handle}` : ''}</div>`).join("")}
    </div>` : "";
  const linesHtml = (est.lines||[]).map(l => `<tr><td style="padding:8px;border-bottom:1px solid #eee;">${l.service||""}</td><td style="padding:8px;border-bottom:1px solid #eee;text-align:right;">$${parseFloat(l.amount||0).toFixed(2)}</td></tr>`).join("");
  const notesHtml = est.notes ? `<div style="margin-top:20px;padding:14px;background:#f8f8f8;border-radius:8px;border-left:4px solid #888;"><div style="font-weight:bold;color:#333;margin-bottom:6px;">${t.estimates.notes}:</div><div style="color:#555;font-style:italic;">${est.notes}</div></div>` : "";
  const html = `<!DOCTYPE html><html><head><title>${t.estimates.title} ${est.id}</title><meta charset="UTF-8"></head>
    <body style="font-family:Arial,sans-serif;max-width:800px;margin:30px auto;padding:30px;color:#1a1a1a;">
      <div style="border-bottom:3px solid #2D6A1F;padding-bottom:20px;margin-bottom:30px;">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;">
          <div>
            <div style="font-size:28px;font-weight:800;color:#2D6A1F;">${company.companyName||"Your Company"}</div>
            ${company.ownerName?`<div style="color:#666;">${company.ownerName}</div>`:""}
            ${company.phone?`<div style="color:#666;">📞 ${company.phone}</div>`:""}
            ${company.email?`<div style="color:#666;">✉️ ${company.email}</div>`:""}
            ${company.address?`<div style="color:#666;">${company.address}</div>`:""}
            ${company.license?`<div style="color:#666;font-size:11px;">License: ${company.license}</div>`:""}
          </div>
          <div style="text-align:right;">
            <div style="font-size:24px;font-weight:800;color:#1a1a1a;">${t.estimates.title.toUpperCase()}</div>
            <div style="color:#666;">#${est.id}</div>
            <div style="color:#666;">${formatDate(est.date)}</div>
          </div>
        </div>
      </div>
      <div style="margin-bottom:24px;">
        <div style="font-size:12px;color:#666;font-weight:bold;">${t.invoices.to}:</div>
        <div style="font-size:18px;font-weight:bold;">${est.client}</div>
      </div>
      <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
        <thead><tr style="background:#2D6A1F;color:white;"><th style="padding:10px;text-align:left;">${t.invoices.service}</th><th style="padding:10px;text-align:right;">${t.invoices.amount}</th></tr></thead>
        <tbody>${linesHtml}</tbody>
      </table>
      <div style="text-align:right;font-size:22px;font-weight:800;color:#2D6A1F;padding:14px;background:#e8f5e3;border-radius:8px;">${t.invoices.total}: $${parseFloat(est.total||0).toFixed(2)}</div>
      <div style="margin-top:14px;text-align:right;font-size:14px;font-weight:600;color:${est.status==='approved'?'#2D6A1F':'#e67e22'};">${est.status==='approved'?t.estimates.approved.toUpperCase():t.estimates.pending.toUpperCase()}</div>
      ${notesHtml}
      ${paymentsHtml}
      <div style="margin-top:40px;padding-top:20px;border-top:1px solid #eee;text-align:center;color:#999;font-size:11px;">Generated by Corte Pro · cortepro.app</div>
    </body></html>`;
  win.document.write(html);
  win.document.close();
  setTimeout(() => { win.print(); }, 500);
};

function SetupScreen({ onComplete, t, lang, setLang }) {
  const [form, setForm] = useState({ companyName:"", ownerName:"", phone:"", email:"", address:"", payments:{ check:{enabled:false,handle:""}, cash:{enabled:false,handle:""}, zelle:{enabled:false,handle:""}, venmo:{enabled:false,handle:""}, cashapp:{enabled:false,handle:""}, creditCard:{enabled:false,handle:""} } });
  const togglePayment = (key) => setForm({ ...form, payments:{ ...form.payments, [key]:{ ...form.payments[key], enabled:!form.payments[key].enabled } } });
  const updatePaymentHandle = (key, val) => setForm({ ...form, payments:{ ...form.payments, [key]:{ ...form.payments[key], handle:val } } });
  const save = () => { onComplete(form); };
  const skip = () => { onComplete(form); };
  return (
    <div style={{ minHeight:"100vh", background:C.black, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"flex-start", padding:24, paddingTop:40 }}>
      <div style={{ position:"fixed", top:12, right:16, zIndex:99 }}>
        <button onClick={() => setLang(lang==="en"?"es":"en")} style={{ background:"rgba(255,255,255,0.15)", color:C.white, border:"1px solid rgba(255,255,255,0.3)", borderRadius:20, padding:"6px 14px", fontWeight:700, cursor:"pointer", fontSize:13 }}>{t.lang}</button>
      </div>
      <div style={{ background:C.white, borderRadius:16, padding:28, maxWidth:420, width:"100%", boxShadow:"0 8px 32px rgba(0,0,0,0.4)", borderTop:`4px solid ${C.green}`, marginBottom:30 }}>
        <div style={{ textAlign:"center", marginBottom:20 }}>
          <img src="/logo.png" alt="Corte Pro" style={{ width:90, marginBottom:12 }} />
          <div style={{ fontSize:18, fontWeight:800, color:C.black, marginBottom:6 }}>{t.setup.title}</div>
          <div style={{ fontSize:13, color:C.grayDark }}>{t.setup.subtitle}</div>
        </div>
        {[["companyName",t.setup.companyName],["ownerName",t.setup.ownerName],["phone",t.setup.phone],["email",t.setup.email],["address",t.setup.address]].map(([key,label]) => (
          <input key={key} value={form[key]} onChange={e => setForm({ ...form, [key]:e.target.value })} placeholder={label} style={{ width:"100%", padding:"11px 12px", borderRadius:8, border:`1px solid ${C.grayMid}`, fontSize:14, marginBottom:10, boxSizing:"border-box" }} />
        ))}
        <div style={{ fontSize:14, fontWeight:700, color:C.black, marginTop:14, marginBottom:8 }}>💳 {t.setup.payments}</div>
        {["check","cash","zelle","venmo","cashapp","creditCard"].map(key => (
          <div key={key} style={{ marginBottom:8 }}>
            <label style={{ display:"flex", alignItems:"center", gap:8, cursor:"pointer", padding:"8px 10px", background:form.payments[key].enabled?C.greenPale:C.gray, borderRadius:6 }}>
              <input type="checkbox" checked={form.payments[key].enabled} onChange={() => togglePayment(key)} style={{ width:16, height:16, accentColor:C.green }} />
              <span style={{ fontSize:13, fontWeight:600, color:C.text, flex:1 }}>{t.billing[key]}</span>
            </label>
            {form.payments[key].enabled && (key === "zelle" || key === "venmo" || key === "cashapp") && (
              <input value={form.payments[key].handle} onChange={e => updatePaymentHandle(key, e.target.value)} placeholder={t.billing.paymentHandle} style={{ width:"100%", padding:"8px 10px", borderRadius:6, border:`1px solid ${C.grayMid}`, fontSize:12, marginTop:6, boxSizing:"border-box" }} />
            )}
          </div>
        ))}
        <button onClick={save} style={{ width:"100%", background:C.green, color:C.white, border:"none", borderRadius:8, padding:"13px 0", fontSize:15, fontWeight:800, cursor:"pointer", marginTop:14, marginBottom:8 }}>{t.setup.continue}</button>
        <button onClick={skip} style={{ width:"100%", background:"none", color:C.grayDark, border:"none", padding:"8px 0", fontSize:13, cursor:"pointer", textDecoration:"underline" }}>{t.setup.skip}</button>
      </div>
    </div>
  );
}

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
  const startGPS = (address) => { window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}&travelmode=driving&dir_action=navigate`, "_blank"); };

  // Calculate today's day of week (0=Mon, 6=Sun) and which bi-weekly week it is
  const todayDayIdx = ((new Date().getDay() + 6) % 7);  // Convert Sun=0 to Mon=0
  // Week A vs B: based on week number of year (odd vs even)
  const weekNum = (() => { const d = new Date(); const start = new Date(d.getFullYear(),0,1); return Math.ceil(((d - start) / 86400000 + start.getDay() + 1) / 7); })();
  const isWeekA = weekNum % 2 === 1;

  const loadTodaysRoute = () => {
    const scheduled = clients.filter(c => {
      if (!c.scheduleType || c.scheduleType === "oneTime") return false;
      if (!c.days || !c.days.includes(todayDayIdx)) return false;
      if (c.scheduleType === "weekly") return true;
      if (c.scheduleType === "biweeklyA" && isWeekA) return true;
      if (c.scheduleType === "biweeklyB" && !isWeekA) return true;
      return false;
    });
    if (scheduled.length === 0) { alert(t.route.noScheduled); return; }
    const newStops = scheduled.map(c => ({ id:Date.now()+Math.random(), client:c.name, address:c.address, done:false }));
    setStops(newStops);
  };
  const clearRoute = () => setStops([]);

  return (
    <div style={{ padding:16 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
        <h2 style={{ margin:0, color:C.green, fontSize:20, fontWeight:800 }}>{t.route.title}</h2>
        <button onClick={() => setShowForm(!showForm)} style={{ background:C.green, color:C.white, border:"none", borderRadius:8, padding:"8px 14px", fontWeight:700, cursor:"pointer", fontSize:13 }}>+ {t.route.addStop}</button>
      </div>
      <div style={{ display:"flex", gap:8, marginBottom:14, flexWrap:"wrap" }}>
        <button onClick={loadTodaysRoute} style={{ flex:"1 1 auto", minWidth:140, background:C.black, color:C.white, border:`2px solid ${C.green}`, borderRadius:8, padding:"10px 12px", fontWeight:700, cursor:"pointer", fontSize:13 }}>📅 {t.route.loadToday}</button>
        {stops.length > 1 && <button onClick={() => { setStops(optimizeRoute(stops)); }} style={{ background:C.green, color:C.white, border:"none", borderRadius:8, padding:"10px 14px", fontWeight:700, cursor:"pointer", fontSize:13 }}>{t.route.optimize}</button>}
        {stops.length > 0 && <button onClick={clearRoute} style={{ background:C.white, color:C.red, border:`2px solid ${C.red}`, borderRadius:8, padding:"10px 14px", fontWeight:700, cursor:"pointer", fontSize:13 }}>{t.route.clearRoute}</button>}
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
  const [form, setForm] = useState({ name:"", phone:"", address:"", email:"", scheduleType:"oneTime", days:[] });
  const fileInputRef = useRef(null);
  const openAdd = () => { setEditingId(null); setForm({ name:"", phone:"", address:"", email:"", scheduleType:"oneTime", days:[] }); setShowForm(true); };
  const openEdit = (c) => { setEditingId(c.id); setForm({ name:c.name, phone:c.phone, address:c.address, email:c.email, scheduleType:c.scheduleType||"oneTime", days:c.days||[] }); setShowForm(true); };
  const toggleDay = (dayIdx) => {
    const newDays = form.days.includes(dayIdx) ? form.days.filter(d => d !== dayIdx) : [...form.days, dayIdx].sort();
    setForm({ ...form, days:newDays });
  };
  const saveClient = () => {
    if (!form.name) return;
    if (editingId) { setClients(clients.map(c => c.id === editingId ? { ...form, id:editingId } : c)); }
    else { setClients([...clients, { ...form, id:Date.now() }]); }
    setForm({ name:"", phone:"", address:"", email:"", scheduleType:"oneTime", days:[] }); setEditingId(null); setShowForm(false);
  };
  const deleteClient = (id) => { if (window.confirm(t.clients.confirmDelete)) setClients(clients.filter(c => c.id !== id)); };
  const scheduleLabel = (c) => {
    if (!c.scheduleType || c.scheduleType === "oneTime") return null;
    const dayNames = (c.days||[]).map(d => t.clients.days[d]).join(", ");
    if (!dayNames) return null;
    let prefix = "";
    if (c.scheduleType === "weekly") prefix = t.clients.weekly;
    if (c.scheduleType === "biweeklyA") prefix = t.clients.biweeklyA;
    if (c.scheduleType === "biweeklyB") prefix = t.clients.biweeklyB;
    return `${prefix}: ${dayNames}`;
  };
  // CSV template download
  const downloadTemplate = () => {
    const csv = "Name,Phone,Address,Email,Schedule,Days\nJohn Smith,555-1234,\"123 Main St, Anytown CA\",john@email.com,weekly,\"Mon,Wed,Fri\"\nMaria Garcia,555-5678,\"456 Oak Ave, Anytown CA\",maria@email.com,biweeklyA,Tue\nBob Jones,555-9999,\"789 Pine Rd, Anytown CA\",,oneTime,";
    const blob = new Blob([csv], { type:"text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "corte-pro-client-template.csv");
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
  };
  // CSV import handler
  const handleImport = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const text = evt.target.result;
        const lines = text.split(/\r?\n/).filter(l => l.trim().length > 0);
        if (lines.length < 2) { alert(t.clients.importError); return; }
        // Parse CSV — handles quoted fields with commas
        const parseLine = (line) => {
          const result = []; let cur = ""; let inQuotes = false;
          for (let i = 0; i < line.length; i++) {
            const ch = line[i];
            if (ch === '"') { if (inQuotes && line[i+1] === '"') { cur += '"'; i++; } else { inQuotes = !inQuotes; } }
            else if (ch === "," && !inQuotes) { result.push(cur.trim()); cur = ""; }
            else { cur += ch; }
          }
          result.push(cur.trim()); return result;
        };
        const headers = parseLine(lines[0]).map(h => h.toLowerCase());
        const idxName = headers.findIndex(h => h.includes("name"));
        const idxPhone = headers.findIndex(h => h.includes("phone"));
        const idxAddr = headers.findIndex(h => h.includes("address"));
        const idxEmail = headers.findIndex(h => h.includes("email"));
        const idxSched = headers.findIndex(h => h.includes("schedule"));
        const idxDays = headers.findIndex(h => h.includes("day"));
        const dayMap = { "mon":0,"tue":1,"wed":2,"thu":3,"fri":4,"sat":5,"sun":6,"lun":0,"mar":1,"mié":2,"mie":2,"jue":3,"vie":4,"sáb":5,"sab":5,"dom":6 };
        const imported = [];
        for (let i = 1; i < lines.length; i++) {
          const fields = parseLine(lines[i]);
          const name = idxName >= 0 ? fields[idxName] : "";
          if (!name) continue;
          const schedRaw = idxSched >= 0 ? (fields[idxSched]||"").toLowerCase() : "onetime";
          let scheduleType = "oneTime";
          if (schedRaw.includes("weekly") && !schedRaw.includes("biweekly")) scheduleType = "weekly";
          else if (schedRaw.includes("biweeklya") || schedRaw === "a") scheduleType = "biweeklyA";
          else if (schedRaw.includes("biweeklyb") || schedRaw === "b") scheduleType = "biweeklyB";
          const daysRaw = idxDays >= 0 ? (fields[idxDays]||"") : "";
          const days = daysRaw.split(",").map(d => dayMap[d.trim().toLowerCase().substring(0,3)]).filter(d => d !== undefined);
          imported.push({
            id: Date.now() + Math.random(),
            name,
            phone: idxPhone >= 0 ? fields[idxPhone] : "",
            address: idxAddr >= 0 ? fields[idxAddr] : "",
            email: idxEmail >= 0 ? fields[idxEmail] : "",
            scheduleType, days,
          });
        }
        if (imported.length === 0) { alert(t.clients.importError); return; }
        setClients([...clients, ...imported]);
        alert(`${imported.length} ${t.clients.importSuccess}`);
      } catch (err) {
        alert(t.clients.importError);
      }
    };
    reader.readAsText(file);
    e.target.value = "";  // reset so same file can be re-uploaded
  };
  return (
    <div style={{ padding:16 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
        <h2 style={{ margin:0, color:C.green, fontSize:20, fontWeight:800 }}>{t.clients.title}</h2>
        <button onClick={openAdd} style={{ background:C.green, color:C.white, border:"none", borderRadius:8, padding:"8px 14px", fontWeight:700, cursor:"pointer", fontSize:13 }}>+ {t.clients.addClient}</button>
      </div>

      <div style={{ background:C.black, color:C.white, borderRadius:12, padding:14, marginBottom:14, borderLeft:`5px solid ${C.green}` }}>
        <div style={{ fontSize:14, fontWeight:800, marginBottom:4 }}>📥 {t.clients.importTitle}</div>
        <div style={{ fontSize:12, color:"rgba(255,255,255,0.85)", marginBottom:10, lineHeight:1.5 }}>{t.clients.importBlurb}</div>
        <div style={{ fontSize:11, color:"rgba(255,255,255,0.7)", marginBottom:10, fontStyle:"italic" }}>{t.clients.schedHelp}</div>
        <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
          <button onClick={downloadTemplate} style={{ flex:"1 1 auto", background:"transparent", color:C.white, border:`2px solid ${C.green}`, borderRadius:8, padding:"9px 12px", fontWeight:700, cursor:"pointer", fontSize:13 }}>{t.clients.downloadTemplate}</button>
          <button onClick={() => fileInputRef.current && fileInputRef.current.click()} style={{ flex:"1 1 auto", background:C.green, color:C.white, border:"none", borderRadius:8, padding:"10px 12px", fontWeight:700, cursor:"pointer", fontSize:13 }}>{t.clients.import}</button>
          <input ref={fileInputRef} type="file" accept=".csv,text/csv" onChange={handleImport} style={{ display:"none" }} />
        </div>
      </div>

      {showForm && (
        <div style={{ background:C.greenPale, borderRadius:12, padding:16, marginBottom:16 }}>
          {[["name",t.clients.name],["phone",t.clients.phone],["address",t.clients.address],["email",t.clients.email]].map(([key,label]) => (
            <input key={key} value={form[key]} onChange={e => setForm({ ...form, [key]:e.target.value })} placeholder={label} style={{ width:"100%", padding:"10px 12px", borderRadius:8, border:`1px solid ${C.grayMid}`, fontSize:14, marginBottom:10, boxSizing:"border-box" }} />
          ))}
          <div style={{ fontSize:13, fontWeight:700, color:C.black, marginBottom:8, marginTop:6 }}>📅 {t.clients.schedule}</div>
          <select value={form.scheduleType} onChange={e => setForm({ ...form, scheduleType:e.target.value })} style={{ width:"100%", padding:"10px 12px", borderRadius:8, border:`1px solid ${C.grayMid}`, fontSize:14, marginBottom:10, boxSizing:"border-box" }}>
            <option value="oneTime">{t.clients.oneTime}</option>
            <option value="weekly">{t.clients.weekly}</option>
            <option value="biweeklyA">{t.clients.biweeklyA}</option>
            <option value="biweeklyB">{t.clients.biweeklyB}</option>
          </select>
          {form.scheduleType !== "oneTime" && (
            <div style={{ display:"flex", gap:4, marginBottom:10, flexWrap:"wrap" }}>
              {t.clients.days.map((day, idx) => (
                <button key={day} onClick={() => toggleDay(idx)} style={{ flex:"1 1 auto", minWidth:42, padding:"8px 4px", borderRadius:6, border:`2px solid ${form.days.includes(idx) ? C.green : C.grayMid}`, background:form.days.includes(idx) ? C.green : C.white, color:form.days.includes(idx) ? C.white : C.grayDark, fontWeight:700, fontSize:12, cursor:"pointer" }}>{day}</button>
              ))}
            </div>
          )}
          <button onClick={saveClient} style={{ width:"100%", background:C.green, color:C.white, border:"none", borderRadius:8, padding:"11px 0", fontWeight:700, cursor:"pointer" }}>{editingId ? t.clients.update : t.clients.save}</button>
        </div>
      )}
      {clients.length === 0 ? <div style={{ textAlign:"center", color:C.grayDark, padding:"40px 16px", fontSize:14 }}>{t.clients.noClients}</div> : clients.map(c => (
        <div key={c.id} style={{ background:C.white, borderRadius:12, padding:14, marginBottom:10, border:`1px solid ${C.grayMid}` }}>
          <div style={{ fontWeight:700, fontSize:15, color:C.text, marginBottom:2 }}>{c.name}</div>
          <div style={{ color:C.grayDark, fontSize:13, marginBottom:2 }}>{c.phone}</div>
          <div style={{ color:C.grayDark, fontSize:13, marginBottom:scheduleLabel(c)?4:8 }}>{c.address}</div>
          {scheduleLabel(c) && <div style={{ display:"inline-block", background:C.greenPale, color:C.green, padding:"3px 8px", borderRadius:6, fontSize:11, fontWeight:700, marginBottom:8 }}>📅 {scheduleLabel(c)}</div>}
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

function InvoicesTab({ t, clients, invoices, setInvoices, company }) {
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
          {company.companyName ? (
            <div style={{ borderBottom:`2px solid ${C.green}`, paddingBottom:10, marginBottom:10 }}>
              <div style={{ fontSize:11, color:C.grayDark, fontWeight:600, marginBottom:2 }}>{t.invoices.from}:</div>
              <div style={{ fontWeight:800, fontSize:14, color:C.black }}>{company.companyName}</div>
              {company.ownerName && <div style={{ fontSize:11, color:C.grayDark }}>{company.ownerName}</div>}
              {company.phone && <div style={{ fontSize:11, color:C.grayDark }}>📞 {company.phone}</div>}
              {company.email && <div style={{ fontSize:11, color:C.grayDark }}>✉️ {company.email}</div>}
              {company.address && <div style={{ fontSize:11, color:C.grayDark }}>{company.address}</div>}
              {company.license && <div style={{ fontSize:10, color:C.grayDark, marginTop:2 }}>License: {company.license}</div>}
            </div>
          ) : (
            <div style={{ background:"#fff8e1", padding:"8px 10px", borderRadius:6, marginBottom:10, fontSize:11, color:C.orange }}>⚠️ {t.invoices.setup}</div>
          )}
          <div style={{ fontSize:11, color:C.grayDark, fontWeight:600, marginBottom:2 }}>{t.invoices.to}:</div>
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
          <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginTop:10 }}>
            <span style={{ background:inv.status==="paid"?"#e8f5e3":"#fff3cd", color:inv.status==="paid"?C.green:C.orange, borderRadius:6, padding:"4px 10px", fontSize:12, fontWeight:600 }}>
              {inv.status==="paid"?t.invoices.paid:t.invoices.pending}
            </span>
            {inv.status!=="paid" && <button onClick={() => setInvoices(invoices.map(x=>x.id===inv.id?{...x,status:"paid"}:x))} style={{ background:C.green, color:C.white, border:"none", borderRadius:6, padding:"4px 10px", fontSize:12, fontWeight:600, cursor:"pointer" }}>{t.invoices.markPaid}</button>}
            <button onClick={() => printInvoice(inv, company, t)} style={{ background:C.black, color:C.white, border:"none", borderRadius:6, padding:"4px 10px", fontSize:12, fontWeight:600, cursor:"pointer" }}>{t.pdf}</button>
            <button onClick={() => { const client = clients.find(c => c.name === inv.client); const text = formatInvoiceText(inv, company, t); sendSMS(client ? client.phone : "", text); }} style={{ background:C.blue, color:C.white, border:"none", borderRadius:6, padding:"4px 10px", fontSize:12, fontWeight:600, cursor:"pointer" }}>{t.invoices.textInv}</button>
            <button onClick={() => { const client = clients.find(c => c.name === inv.client); const text = formatInvoiceText(inv, company, t); sendEmail(client ? client.email : "", `${t.invoices.invoiceNum} ${inv.id} — ${company.companyName||""}`, text); }} style={{ background:C.orange, color:C.white, border:"none", borderRadius:6, padding:"4px 10px", fontSize:12, fontWeight:600, cursor:"pointer" }}>{t.invoices.emailInv}</button>
            <button onClick={() => { if (!company.googleReviewLink) { alert(t.billing.reviewBlurb); return; } window.open(company.googleReviewLink, "_blank"); }} style={{ background:C.black, color:C.white, border:"none", borderRadius:6, padding:"4px 10px", fontSize:12, fontWeight:600, cursor:"pointer" }}>⭐ {t.invoices.review}</button>
            <button onClick={() => { if (window.confirm(t.invoices.confirmDelInv)) setInvoices(invoices.filter(x => x.id !== inv.id)); }} style={{ background:C.red, color:C.white, border:"none", borderRadius:6, padding:"4px 10px", fontSize:12, fontWeight:600, cursor:"pointer" }}>{t.invoices.deleteInv}</button>
          </div>
        </div>
      ))}
    </div>
  );
}

function EstimatesTab({ t, clients, estimates, setEstimates, invoices, setInvoices, company }) {
  const [showForm, setShowForm] = useState(false);
  const emptyLine = () => ({ service:"", amount:"", id:Date.now()+Math.random() });
  const [form, setForm] = useState({ client:"", lines:[emptyLine()], notes:"" });
  const addLine = () => setForm({ ...form, lines:[...form.lines, emptyLine()] });
  const removeLine = (id) => setForm({ ...form, lines:form.lines.filter(l => l.id !== id) });
  const updateLine = (id, field, val) => setForm({ ...form, lines:form.lines.map(l => l.id === id ? { ...l, [field]:val } : l) });
  const lineTotal = (lines) => lines.reduce((s,l) => s+parseFloat(l.amount||0), 0);
  const saveEst = () => {
    if (!form.client) return;
    const validLines = form.lines.filter(l => l.amount && parseFloat(l.amount) > 0);
    if (validLines.length === 0) return;
    const total = lineTotal(validLines);
    setEstimates([...estimates, { id:Date.now(), client:form.client, lines:validLines, notes:form.notes, total, status:"pending", date:new Date().toISOString().split("T")[0] }]);
    setForm({ client:"", lines:[emptyLine()], notes:"" }); setShowForm(false);
  };
  const convertToInvoice = (est) => {
    if (!window.confirm(t.estimates.convertConfirm)) return;
    const newInvoice = { id:Date.now(), client:est.client, lines:est.lines || [], total:est.total||est.amount||0, status:"pending", date:new Date().toISOString().split("T")[0] };
    setInvoices([...invoices, newInvoice]);
    setEstimates(estimates.map(e => e.id === est.id ? { ...e, status:"approved" } : e));
    alert(t.estimates.converted);
  };
  const formatEstText = (est) => {
    let text = "";
    if (company.companyName) text += `${company.companyName}\n`;
    if (company.ownerName) text += `${company.ownerName}\n`;
    if (company.phone) text += `${company.phone}\n\n`;
    text += `${t.estimates.title}\n${t.invoices.date}: ${formatDate(est.date)}\n\n${t.invoices.to}: ${est.client}\n\n`;
    if (est.lines) est.lines.forEach(l => { text += `• ${l.service} — $${parseFloat(l.amount).toFixed(2)}\n`; });
    text += `\n${t.invoices.total}: $${parseFloat(est.total||est.amount||0).toFixed(2)}\n`;
    if (est.notes) text += `\n${t.estimates.notes}: ${est.notes}\n`;
    return text;
  };
  return (
    <div style={{ padding:16 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
        <h2 style={{ margin:0, color:C.green, fontSize:20, fontWeight:800 }}>{t.estimates.title}</h2>
        <button onClick={() => setShowForm(!showForm)} style={{ background:C.green, color:C.white, border:"none", borderRadius:8, padding:"8px 14px", fontWeight:700, cursor:"pointer", fontSize:13 }}>+ {t.estimates.create}</button>
      </div>
      {showForm && (
        <div style={{ background:C.greenPale, borderRadius:12, padding:16, marginBottom:16 }}>
          <select value={form.client} onChange={e => setForm({ ...form, client:e.target.value })} style={{ width:"100%", padding:"10px 12px", borderRadius:8, border:`1px solid ${C.grayMid}`, fontSize:14, marginBottom:12, boxSizing:"border-box" }}>
            <option value="">-- {t.estimates.client} --</option>
            {clients.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
          </select>
          <div style={{ fontSize:12, fontWeight:700, color:C.grayDark, marginBottom:8 }}>{t.invoices.lineItems}</div>
          {form.lines.map((line) => (
            <div key={line.id} style={{ background:C.white, borderRadius:8, padding:10, marginBottom:8, border:`1px solid ${C.grayMid}` }}>
              <select value={line.service} onChange={e => updateLine(line.id, "service", e.target.value)} style={{ width:"100%", padding:"8px 10px", borderRadius:6, border:`1px solid ${C.grayMid}`, fontSize:13, marginBottom:6, boxSizing:"border-box" }}>
                <option value="">-- {t.invoices.service} --</option>
                {t.invoices.services.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <input value={line.amount} onChange={e => updateLine(line.id, "amount", e.target.value)} placeholder={t.estimates.amount} type="number" style={{ width:"100%", padding:"8px 10px", borderRadius:6, border:`1px solid ${C.grayMid}`, fontSize:13, marginBottom:6, boxSizing:"border-box" }} />
              {form.lines.length > 1 && <button onClick={() => removeLine(line.id)} style={{ background:C.red, color:C.white, border:"none", borderRadius:6, padding:"6px 10px", fontSize:11, fontWeight:600, cursor:"pointer" }}>{t.invoices.removeLine}</button>}
            </div>
          ))}
          <button onClick={addLine} style={{ width:"100%", background:C.white, color:C.green, border:`2px dashed ${C.green}`, borderRadius:8, padding:"10px 0", fontWeight:700, cursor:"pointer", marginBottom:10, fontSize:13 }}>{t.invoices.addLine}</button>
          <input value={form.notes} onChange={e => setForm({ ...form, notes:e.target.value })} placeholder={t.estimates.notes} style={{ width:"100%", padding:"10px 12px", borderRadius:8, border:`1px solid ${C.grayMid}`, fontSize:14, marginBottom:10, boxSizing:"border-box" }} />
          <div style={{ background:C.white, padding:"10px 12px", borderRadius:8, marginBottom:10, textAlign:"right", fontWeight:700, color:C.green, fontSize:15 }}>{t.invoices.total}: ${lineTotal(form.lines).toFixed(2)}</div>
          <button onClick={saveEst} style={{ width:"100%", background:C.green, color:C.white, border:"none", borderRadius:8, padding:"11px 0", fontWeight:700, cursor:"pointer" }}>{t.estimates.save}</button>
        </div>
      )}
      {estimates.length === 0 ? <div style={{ textAlign:"center", color:C.grayDark, padding:"40px 16px", fontSize:14 }}>{t.estimates.noEstimates}</div> : estimates.map(est => (
        <div key={est.id} style={{ background:C.white, borderRadius:12, padding:14, marginBottom:10, border:`1px solid ${C.grayMid}` }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
            <div style={{ fontWeight:700, fontSize:15, color:C.text }}>{est.client}</div>
            <div style={{ fontSize:17, fontWeight:800, color:C.green }}>${parseFloat(est.total||est.amount||0).toFixed(2)}</div>
          </div>
          {est.lines && est.lines.map(l => (
            <div key={l.id} style={{ display:"flex", justifyContent:"space-between", color:C.grayDark, fontSize:13, marginBottom:3, paddingLeft:8, borderLeft:`2px solid ${C.greenPale}` }}>
              <div>{l.service}</div>
              <div>${parseFloat(l.amount).toFixed(2)}</div>
            </div>
          ))}
          {est.notes && <div style={{ color:C.grayDark, fontSize:12, marginTop:6, fontStyle:"italic" }}>{est.notes}</div>}
          <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginTop:10 }}>
            <span style={{ background:est.status==="approved"?"#e8f5e3":"#fff3cd", color:est.status==="approved"?C.green:C.orange, borderRadius:6, padding:"4px 10px", fontSize:12, fontWeight:600 }}>
              {est.status==="approved"?t.estimates.approved:t.estimates.pending}
            </span>
            {est.status!=="approved" && <button onClick={() => convertToInvoice(est)} style={{ background:C.green, color:C.white, border:"none", borderRadius:6, padding:"4px 10px", fontSize:12, fontWeight:600, cursor:"pointer" }}>{t.estimates.convert}</button>}
            <button onClick={() => printEstimate(est, company, t)} style={{ background:C.black, color:C.white, border:"none", borderRadius:6, padding:"4px 10px", fontSize:12, fontWeight:600, cursor:"pointer" }}>{t.pdf}</button>
            <button onClick={() => { const client = clients.find(c => c.name === est.client); sendSMS(client ? client.phone : "", formatEstText(est)); }} style={{ background:C.blue, color:C.white, border:"none", borderRadius:6, padding:"4px 10px", fontSize:12, fontWeight:600, cursor:"pointer" }}>{t.estimates.textEst}</button>
            <button onClick={() => { const client = clients.find(c => c.name === est.client); sendEmail(client ? client.email : "", `${t.estimates.title} — ${company.companyName||""}`, formatEstText(est)); }} style={{ background:C.orange, color:C.white, border:"none", borderRadius:6, padding:"4px 10px", fontSize:12, fontWeight:600, cursor:"pointer" }}>{t.estimates.emailEst}</button>
            <button onClick={() => { if (window.confirm(t.estimates.confirmDelEst)) setEstimates(estimates.filter(x => x.id !== est.id)); }} style={{ background:C.red, color:C.white, border:"none", borderRadius:6, padding:"4px 10px", fontSize:12, fontWeight:600, cursor:"pointer" }}>{t.estimates.deleteEst}</button>
          </div>
        </div>
      ))}
    </div>
  );
}

function BillingTab({ t, invoices, estimates, company, setCompany }) {
  const [form, setForm] = useState(company);
  const [showSaved, setShowSaved] = useState(false);
  useEffect(() => { setForm(company); }, [company]);
  const total = invoices.reduce((s,i) => s+parseFloat(i.total||0), 0);
  const paid = invoices.filter(i=>i.status==="paid").reduce((s,i) => s+parseFloat(i.total||0), 0);
  const pending = total - paid;
  const thisMonth = invoices.filter(i => { const d = new Date(i.date); const n = new Date(); return d.getMonth() === n.getMonth() && d.getFullYear() === n.getFullYear(); }).reduce((s,i) => s+parseFloat(i.total||0), 0);
  const saveSettings = () => { setCompany(form); setShowSaved(true); setTimeout(() => setShowSaved(false), 2000); };

  // CSV export function — formats data for QuickBooks/Wave/etc import
  const downloadCSV = (data, filename) => {
    const blob = new Blob([data], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const escapeCsv = (val) => { if (val === null || val === undefined) return ""; const s = String(val); if (s.includes(",") || s.includes("\"") || s.includes("\n")) return `"${s.replace(/"/g, '""')}"`; return s; };
  const exportInvoices = () => {
    if (!invoices || invoices.length === 0) { alert(t.billing.noData); return; }
    const headers = ["Invoice Date","Client","Service","Amount","Status","Company"];
    const rows = [];
    invoices.forEach(inv => {
      if (inv.lines && inv.lines.length > 0) {
        inv.lines.forEach(l => {
          rows.push([l.date || inv.date, inv.client, l.service, parseFloat(l.amount||0).toFixed(2), inv.status, company.companyName || ""].map(escapeCsv).join(","));
        });
      } else {
        rows.push([inv.date, inv.client, "", parseFloat(inv.total||inv.amount||0).toFixed(2), inv.status, company.companyName || ""].map(escapeCsv).join(","));
      }
    });
    const csv = [headers.join(","), ...rows].join("\n");
    const today = new Date().toISOString().split("T")[0];
    downloadCSV(csv, `corte-pro-invoices-${today}.csv`);
  };
  const exportEstimates = () => {
    if (!estimates || estimates.length === 0) { alert(t.billing.noData); return; }
    const headers = ["Estimate Date","Client","Service","Amount","Status","Notes","Company"];
    const rows = [];
    estimates.forEach(est => {
      if (est.lines && est.lines.length > 0) {
        est.lines.forEach(l => {
          rows.push([est.date || "", est.client, l.service, parseFloat(l.amount||0).toFixed(2), est.status, est.notes || "", company.companyName || ""].map(escapeCsv).join(","));
        });
      } else {
        rows.push([est.date || "", est.client, est.service || "", parseFloat(est.total||est.amount||0).toFixed(2), est.status, est.notes || "", company.companyName || ""].map(escapeCsv).join(","));
      }
    });
    const csv = [headers.join(","), ...rows].join("\n");
    const today = new Date().toISOString().split("T")[0];
    downloadCSV(csv, `corte-pro-estimates-${today}.csv`);
  };

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

      <div style={{ background:C.black, color:C.white, borderRadius:12, padding:16, marginBottom:16, borderLeft:`5px solid ${C.green}` }}>
        <div style={{ fontSize:15, fontWeight:800, marginBottom:6, color:C.white }}>📊 {t.billing.exportTitle}</div>
        <div style={{ fontSize:12, color:"rgba(255,255,255,0.85)", marginBottom:14, lineHeight:1.5 }}>{t.billing.exportBlurb}</div>
        <button onClick={exportInvoices} style={{ width:"100%", background:C.green, color:C.white, border:"none", borderRadius:8, padding:"11px 0", fontWeight:700, cursor:"pointer", marginBottom:8, fontSize:14 }}>{t.billing.export}</button>
        <button onClick={exportEstimates} style={{ width:"100%", background:"transparent", color:C.white, border:`2px solid ${C.green}`, borderRadius:8, padding:"10px 0", fontWeight:700, cursor:"pointer", fontSize:14 }}>{t.billing.exportEstimates}</button>
      </div>

      <div style={{ background:C.white, borderRadius:12, padding:16, marginBottom:16, border:`2px solid ${C.green}` }}>
        <div style={{ fontSize:15, fontWeight:800, color:C.black, marginBottom:4 }}>⭐ {t.billing.reviewTitle}</div>
        <div style={{ fontSize:12, color:C.grayDark, marginBottom:12, lineHeight:1.5 }}>{t.billing.reviewBlurb}</div>
        <input value={form.googleReviewLink||""} onChange={e => setForm({ ...form, googleReviewLink:e.target.value })} placeholder={t.billing.reviewPlaceholder} style={{ width:"100%", padding:"10px 12px", borderRadius:8, border:`1px solid ${C.grayMid}`, fontSize:13, boxSizing:"border-box" }} />
      </div>

      <div style={{ background:C.white, borderRadius:12, padding:16, marginBottom:16, border:`2px solid ${C.green}` }}>
        <div style={{ fontSize:15, fontWeight:800, color:C.black, marginBottom:4 }}>💳 {t.billing.paymentsTitle}</div>
        <div style={{ fontSize:12, color:C.grayDark, marginBottom:14 }}>{t.billing.paymentsBlurb}</div>
        {["check","cash","zelle","venmo","cashapp","creditCard"].map(key => {
          const p = (form.payments && form.payments[key]) || { enabled:false, handle:"" };
          const togglePayment = () => setForm({ ...form, payments:{ ...(form.payments||{}), [key]:{ ...p, enabled:!p.enabled } } });
          const updateHandle = (val) => setForm({ ...form, payments:{ ...(form.payments||{}), [key]:{ ...p, handle:val } } });
          return (
            <div key={key} style={{ marginBottom:8 }}>
              <label style={{ display:"flex", alignItems:"center", gap:8, cursor:"pointer", padding:"8px 10px", background:p.enabled?C.greenPale:C.gray, borderRadius:6 }}>
                <input type="checkbox" checked={p.enabled} onChange={togglePayment} style={{ width:16, height:16, accentColor:C.green }} />
                <span style={{ fontSize:13, fontWeight:600, color:C.text, flex:1 }}>{t.billing[key]}</span>
              </label>
              {p.enabled && (key === "zelle" || key === "venmo" || key === "cashapp") && (
                <input value={p.handle||""} onChange={e => updateHandle(e.target.value)} placeholder={t.billing.paymentHandle} style={{ width:"100%", padding:"8px 10px", borderRadius:6, border:`1px solid ${C.grayMid}`, fontSize:12, marginTop:6, boxSizing:"border-box" }} />
              )}
            </div>
          );
        })}
      </div>

      <div style={{ background:C.white, borderRadius:12, padding:16, marginBottom:16, border:`2px solid ${C.green}` }}>
        <div style={{ fontSize:15, fontWeight:800, color:C.black, marginBottom:4 }}>🏢 {t.billing.settings}</div>
        <div style={{ fontSize:12, color:C.grayDark, marginBottom:14 }}>This info appears on your invoices and estimates.</div>
        {[["companyName",t.billing.companyName],["ownerName",t.billing.ownerName],["phone",t.billing.phone],["email",t.billing.email],["address",t.billing.address],["license",t.billing.license]].map(([key,label]) => (
          <input key={key} value={form[key]||""} onChange={e => setForm({ ...form, [key]:e.target.value })} placeholder={label} style={{ width:"100%", padding:"10px 12px", borderRadius:8, border:`1px solid ${C.grayMid}`, fontSize:14, marginBottom:8, boxSizing:"border-box" }} />
        ))}
        <button onClick={saveSettings} style={{ width:"100%", background:C.green, color:C.white, border:"none", borderRadius:8, padding:"11px 0", fontWeight:700, cursor:"pointer", marginTop:6 }}>{t.billing.saveSettings}</button>
        {showSaved && <div style={{ textAlign:"center", color:C.green, fontWeight:700, marginTop:8, fontSize:13 }}>✓ {t.billing.saved}</div>}
      </div>

      <div style={{ background:C.greenPale, borderRadius:12, padding:16 }}>
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
  const [setupDone, setSetupDone] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [clients, setClients] = useState(() => load("cp_clients", []));
  const [invoices, setInvoices] = useState(() => load("cp_invoices", []));
  const [estimates, setEstimates] = useState(() => load("cp_estimates", []));
  const [company, setCompany] = useState(() => load("cp_company", { companyName:"", ownerName:"", phone:"", email:"", address:"", license:"", payments:{ check:{enabled:false,handle:""}, cash:{enabled:false,handle:""}, zelle:{enabled:false,handle:""}, venmo:{enabled:false,handle:""}, cashapp:{enabled:false,handle:""}, creditCard:{enabled:false,handle:""} } }));
  const t = TRANSLATIONS[lang];

  useEffect(() => { if (load("cp_unlocked", false)) setUnlocked(true); if (load("cp_setup_done", false)) setSetupDone(true); }, []);
  useEffect(() => { save("cp_lang", lang); }, [lang]);
  useEffect(() => { save("cp_clients", clients); }, [clients]);
  useEffect(() => { save("cp_invoices", invoices); }, [invoices]);
  useEffect(() => { save("cp_estimates", estimates); }, [estimates]);
  useEffect(() => { save("cp_company", company); }, [company]);

  const handleUnlock = () => { setUnlocked(true); save("cp_unlocked", true); };
  const handleSetupComplete = (info) => { setCompany(info); setSetupDone(true); save("cp_setup_done", true); };

  if (!unlocked) return (
    <div>
      <div style={{ position:"fixed", top:12, right:16, zIndex:99 }}>
        <button onClick={() => setLang(lang==="en"?"es":"en")} style={{ background:"rgba(255,255,255,0.2)", color:C.white, border:"1px solid rgba(255,255,255,0.4)", borderRadius:20, padding:"6px 14px", fontWeight:700, cursor:"pointer", fontSize:13 }}>{t.lang}</button>
      </div>
      <AccessGate onUnlock={handleUnlock} t={t} />
    </div>
  );

  if (!setupDone) return <SetupScreen onComplete={handleSetupComplete} t={t} lang={lang} setLang={setLang} />;

  const tabs = [
    <RouteTab t={t} clients={clients} key="route" />,
    <ClientsTab t={t} clients={clients} setClients={setClients} key="clients" />,
    <InvoicesTab t={t} clients={clients} invoices={invoices} setInvoices={setInvoices} company={company} key="invoices" />,
    <EstimatesTab t={t} clients={clients} estimates={estimates} setEstimates={setEstimates} invoices={invoices} setInvoices={setInvoices} company={company} key="estimates" />,
    <BillingTab t={t} invoices={invoices} estimates={estimates} company={company} setCompany={setCompany} key="billing" />,
  ];

  return (
    <div style={{ maxWidth:1100, margin:"0 auto", minHeight:"100vh", background:C.gray, fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", paddingBottom:80 }}>
      <div style={{ background:C.white, padding:0, position:"sticky", top:0, zIndex:10, borderBottom:`3px solid ${C.green}` }}>
        <img src="/header.png" alt="Corte Pro" style={{ width:"100%", height:"auto", display:"block" }} />
        <div style={{ background:C.black, padding:"6px 12px", display:"flex", justifyContent:"flex-end", alignItems:"center" }}>
          <button onClick={() => setLang(lang==="en"?"es":"en")} style={{ background:C.green, color:C.white, border:`1px solid ${C.greenDark}`, borderRadius:20, padding:"5px 14px", fontWeight:700, cursor:"pointer", fontSize:12 }}>{t.lang}</button>
        </div>
      </div>
      <div>{tabs[activeTab]}</div>
      <div style={{ position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:1100, background:C.black, borderTop:`3px solid ${C.green}`, display:"flex", zIndex:10 }}>
        {t.tabs.map((tab,i) => (
          <button key={tab} onClick={() => setActiveTab(i)} style={{ flex:1, padding:"10px 0", background:"none", border:"none", color:activeTab===i?C.green:"rgba(255,255,255,0.6)", fontWeight:activeTab===i?800:500, fontSize:11, cursor:"pointer", borderTop:activeTab===i?`2px solid ${C.green}`:"2px solid transparent" }}>
            {["🗺️","👥","📄","📋","💰"][i]}<br />{tab}
          </button>
        ))}
      </div>
    </div>
  );
}

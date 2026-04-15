const fs = require('fs');

const content = fs.readFileSync('MainApp_EmbarquesHTML.html', 'utf8');
const lines = content.split('\n');

const modulos = [
  { nombre: 'Mod_DashboardEmbarques', inicio: 651,  fin: 809  },
  { nombre: 'Mod_Despachos',          inicio: 810,  fin: 1233 },
  { nombre: 'Mod_Envios',             inicio: 1234, fin: 2263 },
  { nombre: 'Mod_Existencia',         inicio: 2264, fin: 2731 },
  { nombre: 'Mod_GestionMP',          inicio: 2732, fin: 3574 },
  { nombre: 'Mod_Circulante',         inicio: 3575, fin: 3657 },
  { nombre: 'Mod_CirculanteConsulta', inicio: 3658, fin: 4508 },
  { nombre: 'Mod_Usuarios',           inicio: 4509, fin: 4594 },
  { nombre: 'Mod_MiUsuario',          inicio: 4595, fin: lines.length },
];

modulos.forEach(mod => {
  const contenido = lines.slice(mod.inicio - 1, mod.fin).join('\n');
  fs.writeFileSync(mod.nombre + '.html', contenido, 'utf8');
  console.log(`✓ ${mod.nombre}.html — ${mod.fin - mod.inicio + 1} líneas`);
});

console.log('\nMódulos creados: ' + modulos.length);

const fs = require('fs');

const MAIN_PATH = 'MainApp_EmbarquesHTML.html';
const MARKER = '// ════════════════════════ MÓDULOS — rebuild_main.js ════════════════════════ //';

const ORDEN = [
  'Mod_DashboardEmbarques',
  'Mod_Despachos',
  'Mod_Envios',
  'Mod_Existencia',
  'Mod_GestionMP',
  'Mod_Circulante',
  'Mod_CirculanteConsulta',
  'Mod_Usuarios',
  'Mod_MiUsuario',
];

const main = fs.readFileSync(MAIN_PATH, 'utf8');
const markerIdx = main.indexOf(MARKER);
if (markerIdx === -1) { console.error('ERROR: Marcador no encontrado.'); process.exit(1); }

// Conservar todo lo que está ANTES del marcador (inclusive el marcador mismo)
const before = main.slice(0, markerIdx + MARKER.length);

let jsUnido = '';
for (const mod of ORDEN) {
  const filePath = mod + '.html';
  if (!fs.existsSync(filePath)) { console.warn(`  ⚠ No encontrado: ${filePath}`); continue; }
  let contenido = fs.readFileSync(filePath, 'utf8');
  if (!contenido.endsWith('\n')) contenido += '\n';
  jsUnido += contenido;
  console.log(`  + ${filePath} (${contenido.split('\n').length - 1} líneas)`);
}

const result = before + '\n' + jsUnido;
fs.writeFileSync(MAIN_PATH, result, 'utf8');
console.log(`\nMainApp reconstruido: ${result.split('\n').length} líneas.`);

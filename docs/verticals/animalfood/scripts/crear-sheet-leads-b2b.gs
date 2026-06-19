/**
 * AnimalFood — Generador del Sheet "Leads B2B" (mini-CRM)
 * ------------------------------------------------------------------
 * CÓMO USARLO (5 pasos, 2 minutos):
 *  1. Andá a https://sheets.new (crea una planilla nueva en blanco).
 *  2. Menú "Extensiones" → "Apps Script".
 *  3. Borrá lo que haya y PEGÁ todo este archivo.
 *  4. (Opcional) Editá la lista VENDEDORES de abajo con los nombres reales.
 *  5. Arriba elegí la función "crearCRMAnimalFood" y tocá ▶ Ejecutar.
 *     La primera vez te pide autorizar (es tu propia cuenta, dale permitir).
 *  Volvé a la planilla: ya está armada con desplegables, colores y tablero.
 * ------------------------------------------------------------------
 * Lo carga el bot (automático): A,C,D,E,F,G,H,I,K + Estado="Nuevo".
 * Lo actualizan los vendedores: B (Estado), J (nota), L, M.
 */

function crearCRMAnimalFood() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // ===== CONFIG EDITABLE =====
  const VENDEDORES = ['Brayan (Bs As)', 'Santiago-1', 'Santiago-2']; // ← editá con los nombres reales
  const ESTADOS = ['🆕 Nuevo','👤 Asignado','💬 Contactado','📋 Negociando','✅ Ganado','❌ Perdido','🚫 No califica'];
  const ZONAS   = ['Buenos Aires','Santiago del Estero'];
  const TIPOS   = ['Veterinaria','Petshop','Distribuidora','Otro'];
  const NUEVO   = ['Nuevo','Ya vende'];
  const ORIGEN  = ['Anuncio BA','Anuncio Santiago','Orgánico'];
  const FILAS   = 1000; // filas preparadas

  // ===== HOJA PRINCIPAL: Leads B2B =====
  let s = ss.getSheetByName('Leads B2B') || ss.insertSheet('Leads B2B', 0);
  s.clear();
  s.clearConditionalFormatRules();

  const headers = ['Fecha/hora','Estado','Zona','Vendedor','Tipo de comercio','Comercio',
                   'Contacto','WhatsApp','¿Nuevo o reposición?','Interés / nota','Origen',
                   'Última actualización','Próximo seguimiento','Días sin contactar'];
  s.getRange(1, 1, 1, headers.length).setValues([headers]);

  // estilo header (negro + amarillo AnimalFood)
  s.getRange(1, 1, 1, headers.length)
    .setBackground('#0d0b09').setFontColor('#FFD21A').setFontWeight('bold').setVerticalAlignment('middle');
  s.setFrozenRows(1);
  s.setRowHeight(1, 34);

  const widths = [140,120,150,150,160,180,150,160,170,260,140,150,160,140];
  widths.forEach((w, i) => s.setColumnWidth(i + 1, w));

  // formatos de fecha
  s.getRange(2, 1,  FILAS - 1, 1).setNumberFormat('dd/MM/yyyy HH:mm'); // A Fecha/hora
  s.getRange(2, 12, FILAS - 1, 1).setNumberFormat('dd/MM/yyyy HH:mm'); // L Última actualización
  s.getRange(2, 13, FILAS - 1, 1).setNumberFormat('dd/MM/yyyy');       // M Próximo seguimiento

  // desplegables (data validation)
  function dropdown(col, lista) {
    const rule = SpreadsheetApp.newDataValidation().requireValueInList(lista, true).setAllowInvalid(false).build();
    s.getRange(2, col, FILAS - 1, 1).setDataValidation(rule);
  }
  dropdown(2,  ESTADOS);
  dropdown(3,  ZONAS);
  dropdown(4,  VENDEDORES);
  dropdown(5,  TIPOS);
  dropdown(9,  NUEVO);
  dropdown(11, ORIGEN);

  // columna N: días sin contactar (solo si sigue en Nuevo/Asignado)
  s.getRange(2, 14).setFormula(
    '=ARRAYFORMULA(IF(A2:A="","",IF(REGEXMATCH(B2:B&"","Nuevo|Asignado"),INT(NOW()-A2:A),"")))'
  );

  // formato condicional por estado (pinta la fila)
  const colores = {
    '🆕 Nuevo':'#FFF4CC', '👤 Asignado':'#FFE08A', '💬 Contactado':'#CFE8FF',
    '📋 Negociando':'#E3D4FF', '✅ Ganado':'#C6F6C6', '❌ Perdido':'#F8C9C9', '🚫 No califica':'#E6E6E6'
  };
  const rango = s.getRange(2, 1, FILAS - 1, headers.length);
  const rules = [];
  Object.keys(colores).forEach(est => {
    rules.push(SpreadsheetApp.newConditionalFormatRule()
      .whenFormulaSatisfied('=$B2="' + est + '"')
      .setBackground(colores[est])
      .setRanges([rango]).build());
  });
  // alerta: lead frío (más de 1 día sin contactar) → rojo en la columna N
  rules.push(SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied('=AND($N2<>"",$N2>1)')
    .setBackground('#E5484D').setFontColor('#FFFFFF').setBold(true)
    .setRanges([s.getRange(2, 14, FILAS - 1, 1)]).build());
  s.setConditionalFormatRules(rules);

  // ===== TABLERO =====
  let t = ss.getSheetByName('Tablero') || ss.insertSheet('Tablero', 1);
  t.clear();
  t.getRange('A1').setValue('TABLERO · Leads B2B AnimalFood').setFontWeight('bold').setFontSize(14).setFontColor('#0d0b09');
  t.getRange('A1:B1').setBackground('#FFD21A');
  t.getRange('A3').setValue('Total leads').setFontWeight('bold');
  t.getRange('B3').setFormula("=COUNTA('Leads B2B'!A2:A)");

  let row = 5;
  function bloque(titulo, lista, col) {
    t.getRange(row, 1).setValue(titulo).setFontWeight('bold').setFontColor('#0d0b09').setBackground('#F1E4B0');
    lista.forEach((v, i) => {
      t.getRange(row + 1 + i, 1).setValue(v);
      t.getRange(row + 1 + i, 2).setFormula("=COUNTIF('Leads B2B'!" + col + ":" + col + ',"' + v + '")');
    });
    row += lista.length + 2;
  }
  bloque('Por estado',   ESTADOS,    'B');
  bloque('Por zona',     ZONAS,      'C');
  bloque('Por vendedor', VENDEDORES, 'D');
  bloque('Por tipo',     TIPOS,      'E');
  t.setColumnWidth(1, 200); t.setColumnWidth(2, 90);

  // ===== B2C (curiosos que se frenan) =====
  let b = ss.getSheetByName('B2C') || ss.insertSheet('B2C', 2);
  b.clear();
  const hb = ['Fecha/hora','Nombre','WhatsApp','Nota'];
  b.getRange(1, 1, 1, hb.length).setValues([hb]);
  b.getRange(1, 1, 1, hb.length).setBackground('#0d0b09').setFontColor('#FFD21A').setFontWeight('bold');
  b.setFrozenRows(1);
  [150, 180, 160, 300].forEach((w, i) => b.setColumnWidth(i + 1, w));

  // limpiar hoja por defecto si quedó vacía
  const def = ss.getSheetByName('Hoja 1') || ss.getSheetByName('Sheet1');
  if (def && ss.getSheets().length > 3) ss.deleteSheet(def);

  SpreadsheetApp.getUi().alert('✅ Listo: Sheet "Leads B2B" + Tablero + B2C creados.');
}

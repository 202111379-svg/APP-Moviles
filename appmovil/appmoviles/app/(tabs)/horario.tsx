import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

/* ---------- Datos ---------- */
type Dia = 'Lunes'|'Martes'|'Miercoles'|'Jueves'|'Viernes'|'Sabado';
const HORAS = [
  '08:00','09:00','10:00','11:00','12:00',
  '13:00','14:00','15:00','16:00','17:00',
  '18:00','19:00','20:00','21:00','22:00',
];
const HORARIO: Record<Dia, Record<string, { curso:string; color:string }>> = {
  Lunes: {  '17:00': { curso:'IF-0801 T',  color:'#43a047' },
            '19:00': { curso:'IF-0903 L',  color:'#c0ca33' },
            '21:00': { curso:'IF-0801 TA', color:'#26a69a' } },
  Martes: { '18:00': { curso:'IF-0904 TA', color:'#1e88e5' },
            '20:00': { curso:'IF-0903 T',  color:'#c0ca33' } },
  Miercoles: { '17:00': { curso:'IF-0901 TA', color:'#43a047' } },
  Jueves: { '19:00': { curso:'IF-0904 T',  color:'#1e88e5' },
            '20:00': { curso:'IF-0904 TA', color:'#1e88e5' } },
  Viernes: { '19:00': { curso:'IF-0802 TA', color:'#43a047' } },
  Sabado: { '08:00': { curso:'IF-0802 T',  color:'#43a047' },
            '10:00': { curso:'IF-1103 T',  color:'#1e88e5' },
            '12:00': { curso:'IF-1103 TA', color:'#1e88e5' } },
};

/* ---------- Generador HTML SOLO del horario (L–S) ---------- */
function buildPdfHtmlSchedule() {
  const dias: Dia[] = ['Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];
  const gridHeight = 1200;
  const cellH = gridHeight / (HORAS.length - 1);

  const dayColumns = dias.map(d => {
    const col = HORAS.slice(0,-1).map(h => {
      const slot = HORARIO[d]?.[h];
      const bg = slot ? slot.color : 'transparent';
      const label = slot?.curso ?? '';
      const border = slot ? '1px solid rgba(255,255,255,.45)' : '1px solid #e0e0e0';
      return `
        <div class="cell" style="height:${cellH}px;background:${bg};border:${border}">
          ${label ? `<div class="curso">${label}</div>` : ''}
        </div>
      `;
    }).join('');
    return `<div class="col">${col}</div>`;
  }).join('');

  const hourLabels = HORAS.slice(0,-1)
    .map(h => `<div class="h">${h}</div>`).join('');

  return `
<!doctype html><html><head><meta charset="utf-8"/>
<style>
 @page { size: 1080px 1920px; margin: 24px; }
 body{ font-family: Arial, sans-serif; color:#333; margin:0; }
 .top{ background:#2e7d32; color:#fff; padding:12px 16px; border-radius:8px;
       text-align:center; font-weight:700; }
 .wrap{ display:flex; gap:8px; margin:10px 8px 0 54px; }
 .hours{ width:52px; }
 .h{ height:${cellH}px; font-size:11px; color:#777; text-align:right; padding-right:6px; }
 .grid{ flex:1; display:grid; grid-template-columns: repeat(6, 1fr);
        border:1px solid #cfd8dc; border-radius:8px; overflow:hidden; }
 .head{ grid-column:1 / -1; display:grid; grid-template-columns: repeat(6, 1fr);
        background:#f1f3f4; border-bottom:1px solid #cfd8dc; }
 .head div{ padding:8px; text-align:center; font-weight:600; font-size:14px; }
 .col{ display:flex; flex-direction:column;
       background: repeating-linear-gradient(#fff,#fff ${cellH-1}px,#eceff1 ${cellH}px); }
 .cell{ display:flex; align-items:center; justify-content:center; }
 .curso{ color:#fff; font-weight:700; font-size:12px; text-shadow:0 1px 1px rgba(0,0,0,.25) }
</style></head>
<body>
  <div class="top">Horario Semanal (Lunes a Sábado)</div>
  <div class="wrap">
    <div class="hours">${hourLabels}</div>
    <div class="grid">
      <div class="head">${['Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'].map(d=>`<div>${d}</div>`).join('')}</div>
      ${dayColumns}
    </div>
  </div>
</body></html>`;
}

/* ---------- Componente ---------- */
const CELL_H = 44;

export default function Horario() {
  const router = useRouter();
  const dias: Dia[] = useMemo(() => ['Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'], []);

  // Import dinámico de expo-print y diálogo nativo (sin abrir navegador)
  const handlePrintSchedule = async () => {
    try {
      const html = buildPdfHtmlSchedule();
      const Print = await import('expo-print');
      // Abre el visor/diálogo de impresión del sistema
      await Print.printAsync({ html });
    } catch (e) {
      Alert.alert('Error', 'No se pudo generar/abrir el PDF.');
    }
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ paddingBottom: 24 }}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>J</Text>
        <Text style={styles.code}>202111368</Text>
        <TouchableOpacity onPress={() => router.push('/(tabs)/explore')} style={styles.backBtn}>
          <Ionicons name="arrow-back-outline" size={18} color="#fff" />
          <Text style={styles.backText}>Volver</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Ver Horario</Text>

      {/* --- Horario con scroll horizontal --- */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
        <View style={styles.tableWrap}>
          {/* Columna de horas */}
          <View style={styles.hoursCol}>
            {HORAS.slice(0, -1).map(h => (
              <Text key={h} style={styles.hourLabel}>{h}</Text>
            ))}
          </View>

          {/* Tabla principal */}
          <View style={styles.table}>
            {/* Cabecera de días */}
            <View style={styles.headRow}>
              {dias.map(d => <Text key={d} style={styles.headCell}>{d}</Text>)}
            </View>

            {/* Cuerpo: columna por día */}
            <View style={styles.bodyRow}>
              {dias.map(dia => (
                <View key={dia} style={styles.col}>
                  {HORAS.slice(0,-1).map(h => {
                    const slot = HORARIO[dia][h];
                    return (
                      <View key={h} style={[
                        styles.cell,
                        { backgroundColor: slot ? slot.color : 'transparent' }
                      ]}>
                        {!!slot && <Text style={styles.cellText}>{slot.curso}</Text>}
                      </View>
                    );
                  })}
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>


      <View style={{ marginTop: 12 }}>
        <Button title="Imprimir horario (PDF)" onPress={handlePrintSchedule} />
      </View>
    </ScrollView>
  );
}

/* ---------- Estilos ---------- */
const styles = StyleSheet.create({
  screen:{ flex:1, backgroundColor:'#f5f5f5', padding:20 },

  header:{ flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginBottom:12 },
  logo:{ fontSize:30, color:'#4CAF50', fontWeight:'bold' },
  code:{ fontSize:18, color:'#4CAF50' },
  backBtn:{ flexDirection:'row', backgroundColor:'#2E7D32', paddingHorizontal:12, paddingVertical:8, borderRadius:8, alignItems:'center' },
  backText:{ color:'#fff', marginLeft:6, fontWeight:'bold' },

  title:{ fontSize:26, fontWeight:'bold', marginBottom:8 },

  /* Horario */
  tableWrap:{ flexDirection:'row' },
  hoursCol:{ width:54, marginTop:34 },
  hourLabel:{ height:44, textAlign:'right', paddingRight:6, color:'#777' },
  table:{ borderWidth:1, borderColor:'#cfd8dc', borderRadius:8, overflow:'hidden' },
  headRow:{ flexDirection:'row', backgroundColor:'#f1f3f4', borderBottomWidth:1, borderColor:'#cfd8dc' },
  headCell:{ width:120, padding:8, textAlign:'center', fontWeight:'600' },
  bodyRow:{ flexDirection:'row' },
  col:{ width:120, backgroundColor:'#fff' },
  cell:{ height:44, borderBottomWidth:1, borderColor:'#eceff1', alignItems:'center', justifyContent:'center' },
  cellText:{ color:'#fff', fontWeight:'700', fontSize:12, textAlign:'center' },
});

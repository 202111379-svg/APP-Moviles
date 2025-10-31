import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

type Estado = 'COBRADO' | 'PENDIENTE';
type Metodo = 'BCP' | 'BANCO_NACION' | null;
type Mes = 'Junio' | 'Julio' | 'Agosto';

type Comprobante = {
  id: string;
  anio: number;
  mes: Mes;
  descripcion: string;
  importe: number;
  vencimiento: string;
  cuota: number;
  periodo: string;
  estado: Estado;
  metodo?: Metodo;
  ult4?: string;
};

type PagoHistorial = {
  idItem: string;
  anio: number;
  mes: Mes;
  importe: number;
  metodo: Exclude<Metodo, null>;
  ult4: string;
  fechaPago: string;
};

const soles = (n: number) => `S/ ${n.toFixed(2)}`.replace('.', ',');
const MESES: Mes[] = ['Junio', 'Julio', 'Agosto'];
const ANIOS = [2023, 2024, 2025];

export default function Pagos() {
  const router = useRouter();

  const [anio, setAnio] = useState<number>(2025);
  const [mes, setMes] = useState<Mes>('Junio');

  const [items, setItems] = useState<Comprobante[]>([
    { id: 'JUN25-4', anio: 2025, mes: 'Junio', descripcion: 'Pensión – Administración y Recursos', importe: 368.75, vencimiento: '16/06/2025', cuota: 4, periodo: '202506', estado: 'COBRADO', metodo: 'BCP', ult4: '4242' },
    { id: 'JUN25-5', anio: 2025, mes: 'Junio', descripcion: 'Pensión – Administración y Recursos', importe: 368.75, vencimiento: '16/07/2025', cuota: 5, periodo: '202507', estado: 'PENDIENTE' },
    { id: 'JUL24-1', anio: 2024, mes: 'Julio', descripcion: 'Pensión – Administración y Recursos', importe: 360.00, vencimiento: '16/07/2024', cuota: 1, periodo: '202407', estado: 'PENDIENTE' },
    { id: 'AGO23-1', anio: 2023, mes: 'Agosto', descripcion: 'Pensión – Administración y Recursos', importe: 355.50, vencimiento: '16/08/2023', cuota: 1, periodo: '202308', estado: 'PENDIENTE' },
  ]);

  const [historial, setHistorial] = useState<PagoHistorial[]>([]);

  const [payTarget, setPayTarget] = useState<Comprobante | null>(null);
  const [metodo, setMetodo] = useState<Metodo>(null);
  const [numero, setNumero] = useState<string>('');

  const filtrados = useMemo(
    () => items.filter(i => i.anio === anio && i.mes === mes),
    [items, anio, mes]
  );

  const abrirPago = (c: Comprobante) => {
    setPayTarget(c);
    setMetodo(null);
    setNumero('');
  };

  const confirmarPago = () => {
    if (!payTarget) return;
    if (!metodo) {
      Alert.alert('Selecciona un método', 'Elige BCP o Banco de la Nación.');
      return;
    }
    if (!numero || numero.replace(/\s+/g, '').length < 8) {
      Alert.alert('Número inválido', 'Ingresa un número de cuenta/tarjeta.');
      return;
    }

    const ult4 = numero.replace(/\D/g, '').slice(-4) || '0000';

    setItems(prev =>
      prev.map(it =>
        it.id === payTarget.id ? { ...it, estado: 'COBRADO', metodo, ult4 } : it
      )
    );

    setHistorial(prev => [
      {
        idItem: payTarget.id,
        anio: payTarget.anio,
        mes: payTarget.mes,
        importe: payTarget.importe,
        metodo: metodo as Exclude<Metodo, null>,
        ult4,
        fechaPago: new Date().toISOString(),
      },
      ...prev,
    ]);

    setPayTarget(null);
    Alert.alert('Pago registrado', `Se pagó ${payTarget.mes} ${payTarget.anio} por ${soles(payTarget.importe)}.`);
  };

  const verDetalle = (it: Comprobante) => {
    if (it.estado === 'PENDIENTE') {
      abrirPago(it);
    } else {
      Alert.alert(
        'Detalle del pago',
        `Estado: COBRADO\nMétodo: ${it.metodo === 'BCP' ? 'BCP' : 'Banco de la Nación'}\nÚltimos 4: ${it.ult4}\nImporte: ${soles(it.importe)}`
      );
    }
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ paddingBottom: 24 }}>
      <Text style={styles.breadcrumb}>FINANZAS / <Text style={{ fontWeight: '700' }}>CONSULTA DE COMPROBANTES</Text></Text>
      <Text style={styles.title}>CONSULTA DE COMPROBANTES DE PAGO</Text>

      <View style={styles.filters}>
        <View style={styles.filterGroup}>
          <Text style={styles.filterLabel}>Año:</Text>
          <View style={styles.rowGap}>
            {ANIOS.map(a => (
              <TouchableOpacity
                key={a}
                onPress={() => setAnio(a)}
                style={[styles.pill, anio === a && styles.pillActive]}
              >
                <Text style={[styles.pillText, anio === a && styles.pillTextActive]}>{a}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.filterGroup}>
          <Text style={styles.filterLabel}>Mes:</Text>
          <View style={styles.rowGap}>
            {MESES.map(m => (
              <TouchableOpacity
                key={m}
                onPress={() => setMes(m)}
                style={[styles.pill, mes === m && styles.pillActive]}
              >
                <Text style={[styles.pillText, mes === m && styles.pillTextActive]}>{m}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.consultarBtn}>
          <Text style={styles.consultarText}>Consultar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.headerRow}>
        <Text style={[styles.hcell, { flex: 1.1 }]}>ESTADO</Text>
        <Text style={[styles.hcell, { flex: 3 }]}>DESCRIPCIÓN</Text>
        <Text style={[styles.hcell, { flex: 1.3 }]}>IMPORTE</Text>
        <Text style={[styles.hcell, { flex: 1.3 }]}>F. VENCIMIENTO</Text>
        <Text style={[styles.hcell, { flex: 0.8 }]}>CUOTA</Text>
        <Text style={[styles.hcell, { flex: 1.2 }]}>AÑO/MES</Text>
        <Text style={[styles.hcell, { width: 90, textAlign: 'center' }]}>DETALLE</Text>
      </View>

      {filtrados.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={{ color: '#666' }}>No hay comprobantes para {mes} {anio}.</Text>
        </View>
      ) : (
        filtrados.map((it, idx) => (
          <View
            key={it.id}
            style={[styles.row, idx % 2 ? styles.rowAlt : undefined]}
          >
            <View style={[styles.statusBadge, it.estado === 'COBRADO' ? styles.badgeGreen : styles.badgeGray]}>
              <View style={[styles.dot, it.estado === 'COBRADO' ? styles.dotGreen : styles.dotGray]} />
              <Text style={[styles.statusText, it.estado === 'COBRADO' ? styles.statusGreenText : styles.statusGrayText]}>
                {it.estado}
              </Text>
            </View>

            <Text numberOfLines={1} style={[styles.cell, { flex: 3 }]}>{it.descripcion}</Text>
            <Text style={[styles.cell, { flex: 1.3 }]}>{soles(it.importe)}</Text>
            <Text style={[styles.cell, { flex: 1.3 }]}>{it.vencimiento}</Text>
            <Text style={[styles.cell, { flex: 0.8 }]}>{it.cuota}</Text>
            <Text style={[styles.cell, { flex: 1.2 }]}>{it.anio}/{it.periodo.slice(-2)}</Text>

            <TouchableOpacity style={styles.eyeBox} onPress={() => verDetalle(it)}>
              <Text style={{ fontSize: 18 }}>👁️</Text>
            </TouchableOpacity>
          </View>
        ))
      )}

      {payTarget && (
        <View style={styles.payBox}>
          <Text style={styles.payTitle}>
            Pagar {payTarget.mes} {payTarget.anio} — {soles(payTarget.importe)}
          </Text>

          <Text style={styles.payLabel}>¿Con qué deseas pagar?</Text>
          <View style={styles.methodRow}>
            <TouchableOpacity
              style={[styles.methodBtn, metodo === 'BCP' && styles.methodActive]}
              onPress={() => setMetodo('BCP')}
            >
              <Text style={[styles.methodText, metodo === 'BCP' && styles.methodTextActive]}>BCP</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.methodBtn, metodo === 'BANCO_NACION' && styles.methodActive]}
              onPress={() => setMetodo('BANCO_NACION')}
            >
              <Text style={[styles.methodText, metodo === 'BANCO_NACION' && styles.methodTextActive]}>Banco de la Nación</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.payLabel}>Número (cuenta / tarjeta):</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa un número"
            keyboardType="number-pad"
            value={numero}
            onChangeText={setNumero}
          />

          <View style={{ flexDirection: 'row', gap: 12, marginTop: 8 }}>
            <TouchableOpacity style={styles.confirmBtn} onPress={confirmarPago}>
              <Text style={styles.confirmText}>Pagar ahora</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelBtn} onPress={() => setPayTarget(null)}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {historial.length > 0 && (
        <>
          <Text style={styles.histTitle}>Historial de pagos</Text>
          <View style={styles.histHeader}>
            <Text style={[styles.hcell, { flex: 1.6 }]}>MES / AÑO</Text>
            <Text style={[styles.hcell, { flex: 1.4 }]}>IMPORTE</Text>
            <Text style={[styles.hcell, { flex: 1.6 }]}>MÉTODO</Text>
            <Text style={[styles.hcell, { flex: 1.2 }]}>ÚLT. 4</Text>
            <Text style={[styles.hcell, { flex: 2 }]}>FECHA</Text>
          </View>
          {historial.map((h, i) => (
            <View key={h.idItem + i} style={[styles.histRow, i % 2 ? styles.rowAlt : undefined]}>
              <Text style={[styles.cell, { flex: 1.6 }]}>{h.mes} {h.anio}</Text>
              <Text style={[styles.cell, { flex: 1.4 }]}>{soles(h.importe)}</Text>
              <Text style={[styles.cell, { flex: 1.6 }]}>{h.metodo === 'BCP' ? 'BCP' : 'Banco de la Nación'}</Text>
              <Text style={[styles.cell, { flex: 1.2 }]}>**** {h.ult4}</Text>
              <Text style={[styles.cell, { flex: 2 }]}>{new Date(h.fechaPago).toLocaleString()}</Text>
            </View>
          ))}
        </>
      )}

      <View style={{ marginTop: 16 }}>
        <Button title="Volver" onPress={() => router.push('/(tabs)/explore')} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#ffffff', padding: 16 },

  breadcrumb: { color: '#666', marginBottom: 8 },
  title: { fontSize: 22, fontWeight: '800', marginBottom: 12 },

  filters: {
    backgroundColor: '#f6f6f6', borderRadius: 10, padding: 12, marginBottom: 14,
    borderWidth: 1, borderColor: '#eee',
  },
  filterGroup: { marginBottom: 8 },
  filterLabel: { color: '#1b5e20', fontWeight: '800', marginBottom: 6 },
  rowGap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  pill: { borderWidth: 1, borderColor: '#c8e6c9', borderRadius: 999, paddingHorizontal: 14, paddingVertical: 8 },
  pillActive: { backgroundColor: '#2e7d32', borderColor: '#2e7d32' },
  pillText: { color: '#2e7d32', fontWeight: '700' },
  pillTextActive: { color: '#fff', fontWeight: '800' },
  consultarBtn: { alignSelf: 'flex-start', backgroundColor: '#2e7d32', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8, marginTop: 6 },
  consultarText: { color: '#fff', fontWeight: '800' },

  headerRow: {
    flexDirection: 'row', backgroundColor: '#3e1db6', paddingVertical: 10, paddingHorizontal: 12,
    borderTopLeftRadius: 10, borderTopRightRadius: 10,
  },
  hcell: { color: '#fff', fontWeight: '800' },

  emptyBox: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
    borderTopWidth: 0,
  },

  row: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 12,
    borderBottomWidth: 1, borderColor: '#eee', backgroundColor: '#fff',
  },
  rowAlt: { backgroundColor: '#fafafa' },

  cell: { color: '#333' },

  statusBadge: {
    flex: 1.1, flexDirection: 'row', alignItems: 'center', gap: 8,
    paddingVertical: 6, paddingHorizontal: 12, borderRadius: 999,
  },
  badgeGreen: { backgroundColor: '#e8f5e9' },
  badgeGray: { backgroundColor: '#eeeeee' },
  dot: { width: 10, height: 10, borderRadius: 5 },
  dotGreen: { backgroundColor: '#2e7d32' },
  dotGray: { backgroundColor: '#9e9e9e' },
  statusText: { fontWeight: '800' },
  statusGreenText: { color: '#2e7d32' },
  statusGrayText: { color: '#616161' },

  eyeBox: { width: 90, alignItems: 'center' },

  payBox: {
    marginTop: 14, padding: 14, borderWidth: 1, borderColor: '#c8e6c9', backgroundColor: '#f1f8e9', borderRadius: 10,
  },
  payTitle: { fontWeight: '800', marginBottom: 8, color: '#1b5e20' },
  payLabel: { fontWeight: '700', marginTop: 4, marginBottom: 6 },
  methodRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  methodBtn: { borderWidth: 1, borderColor: '#9ccc65', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, backgroundColor: '#fff' },
  methodActive: { backgroundColor: '#2e7d32', borderColor: '#2e7d32' },
  methodText: { color: '#2e7d32', fontWeight: '700' },
  methodTextActive: { color: '#fff', fontWeight: '800' },
  input: { borderWidth: 1, borderColor: '#cfd8dc', backgroundColor: '#fff', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },

  confirmBtn: { backgroundColor: '#2e7d32', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8 },
  confirmText: { color: '#fff', fontWeight: '800' },
  cancelBtn: { backgroundColor: '#eeeeee', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8 },
  cancelText: { color: '#333', fontWeight: '700' },

  histTitle: { marginTop: 20, marginBottom: 8, fontSize: 16, fontWeight: '800', color: '#1b5e20' },
  histHeader: {
    flexDirection: 'row', backgroundColor: '#2e7d32', paddingVertical: 10, paddingHorizontal: 12,
    borderTopLeftRadius: 10, borderTopRightRadius: 10,
  },
  histRow: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 12,
    borderBottomWidth: 1, borderColor: '#e6e6e6',
  },
});

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const diasSemana = ['DOMINGO', 'LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO'];

export default function NotificacionesScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const nombreCurso = (params.nombre as string) || 'Curso seleccionado';
  const horarioCurso = (params.horario as string) || '';

  const tareas = useMemo(() => {
    const hoy = new Date();

    const addDays = (d: Date, n: number) => {
      const copy = new Date(d);
      copy.setDate(copy.getDate() + n);
      return copy;
    };

    return [0, 1, 2].map((offset) => {
      const fecha = addDays(hoy, offset);
      return {
        fecha,
        diaNumero: fecha.getDate(),
        diaNombre: diasSemana[fecha.getDay()],
        tipo: 'TRABAJO EN CLASE',
        codigo: '20251-XXXXX', 
        horario: horarioCurso,
        vencimiento:
          offset === 0 ? 'VENCIMIENTO DE TAREA: HOY' : `VENCIMIENTO DE TAREA: EN ${offset} DÍA(s)`,
      };
    });
  }, [nombreCurso, horarioCurso]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.push('/(tabs)/Curso')}>
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notificaciones</Text>
        </View>

        <View style={styles.headerRight}>
          <Ionicons name="notifications-outline" size={24} color="#fff" />
          <View style={styles.badge} />
        </View>
      </View>

      <View style={styles.courseInfo}>
        <Text style={styles.courseName}>{nombreCurso}</Text>
        {horarioCurso ? <Text style={styles.courseHorario}>{horarioCurso}</Text> : null}
      </View>

      <View style={styles.filtersRow}>
        <Text style={styles.filterText}>PENDIENTES</Text>
        <View style={styles.todayPill}>
          <Text style={styles.todayPillText}>HOY</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.listContainer}>
        {tareas.map((t, idx) => (
          <View key={idx} style={styles.dayBlock}>
            <Text style={styles.dayNumber}>{t.diaNumero}</Text>
            <Text style={styles.dayName}>{t.diaNombre}</Text>

            <View style={styles.taskCard}>
              <View style={styles.taskHeaderPill}>
                <Text style={styles.taskHeaderText}>TAREA</Text>
              </View>

              <View style={styles.taskContent}>
                <Ionicons
                  name="document-text-outline"
                  size={26}
                  color="#00A152"
                  style={{ marginRight: 10 }}
                />
                <View style={{ flex: 1 }}>
                  <Text style={styles.taskType}>{t.tipo}</Text>
                  <Text style={styles.taskLine}>{t.codigo}</Text>
                  <Text style={styles.taskLine}>{t.curso}</Text>
                  <Text style={styles.taskLine}>Horario: {t.horario}</Text>
                  <Text style={styles.taskDue}>{t.vencimiento}</Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  header: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginLeft: 4 },
  headerRight: { flexDirection: 'row', alignItems: 'center' },

  badge: {
    position: 'absolute',
    right: -2,
    top: -2,
    width: 10,
    height: 10,
    backgroundColor: '#ff1744',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#4CAF50',
  },

  courseInfo: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  courseName: { fontSize: 16, fontWeight: 'bold' },
  courseHorario: { fontSize: 13, color: '#555', marginTop: 2 },

  filtersRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'center',
  },
  filterText: { fontSize: 16, fontWeight: 'bold' },
  todayPill: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 20,
  },
  todayPillText: { color: '#fff', fontWeight: 'bold' },

  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },

  dayBlock: {
    marginBottom: 18,
  },
  dayNumber: { fontSize: 18, fontWeight: 'bold' },
  dayName: { fontSize: 14, fontWeight: 'bold', marginBottom: 6 },

  taskCard: {
    backgroundColor: '#e5e5e5',
    borderRadius: 8,
    padding: 10,
  },
  taskHeaderPill: {
    alignSelf: 'flex-start',
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginBottom: 8,
  },
  taskHeaderText: { color: '#fff', fontWeight: 'bold' },

  taskContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  taskType: { fontWeight: 'bold', marginBottom: 2, fontSize: 13 },
  taskLine: { fontSize: 12 },
  taskDue: { fontSize: 12, marginTop: 4, fontWeight: 'bold' },
});

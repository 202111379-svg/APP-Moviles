import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type Evaluation = {
  id: string;
  description: string;
  prefix: string;
  grade: string;
};

type Course = {
  id: string;
  name: string;
  time: string;
  evaluations: Evaluation[];
};

const COURSES: Course[] = [
  {
    id: 'mercadotecnia',
    name: 'MERCADOTECNIA',
    time: '9:40 - 11:20',
    evaluations: [
      { id: '1', description: 'Parcial', prefix: 'PAR1', grade: '17' },
      { id: '2', description: 'Final', prefix: 'FIN1', grade: 'No Registra' },
      { id: '3', description: 'Taller', prefix: 'TLR1', grade: '16' },
    ],
  },
  {
    id: 'simulacion',
    name: 'Simulación de Sistemas',
    time: '5:00 - 7:40',
    evaluations: [
      { id: '1', description: 'Parcial', prefix: 'PAR1', grade: '18' },
      { id: '2', description: 'Final', prefix: 'FIN1', grade: 'No Registra' },
    ],
  },
  {
    id: 'moviles',
    name: 'Sistemas Móviles',
    time: '7:50 - 9:30',
    evaluations: [
      { id: '1', description: 'Proyecto', prefix: 'PRY1', grade: '19' },
      { id: '2', description: 'Taller', prefix: 'TLR1', grade: '15' },
      { id: '3', description: 'Parcial', prefix: 'PAR1', grade: '16' },
      { id: '4', description: 'Final', prefix: 'FIN1', grade: 'No Registra' },
    ],
  },
  {
    id: 'calidad',
    name: 'Calidad de Software',
    time: '3:00 - 4:40',
    evaluations: [
      { id: '1', description: 'Parcial', prefix: 'PAR1', grade: '16' },
      { id: '2', description: 'Final', prefix: 'FIN1', grade: 'No Registra' },
    ],
  },
  {
    id: 'taller',
    name: 'Taller de Programación',
    time: '1:00 - 2:40',
    evaluations: [
      { id: '1', description: 'Taller 1', prefix: 'TLR1', grade: '17' },
      { id: '2', description: 'Taller 2', prefix: 'TLR2', grade: '18' },
      { id: '3', description: 'Taller 3', prefix: 'TLR3', grade: '18' },
      { id: '4', description: 'Taller 4', prefix: 'TLR4', grade: '18' },
    ],
  },
];

export default function NotasScreen() {
  const router = useRouter();
  const [openCourseId, setOpenCourseId] = useState<string | null>(null);

  const toggleCourse = (id: string) => {
    setOpenCourseId((curr) => (curr === id ? null : id));
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* HEADER VERDE */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.push('/(tabs)/explore')}
            activeOpacity={0.6}
          >
            <Ionicons name="arrow-back" size={26} color="#fff" />
          </TouchableOpacity>

          <View style={styles.headerLeft}>
            <View style={styles.circle}>
              <Text style={styles.circleText}>J</Text>
            </View>
            <View>
              <Text style={styles.code}>202111359</Text>
              <Text style={styles.welcome}>Hola, Bienvenido</Text>
            </View>
          </View>

          <View style={styles.headerRight}>
            <Ionicons name="mail-outline" size={22} color="#fff" />
            <Ionicons
              name="notifications-outline"
              size={22}
              color="#fff"
              style={{ marginLeft: 12 }}
            />
            <TouchableOpacity style={{ marginLeft: 12 }}>
              <Text style={styles.helpRight}>Ayuda →</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* TÍTULO */}
        <View style={styles.coursesHeaderBar}>
          <Text style={styles.coursesHeaderText}>NOTAS</Text>
        </View>

        {/* LISTA DE CURSOS */}
        {COURSES.map((course) => {
          const isOpen = openCourseId === course.id;
          return (
            <View key={course.id} style={styles.courseCard}>

              {/* Fila del curso */}
              <View style={styles.courseRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.courseTitle}>Curso: {course.name}</Text>
                  <Text style={styles.courseTime}>{course.time}</Text>
                </View>

                <TouchableOpacity
                  style={styles.virtualPill}
                  onPress={() => toggleCourse(course.id)}
                >
                  <Text style={styles.virtualText}>Notas</Text>
                  <Ionicons
                    name={isOpen ? 'chevron-up' : 'chevron-forward'}
                    size={18}
                    color="#fff"
                    style={{ marginLeft: 5 }}
                  />
                </TouchableOpacity>
              </View>

              {/* Desplegable */}
              {isOpen && (
                <View style={styles.evalBox}>
                  <View style={[styles.evalRow, styles.evalHeaderRow]}>
                    <Text style={[styles.evalCellDesc, styles.evalHeaderText]}>
                      Evaluación
                    </Text>
                    <Text style={[styles.evalCellPrefix, styles.evalHeaderText]}>
                      Prefijo
                    </Text>
                    <Text style={[styles.evalCellGrade, styles.evalHeaderText]}>
                      Nota
                    </Text>
                  </View>

                  {course.evaluations.map((ev) => (
                    <View key={ev.id} style={styles.evalRow}>
                      <Text style={styles.evalCellDesc}>{ev.description}</Text>
                      <Text style={styles.evalCellPrefix}>{ev.prefix}</Text>
                      <Text style={styles.evalCellGrade}>{ev.grade}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f5f5f5' },
  container: { padding: 16 },

  header: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 10,
  },
  circle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  circleText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  code: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  welcome: { color: '#fff', fontSize: 11 },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  helpRight: { color: '#fff', fontWeight: '600', fontSize: 14 },

  coursesHeaderBar: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 12,
  },
  coursesHeaderText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  courseCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  courseRow: { flexDirection: 'row', alignItems: 'center' },
  courseTitle: { fontWeight: 'bold', fontSize: 14 },
  courseTime: { fontSize: 12, color: '#555', marginTop: 2 },

  virtualPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  virtualText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 13,
  },

  evalBox: { marginTop: 10, borderTopWidth: 1, borderTopColor: '#eee' },
  evalRow: { flexDirection: 'row', paddingVertical: 6 },
  evalHeaderRow: { borderBottomWidth: 1, borderBottomColor: '#eee' },
  evalHeaderText: { fontWeight: 'bold', fontSize: 12 },
  evalCellDesc: { flex: 2, fontSize: 12 },
  evalCellPrefix: { flex: 1, fontSize: 12, textAlign: 'center' },
  evalCellGrade: { flex: 1, fontSize: 12, textAlign: 'right' },
});

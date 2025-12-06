import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
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

type Comment = {
  id: string;
  courseId: string;
  text: string;
  createdAt: Date;
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
  const [commentOpenCourseId, setCommentOpenCourseId] = useState<string | null>(null);
  const [pendingComments, setPendingComments] = useState<Record<string, string>>({});
  const [savedComments, setSavedComments] = useState<Comment[]>([]);
  const [showEvidence, setShowEvidence] = useState(false);

  const toggleCourse = (id: string) => {
    setOpenCourseId((curr) => (curr === id ? null : id));
  };

  const toggleCommentBox = (id: string) => {
    setCommentOpenCourseId((curr) => (curr === id ? null : id));
  };

  const handleChangeComment = (courseId: string, text: string) => {
    setPendingComments((prev) => ({
      ...prev,
      [courseId]: text,
    }));
  };

  const handleSendComment = (courseId: string) => {
    const raw = pendingComments[courseId] ?? '';
    const text = raw.trim();
    if (!text) return;

    const newComment: Comment = {
      id: `${courseId}-${Date.now()}`,
      courseId,
      text,
      createdAt: new Date(),
    };

    setSavedComments((prev) => [newComment, ...prev]);
    setPendingComments((prev) => ({ ...prev, [courseId]: '' }));
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
          const isCommentOpen = commentOpenCourseId === course.id;
          const commentValue = pendingComments[course.id] ?? '';

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

              {/* Desplegable de notas */}
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

              {/* BOTÓN COMENTARIO */}
              <TouchableOpacity
                style={styles.commentButton}
                onPress={() => toggleCommentBox(course.id)}
                activeOpacity={0.7}
              >
                <Ionicons name="chatbox-ellipses-outline" size={18} color="#4CAF50" />
                <Text style={styles.commentButtonText}>
                  {isCommentOpen ? 'Ocultar comentario' : 'Comentario'}
                </Text>
              </TouchableOpacity>

              {/* DESPLEGABLE COMENTARIO */}
              {isCommentOpen && (
                <View style={styles.commentBox}>
                  <Text style={styles.commentLabel}>Escribe un comentario:</Text>
                  <TextInput
                    style={styles.commentInput}
                    multiline
                    placeholder="Ej: Observación sobre la nota, acuerdo con el docente, etc."
                    value={commentValue}
                    onChangeText={(text) => handleChangeComment(course.id, text)}
                  />
                  <TouchableOpacity
                    style={styles.commentSendButton}
                    onPress={() => handleSendComment(course.id)}
                    activeOpacity={0.8}
                  >
                    <Ionicons name="save-outline" size={18} color="#fff" />
                    <Text style={styles.commentSendText}>Guardar comentario</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>

      {/* BOTÓN FLOTANTE EVIDENCIAS */}
      <View pointerEvents="box-none" style={styles.fabWrapper}>
        <View style={styles.fabInner}>
          {showEvidence && (
            <View style={styles.evidencePanel}>
              <Text style={styles.evidenceTitle}>Evidencias guardadas</Text>
              {savedComments.length === 0 ? (
                <Text style={styles.evidenceEmpty}>
                  No hay comentarios guardados.
                </Text>
              ) : (
                savedComments.map((c) => {
                  const course = COURSES.find((x) => x.id === c.courseId);
                  return (
                    <View key={c.id} style={styles.evidenceItem}>
                      <Text style={styles.evidenceCourse}>
                        {course ? course.name : c.courseId}
                      </Text>
                      <Text style={styles.evidenceText}>{c.text}</Text>
                      <Text style={styles.evidenceDate}>
                        {c.createdAt.toLocaleString('es-PE')}
                      </Text>
                    </View>
                  );
                })
              )}
            </View>
          )}

          <TouchableOpacity
            style={styles.fab}
            onPress={() => setShowEvidence((v) => !v)}
            activeOpacity={0.85}
          >
            <Ionicons
              name={showEvidence ? 'folder-open' : 'folder-outline'}
              size={20}
              color="#fff"
            />
            <Text style={styles.fabText}>Evidencias</Text>
          </TouchableOpacity>
        </View>
      </View>
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

  commentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  commentButtonText: {
    marginLeft: 6,
    color: '#4CAF50',
    fontWeight: '600',
    fontSize: 13,
  },
  commentBox: {
    marginTop: 6,
    paddingTop: 6,
    borderTopColor: '#eee',
    borderTopWidth: 1,
  },
  commentLabel: {
    fontSize: 12,
    color: '#555',
    marginBottom: 4,
  },
  commentInput: {
    minHeight: 60,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
    fontSize: 13,
    backgroundColor: '#fafafa',
    marginBottom: 6,
  },
  commentSendButton: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  commentSendText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 4,
  },

  fabWrapper: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    left: 20,
    alignItems: 'flex-end',
  },
  fabInner: {
    alignItems: 'flex-end',
  },
  fab: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1976D2',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 24,
    elevation: 4,
  },
  fabText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 6,
    fontSize: 13,
  },
  evidencePanel: {
    width: '80%',
    maxHeight: 250,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  evidenceTitle: {
    fontWeight: 'bold',
    marginBottom: 6,
    fontSize: 14,
  },
  evidenceEmpty: {
    fontSize: 12,
    color: '#666',
  },
  evidenceItem: {
    marginBottom: 6,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
    paddingBottom: 4,
  },
  evidenceCourse: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  evidenceText: {
    fontSize: 12,
  },
  evidenceDate: {
    fontSize: 10,
    color: '#777',
    marginTop: 2,
  },
});

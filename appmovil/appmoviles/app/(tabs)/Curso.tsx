import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const cursos = [
  { nombre: 'MERCADOTECNIA', horario: '9:40 - 11:20' },
  { nombre: 'Simulación de Sistemas', horario: '5:00 - 7:40' },
  { nombre: 'Sistemas Móviles', horario: '7:50 - 9:30' },
  { nombre: 'Calidad de Software', horario: '3:00 - 4:40' },
  { nombre: 'Taller de Programación', horario: '1:00 - 2:40' },
];

const CursosScreen = () => {
  const router = useRouter();

  const handlePressCurso = (curso: { nombre: string; horario: string }) => {
    router.push({
      pathname: '/(tabs)/notificaciones',
      params: {
        nombre: curso.nombre,
        horario: curso.horario,
      },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {cursos.map((curso, index) => (
        <TouchableOpacity
          key={index}
          style={styles.card}
          onPress={() => handlePressCurso(curso)}
          activeOpacity={0.8}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Curso: {curso.nombre}</Text>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Virtual</Text>
              <Ionicons
                name="arrow-forward"
                size={16}
                color="black"
                style={{ marginLeft: 5 }}
              />
            </View>
          </View>
          <Text style={styles.horario}>{curso.horario}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push('/(tabs)/explore')}
      >
        <Ionicons name="arrow-back" size={18} color="#fff" />
        <Text style={styles.backButtonText}>Volver a Inicio</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#dcdcdc',
  },
  card: {
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000',
    flex: 1,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#63c357',
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  tagText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  horario: {
    marginTop: 4,
    fontSize: 13,
    color: '#000',
  },
  backButton: {
    marginTop: 10,
    marginBottom: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 6,
  },
});

export default CursosScreen;

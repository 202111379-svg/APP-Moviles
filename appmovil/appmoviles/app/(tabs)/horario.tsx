import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Importamos los íconos

const Horario: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header - Logo y Bienvenida */}
      <View style={styles.header}>
        <Text style={styles.logo}>J</Text> {/* Logo con iniciales */}
        <Text style={styles.code}>202111359</Text> {/* Código del estudiante */}
      </View>

      {/* Título de la pantalla */}
      <Text style={styles.title}>Ver Horario</Text>

      {/* Información del horario */}
      <Text style={styles.details}>Detalles del horario aquí.</Text>

      {/* Botón para volver */}
      <Button title="Volver" onPress={() => router.push('/explore')} /> {/* Redirige a Explore.tsx */}

      {/* Íconos en la parte inferior */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="home-outline" size={24} color="black" />
          <Text style={styles.footerText}>Inicio</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="calendar-outline" size={24} color="black" />
          <Text style={styles.footerText}>Ver Horario</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="book-outline" size={24} color="black" />
          <Text style={styles.footerText}>Curso</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="cash-outline" size={24} color="black" />
          <Text style={styles.footerText}>Pagos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  logo: {
    fontSize: 30,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginRight: 10,
  },
  code: {
    fontSize: 20,
    color: '#4CAF50',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  details: {
    fontSize: 18,
    marginBottom: 30,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 40,
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 8,
  },
  iconButton: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: 'black',
    marginTop: 5,
  },
});

export default Horario;

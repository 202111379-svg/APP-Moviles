import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Importando los íconos

export default function Explore() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {/* Logo simulado con las iniciales */}
          <Text style={styles.logo}>J</Text>
          <Text style={styles.code}>202111359</Text>
        </View>
        <View style={styles.headerRight}>
          {/* Íconos */}
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="person-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="mail-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { /* Acción de ayuda */ }}>
            <Text style={styles.helpText}>Ayuda →</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Restante del contenido */}
      <View style={styles.classContainer}>
        <Text style={styles.classTitle}>Ahora</Text>

        <View style={styles.classItem}>
          <Text style={styles.className}>Curso: MERCADOTECNIA</Text>
          <Text style={styles.classStatus}>Virtual</Text>
          <Text style={styles.classTime}>9:40 - 11:20</Text>
        </View>

        <View style={styles.classItem}>
          <Text style={styles.className}>Curso: Simulacion De S...</Text>
          <Text style={styles.classStatus}>Virtual</Text>
          <Text style={styles.classTime}>5:00 - 7:40</Text>
        </View>

        <Button title="Ver mi horario" onPress={() => {}} />
      </View>

      {/* Announcements Section */}
      <View style={styles.announcementContainer}>
        <Text style={styles.announcementTitle}>Anuncios</Text>
        <Text style={styles.announcementText}>
          ¡Ahorra En Tus Cuotas!
        </Text>
        <Text style={styles.announcementSubtext}>
          Pagando Hasta 1 Día Antes Del Vencimiento De Cada Cuota
        </Text>
        <Button title="Conoce Los Descuentos Y El Calendario De Pagos" onPress={() => {}} />
      </View>

      {/* Navigation Buttons */}
      <View style={styles.navContainer}>
        <TouchableOpacity style={styles.navButton} onPress={() => router.push('/')}>
          <Ionicons name="home-outline" size={24} color="white" />
          <Text style={styles.navButtonText}>Inicio</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={() => router.push('/horario')}>
          <Ionicons name="calendar-outline" size={24} color="white" />
          <Text style={styles.navButtonText}>Ver Horario</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={() => router.push('/curso')}>
          <Ionicons name="book-outline" size={24} color="white" />
          <Text style={styles.navButtonText}>Curso</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={() => router.push('/pagos')}>
          <Ionicons name="cash-outline" size={24} color="white" />
          <Text style={styles.navButtonText}>Pagos</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <Button title="Cerrar sesión" onPress={() => router.push('/')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 10,
  },
  code: {
    fontSize: 16,
    color: '#fff',
  },
  headerCenter: {
    alignItems: 'center',
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'right', // Alineado a la derecha
  },
  email: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
    textAlign: 'right', // Alineado a la derecha
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 10,
  },
  helpText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 10,
  },
  classContainer: {
    marginBottom: 30,
  },
  classTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  classItem: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  className: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  classStatus: {
    color: 'green',
  },
  classTime: {
    fontSize: 14,
    color: '#888',
  },
  announcementContainer: {
    marginBottom: 30,
  },
  announcementTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  announcementText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f60',
  },
  announcementSubtext: {
    fontSize: 14,
    color: '#888',
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 8,
  },
  navButton: {
    alignItems: 'center',
  },
  navButtonText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 5,
  },
});

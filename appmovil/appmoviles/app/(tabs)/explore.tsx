import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Explore() {
  const router = useRouter();

  const onPressBell = () => {
    router.push('/(tabs)/notificaciones');
  };

  const onPressMail = () => {
    Alert.alert('Correo', 'Funcionalidad de correo próximamente.');
  };

  return (
    <View style={styles.container}>
      {/* ================= HEADER ================= */}
      <View style={styles.header}>
        {/* IZQUIERDA */}
        <View style={styles.headerLeft}>
          <View style={styles.logoCircle}>
            <Text style={styles.logo}>J</Text>
          </View>
          <Text style={styles.code}>202111368</Text>
        </View>

        {/* DERECHA */}
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="person-outline" size={24} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton} onPress={onPressMail}>
            <Ionicons name="mail-outline" size={24} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton} onPress={onPressBell}>
            <View>
              <Ionicons name="notifications-outline" size={24} color="#fff" />
              <View style={styles.badge} />
            </View>
          </TouchableOpacity>

          {/* BOTÓN AYUDA → */}
          <TouchableOpacity onPress={() => router.push('/(tabs)/ayuda')}>
            <Text style={styles.helpText}>Ayuda →</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ================= CLASES ================= */}
      <View style={styles.classContainer}>
        <Text style={styles.classTitle}>Ahora</Text>

        <View style={styles.classItem}>
          <Text style={styles.className}>Curso: MERCADOTECNIA</Text>
          <Text style={styles.classStatus}>Virtual</Text>
          <Text style={styles.classTime}>9:40 - 11:20</Text>
        </View>

        <View style={styles.classItem}>
          <Text style={styles.className}>Curso: Simulación de S...</Text>
          <Text style={styles.classStatus}>Virtual</Text>
          <Text style={styles.classTime}>5:00 - 7:40</Text>
        </View>

        <Button title="Ver mi horario" onPress={() => router.push('/(tabs)/horario')} />
      </View>

      {/* ================= BOTÓN NOTAS ================= */}
      <View style={{ marginTop: 10 }}>
        <Button title="Ver mis Notas" onPress={() => router.push('/(tabs)/notas')} />
      </View>

      {/* ================= ANUNCIOS ================= */}
      <View style={styles.announcementContainer}>
        <Text style={styles.announcementTitle}>Anuncios</Text>
        <Text style={styles.announcementText}>¡Ahorra En Tus Cuotas!</Text>
        <Text style={styles.announcementSubtext}>
          Pagando hasta 1 día antes del vencimiento de cada cuota
        </Text>

        <Button
          title="Ver descuentos y calendario"
          onPress={() => router.push('/(tabs)/calendario')}
        />
      </View>

      {/* ================= NAVIGATION BAR ================= */}
      <View style={styles.navContainer}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.replace('/(tabs)/explore')}
        >
          <Ionicons name="home-outline" size={24} color="white" />
          <Text style={styles.navButtonText}>Inicio</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push('/(tabs)/horario')}
        >
          <Ionicons name="calendar-outline" size={24} color="white" />
          <Text style={styles.navButtonText}>Horario</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push('/(tabs)/Curso')}
        >
          <Ionicons name="book-outline" size={24} color="white" />
          <Text style={styles.navButtonText}>Curso</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push('/(tabs)/pagos')}
        >
          <Ionicons name="cash-outline" size={24} color="white" />
          <Text style={styles.navButtonText}>Pagos</Text>
        </TouchableOpacity>
      </View>

      {/* CERRAR SESIÓN */}
      <Button title="Cerrar sesión" onPress={() => router.replace('/')} />
    </View>
  );
}

/* ===================== ESTILOS ===================== */

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },

  header: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'space-between',
  },

  headerLeft: { flexDirection: 'row', alignItems: 'center' },

  logoCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },

  logo: { fontSize: 18, color: '#fff', fontWeight: 'bold' },

  code: { fontSize: 16, color: '#fff' },

  headerRight: { flexDirection: 'row', alignItems: 'center' },

  iconButton: { marginLeft: 10 },

  helpText: { fontSize: 16, color: '#fff', marginLeft: 10 },

  badge: {
    position: 'absolute',
    right: -2,
    top: -2,
    width: 10,
    height: 10,
    backgroundColor: '#00e676',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#4CAF50',
  },

  classContainer: { marginBottom: 30 },

  classTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },

  classItem: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },

  className: { fontSize: 16, fontWeight: 'bold' },

  classStatus: { color: 'green' },

  classTime: { fontSize: 14, color: '#888' },

  announcementContainer: { marginBottom: 30 },

  announcementTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },

  announcementText: { fontSize: 16, fontWeight: 'bold', color: '#f60' },

  announcementSubtext: { fontSize: 14, color: '#888' },

  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 8,
  },

  navButton: { alignItems: 'center' },

  navButtonText: { color: '#fff', fontSize: 12, marginTop: 5 },
});

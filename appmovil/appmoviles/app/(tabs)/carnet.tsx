// app/(tabs)/carnet.tsx
import React from 'react';
import Foto from '../../assets/images/Fotocarne.png'; // ← TU IMAGEN REAL
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';

export default function CarnetScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.page}>
          
          {/* Barra verde superior */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.circle}>
                <Text style={styles.circleText}>J</Text>
              </View>
              <Text style={styles.code}>202111368</Text>
            </View>

            <Text style={styles.iconText}>🪪</Text>
          </View>

          {/* Texto barra */}
          <View style={styles.headerTitleBox}>
            <Text style={styles.headerTitle}>CARNET UNIVERSITARIO ONLINE</Text>
          </View>

          {/* Tarjeta del carnet */}
          <View style={styles.card}>
            <Text style={styles.university}>UNIVERSIDAD RICARDO PALMA</Text>

            {/* Foto */}
            <View style={styles.photoBox}>
              <Image source={Foto} style={styles.photo} />
            </View>

            {/* Información */}
            <View style={styles.infoBox}>
              <Text style={styles.label}>
                Código: <Text style={styles.value}>202111368</Text>
              </Text>
              <Text style={styles.label}>
                DNI: <Text style={styles.value}>79861123</Text>
              </Text>
              <Text style={styles.label}>
                Nombre y Apellido:{' '}
                <Text style={styles.value}>Jesús Vidurre Osorio</Text>
              </Text>
              <Text style={styles.label}>
                Escuela: <Text style={styles.value}>Ingeniería</Text>
              </Text>
              <Text style={styles.label}>
                Facultad: <Text style={styles.value}>Informática</Text>
              </Text>
            </View>

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#4E342E', // marrón
  },
  container: {
    flexGrow: 1,
  },
  page: {
    flex: 1,
    backgroundColor: '#4E342E',
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 32,
  },

  // HEADER
  header: {
    backgroundColor: '#4CAF50',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2E7D32',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  code: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  iconText: {
    color: '#FFFFFF',
    fontSize: 18,
  },

  headerTitleBox: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    marginBottom: 24,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },

  // TARJETA
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  university: {
    fontWeight: 'bold',
    marginBottom: 16,
    fontSize: 14,
  },

  // FOTO
  photoBox: {
    width: 140,
    height: 170,
    backgroundColor: '#EEEEEE',
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photo: {
    width: 120,
    height: 150,
    resizeMode: 'cover',
  },

  // INFORMACIÓN
  infoBox: {
    alignSelf: 'stretch',
    marginTop: 8,
  },
  label: {
    fontSize: 12,
    marginBottom: 4,
  },
  value: {
    fontWeight: '600',
  },
});

// app/(tabs)/calendario.tsx
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// importa la imagen del calendario
import CalendarioImg from '../../assets/images/calendario.jpg';

export default function CalendarioScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.page}>
          {/* Header verde */}
          <View style={styles.header}>
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
              <Ionicons name="id-card-outline" size={22} color="#fff" />
              <Ionicons
                name="mail-outline"
                size={22}
                color="#fff"
                style={{ marginLeft: 10 }}
              />
              <Ionicons
                name="notifications-outline"
                size={22}
                color="#fff"
                style={{ marginLeft: 10 }}
              />
            </View>
          </View>

          {/* Barra "Ayuda" */}
          <View style={styles.helpBar}>
            <Text style={styles.helpText}>Ayuda →</Text>
          </View>

          {/* Título calendario */}
          <Text style={styles.title}>CALENDARIO ACADÉMICO 2025-2</Text>

          {/* Imagen del calendario */}
          <Image source={CalendarioImg} style={styles.image} resizeMode="contain" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#4E342E',
  },
  container: {
    flexGrow: 1,
  },
  page: {
    flex: 1,
    backgroundColor: '#4E342E',
    paddingHorizontal: 12,
    paddingTop: 16,
    paddingBottom: 32,
  },
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
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  circleText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  code: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  welcome: {
    color: '#fff',
    fontSize: 12,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  helpBar: {
    backgroundColor: '#4CAF50',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 16,
  },
  helpText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'right',
  },
  title: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: 900, // ajusta según se vea en tu emulador
    backgroundColor: '#fff',
    borderRadius: 4,
  },
});

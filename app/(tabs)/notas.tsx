import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function NotasScreen() {
      const router = useRouter();
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>

  <TouchableOpacity
  style={styles.header}
  onPress={() => router.push('/(tabs)/explore')}
  activeOpacity={0.6}
>
  <Ionicons name="arrow-back" size={22} color="#4CAF50" />
  <Text style={styles.title}>CALCULA TUS PRÓXIMAS NOTAS</Text>
</TouchableOpacity>




        {/* Promedios */}
        <View style={styles.card}>
          <Text style={styles.bigEmoji}>😁</Text>
          <Text style={styles.promedioText}>
            Promedio ponderado <Text style={styles.bold}>actual</Text> 14
          </Text>
          <Text style={styles.promedioSim}>
            Promedio ponderado Simulado <Text style={styles.bold}>18.0</Text>
          </Text>
        </View>

        {/* ITEM REUTILIZABLE */}
        {[
          { code: 'TA1', name: 'Tarea Académica 1', grade: 10, weight: '10%' },
          { code: 'PC1', name: 'Práctica Calificada 1', grade: 20, weight: '10%' },
          { code: 'TA2', name: 'Tarea Calificada 2', grade: 20, weight: '10%' },
          { code: 'PC2', name: 'Práctica Calificada 2', grade: 20, weight: '10%' },
          { code: 'EXFI', name: 'Examen Final', grade: 20, weight: '10%' },
        ].map((item) => (
          <View key={item.code} style={styles.itemCard}>
            <View style={styles.row}>
              <Text style={styles.itemCode}>{item.code}</Text>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemWeight}>{item.weight}</Text>
            </View>

            <View style={styles.barContainer}>
              <View style={[styles.barFill, { width: `${item.grade * 5}%` }]} />
            </View>

            <Text style={styles.gradeText}>{item.grade}</Text>
          </View>
        ))}

        <Text style={styles.footerText}>
          Tomar una captura de pantalla en caso que quieras guardar el cálculo.
        </Text>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#4E342E' },
  container: { padding: 16 },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },

  title: {
    color: '#4CAF50',
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },

  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },

  bigEmoji: { fontSize: 50, marginBottom: 10 },
  promedioText: { fontSize: 14 },
  promedioSim: { fontSize: 14, marginTop: 6 },
  bold: { fontWeight: 'bold' },

  itemCard: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  itemCode: { fontWeight: 'bold', width: 50 },
  itemName: { flex: 1 },
  itemWeight: { fontWeight: 'bold', color: '#444' },

  barContainer: {
    width: '100%',
    height: 8,
    backgroundColor: '#eee',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 6,
  },
  barFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
  gradeText: {
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    marginTop: -4,
  },

  footerText: {
    color: '#ddd',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
  },
});

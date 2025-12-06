import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const HORAS = [
  '08:00','09:00','10:00','11:00','12:00',
  '13:00','14:00','15:00','16:00','17:00',
  '18:00','19:00','20:00','21:00','22:00',
];

const HORARIO = {
  Lunes: {  
    '17:00': { curso:'IF-0801 T',  color:'#43a047' },
    '19:00': { curso:'IF-0903 L',  color:'#c0ca33' },
    '21:00': { curso:'IF-0801 TA', color:'#26a69a' }
  },
  Martes: { 
    '18:00': { curso:'IF-0904 TA', color:'#1e88e5' },
    '20:00': { curso:'IF-0903 T',  color:'#c0ca33' }
  },
  Miercoles: { 
    '17:00': { curso:'IF-0901 TA', color:'#43a047' }
  },
  Jueves: { 
    '19:00': { curso:'IF-0904 T',  color:'#1e88e5' },
    '20:00': { curso:'IF-0904 TA', color:'#1e88e5' }
  },
  Viernes: { 
    '19:00': { curso:'IF-0802 TA', color:'#43a047' }
  },
  Sabado: { 
    '08:00': { curso:'IF-0802 T',  color:'#43a047' },
    '10:00': { curso:'IF-1103 T',  color:'#1e88e5' },
    '12:00': { curso:'IF-1103 TA', color:'#1e88e5' }
  },
};

export default function Horario() {
  const router = useRouter();
  const dias = ['Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.centerAll}>
      <View style={styles.header}>
        <Text style={styles.logo}>J</Text>
        <Text style={styles.code}>202111368</Text>
        <TouchableOpacity onPress={() => router.push('/(tabs)/explore')} style={styles.backBtn}>
          <Ionicons name="arrow-back-outline" size={16} color="#fff" />
          <Text style={styles.backText}>Volver</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Horario</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.wrap}>
          <View style={styles.hoursCol}>
            {HORAS.slice(0,-1).map(h => (
              <Text key={h} style={styles.hourLabel}>{h}</Text>
            ))}
          </View>

          <View style={styles.table}>
            <View style={styles.headRow}>
              {dias.map(d => (
                <Text key={d} style={styles.headCell}>{d}</Text>
              ))}
            </View>

            <View style={styles.bodyRow}>
              {dias.map(d => (
                <View key={d} style={styles.col}>
                  {HORAS.slice(0,-1).map(h => {
                    const slot = HORARIO[d][h];
                    return (
                      <View key={h} style={[styles.cell, { backgroundColor: slot ? slot.color : 'transparent' }]}>
                        {!!slot && <Text style={styles.cellText}>{slot.curso}</Text>}
                      </View>
                    );
                  })}
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.printBtnWrap}>
        <Button title="Imprimir horario" onPress={() => {}} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen:{ flex:1, backgroundColor:'#f5f5f5' },
  centerAll:{ alignItems:'center', justifyContent:'center', padding:10 },

  header:{ flexDirection:'row', alignItems:'center', justifyContent:'center', gap:12, marginBottom:6 },
  logo:{ fontSize:20, color:'#4CAF50', fontWeight:'bold' },
  code:{ fontSize:14, color:'#4CAF50' },
  backBtn:{ flexDirection:'row', backgroundColor:'#2E7D32', paddingHorizontal:8, paddingVertical:4, borderRadius:6, alignItems:'center' },
  backText:{ color:'#fff', marginLeft:3, fontWeight:'bold', fontSize:10 },

  title:{ fontSize:18, fontWeight:'700', marginBottom:6 },

  wrap:{ flexDirection:'row', alignItems:'center', justifyContent:'center' },

  hoursCol:{ width:36, marginTop:24, alignItems:'center' },
  hourLabel:{ height:26, color:'#777', fontSize:9, textAlign:'center' },

  table:{ borderWidth:1, borderColor:'#cfd8dc', borderRadius:6, overflow:'hidden' },

  headRow:{ flexDirection:'row', backgroundColor:'#f1f3f4', borderBottomWidth:1, borderColor:'#cfd8dc' },
  headCell:{ width:70, padding:4, textAlign:'center', fontWeight:'600', fontSize:11 },

  bodyRow:{ flexDirection:'row' },
  col:{ width:70, backgroundColor:'#fff' },

  cell:{ height:26, borderBottomWidth:1, borderColor:'#eceff1', alignItems:'center', justifyContent:'center', paddingHorizontal:1 },
  cellText:{ color:'#fff', fontWeight:'700', fontSize:9, textAlign:'center' },

  printBtnWrap:{ marginTop:10, width:'80%' }
});

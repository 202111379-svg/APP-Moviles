import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Notificaciones() {
  const router = useRouter();

  const hoy = new Date();
  const dia = hoy.getDate();
  const dias = ["DOMINGO","LUNES","MARTES","MIÉRCOLES","JUEVES","VIERNES","SÁBADO"];
  const diaSemana = dias[hoy.getDay()];

  const tareas = [
    {
      id: 1,
      curso: "Mercadotecnia",
      codigo: "20251-65621202",
      titulo: "Trabajo en clase",
      vence: "1 Día",
      fecha: dia,
      diaTexto: diaSemana
    },
    {
      id: 2,
      curso: "Sistemas Operativos",
      codigo: "20251-6567022-OTI-0",
      titulo: "Trabajo en clase",
      vence: "1 Día",
      fecha: dia + 1,
      diaTexto: dias[(hoy.getDay() + 1) % 7]
    },
    {
      id: 3,
      curso: "Taller de Proyectos",
      codigo: "20211-6722391-G2-0",
      titulo: "Trabajo en clase",
      vence: "1 Día",
      fecha: dia + 2,
      diaTexto: dias[(hoy.getDay() + 2) % 7]
    },

    {
    id: 4,
    curso: "Simulación",
    codigo: "20251-778822",
    titulo: "Práctica avanzada",
    vence: "2 Días",
    fecha: dia + 3,
    diaTexto: dias[(hoy.getDay() + 3) % 7]
  },
  
  {
    id: 5,
    curso: "Sistemas Móviles",
    codigo: "20251-991177",
    titulo: "Investigación de campo",
    vence: "3 Días",
    fecha: dia + 4,
    diaTexto: dias[(hoy.getDay() + 4) % 7]
  }
];


  return (
    <ScrollView style={styles.container}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.logoCircle}>
          <Text style={styles.logo}>J</Text>
        </View>

        <Text style={styles.headerTitle}>Notificaciones</Text>

        <Ionicons name="notifications" size={26} color="red" style={{ marginLeft: "auto" }} />
      </View>

      {/* PENDIENTES */}
      <View style={styles.row}>
        <Text style={styles.subTitle}>Pendientes</Text>

        <View style={styles.hoyBadge}>
          <Text style={styles.hoyText}>HOY</Text>
        </View>
      </View>

      {/* TAREAS */}
      {tareas.map((item) => (
        <View key={item.id} style={styles.dayBlock}>
          
          {/* FECHA */}
          <View style={styles.dateColumn}>
            <Text style={styles.dateNumber}>{item.fecha}</Text>
            <Text style={styles.dateText}>{item.diaTexto}</Text>
          </View>

          {/* CARD */}
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/(tabs)/Curso",
                params: {
                  id: item.id,
                  curso: item.curso,
                  codigo: item.codigo,
                  titulo: item.titulo,
                },
              })
            }
          >
            <View style={styles.cardHeader}>
              <Text style={styles.cardTag}>TAREA</Text>
            </View>

            <View style={styles.cardContent}>
              <Ionicons name="list-outline" size={28} color="#2e7d32" />

              <View style={{ marginLeft: 8 }}>
                <Text style={styles.cardTitle}>{item.titulo}</Text>
                <Text style={styles.cardItem}>• {item.codigo}</Text>
                <Text style={styles.cardItem}>• {item.curso}</Text>
                <Text style={styles.cardItem}>• Vencimiento: {item.vence}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#f4f4f4" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4caf50",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },

  logoCircle: {
    width: 35,
    height: 35,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  logo: { fontSize: 18, color: "#fff", fontWeight: "bold" },
  headerTitle: { fontSize: 20, fontWeight: "bold", color: "#fff" },

  row: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  subTitle: { fontSize: 18, fontWeight: "bold" },

  hoyBadge: {
    marginLeft: "auto",
    backgroundColor: "#8bc34a",
    paddingVertical: 4,
    paddingHorizontal: 18,
    borderRadius: 20,
  },

  hoyText: { color: "#fff", fontWeight: "bold" },

  dayBlock: { flexDirection: "row", marginBottom: 20 },

  dateColumn: { width: 60, alignItems: "center" },
  dateNumber: { fontSize: 20, fontWeight: "bold" },
  dateText: { fontSize: 12, color: "#555" },

  card: {
    flex: 1,
    backgroundColor: "#e7e7e7",
    padding: 12,
    borderRadius: 10,
  },

  cardHeader: { alignItems: "center", marginBottom: 5 },

  cardTag: {
    backgroundColor: "#4caf50",
    color: "#fff",
    fontWeight: "bold",
    paddingHorizontal: 18,
    paddingVertical: 3,
    borderRadius: 8,
  },

  cardContent: { flexDirection: "row", alignItems: "center" },

  cardTitle: { fontWeight: "bold", fontSize: 14 },
  cardItem: { fontSize: 12, color: "#333" },
});

import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function TareasScreen() {
  const router = useRouter();

  const tareasPorCurso = {
    "Simulación": [
      { tipo: "Exposición", codigo: "SIM01", horario: "8:00 AM", vencimiento: "Vence hoy" },
      { tipo: "Tarea 2", codigo: "SIM02", horario: "9:30 AM", vencimiento: "Mañana" },
    ],
    "Mercadotecnia": [
      { tipo: "Investigación", codigo: "MER01", horario: "10:00 AM", vencimiento: "Hoy" },
      { tipo: "Práctica", codigo: "MER02", horario: "3:00 PM", vencimiento: "Mañana" },
      { tipo: "Trabajo", codigo: "MER03", horario: "5:00 PM", vencimiento: "Lunes" },
    ],
    "Programación": [
      { tipo: "Código", codigo: "PRO01", horario: "11:00 AM", vencimiento: "Viernes" },
      { tipo: "Proyecto", codigo: "PRO03", horario: "4:00 PM", vencimiento: "Miércoles" },
    ],
    "Calidad de Software": [
      { tipo: "Práctica", codigo: "CAL01", horario: "9:00 AM", vencimiento: "Hoy" },
      { tipo: "Exposición", codigo: "CAL02", horario: "2:00 PM", vencimiento: "Viernes" },
    ],
    "Sistema Moviles": [
      { tipo: "Tarea", codigo: "MOV01", horario: "10:00 AM", vencimiento: "Hoy" },
      { tipo: "Práctica", codigo: "MOV02", horario: "1:30 PM", vencimiento: "Jueves" },
    ],
  };

  const irCurso = (curso) => {
    const rutas = {
      "Simulación": "/cursos/simulacion",
      "Mercadotecnia": "/cursos/mercadotecnia",
      "Programación": "/cursos/programacion",
      "Calidad de Software": "/cursos/calidad",
      "Sistema Moviles": "/cursos/sistemamoviles",
    };

    if (rutas[curso]) {
      router.push(rutas[curso]);
    } else {
      console.warn("Ruta no encontrada para:", curso);
    }
  };

  return (
    <ScrollView style={styles.container}>

      <TouchableOpacity 
        style={styles.volverBtn} 
        onPress={() => router.push("/Curso")}
      >
        <Ionicons name="arrow-back" size={22} color="black" />
        <Text style={styles.volverText}>Volver</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <Ionicons name="notifications-outline" size={40} color="#00A152" />
        <Text style={styles.headerTitle}>Notificación de Tarea</Text>
        <Text style={styles.headerCode}>Código: AC2025</Text>
      </View>

      {Object.keys(tareasPorCurso).map((curso, index) => (
        <View key={index}>
          <Text style={styles.cursoTitulo}>{curso}</Text>

          {tareasPorCurso[curso].map((t, i) => (
            <TouchableOpacity 
              key={i}
              style={styles.taskCard}
              onPress={() => irCurso(curso)}
            >
              <View style={styles.taskHeaderPill}>
                <Text style={styles.taskHeaderText}>TAREA</Text>
              </View>

              <View style={styles.taskContent}>
                <Ionicons 
                  name="document-text-outline" 
                  size={26} 
                  color="#00A152"
                  style={{ marginRight: 10 }} 
                />

                <View style={{ flex: 1 }}>
                  <Text style={styles.taskType}>{t.tipo}</Text>
                  <Text style={styles.taskLine}>{t.codigo}</Text>
                  <Text style={styles.taskLine}>Horario: {t.horario}</Text>
                  <Text style={styles.taskDue}>{t.vencimiento}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}

        </View>
      ))}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 15, backgroundColor: "#fff" },

  volverBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#4CAF50",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  volverText: {
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 6,
    color: "black",
  },

  header: { alignItems: "center", marginBottom: 20 },
  headerTitle: { fontSize: 20, fontWeight: "bold", marginTop: 5 },
  headerCode: { fontSize: 14, color: "#777", marginTop: 3 },

  cursoTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },

  taskCard: {
    backgroundColor: "#f3f3f3",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#d9d9d9",
  },

  taskHeaderPill: {
    backgroundColor: "#00A152",
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: "flex-start",
    borderRadius: 50,
    marginBottom: 10,
  },
  taskHeaderText: { color: "white", fontWeight: "bold", fontSize: 12 },

  taskContent: { flexDirection: "row", alignItems: "center" },

  taskType: { fontSize: 18, fontWeight: "bold" },
  taskLine: { fontSize: 14, color: "#777" },
  taskDue: { marginTop: 5, fontSize: 14, color: "#e53935", fontWeight: "bold" },
});

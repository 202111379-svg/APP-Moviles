import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

export default function SimulacionTareas() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      
      <TouchableOpacity 
        style={styles.volverBtn}
        onPress={() => router.push("/notificaciones")}
      >
        <Text style={styles.volverText}>← Volver</Text>
      </TouchableOpacity>

      <Text style={styles.titulo}>Curso: Simulación</Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/cursos/simulacion/tarea2")}
      >
        <Text style={styles.cardTitulo}>Tarea 2 – Exposición</Text>
        <Text style={styles.cardDesc}>Ingresa tu tarea aquí.</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },

  volverBtn: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
    marginBottom: 20,
    alignSelf: "flex-start",
  },
  volverText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 25 },

  card: {
    backgroundColor: "#E8F5E9",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },

  cardTitulo: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },

  cardDesc: { fontSize: 14, color: "#555" },
});

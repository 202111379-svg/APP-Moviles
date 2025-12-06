import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";

const ProgramacionTareas = () => {
  const tareas = ["Código", "Proyecto"];

  return (
    <ScrollView style={styles.container}>
      {tareas.map((t, i) => (
        <TouchableOpacity key={i} style={styles.card}>
          <Text style={styles.text}>{t}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default ProgramacionTareas;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  card: { padding: 20, backgroundColor: "#eee", marginBottom: 15, borderRadius: 10 },
  text: { fontSize: 20, fontWeight: "bold" },
});

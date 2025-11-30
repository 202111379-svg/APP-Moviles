import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function CalidadTarea() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tareas - Calidad de Software</Text>
      <Text style={styles.text}>Aquí podrás programar las tareas del curso Calidad de Software.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  text: { fontSize: 16 },
});

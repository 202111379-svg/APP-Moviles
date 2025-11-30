import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from "react-native";
import { useRouter } from "expo-router";

export default function Tarea2Component() {
  const router = useRouter();
  const [contenido, setContenido] = useState("");

  const enviar = () => {
    if (contenido.trim() === "") {
      Alert.alert("Aviso", "Debes escribir tu tarea");
      return;
    }

    Alert.alert("Tarea Enviada", "Tu exposición fue entregada con éxito.");
    setContenido("");
  };

  return (
    <View style={styles.container}>

      <TouchableOpacity
        style={styles.volverNoti}
        onPress={() => router.push("/notificaciones")}
      >
        <Text style={styles.volverNotiText}>← Volver a Notificaciones</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.volver}
        onPress={() => router.push("/cursos/simulacion")}
      >
        <Text style={styles.volverText}>← Volver al Curso</Text>
      </TouchableOpacity>

      <Text style={styles.titulo}>Tarea 2 – Tarea</Text>
      <Text style={styles.descripcion}>Escribe tu exposición y entrégala aquí.</Text>

      <TextInput
        style={styles.textBox}
        value={contenido}
        multiline
        placeholder="Escribe aquí tu tarea..."
        placeholderTextColor="#666"
        onChangeText={setContenido}
      />

      <TouchableOpacity style={styles.enviarBtn} onPress={enviar}>
        <Text style={styles.enviarText}>Enviar Tarea</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },

  volverNoti: {
    backgroundColor: "#4CAF50",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  volverNotiText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },

  volver: { marginBottom: 15, paddingVertical: 6 },
  volverText: { fontSize: 16, color: "#00796B" },

  titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  descripcion: { fontSize: 15, color: "#555", marginBottom: 20 },

  textBox: {
    width: "100%",
    minHeight: 160,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    textAlignVertical: "top",
    marginBottom: 20,
  },

  enviarBtn: {
    backgroundColor: "#009688",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  enviarText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});

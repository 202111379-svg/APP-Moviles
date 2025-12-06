import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ComprobantesPago() {
  const router = useRouter();

  // Recibir los parámetros enviados desde ConsultaComprobantes
  const { descripcion, importe, estado, mes } = useLocalSearchParams<{
    descripcion: string;
    importe: string;
    estado: "COBRADO" | "PENDIENTE";
    mes: string;
  }>();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>COMPROBANTE DE PAGO</Text>

      <View style={styles.box}>
        <Text style={styles.label}>Servicio:</Text>
        <Text style={styles.value}>{descripcion}</Text>

        <Text style={styles.label}>Alumno:</Text>
        <Text style={styles.value}>Anthony Galván</Text>

        <Text style={styles.label}>Periodo:</Text>
        <Text style={styles.value}>{mes} 2025</Text>

        <Text style={styles.label}>Importe:</Text>
        <Text style={styles.value}>S/ {importe}</Text>

        <Text style={styles.label}>Estado:</Text>
        <Text
          style={[
            styles.value,
            {
              color: estado === "COBRADO" ? "#34A853" : "#D32F2F",
              fontWeight: "700",
            },
          ]}
        >
          {estado}
        </Text>
      </View>

      {/* DESCARGAR (simulado por ahora) */}
      <TouchableOpacity
        style={styles.descargarBtn}
        onPress={() => alert("Simulando descarga del PDF...")}
      >
        <Text style={styles.descargarText}>DESCARGAR PDF</Text>
      </TouchableOpacity>

      {/* VOLVER */}
      <TouchableOpacity style={styles.volverBtn} onPress={() => router.replace('/pagos')}>
        <Text style={styles.volverText}>VOLVER</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#fff" },

  title: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
  },

  box: {
    backgroundColor: "#F4F4F4",
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
  },

  label: { fontSize: 14, fontWeight: "700", marginTop: 10 },
  value: { fontSize: 14, color: "#333" },

  descargarBtn: {
    backgroundColor: "#3A0CA3",
    padding: 12,
    borderRadius: 6,
    marginBottom: 15,
  },
  descargarText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
  },

  volverBtn: {
    backgroundColor: "#2196F3",
    padding: 12,
    borderRadius: 6,
  },
  volverText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
  },
});
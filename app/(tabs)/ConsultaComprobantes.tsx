import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ComprobanteItem {
  id: number;
  descripcion: string;
  mes: string;
  estado: "COBRADO" | "PENDIENTE";
  importe: string;
}

export default function ConsultaComprobantes() {
  const router = useRouter();

  const meses = ["Junio", "Julio", "Agosto"];

  const [comprobantes] = useState<ComprobanteItem[]>([
    { id: 1, descripcion: "Pago de Junio", mes: "Junio", estado: "COBRADO", importe: "368.75" },
    { id: 2, descripcion: "Pago de Julio", mes: "Julio", estado: "PENDIENTE", importe: "368.75" },
    { id: 3, descripcion: "Pago de Agosto", mes: "Agosto", estado: "PENDIENTE", importe: "368.75" },
  ]);

  const [selectedMonth, setSelectedMonth] = useState("Junio");

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>CONSULTA – COMPROBANTES</Text>

      {/* Selección de Mes */}
      <View style={styles.monthContainer}>
        {meses.map((mes) => (
          <TouchableOpacity
            key={mes}
            style={[styles.monthButton, selectedMonth === mes && styles.monthButtonActive]}
            onPress={() => setSelectedMonth(mes)}
          >
            <Text
              style={[styles.monthText, selectedMonth === mes && styles.monthTextActive]}
            >
              {mes}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Lista */}
      <View style={styles.listContainer}>
        {comprobantes
          .filter((c) => c.mes === selectedMonth)
          .map((item) => (
            <View key={item.id} style={styles.row}>
              {/* Estado */}
              <View style={styles.stateContainer}>
                <View
                  style={[
                    styles.stateCircle,
                    {
                      backgroundColor:
                        item.estado === "COBRADO" ? "#34A853" : "#B0B0B0",
                    },
                  ]}
                />
                <Text
                  style={[
                    styles.stateText,
                    {
                      color:
                        item.estado === "COBRADO" ? "#34A853" : "#757575",
                    },
                  ]}
                >
                  {item.estado}
                </Text>
              </View>

              {/* Descripción */}
              <Text style={[styles.rowText, { flex: 2 }]}>
                {item.descripcion}
              </Text>

              {/* Importe */}
              <Text style={[styles.rowText, { flex: 1 }]}>S/ {item.importe}</Text>

              {/* VER → Navegar a comprobante */}
              <TouchableOpacity
                style={{ width: 40 }}
                onPress={() =>
                  router.push({
                    pathname: "/ComprobantesPago",
                    params: {
                      id: item.id,
                      descripcion: item.descripcion,
                      importe: item.importe,
                      estado: item.estado,
                      mes: item.mes,
                    },
                  })
                }
              >
                <FontAwesome name="eye" size={22} color="#FF6600" />
              </TouchableOpacity>
            </View>
          ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 15, backgroundColor: "#fff" },
  title: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
  },
  monthContainer: { flexDirection: "row", marginBottom: 20 },
  monthButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#1B7B34",
    marginRight: 10,
  },
  monthButtonActive: { backgroundColor: "#1B7B34" },
  monthText: { color: "#1B7B34", fontWeight: "700" },
  monthTextActive: { color: "#fff" },

  listContainer: { marginTop: 10 },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#E0E0E0",
  },

  stateContainer: { flex: 1, flexDirection: "row", alignItems: "center" },
  stateCircle: { width: 12, height: 12, borderRadius: 6, marginRight: 5 },
  stateText: { fontSize: 12, fontWeight: "700" },

  rowText: { fontSize: 12, color: "#333" },
});
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface PagoItem {
  id: number;
  estado: "COBRADO" | "PENDIENTE";
  descripcion: string;
  importe: string;
  vencimiento: string;
  mes: string;
}

export default function Pago() {
  const [selectedMonth, setSelectedMonth] = useState("Junio");
  const [modalVisible, setModalVisible] = useState(false);
  const [comprobanteSeleccionado, setComprobanteSeleccionado] = useState<PagoItem | null>(null);

  const meses = ["Junio", "Julio", "Agosto"];

  const [pagos, setPagos] = useState<PagoItem[]>([
    {
      id: 1,
      estado: "COBRADO",
      descripcion: "Pago de Junio",
      importe: "368.75",
      vencimiento: "2025/06",
      mes: "Junio"
    },
    {
      id: 2,
      estado: "PENDIENTE",
      descripcion: "Pago de Julio",
      importe: "368.75",
      vencimiento: "2025/07",
      mes: "Julio"
    },
        {
      id: 3,
      estado: "PENDIENTE",
      descripcion: "Pago de Agosto",
      importe: "368.75",
      vencimiento: "2025/08",
      mes: "Agosto"
    },
  ]);

  const abrirModalPago = (item: PagoItem) => {
    setComprobanteSeleccionado(item);
    setModalVisible(true);
  };

  const simularPago = () => {
    if (!comprobanteSeleccionado) return;

    const nuevosPagos = pagos.map((p) =>
      p.id === comprobanteSeleccionado.id
        ? { ...p, estado: "COBRADO" as const }
        : p
    );

    setPagos(nuevosPagos);
    setModalVisible(false);

    // Ir al comprobante después de pagar
    router.push({
      pathname: "/ComprobantesPago",
      params: {
        descripcion: comprobanteSeleccionado.descripcion,
        importe: comprobanteSeleccionado.importe,
        estado: "COBRADO",
        mes: comprobanteSeleccionado.mes,
      },
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>CONSULTA DE COMPROBANTES DE PAGO</Text>

      {/* FILTROS */}
      <View style={styles.filterBox}>
        <Text style={styles.filterTitle}>Año:</Text>

        <View style={styles.yearContainer}>
          <TouchableOpacity style={styles.yearButtonActive}>
            <Text style={styles.yearTextActive}>2025</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.filterTitle}>Mes:</Text>

        <View style={styles.monthContainer}>
          {meses.map((mes) => (
            <TouchableOpacity
              key={mes}
              style={[
                styles.monthButton,
                selectedMonth === mes && styles.monthButtonActive,
              ]}
              onPress={() => setSelectedMonth(mes)}
            >
              <Text
                style={[
                  styles.monthText,
                  selectedMonth === mes && styles.monthTextActive,
                ]}
              >
                {mes}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* TABLA */}
      <View style={styles.tableHeader}>
        <Text style={[styles.headerText, { flex: 1 }]}>Estado</Text>
        <Text style={[styles.headerText, { flex: 2 }]}>Descripción</Text>
        <Text style={[styles.headerText, { flex: 1 }]}>Importe</Text>
        <Text style={[styles.headerText, { flex: 1 }]}>Venc.</Text>
        <Text style={[styles.headerText, { width: 40 }]}></Text>
      </View>

      {pagos
        .filter((p) => p.mes === selectedMonth)
        .map((item) => (
          <View key={item.id} style={styles.tableRow}>
            {/* ESTADO */}
            <View style={styles.stateContainer}>
              <View
                style={[
                  styles.stateCircle,
                  { backgroundColor: item.estado === "COBRADO" ? "#34A853" : "#9E9E9E" },
                ]}
              />
              <Text
                style={[
                  styles.stateText,
                  { color: item.estado === "COBRADO" ? "#34A853" : "#757575" },
                ]}
              >
                {item.estado}
              </Text>
            </View>

            {/* DESCRIPCIÓN */}
            <Text numberOfLines={1} style={[styles.rowText, { flex: 2 }]}>
              {item.descripcion}
            </Text>

            {/* IMPORTE */}
            <Text style={[styles.rowText, { flex: 1 }]}>S/ {item.importe}</Text>

            {/* VENCIMIENTO */}
            <Text style={[styles.rowText, { flex: 1 }]}>{item.vencimiento}</Text>

            {/* ACCIÓN */}
            <TouchableOpacity onPress={() => abrirModalPago(item)} style={{ width: 40 }}>
              <FontAwesome name="eye" size={22} color="#FF6600" />
            </TouchableOpacity>
          </View>
        ))}

      {/* BOTÓN VER LISTA DE COMPROBANTES */}
      <TouchableOpacity
        style={styles.volverButton}
        onPress={() => router.push("/ConsultaComprobantes")}
      >
        <Text style={styles.volverText}>VER COMPROBANTES</Text>
      </TouchableOpacity>

      {/* MODAL DE PAGO */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            {comprobanteSeleccionado && (
              <>
                <Text style={styles.modalTitle}>Comprobante</Text>

                <Text style={styles.modalDetail}>
                  <Text style={styles.modalLabel}>Estado: </Text>
                  {comprobanteSeleccionado.estado}
                </Text>

                <Text style={styles.modalDetail}>
                  <Text style={styles.modalLabel}>Descripción: </Text>
                  {comprobanteSeleccionado.descripcion}
                </Text>

                <Text style={styles.modalDetail}>
                  <Text style={styles.modalLabel}>Importe: </Text>S/{" "}
                  {comprobanteSeleccionado.importe}
                </Text>

                <Text style={styles.modalDetail}>
                  <Text style={styles.modalLabel}>Vencimiento: </Text>
                  {comprobanteSeleccionado.vencimiento}
                </Text>

                {comprobanteSeleccionado.estado === "PENDIENTE" ? (
                  <TouchableOpacity style={styles.pagarBtn} onPress={simularPago}>
                    <Text style={styles.pagarText}>PAGAR AHORA</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.pagarBtn}
                    onPress={() =>
                      router.push({
                        pathname: "/ComprobantesPago",
                        params: {
                          descripcion: comprobanteSeleccionado.descripcion,
                          importe: comprobanteSeleccionado.importe,
                          estado: "COBRADO",
                          mes: comprobanteSeleccionado.mes,
                        },
                      })
                    }
                  >
                    <Text style={styles.pagarText}>VER COMPROBANTE</Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  style={styles.cerrarBtn}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.cerrarText}>Cerrar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
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
  filterBox: {
    backgroundColor: "#F8F9FA",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  filterTitle: { fontSize: 16, fontWeight: "600", marginTop: 10 },
  yearContainer: { flexDirection: "row", marginTop: 5 },
  yearButtonActive: {
    backgroundColor: "#1B7B34",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  yearTextActive: {
    color: "#fff",
    fontWeight: "700",
  },

  monthContainer: { flexDirection: "row", marginTop: 5 },
  monthButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#1B7B34",
    marginRight: 10,
  },
  monthButtonActive: {
    backgroundColor: "#1B7B34",
  },
  monthText: { color: "#1B7B34", fontWeight: "600" },
  monthTextActive: { color: "#fff" },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#3A0CA3",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 6,
    marginBottom: 5,
  },
  headerText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
    textAlign: "center",
  },

  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#E0E0E0",
  },
  stateContainer: { flexDirection: "row", alignItems: "center", flex: 1 },
  stateCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 5,
  },
  stateText: { fontWeight: "700", fontSize: 12 },

  rowText: { fontSize: 12, color: "#333", textAlign: "center" },

  volverButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 12,
    marginTop: 20,
    borderRadius: 6,
  },
  volverText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalBox: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: { fontSize: 18, fontWeight: "700", marginBottom: 15 },
  modalDetail: { fontSize: 14, marginVertical: 2 },
  modalLabel: { fontWeight: "700" },

  pagarBtn: {
    backgroundColor: "#1B7B34",
    padding: 12,
    marginTop: 15,
    borderRadius: 6,
  },
  pagarText: { color: "#fff", fontWeight: "700", textAlign: "center" },

  cerrarBtn: {
    backgroundColor: "#E53935",
    padding: 10,
    marginTop: 10,
    borderRadius: 6,
  },
  cerrarText: { color: "#fff", textAlign: "center", fontWeight: "700" },
});
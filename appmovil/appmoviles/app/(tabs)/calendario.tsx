import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type DiscountInfo = {
  dateKey: string;
  title: string;
  detail: string;
};
const YEAR = 2025;
const MONTH = 7; 
const DISCOUNTS: DiscountInfo[] = [
  {
    dateKey: '2025-08-15',
    title: 'Descuento por pronto pago',
    detail: '15% de descuento pagando la cuota antes del 15 de agosto.',
  },
  {
    dateKey: '2025-09-01',
    title: 'Descuento matrícula regular',
    detail: '10% de descuento si regularizas tu matrícula hasta el 1 de septiembre.',
  },
  {
    dateKey: '2025-09-20',
    title: 'Campaña especial',
    detail: 'Descuento especial en cuotas atrasadas hasta el 20 de septiembre.',
  },
];

function buildCalendar(year: number, month: number) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstWeekday = new Date(year, month, 1).getDay(); 
  const offset = (firstWeekday + 6) % 7;

  const cells: (number | null)[] = [];

  for (let i = 0; i < offset; i++) cells.push(null);

  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const weeks: (number | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }
  return weeks;
}

function makeDateKey(year: number, month: number, day: number) {
  const mm = String(month + 1).padStart(2, '0');
  const dd = String(day).padStart(2, '0');
  return `${year}-${mm}-${dd}`;
}

export default function CalendarioScreen() {
  const router = useRouter();
  const [selectedDiscount, setSelectedDiscount] = useState<DiscountInfo | null>(null);

  const weeks = useMemo(() => buildCalendar(YEAR, MONTH), []);

  const discountMap = useMemo(() => {
    const map: Record<string, DiscountInfo> = {};
    for (const d of DISCOUNTS) map[d.dateKey] = d;
    return map;
  }, []);

  const monthName = useMemo(
    () =>
      new Date(YEAR, MONTH, 1).toLocaleDateString('es-PE', {
        month: 'long',
        year: 'numeric',
      }),
    []
  );

  const handleDayPress = (day: number | null) => {
    if (!day) {
      setSelectedDiscount(null);
      return;
    }
    const key = makeDateKey(YEAR, MONTH, day);
    if (discountMap[key]) setSelectedDiscount(discountMap[key]);
    else setSelectedDiscount(null);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.page}>

          {/* Header verde */}
          <View style={styles.header}>

            {/* IZQUIERDA: Botón retroceso + datos */}
            <View style={styles.headerLeft}>

              <TouchableOpacity
                onPress={() => router.push('/(tabs)/explore')}
                style={styles.backButton}
                activeOpacity={0.7}
              >
                <Ionicons name="arrow-back" size={24} color="#fff" />
              </TouchableOpacity>

              <View style={styles.circle}>
                <Text style={styles.circleText}>J</Text>
              </View>

              <View>
                <Text style={styles.code}>202111359</Text>
                <Text style={styles.welcome}>Hola, Bienvenido</Text>
              </View>
            </View>

            {/* DERECHA: Icons */}
            <View style={styles.headerRight}>
              <Ionicons name="id-card-outline" size={22} color="#fff" />
              <Ionicons name="mail-outline" size={22} color="#fff" style={{ marginLeft: 10 }} />
              <Ionicons name="notifications-outline" size={22} color="#fff" style={{ marginLeft: 10 }} />
            </View>
          </View>

          {/* Barra ayuda */}
          <View style={styles.helpBar}>
            <Text style={styles.helpText}>Ayuda →</Text>
          </View>

          {/* Títulos */}
          <Text style={styles.title}>CALENDARIO ACADÉMICO 2025-2</Text>
          <Text style={styles.monthTitle}>{monthName.toUpperCase()}</Text>

          {/* Calendario */}
          <View style={styles.calendarBox}>
            <View style={styles.weekRow}>
              {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((d) => (
                <Text key={d} style={[styles.dayHeaderCell, styles.dayText]}>
                  {d}
                </Text>
              ))}
            </View>

            {weeks.map((week, i) => (
              <View key={i} style={styles.weekRow}>
                {week.map((day, j) => {
                  const key = day ? makeDateKey(YEAR, MONTH, day) : null;
                  const discount = key ? discountMap[key!] : null;

                  return (
                    <TouchableOpacity
                      key={j}
                      style={[styles.dayCell, discount && styles.dayDiscount]}
                      onPress={() => handleDayPress(day)}
                      activeOpacity={0.7}
                    >
                      <Text style={[styles.dayText, discount && styles.dayDiscountText]}>
                        {day ?? ''}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}
          </View>

          {/* Descuentos */}
          <View style={styles.discountPanel}>
            {selectedDiscount ? (
              <>
                <Text style={styles.discountTitle}>{selectedDiscount.title}</Text>
                <Text style={styles.discountDate}>
                  Fecha:{' '}
                  {new Date(selectedDiscount.dateKey).toLocaleDateString('es-PE', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </Text>
                <Text style={styles.discountDetail}>{selectedDiscount.detail}</Text>
              </>
            ) : (
              <Text style={styles.discountHint}>
                Toca un día marcado en amarillo para ver los descuentos disponibles.
              </Text>
            )}
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#4E342E' },
  container: { flexGrow: 1 },
  page: {
    flex: 1,
    backgroundColor: '#4E342E',
    paddingHorizontal: 12,
    paddingTop: 16,
    paddingBottom: 32,
  },

  header: {
    backgroundColor: '#4CAF50',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerLeft: { flexDirection: 'row', alignItems: 'center' },

  backButton: {
    marginRight: 10,
    padding: 4,
  },

  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  circleText: { color: '#fff', fontWeight: 'bold' },

  code: { color: '#fff', fontWeight: '700', fontSize: 14 },
  welcome: { color: '#fff', fontSize: 12 },

  headerRight: { flexDirection: 'row', alignItems: 'center' },

  helpBar: {
    backgroundColor: '#4CAF50',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 16,
  },
  helpText: { color: '#fff', fontWeight: '600', textAlign: 'right' },

  title: { color: '#fff', textAlign: 'center', fontWeight: 'bold', marginBottom: 4 },
  monthTitle: { color: '#fff', textAlign: 'center', marginBottom: 12, fontSize: 14 },

  calendarBox: { backgroundColor: '#fff', borderRadius: 4, padding: 8 },

  weekRow: { flexDirection: 'row' },

  dayHeaderCell: { flex: 1, paddingVertical: 6, textAlign: 'center', fontWeight: 'bold' },
  dayCell: {
    flex: 1,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ddd',
  },

  dayText: { fontSize: 12 },
  dayDiscount: { backgroundColor: '#FFF59D' },
  dayDiscountText: { fontWeight: 'bold' },

  discountPanel: {
    marginTop: 16,
    backgroundColor: '#FFF3E0',
    borderRadius: 6,
    padding: 12,
  },
  discountTitle: { fontWeight: 'bold', marginBottom: 4 },
  discountDate: { fontSize: 12, marginBottom: 4 },
  discountDetail: { fontSize: 13 },
  discountHint: { fontSize: 13, color: '#555' },
});

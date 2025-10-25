import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useRouter } from 'expo-router';

const Pagos: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pagos</Text>
      <Text>Detalles de pagos aquí.</Text>
      <Button title="Volver" onPress={() => router.push('/')} /> {/* Redirige a Explore.tsx */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default Pagos;

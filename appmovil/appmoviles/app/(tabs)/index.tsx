import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleLogin = () => {
    if (usuario === '202111368' && contrasena === '1234') {
      router.push('/explore'); 
    } else {
      Alert.alert('Error', 'Usuario o contraseña incorrectos');
    }
  };

  return (
    <ImageBackground 
      source={require('../../assets/images/img.jpg')}  // Ruta corregida
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Iniciar Sesión</Text>

        <TextInput
          style={styles.input}
          placeholder="Usuario"
          value={usuario}
          onChangeText={setUsuario}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={contrasena}
          onChangeText={setContrasena}
        />

        <Button title="Ingresar" onPress={handleLogin} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center', // Centra el contenido dentro del background
    alignItems: 'center',     // Centra el contenido dentro del background
  },
  container: {
    width: '80%',
    padding: 20,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Fondo semitransparente
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
});

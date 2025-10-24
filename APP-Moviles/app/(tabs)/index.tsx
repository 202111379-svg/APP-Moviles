import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  ImageBackground, 
  Alert 
} from 'react-native';

export default function LoginScreen() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (usuario === 'admin' && password === '1234') {
      Alert.alert(' Bienvenido', 'Acceso correcto a URP + App');
    } else {
      Alert.alert(' Error', 'Usuario o contraseña incorrectos');
    }
  };

  return (
    <ImageBackground 
      source={require('@/assets/images/img.jpg')} // 👈 coloca aquí tu imagen
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>URP + App</Text>

        <TextInput
          style={styles.input}
          placeholder="usuario"
          placeholderTextColor="#999"
          onChangeText={setUsuario}
          value={usuario}
        />

        <TextInput
          style={styles.input}
          placeholder="contraseña"
          placeholderTextColor="#999"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />

        <TouchableOpacity>
          <Text style={styles.link}>¿Olvidaste Tu Contraseña?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 30,
    borderRadius: 15,
    width: '85%',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    color: 'green',
    fontWeight: 'bold',
    marginBottom: 25,
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  link: {
    color: '#0033cc',
    textDecorationLine: 'underline',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#008000',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

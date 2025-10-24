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
      Alert.alert('Acceso correcto', 'Bienvenido a URP+ App');
    } else {
      Alert.alert('Error', 'Usuario o contraseña incorrectos');
    }
  };

  return (
    <ImageBackground 
      source={require('../../assets/fondoURP.jpg')} 
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>URP + App</Text>

        <TextInput
          style={styles.input}
          placeholder="usuario"
          placeholderTextColor="#666"
          onChangeText={setUsuario}
          value={usuario}
        />

        <TextInput
          style={styles.input}
          placeholder="contraseña"
          placeholderTextColor="#666"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />

        <TouchableOpacity>
          <Text style={styles.forgot}>¿Olvidaste Tu Contraseña?</Text>
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
  },
  container: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    margin: 30,
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    color: 'green',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  forgot: {
    color: 'blue',
    marginBottom: 15,
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

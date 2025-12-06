import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Alert,
  ImageBackground,
} from 'react-native';
import { useRouter } from 'expo-router';

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

import { app } from '../../firebaseConfig';
const auth = getAuth(app);


export default function Index() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<string>('');      
  const [contrasena, setContrasena] = useState<string>(''); 

  const handleLogin = async () => {
    if (!usuario || !contrasena) {
      Alert.alert('Error', 'Ingresa usuario y contraseña');
      return;
    }

    let email = usuario.trim();
    if (!email.includes('@')) {
      email = `${email}@urp.edu.pe`;
    }

    console.log('Intentando login con:', email);

    try {
      await signInWithEmailAndPassword(auth, email, contrasena);
      router.replace('/(tabs)/explore');
    } catch (error: any) {
      console.log('Error login:', error.code, error.message);
      Alert.alert('Error', 'Usuario o contraseña incorrectos');
    }
  };

  const handleRegisterDebug = async () => {
    const email = '202111368@urp.edu.pe';
    const password = 'jesus0311';

    try {
      console.log('Creando usuario de prueba:', email);
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('OK', 'Usuario de prueba creado correctamente en Firebase');
    } catch (error: any) {
      console.log('Error al crear usuario:', error.code, error.message);
      Alert.alert('Error al crear usuario', error.code);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/img.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Iniciar Sesión</Text>

        <TextInput
          style={styles.input}
          placeholder="Usuario (código o correo)"
          value={usuario}
          onChangeText={setUsuario}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={contrasena}
          onChangeText={setContrasena}
        />

        <Button title="Ingresar" onPress={handleLogin} />

        <View style={{ marginTop: 10 }}>
          <Button title="Registrar usuario debug" onPress={handleRegisterDebug} />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: {
    width: '80%',
    padding: 20,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    alignItems: 'center',
  },
  title: { fontSize: 24, marginBottom: 20, fontWeight: 'bold' },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
});

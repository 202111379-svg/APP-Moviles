// app/(tabs)/ayuda.tsx
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type Option = {
  id: string;         // "1", "2", "3"
  title: string;      // texto corto de la opción
  answer: string;     // respuesta del “bot”
};

const OPTIONS: Option[] = [
  {
    id: '1',
    title: 'Problemas con mis notas',
    answer:
      'Si ves una nota incorrecta, primero verifica en el aula virtual o sílabo cómo se calcula. ' +
      'Luego comunícate con tu docente adjuntando evidencia (capturas, tareas enviadas, etc.).',
  },
  {
    id: '2',
    title: 'No puedo ver mi horario',
    answer:
      'Revisa que estés logueado con tu usuario correcto. Si el problema continúa, ' +
      'cierra sesión y vuelve a entrar. Si nada funciona, escribe a Soporte Académico con tu código y captura de pantalla.',
  },
  {
    id: '3',
    title: 'Pagos y estado de deuda',
    answer:
      'Para ver tus pagos pendientes, ingresa a la opción PAGOS en la app o portal. ' +
      'Si aparece un monto extraño, acércate a Caja o envía un correo a Tesorería con tu código y comprobantes.',
  },
];

type Message = {
  from: 'user' | 'bot';
  text: string;
};

export default function AyudaScreen() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      from: 'bot',
      text:
        'Hola 👋 Soy el asistente de ayuda.\n' +
        'Elige una opción:\n' +
        '1) Problemas con mis notas\n' +
        '2) No puedo ver mi horario\n' +
        '3) Pagos y estado de deuda',
    },
  ]);

  const [isBotThinking, setIsBotThinking] = useState(false);

  const handleOptionPress = (option: Option) => {
    // Si ya está “pensando”, no aceptar más toques
    if (isBotThinking) return;

    // Añadimos el mensaje del usuario
    setMessages((prev) => [
      ...prev,
      { from: 'user', text: `Opción ${option.id}: ${option.title}` },
    ]);

    setIsBotThinking(true);

    // Respuesta del bot con retraso de 2 segundos
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: 'bot', text: option.answer },
      ]);
      setIsBotThinking(false);
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* HEADER VERDE SIMILAR A EXPLORE */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.replace('/(tabs)/explore')}
          activeOpacity={0.6}
        >
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Ayuda</Text>

        <View style={{ width: 26 }} />{/* relleno para centrar el título */}
      </View>

      {/* CONTENIDO TIPO CHAT */}
      <View style={styles.body}>
        <ScrollView contentContainerStyle={styles.chatContainer}>
          {messages.map((m, index) => (
            <View
              key={index}
              style={[
                styles.messageBubble,
                m.from === 'user' ? styles.userBubble : styles.botBubble,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  m.from === 'user' ? styles.userText : styles.botText,
                ]}
              >
                {m.text}
              </Text>
            </View>
          ))}

          {/* Opcional: texto de “pensando...” */}
          {isBotThinking && (
            <View style={[styles.messageBubble, styles.botBubble]}>
              <Text style={[styles.messageText, styles.botText]}>
                Escribiendo...
              </Text>
            </View>
          )}
        </ScrollView>

        {/* BOTONES 1, 2, 3 */}
        <View style={styles.optionsContainer}>
          {OPTIONS.map((opt) => (
            <TouchableOpacity
              key={opt.id}
              style={styles.optionButton}
              onPress={() => handleOptionPress(opt)}
              activeOpacity={0.8}
            >
              <Text style={styles.optionNumber}>{opt.id}</Text>
              <Text style={styles.optionText}>{opt.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

/* ================= ESTILOS ================= */

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#4E342E',
  },
  header: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  body: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  chatContainer: {
    paddingBottom: 16,
  },
  messageBubble: {
    maxWidth: '85%',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 8,
  },
  botBubble: {
    backgroundColor: '#ffffff',
    alignSelf: 'flex-start',
  },
  userBubble: {
    backgroundColor: '#4CAF50',
    alignSelf: 'flex-end',
  },
  messageText: {
    fontSize: 13,
  },
  botText: {
    color: '#333',
  },
  userText: {
    color: '#fff',
  },
  optionsContainer: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 8,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    marginBottom: 6,
  },
  optionNumber: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#4CAF50',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 8,
    fontSize: 12,
  },
  optionText: {
    fontSize: 13,
    color: '#333',
    flexShrink: 1,
  },
});

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { firebase } from './config';


const RegistrationScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isValidPassword, setIsValidPassword] = useState(true);
  
  const isPasswordValid = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const registerUser = async (username, password) => {
    

    try {
    
      await firebase.auth().createUserWithEmailAndPassword(username, password);

     // Guardar datos del usuario en Firestore
      await firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set({
        username,
        password,
      });

    } catch (error) {
      alert(error.message);
    }
  };


  const handleRegister = () => {
    const passwordValid = isPasswordValid(password);
    setIsValidPassword(passwordValid);

    if (passwordValid) {
      registerUser(username, password)
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Registro</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresa un correo electronico"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={[styles.input, !isValidPassword && styles.inputError]}
        placeholder="Contraseña segura"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      {!isValidPassword && <Text style={styles.errorText}>La contraseña no cumple con los requisitos
    {'\n'} * 8 Caracteres mínimo
    {'\n'} * Mayúsculas y minúsculas
    {'\n'} * Al menos un número
    {'\n'} * Símbolo o carácter especial.</Text>}
      <Button title="Registrar"onPress={handleRegister} />

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default RegistrationScreen;

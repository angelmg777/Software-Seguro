import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, } from 'react-native';
import { firebase } from './config';
import Icon from 'react-native-vector-icons/FontAwesome';


const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(true);


  const isPasswordValid = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const registerUser = async (email, password) => {
    try {
      
      await firebase.auth().createUserWithEmailAndPassword(email, password);
  

      // Guarda los datos del usuario en Firestore, incluyendo la contraseña encriptada
      await firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set({
         email,
         
      });
  
    } catch (error) {
      alert(error.message);
    }
  };


  const handleRegister = () => {
    const passwordValid = isPasswordValid(password);
    setIsValidPassword(passwordValid);

    if (passwordValid) {
      registerUser(email, password)
    }
  };
  
  


  return (
   
    <View style={styles.container}>
      <Text style={styles.header}>Registro</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresa un correo electronico"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
        <View style={styles.passwordContainer}>

          
  <TextInput
    style={[styles.input, styles.passwordInput, !isValidPassword && styles.inputError]}
    placeholder="Contraseña segura"
    secureTextEntry={!showPassword}
    value={password}
    onChangeText={(text) => setPassword(text)}
  />
  <Icon
    name={showPassword ? 'eye' : 'eye-slash'}
    size={20}
    color="#000"
    style={styles.passwordIcon}
    onPress={() => setShowPassword(!showPassword)}
  />
</View>
          
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
  togglePasswordButton: {
    position: 'absolute',
    top: 10, // Ajusta la posición según tus preferencias
    right: 10, // Ajusta la posición según tus preferencias
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  passwordInput: {
    flex: 1,
    
  },
  passwordIcon: {
    marginLeft: 10,
  },
  
  
});

export default App;

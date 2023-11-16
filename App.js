import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, } from 'react-native';
import { firebase } from './config';
import Icon from 'react-native-vector-icons/FontAwesome';
import cryptoes from "crypto-es";


// Importa las bibliotecas necesarias
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import Main from './Main';
import LogIn from './LogIn';


// Crea la pila de navegación
const Stack = createStackNavigator();

// Define el componente principal de la aplicación
const MainApp = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio Sesion">
        <Stack.Screen name="Registro" component={App} />
        <Stack.Screen name="Exitoso" component={Main} />
        <Stack.Screen name="Inicio Sesion" component={LogIn} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};



const App = ({ navigation }) => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setname] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [loading, setLoading] = useState(false); // Estado de carga





  const isPasswordValid = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const registerUser = async (name, email, password) => {

    var CryptoJS = require("crypto-js");
    var clave = "agmg";
    var passwordEncryp = CryptoJS.AES.encrypt(password, clave).toString();

    try {
      setLoading(true); // Activa la carga
      await firebase.auth().createUserWithEmailAndPassword(email, password);

      await firebase.auth().currentUser.sendEmailVerification({
        handleCodeInApp: true,
        url: 'https://desarrollo-de-software-s-62291.firebaseapp.com',
        
      });

      Alert.alert(
        'Verificación enviada',
        'Se envió la verificación a tu correo, complétala para continuar!'
      );

      await firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set({
         name,
         email,
         password,
         passwordEncryp,
  
      });
    
    } catch (error) {
      alert(error.message);
    }
  };


  const handleRegister = () => {
    const passwordValid = isPasswordValid(password);
    setIsValidPassword(passwordValid);

    if (passwordValid) {
      registerUser(name, email, password)
      navigation.navigate('Inicio Sesion'); // Navega a la pantalla de éxito
    }
  };
  
  


  return (
   
    <View style={styles.container}>
      <Text style={styles.header}>Registro</Text>

      <TextInput
        style={styles.input}
        placeholder="Ingresa tu nombre"
        value={name}
        onChangeText={(text) => setname(text)}
      />      <TextInput
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
      

      <TouchableOpacity style={{ marginTop: 20 }} onPress={() => navigation.navigate('Inicio Sesion')}>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>¿Ya tienes cuenta? Inicia ahora.</Text>
      </TouchableOpacity>

      
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

export default MainApp;

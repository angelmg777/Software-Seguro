import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert,} from 'react-native';
import { firebase } from './config';
import Icon from 'react-native-vector-icons/FontAwesome';
import cryptoes from "crypto-es";


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import Main from './Main';
import App from './App'


const LogIn = ({ navigation }) => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);


  const Stack = createStackNavigator();


  const loginUser = async (email, password) => {
    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      const user = userCredential.user;

      if (user.emailVerified) {

        navigation.navigate('Exitoso')

      } else {
        Alert.alert(
          'Correo electrónico no verificado',
          'Por favor, verifica tu correo electrónico para poder iniciar sesión.'
        );

        console.log('Correo electrónico no verificado',
        'Por favor, verifica tu correo electrónico para poder iniciar sesión.');
      }
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        Alert.alert('Usuario no encontrado', 'No existe un usuario con ese correo electrónico.');
      } else if (error.code === 'auth/wrong-password') {
        Alert.alert('Credenciales incorrectas', 'La contraseña proporcionada es incorrecta. Verifica tu correo y contraseña.');
      } else {
        Alert.alert('Error', 'Ocurrió un error al iniciar sesión: ' + error.message);
      }
    }
  };

  return (
   
    <View style={styles.container}>
      <Text style={styles.header}>Inicia Sesion</Text>

      <TextInput
        style={styles.input}
        placeholder="Ingresa un correo electronico"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

        <View style={styles.passwordContainer}>

          
  <TextInput
    style={[styles.input, styles.passwordInput, ]}
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

      <Button title="Inicia sesion" onPress={() => loginUser(email, password)} />
      

      <TouchableOpacity style={{ marginTop: 20 }} onPress={() => navigation.navigate('Registro')}>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>¿No tienes cuenta? Registrate ahora.</Text>
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

export default LogIn;

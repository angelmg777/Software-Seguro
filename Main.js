import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Main = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>¡Registro exitoso!</Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default Main;

import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function SplashPage( {navigation} ) {
  useEffect(() => {
    // Aqui você pode adicionar sua lógica de carregamento
    // Por exemplo, você pode redirecionar o usuário para a página de login após alguns segundos.
    setTimeout(() => {
      console.log('Redirecionando para a página de login...');
    }, 2000);
  }, []);

  
  const handleButtonClick = () => {
    navigation.navigate("Login", {language: "pt"});
  }

  return (
    <View style={styles.container}>
      <Image 
        style={styles.logo}
        source={{uri: 'https://cdn-icons-png.flaticon.com/512/9937/9937519.png'}}
      />
      <Text style={styles.title}>Ping Pong Resi</Text>
      <TouchableOpacity 
        style={styles.button}
        onPress={handleButtonClick}
      >
        <Text style={styles.buttonText}>Iniciar Sessão</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  buttonText: {
    color: '#4682B4',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 30,
    textAlign: 'left',
  },
  
});

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Alert,View, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SplashPage( {navigation} ) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState('');
  const [isLoading,setIsLoading] = useState(false)

  const showAlert = (titulo, mensagem) => {
    Alert.alert(
      titulo,
      mensagem,
      [
        {
          text: 'OK',
          onPress: () => setVisible(false),
        },
      ]
    );
  };

  useEffect(() => {
    
    const fetchRememberedCredentials = async () => {
      const username = await AsyncStorage.getItem('remembered_username');
      const password = await AsyncStorage.getItem('remembered_password');
      console.log(username)
      setUsername(username ?? '');
      setPassword(password ?? '');
      if (username != null){
        handleLogin();
      }else{
        setIsLoading(true)
      }
    }
  
    fetchRememberedCredentials();

  }, []);

  const handleLogin = async () => {
    try {
      const username = await AsyncStorage.getItem('remembered_username');
      const password = await AsyncStorage.getItem('remembered_password');
      const response = await fetch('http://rafaelr2001.pythonanywhere.com/auth/' + username + '/' + password, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (response.status === 404) {
        showAlert('Acesso Negado', 'Utilizador não encontrado');
      } else if (response.status === 401) {
        showAlert('Acesso Negado', 'Credenciais inválidas');
      } else {
        const data = await response.json();
        if (data !== null) {
          await AsyncStorage.setItem('user_id', ''+data.id);
          await AsyncStorage.setItem('logged_id', ''+data.id);
          await AsyncStorage.setItem('user_name', ''+data.name);
          await AsyncStorage.setItem('logged_name', ''+data.name);
          await AsyncStorage.setItem('logged_username', username);
          navigation.navigate("Menu");
        }
      }
  
    } catch (error) {
      console.error(error);
    }

    // navigation.navigate("Menu");

  }
  
  const handleButtonClick = () => {
    navigation.navigate("Login", {language: "pt"});
  }
  
  return ( isLoading ?(
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
  ):
  <></>
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

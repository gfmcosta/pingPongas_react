import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Alert,StyleSheet, Switch ,Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function LoginPage({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [visible, setVisible] = useState(false);

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

  const handleLogin = async () => {
    try {
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

          if (rememberMe) {
            await AsyncStorage.setItem('remembered_username', username);
            await AsyncStorage.setItem('remembered_password', password);
          }    
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
    navigation.navigate("Register");
  }

  return (
    <View style={styles.container}>
      <Image 
        style={styles.logo}
        source={{uri: 'https://cdn-icons-png.flaticon.com/512/2010/2010482.png'}}
      />
      <Text style={styles.title}>Iniciar Sessão</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Utilizador"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput 
        style={styles.input} 
        placeholder="Senha"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <Text style={{ marginRight: 10 }}>Manter sessão iniciada?</Text>
        <Switch
          value={rememberMe}
          onValueChange={setRememberMe}
        />
      </View>

      <TouchableOpacity 
        style={styles.button}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button1}
        onPress={handleButtonClick}
      >
        <Text style={styles.buttonText2}>Ainda não tens conta?</Text>
      </TouchableOpacity>
      <StatusBar style='auto'/>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#f4511e',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonText2: {
    color: '#4682B4',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 30,
    textAlign: 'left',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
});
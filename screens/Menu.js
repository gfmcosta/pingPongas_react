import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Alert, View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, BackHandler } from 'react-native';
import axios from 'axios';
import { Buffer } from 'buffer';

export default function Menu({navigation}) {

  useEffect(() => {
    const backButtonHandler = () => {
      navigation.navigate("Menu");
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backButtonHandler
    );
    return () => backHandler.remove();
  }, []);
  
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
  const logOutButton = async() => {
    await AsyncStorage.removeItem('remembered_username')
    await AsyncStorage.removeItem('remembered_password')
    navigation.navigate("Login");
  }

  const matchButton = async() => {
    let id = await AsyncStorage.getItem('logged_id');
    const response_photo = await fetch('http://rafaelr2001.pythonanywhere.com/foto/' + id + '/nao_interessa_a_ninguem',{
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data_photo = await response_photo.json();
    await AsyncStorage.setItem('imagem', ''+ data_photo.image);
    let user_id = await AsyncStorage.getItem('logged_id');
    await AsyncStorage.setItem('logged_id', ''+ user_id);
    navigation.navigate("addMatch");
  }
    const rankingButton = async() => {
        const response = await fetch('http://rafaelr2001.pythonanywhere.com/stats/nao_interessa_a_ninguem');
        const jsonData = await response.json();
        await AsyncStorage.setItem('stats', ''+ JSON.stringify(jsonData));
        navigation.navigate("Ranking");
      }
      const historyButton = async() => {
        const response = await fetch('http://rafaelr2001.pythonanywhere.com/matches/nao_interessa_a_ninguem');
        const jsonData = await response.json();
        await AsyncStorage.setItem('matches', ''+ JSON.stringify(jsonData));
        navigation.navigate("matchHistory");
      }
    const profileButton = async() => {
      try {
        let user_id = await AsyncStorage.getItem('logged_id');
        let user_name = await AsyncStorage.getItem('logged_name');
        await AsyncStorage.setItem('user_name', ''+user_name);
        const response = await fetch('http://rafaelr2001.pythonanywhere.com/stats/' + user_id + '/nao_interessa_a_ninguem',{
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        if (response.status === 404) {
          showAlert('Erro', 'Perfil indisponível');
        } else if (response.status === 200) {
          const data = await response.json();
          await AsyncStorage.setItem('score', ''+data.score);
          await AsyncStorage.setItem('bestScore', ''+data.bestScore);
          await AsyncStorage.setItem('gamesPlayed', ''+data.gamesPlayed);
          await AsyncStorage.setItem('gamesWon', ''+data.gamesWon);
          await AsyncStorage.setItem('victoryChance', ''+data.victoryChance);
          await AsyncStorage.setItem('winStreak', ''+data.winStreak);
          await AsyncStorage.setItem('bestWinStreak', ''+data.bestWinStreak);
          
          const response_photo = await fetch('http://rafaelr2001.pythonanywhere.com/foto/' + user_id + '/nao_interessa_a_ninguem',{
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          });
          const data_photo = await response_photo.json();
          await AsyncStorage.setItem('imagem', ''+data_photo.image);
          await AsyncStorage.setItem('another_id', ''+ user_id);
          navigation.navigate("Profile");
        } 
    
      } catch (error) {
        console.error(error);
      }
    }
    
    

  return (
    <SafeAreaView style={[styles.container, { paddingTop: 0 }]}>
    <StatusBar backgroundColor="#f4511e" barStyle="dark-content"/>
      <View style={styles.header}>
        <Text style={styles.headerText}>Menu</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}
        onPress={matchButton}>
            <Text style={styles.buttonText}>Adicionar Partida</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
        onPress={rankingButton}>
            <Text style={styles.buttonText}>Ranking</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
        onPress={historyButton}>
            <Text style={styles.buttonText}>Histórico</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
        onPress={profileButton}>
            <Text style={styles.buttonText}>Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
        onPress={logOutButton}>
            <Text style={styles.buttonText}>Terminar Sessão</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: '#f4511e',
    width: '100%',

  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
  },
  buttonsContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  button: {
    backgroundColor: '#778899',
    width: '100%',
    height: '17%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  
});

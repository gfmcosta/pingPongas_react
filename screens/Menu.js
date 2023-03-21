import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { Alert, View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import axios from 'axios';
import { Buffer } from 'buffer';

export default function Menu({navigation}) {
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
  const matchButton = async() => {
    let user_id = await AsyncStorage.getItem('logged_id');
    await AsyncStorage.setItem('logged_id', ''+ user_id);
    navigation.navigate("addMatch");
  }
    const rankingButton = () => {
        navigation.navigate("Ranking");
      }
    const profileButton = async() => {
      try {
        let user_id = await AsyncStorage.getItem('logged_id');
        let user_name = await AsyncStorage.getItem('logged_name');
        await AsyncStorage.setItem('user_name', ''+user_name);
        console.log(user_id);
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
          
          axios.get('http://rafaelr2001.pythonanywhere.com/foto/'+ user_id + '/nao_interessa_a_ninguem')
            .then(async response => {
              const photoData = response.data;
              const base64EncodedPhotoData = Buffer.from(photoData).toString('base64');
              
              // console.log(base64EncodedPhotoData);

              // const base64EncodedPhotoData = btoa(String.fromCharCode.apply(null, photoData));
              
              await AsyncStorage.setItem('imagem', ''+base64EncodedPhotoData);
            })
            .catch(error => {
              console.log(error);
            });
            
          navigation.navigate("Profile");
        } 
    
      } catch (error) {
        console.error(error);
      }
    }
  return (
    <SafeAreaView style={[styles.container, { paddingTop: StatusBar.currentHeight }]}>
    <StatusBar backgroundColor="#f4511e" barStyle="dark-content" />
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
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Histórico</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
        onPress={profileButton}>
            <Text style={styles.buttonText}>Perfil</Text>
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
    height: '20%',
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

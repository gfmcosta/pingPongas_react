import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet, Image, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export default function ProfilePage({navigation}) {
  const [loggedId, setLoggedId] = useState('');
  const [anotherId, setAnotherId] = useState('');
  const [name, setName] = useState('');
  const [imagem, setImagem] = useState(null);
  const [score, setScore] = useState('');
  const [bestScore, setBestScore] = useState('');
  const [numGamesPlayed, setNumGamesPlayed] = useState('');
  const [numGamesWon, setNumGamesWon] = useState('');
  const [bestWinStreak, setBestWinStreak] = useState('');
  const [winStreak, setWinStreak] = useState('');
  const [winPercentage, setWinPercentage] = useState('');
  const [selectedImageR, setSelectedImageR] = useState(null);
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

  async function enviarImagem() {
    let resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    
    let id = await AsyncStorage.getItem('logged_id');
    if (resultado.assets != null) {
      let formData = new FormData();
      formData.append('imagem', {
        uri: resultado.uri,
        name: id + '.jpg',
        type: 'image/jpg',
      });

      console.log(id);
      axios.post('http://rafaelr2001.pythonanywhere.com/upload/' + id + '/nao_interessa_a_ninguem', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        
      })
      .catch(error => {
        console.log(error);
      });
      showAlert('Sucesso', 'Imagem alterada com sucesso');
      navigation.navigate("Menu");
    }
  }
  

  const getUserData = async () => {
    try {
      setLoggedId(await AsyncStorage.getItem('logged_id'));
      setAnotherId(await AsyncStorage.getItem('another_id'));
      setName(await AsyncStorage.getItem('user_name'));
      setScore(await AsyncStorage.getItem('score'));
      setBestScore(await AsyncStorage.getItem('bestScore'));
      setNumGamesPlayed(await AsyncStorage.getItem('gamesPlayed'));
      setNumGamesWon(await AsyncStorage.getItem('gamesWon'));
      setBestWinStreak(await AsyncStorage.getItem('bestWinStreak'));
      setWinStreak(await AsyncStorage.getItem('winStreak'));
      setWinPercentage(await AsyncStorage.getItem('victoryChance'));
      setImagem(await AsyncStorage.getItem('imagem'));
      
      // console.log(imagem);
      
      // const photoUri = `data:image/jpeg;base64,${imagem}`;
      // setImagem(photoUri)
      //console.log(`data:image/jpeg;base64,${imagem}`);

    } catch (error) {
      console.error(error);
    }
  }
  getUserData();

  return(
    <SafeAreaView style={[styles.container, { paddingTop: StatusBar.currentHeight }]}>
    <StatusBar backgroundColor="#f4511e" barStyle="dark-content" />
      <Image
        style={styles.avatar}
        source={{ uri: `data:image/jpeg;base64,${imagem}` }}
      />

      {loggedId === anotherId ? (
        <TouchableOpacity onPress={enviarImagem}>
          <Text style={styles.changeImage}>Change Image</Text>
        </TouchableOpacity>
      ) : null}

      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.score}>Pontuação: {score} pts</Text>
        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Melhor Pontuação</Text>
            <Text style={styles.statValue}>{bestScore} pts</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Partidas disputadas</Text>
            <Text style={styles.statValue}>{numGamesPlayed}</Text>
          </View>
          <View style={[styles.stat, winPercentage >50 ? styles.statG : null]}>
            <Text style={[styles.statLabel, winPercentage >50 ? styles.statLabelG : null]}>% de Vitória</Text>
            <Text style={styles.statValue}>{winPercentage}%</Text>

          </View>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Partidas ganhas</Text>
            <Text style={styles.statValue}>{winPercentage}</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Win Streak</Text>
            <Text style={styles.statValue}>{winStreak}</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Melhor Win Streak</Text>
            <Text style={styles.statValue}>{bestWinStreak}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  changeImage: {
    fontSize: 16,
    textAlign: 'center',
    color: '#f4511e',
    marginBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 24,
    alignSelf: 'center',
    marginTop: 20,
  },
  infoContainer: {
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  score: {
    fontSize: 16,
    color: '#9E9E9E',
    marginBottom: 16,
  },
  stats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
  },
  stat: {
    width: '48%',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  statG: {
    width: '48%',
    backgroundColor: '#98FB98',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  statLabel: {
    fontSize: 14,
    color: '#9E9E9E',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
});

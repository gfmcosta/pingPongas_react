import React, { useState, useEffect } from 'react';
import { View, Image, Text, StatusBar, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HistoricoPartidas({ navigation }) {
  const [filtroJogador, setFiltroJogador] = useState(null);
  const [partidas, setPartidas] = useState([]);
  const [username, setUsername] = useState('');

  const handleButtonClick = async(user_id,name) => {
    try {
      await AsyncStorage.setItem('user_id', ''+user_id);
      await AsyncStorage.setItem('user_name', ''+ name);
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
      } 
  
      const response_photo = await fetch('http://rafaelr2001.pythonanywhere.com/foto/' + user_id + '/nao_interessa_a_ninguem',{
        method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
      });
      
      const data_photo = await response_photo.json();
      await AsyncStorage.setItem('imagem', ''+data_photo.photo_data);
      await AsyncStorage.setItem('another_id', ''+ user_id);
  
      navigation.navigate("Profile");
    } catch (error) {
      console.error(error);
    }
  }

  const fetchData = async () => {
    // const response = await fetch('http://rafaelr2001.pythonanywhere.com/matches/nao_interessa_a_ninguem');
    // const jsonData = await response.json();
    const user = await AsyncStorage.getItem('logged_username');
    const matches = JSON.parse(await AsyncStorage.getItem('matches'));
    setUsername(user);
    setPartidas(matches);
    console.log(matches)
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  const partidasFiltradas = filtroJogador
    ? partidas.filter((p) => p.vencedor == filtroJogador.username || p.perdedor == filtroJogador.username)
    : partidas;


    const renderItem = ({ item }) => (
      <View style={styles.itemContainer}>
        <View style={styles.imageContainer}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.itemTextLegend}>Vencedor</Text>
            <TouchableOpacity onPress={() => handleButtonClick(item.vencedor_id,item.vencedor)}>
              <Image source={{uri: `data:image/jpeg;base64,${item.vencedor_image}`}} style={styles.image}/>
            </TouchableOpacity>
            <Text style={styles.itemTextVName}>{item.vencedor}</Text>
            <Text style={styles.itemTextV}>{item.scoreVencedor}</Text>
          </View>
          <Text style={styles.vsText}>V.S.</Text>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.itemTextLegend}>Perdedor</Text>
            <TouchableOpacity onPress={() => handleButtonClick(item.perdedor_id,item.perdedor)}>
              <Image source={{uri: `data:image/jpeg;base64,${item.perdedor_image}`}} style={styles.image} />
            </TouchableOpacity>
            <Text style={styles.itemTextPName}>{item.perdedor}</Text>
            <Text style={styles.itemTextP}>{item.scorePerdedor}</Text>
          </View>
        </View>
      </View>
    );
    
    

  return (
    <SafeAreaView style={[styles.container, { paddingTop: StatusBar.currentHeight }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setFiltroJogador(null)}>
          <Text style={[styles.headerText, filtroJogador === null && styles.headerTextSelected]}>
            Histórico Geral
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFiltroJogador({username})}>
          <Text style={[styles.headerText, filtroJogador != null && styles.headerTextSelected]}>
            Meu Histórico
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={partidasFiltradas}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f4511e',
    textAlign: 'center',
    paddingVertical: 20,
    width: '100%',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#333',
  },
  headerTextSelected: {
    color: '#FFFFFF',
    textDecorationLine: 'underline'
  },
  listContainer: {
    paddingVertical: 16,
    paddingHorizontal: 0,
  },
  itemContainer: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemTextV: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#008000',
  },
  itemTextP: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF0000'
  },
  itemTextVName: {
    color: '#000000',
    fontSize: 15,
    marginTop: 3,
  },
  itemTextP: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF0000'
  },
  // imageContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'space-\\evenly',
  //   marginVertical: 10
  // },
  image: {
    width: 75,
    height: 75,
    borderRadius: 50
  },
  vsText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 10,
    color: '#ffc40b'
  },
  labelContainer: {
    position: 'absolute',
    top: 5,
    left: 5,
    backgroundColor: '#008000',
    paddingHorizontal: 0,
    borderRadius: 5,
  },
  labelText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  imageContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginVertical: 10,
  },
  itemTextLegend: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  itemTextPName: {
    color: '#000000',
    fontSize: 15,
    marginTop: 3,
  },  
});
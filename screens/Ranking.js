import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, StatusBar, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RankingPage({navigation}) {

  const [data, setData] = useState([]);
const fetchData = async () => {
  const response = await fetch('http://rafaelr2001.pythonanywhere.com/stats/nao_interessa_a_ninguem');
  const jsonData = await response.json();
  console.log(jsonData);
  setData(jsonData);
  data.sort((a, b) => b.score - a.score);
};

useEffect(() => {
  fetchData();
}, []);

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
        <Image
          style={styles.logo}
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2889/2889672.png' }}
        />
        
        <Text style={styles.title}>Ranking</Text>
        <View style={{ width: 32 }} />
      </View>
          <ScrollView style={styles.content}>
              {data.map((data,index) => (
                <TouchableOpacity 
                key={index}
                onPress={() => handleButtonClick(data.user_id,data.name)}
                >
                <View key={index} style={[styles.item, index+1 === 1 ? styles.itemG : index+1 === 2 ? styles.itemS : index+1 === 3 ? styles.itemB : null]}>
                    <Text style={styles.position}>{index+1}</Text>
                    <Text style={styles.name}>{data.user_name}</Text>
                    <Text style={styles.score}>{data.score}</Text>
                </View>
              </TouchableOpacity>
              ))}
          </ScrollView>
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
    alignItems: 'center',
    backgroundColor: '#f4511e',
    padding: 16,
    justifyContent: 'center',

  },
  logo: {
    width: 32,
    height: 32,
    marginRight: 8,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 8,
  },
  itemG: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#ffc800',
    padding: 16,
    borderRadius: 8,
  },
  itemS: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#C0C0C0',
    padding: 16,
    borderRadius: 8,
  },
  itemB: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#CD7F32',
    padding: 16,
    borderRadius: 8,
  },
  position: {
    color: '#9E9E9E',
    fontSize: 16,
    marginRight: 16,
  },
  name: {
    flex: 1,
    color: '#212121',
    fontSize: 16,
    marginRight: 16,
  },
  score: {
    // color: '#2196F3',
    color: '#000000',
    fontSize: 16,
  },
});

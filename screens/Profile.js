import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfilePage({navigation}) {
  const [name, setName] = useState('');
  const [score, setScore] = useState('');
  const [bestScore, setBestScore] = useState('');
  const [numGamesPlayed, setNumGamesPlayed] = useState('');
  const [numGamesWon, setNumGamesWon] = useState('');
  const [bestWinStreak, setBestWinStreak] = useState('');
  const [winStreak, setWinStreak] = useState('');
  const [winPercentage, setWinPercentage] = useState('');

  const getUserData = async () => {
    try {
      setName(await AsyncStorage.getItem('user_name'));
      setScore(await AsyncStorage.getItem('score'));
      setBestScore(await AsyncStorage.getItem('bestScore'));
      setNumGamesPlayed(await AsyncStorage.getItem('gamesPlayed'));
      setNumGamesWon(await AsyncStorage.getItem('gamesWon'));
      setBestWinStreak(await AsyncStorage.getItem('bestWinStreak'));
      setWinStreak(await AsyncStorage.getItem('winStreak'));
      setWinPercentage(await AsyncStorage.getItem('victoryChance')); 
      console.log("name:",name);

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
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2112/2112172.png' }}
      />
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

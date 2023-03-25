import React, { useState, useEffect } from 'react';
import { View, Image, Text, StatusBar, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HistoricoPartidas({ navigation }) {
  const [filtroJogador, setFiltroJogador] = useState(null);
  const [partidas, setPartidas] = useState([]);
  const [username, setUsername] = useState('');

  const handleButtonClick = async(user_id,name) => {
    try {
        
    } catch (error) {
      console.error(error);
    }
  }

  const fetchData = async () => {
    
  };
  
  useEffect(() => {
    fetchData();
  }, []);

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
          <Text style={styles.headerText}>
            Nova Partida
          </Text>
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
    justifyContent: 'center',
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
    color: 'white',
    textAlign: 'center'
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
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, SafeAreaView, StatusBar, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CreateMatch3({ navigation }) {
const [player1, setplayer1] = useState('');
const [player2, setplayer2] = useState('');
const [player1Points, setplayer1Points] = useState('');
const [player2Points, setplayer2Points] = useState('');
const [player1Imagem, setplayer1Imagem] = useState('');
const [player2Imagem, setplayer2Imagem] = useState('');
const [vencedorPoints, setVencedorPoints] = useState('');
const [perdedorPoints, setPerdedorPoints] = useState('');
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

const fetchData = async () => {
  setplayer1Imagem(await AsyncStorage.getItem('imagem'));
  setplayer2Imagem(await AsyncStorage.getItem('vs_image'));
  setplayer1(await AsyncStorage.getItem('logged_username'));
  setplayer2(await AsyncStorage.getItem('vs_username'));
};

useEffect(() => {
  fetchData();
}, []);

const handleAddGame = async() => {
    // Lógica para adicionar a partida ao sistema
    const data = { player1_username: player1, player2_username: player2, player1_points: player1Points, player2_points: player2Points};
    const response = await fetch('http://rafaelr2001.pythonanywhere.com/matches/nao_interessa_a_ninguem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      //
      body: JSON.stringify(data)
    });
    if (response.status === 201) {
      //showAlert("Sucesso", "Sucesso");
      navigation.navigate("Menu");
    }
    else if(response.status === 402){
      showAlert("Erro", "A partida não pode terminar em empate");
    }
    else{
      showAlert("Erro", "Resultado inválido");
    }
};

return (
<SafeAreaView style={[styles.container, { paddingTop: StatusBar.currentHeight }]}>
<StatusBar backgroundColor="#f4511e" barStyle="dark-content" />
<View style={styles.header}>
  <Text style={styles.headerText}>Partida</Text>
</View>
<View style={styles.formContainer}>
<View style={styles.inputContainer}>
<Image source={{uri: 'https://rafaelr2001.pythonanywhere.com/images/'+player1Imagem}} style={styles.inputImage} />
<Text
style={styles.soTexto}
>{player1}</Text>
<TextInput
style={styles.input}
placeholder="Pontos"
onChangeText={text => setplayer1Points(text)}
value={player1Points}
/>
</View>
<View style={styles.inputSeparator} />
<View style={styles.inputContainer}>
<Image source={{uri: 'https://rafaelr2001.pythonanywhere.com/images/'+player2Imagem}} style={styles.inputImage} />
<Text
style={styles.soTexto}
>{player2}</Text>
<TextInput
style={styles.input}
placeholder="Pontos"
onChangeText={text => setplayer2Points(text)}
value={player2Points}
/>
</View>
</View>
<TouchableOpacity style={styles.addButton} onPress={handleAddGame}>
    <Text style={styles.addButtonText}>Adicionar Partida</Text>
</TouchableOpacity>
</SafeAreaView>
);
};
const styles = StyleSheet.create({
  container: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: '#fff',
  },
  formContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  },
  inputContainer: {
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#fff',
  borderRadius: 5,
  shadowColor: "#000",
  shadowOffset: {
  width: 0,
  height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
  padding: 20,
  },
  inputSeparator: {
  marginHorizontal: 20,
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
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
  },
  inputImage: {
  width: 50,
  height: 50,
  marginRight: 10,
  borderRadius : 50,
  marginBottom: 15,
  },
  input: {
  width: 150,
  height: 40,
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 5,
  paddingHorizontal: 10,
  marginBottom: 10,
  },
  soTexto: {
    width: 150,
    height: 40,
    paddingHorizontal: 10,
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    },
  addButton: {
  backgroundColor: '#f4511e',
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 5,
  marginTop: 20,
  },
  addButtonText: {
  color: '#fff',
  fontSize: 18,
  fontWeight: 'bold',
  },
  });
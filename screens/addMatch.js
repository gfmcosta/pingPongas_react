import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect} from 'react';
import { View, TextInput, Image, TouchableOpacity, SafeAreaView, StyleSheet, Text, StatusBar } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NumericInput from 'react-native-numeric-input'

export default function CreateMatch({ navigation }) {

  const [winnerId, setWinnerId] = useState('');
  const [loserId, setLoserId] = useState('');
  const [winnerPoints, setWinnerPoints] = useState('');
  const [loserPoints, setLoserPoints] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [searchText, setSearchText] = useState('');
  const [imagem, setImagem] = useState('');
  const [vsUsername, setVsUsername] = useState('');

  const countries = ["Egypt", "Canada", "Australia", "Ireland"]
  const [users, setUsers] = useState([]);
  const fetchData = async () => {
    // const response = await fetch('http://rafaelr2001.pythonanywhere.com/users/nao_interessa_a_ninguem');
    const response = await fetch('http://rafaelr2001.pythonanywhere.com/fotos/nao_interessa_a_ninguem');
    const jsonData = await response.json();
    let user_id = await AsyncStorage.getItem('logged_id');
    //console.log(jsonData);
    const data = jsonData.filter(user => user.id !== parseInt(user_id));
    console.log(data);
    setUsers(data);
    setImagem(await AsyncStorage.getItem('imagem'));
  };
  
  useEffect(() => {
    fetchData();
  }, []);
  
  const createMatch = async() => {
    // add logic to create match here
    const response_photo = await fetch('http://rafaelr2001.pythonanywhere.com/fotos/nao_interessa_a_ninguem',{
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });
    const data_photo = await response_photo.json();

    const filteredData = data_photo.filter((item) => {
        return item.username === vsUsername;
    });
    
    filteredData.forEach(async(item) => {
        const imageData = item.image_data;
        await AsyncStorage.setItem('vs_image', imageData);
    });
    // console.log(filteredData.image_data);
    await AsyncStorage.setItem('vs_username', vsUsername);
    navigation.navigate("addMatch3");
  };
  
  return (
    <SafeAreaView style={[styles.container, { paddingTop: StatusBar.currentHeight }]}>
      <StatusBar backgroundColor="#f4511e" barStyle="dark-content" />

      <View style={styles.imageContainer}>
        <Image style={styles.logo} source={{ uri: 'https://media.baamboozle.com/uploads/images/46796/1596490426_373473' }} />
      </View>
      <SelectDropdown
        data={users.map((item,index) => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={{ uri: `data:image/jpeg;base64,${item.image_data}` }}
              style={{ width: 40, height: 40, borderRadius: 75, marginRight: 10 }}
            />
            <Text>{item.username}</Text>
            </View>
          ))
        }
        // defaultValueByIndex={1}
        // defaultValue={'Egypt'}
        onSelect={(selectedItem, index) => {
          setVsUsername(React.Children.toArray(selectedItem.props.children).find(child => child.type === Text).props.children);
          setWinnerPoints;
        }}
        defaultButtonText={'Selecionar adversário'}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem;
        }}  
        rowTextForSelection={(item, index) => {
          console.log(item);
          return item;
        }}
        buttonStyle={styles.dropdown1BtnStyle}
        buttonTextStyle={styles.dropdown1BtnTxtStyle}
        renderDropdownIcon={isOpened => {
          return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
        }}
        dropdownIconPosition={'right'}
        dropdownStyle={styles.dropdown1DropdownStyle}
        rowStyle={styles.dropdown1RowStyle}
        rowTextStyle={styles.dropdown1RowTxtStyle}
        selectedRowStyle={styles.dropdown1SelectedRowStyle}
        renderSearchInputLeftIcon={() => {
          return <FontAwesome name={'search'} color={'#444'} size={18} />;
        }}
      />

      {/* <NumericInput 
        onLimitReached={(isMax,msg) => console.log(isMax,msg)}
        totalWidth={240} 
        totalHeight={50} 
        iconSize={25}
        step={1}
        valueType='integer'
        rounded 
        textColor='#6E6E6E' 
        iconStyle={{ color: 'white' }} 
        rightButtonBackgroundColor='#c7c7c7' 
        leftButtonBackgroundColor='#c7c7c7'
        minValue={0}
      />

      <SelectDropdown
        data={users.map((data,index) => (
            data.name
          ))
        }
        
        // defaultValueByIndex={1}
        // defaultValue={'Egypt'}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
          setWinnerId(index);
        }}
        
        defaultButtonText={'Select loser'}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          return item;
        }}
        buttonStyle={styles.dropdown1BtnStyle}
        buttonTextStyle={styles.dropdown1BtnTxtStyle}
        renderDropdownIcon={isOpened => {
          return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
        }}
        dropdownIconPosition={'right'}
        dropdownStyle={styles.dropdown1DropdownStyle}
        rowStyle={styles.dropdown1RowStyle}
        rowTextStyle={styles.dropdown1RowTxtStyle}
        selectedRowStyle={styles.dropdown1SelectedRowStyle}
        renderSearchInputLeftIcon={() => {
          return <FontAwesome name={'search'} color={'#444'} size={18} />;
        }}
      />
      
      <NumericInput
        onLimitReached={(isMax,msg) => console.log(isMax,msg)}
        totalWidth={240} 
        totalHeight={50} 
        iconSize={25}
        step={1}
        valueType='integer'
        rounded 
        textColor='#6E6E6E' 
        iconStyle={{ color: 'white' }} 
        rightButtonBackgroundColor='#c7c7c7' 
        leftButtonBackgroundColor='#c7c7c7'
        minValue={0}
      /> */}

      {/* <TextInput
        keyboardType="numeric"
        style={styles.input}
        placeholderTextColor= '#6E6E6E'
        placeholder="Pontos do Vencedor"
        value={winnerPoints}
        onChangeText={setWinnerPoints}
      />
      <TextInput
        keyboardType="numeric"
        style={styles.input}
        placeholderTextColor= '#6E6E6E'
        placeholder="Pontos do Perdedor"
        value={loserPoints}
        onChangeText={setLoserPoints}
      /> */}
      <TouchableOpacity
        style={styles.button}
        onPress={createMatch}
      >
        <Text style={styles.buttonText}>Nova Partida</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dropdown1BtnStyle: {
    width: '100%',
    height: 70,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#c7c7c7',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginTop: 16,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },

  dropdown1BtnTxtStyle: {
    textAlign: 'left',
    fontSize: 16,
    fontWeight: '500',
    color: '#6E6E6E',
  },


  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 16,
    width: '100%',
  },

  dropdown1DropdownStyle: {
    //height: 300,
    backgroundColor: '#EFEFEF',
  },

  header: {
    padding: 16,
    backgroundColor: '#f4511e',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },

  dropdown1RowStyle: {
    backgroundColor: '#EFEFEF',
    borderBottomColor: '#C5C5C5',
  },

  dropdown1RowTxtStyle: {
    color: '#C5C5C5',
    textAlign: 'left',
    fontSize: 16,
    fontWeight: '500',
    color: '#6E6E6E'
  },

  dropdown1SelectedRowStyle: {
    backgroundColor: 'rgba(0,0,0,0.1)',
  },

  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    width: '100%',
    height: 250,
    marginTop: 60,
  },
  input: {
    borderWidth: 1,
    borderColor: '#c7c7c7',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginBottom: 16,
    fontSize: 16,
    fontWeight: '500',
  },
  button: {
    height: 50,
    backgroundColor: '#f4511e',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
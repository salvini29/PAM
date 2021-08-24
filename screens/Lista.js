import React, { useState,useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

var widtht = Dimensions.get('window').width; //full width
var heightt = Dimensions.get('window').height; //full height

export default function Lista () {

    const [productosData, setproductosData] = useState([]);
    const [borrarpar, setBorrarpar] = useState('');


    /*function cuandoClick(){
      //
      console.log("hola");
    
    };*/
    const cuandoClick = () => {
      //console.log("hola");
    }

    async function botonTocado(){

      try {
        await AsyncStorage.removeItem(borrarpar);
        const keys = await AsyncStorage.getAllKeys();
        const result = await AsyncStorage.multiGet(keys);
        setproductosData([...result]);
        console.log("Removido");
      }
      catch(exception) {
      }

    };

    const ItemView = ({item}) => {
      return (
        // FlatList Item
        <TouchableOpacity style={styles.row} onPress={cuandoClick}>
          <View>
            <Text style={styles.rowtext}>
              {item[0]+ '  ' + item[1]}
            </Text>
          </View>
        </TouchableOpacity>
      );
    };

    async function cargarEnEstado() { 
      const keys =await AsyncStorage.getAllKeys();  
      const result = await AsyncStorage.multiGet(keys);  
      //result.forEach(element => (setproductosData(productosData.push(element))));
      setproductosData([...productosData, ...result]);
    }


    useFocusEffect(
      React.useCallback(() => {
          cargarEnEstado()        
      }, [])
    );


    clearAsyncStorage = async() => {
      AsyncStorage.clear();
    }

    return (
      <View style={styles.container}>
        <View style={styles.inputcontainer}>
          <TextInput placeholder="Pizzas" style={styles.inputdato} onChangeText={(val) => setBorrarpar(val)}/>
          <View style={styles.submit}>
            <Button title="Eliminar" onPress={botonTocado}/>
          </View>
        </View>
        <FlatList
        data={productosData}
        renderItem={ItemView}
        keyExtractor={(item, index) => index.toString()}
        />

      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submit: {
    width: 200,
    marginBottom:10,
  },
  inputdato: {
    //backgroundColor:'red',
    textAlign: 'center',
    fontSize: 15,
  },
  row: {
    width:widtht,
    height:45,
    borderWidth: 2, 
    borderColor: 'black',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems:'center',
    textAlign:'center'
    //backgroundColor:'blue',
  },
  rowtext:{
    fontSize:17,
  },
  inputcontainer: {
    alignItems: 'center',
    backgroundColor: '#DC5052',
    textAlign: 'center',
    width: widtht,
    fontSize: 15,
  }

});
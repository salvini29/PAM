import * as React from 'react';
import { useState,useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Button,
  Alert
} from 'react-native';

var widtht = Dimensions.get('window').width; //full width
var heightt = Dimensions.get('window').height; //full height


export default function TestScreen4 () {

    const [querypar, setQuerypar] = useState('');
    const [apipar, setApipar] = useState('https://api.mercadolibre.com/sites/MLA/search?q=');
    const [resultados, setResultados] = useState([]);


    /*async function cargarEnEstado() { 
      const keys =await AsyncStorage.getAllKeys();  
      const result = await AsyncStorage.multiGet(keys);  
      //result.forEach(element => (setproductosData(productosData.push(element))));
      setproductosData([...productosData, ...result]);
    }*/

    const cuandoClick = () => {
      console.log(resultados); //retorna todos los valores que quiero de la query en la API
    }

    const ItemView = ({item}) => {
      return (
        // FlatList Item
        <TouchableOpacity style={styles.row} onPress={cuandoClick}>
          <View>
            <Text style={styles.rowtext}>
              {item}
            </Text>
          </View>
        </TouchableOpacity>
      );
    };




   function botonTocado() {
      let query = apipar+querypar;
      let cargador = [];
      //setResultados([...resultados, ...["a","b"]]);
      fetch(query)
      .then( res => res.json() )
      .then( res => {
        //console.log(res.results)
        //console.log((res.results)[0].price )
        //console.log((res.results)[0].title )

        (res.results).forEach( (element) => {
            //console.log(element.price);
            //console.log(element.title);
            cargador.push(element.title);
            cargador.push(element.price);
            //console.log(cargador);
            //setResultados([...resultados, ...cargador]);
            //console.log(resultados);
            //cargador.length = 0;
        });
        setResultados(cargador);
        //setResultados([...resultados, ...res.results]);
        //console.log(resultados)
      })
   };


   /*function botonTocado2() {
    console.log(resultados);
   }*/

    return (
      <View View style={styles.container}>
        <View style={styles.inputcontainer}>
          <TextInput placeholder="Buscar producto" style={styles.inputdato} onChangeText={(val) => setQuerypar(val)} />
          <View style={styles.submit}>
              <Button onPress={botonTocado} title="Buscar"/>
          </View>
        </View>
        <FlatList
            data={resultados}
            renderItem={ItemView}
            keyExtractor={(item, index) => index.toString()}
            />
      </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent: 'center',
    },
    submit: {
        width: 200,
        marginBottom:10,
    },
    inputdato: {
        //marginTop:20,
        //backgroundColor:'red',
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
      textAlign: 'center',
    },
    inputcontainer: {
      alignItems: 'center',
      backgroundColor: '#DC5052',
      textAlign: 'center',
      width: widtht,
      fontSize: 15,
    }
});

import React, { useEffect, useCallback, useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  StatusBar,
  TextInput,
  Button,
  TouchableOpacity,
  Animated,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm } from 'react-hook-form';


export default function TestScreen3() {
    
  const margenLeft = useRef(new Animated.Value(0)).current;

  animate = () => {

    /*Animated.timing(margenLeft, {
      toValue: -300,
      duration: 500,
      useNativeDriver: false,
    }).start(margenLeft.resetAnimation());*/
    
    Animated.timing(margenLeft, {
      toValue: -300,
      duration: 500,
      useNativeDriver: false,
    }).start( ()=> {
        margenLeft.setValue(0); 
    } );

  };

  const { register, handleSubmit, setValue } = useForm();
  const onSubmit = useCallback(formData => {
    //console.log(formData);
    //console.log(formData['email']);
    guardarDatos(formData);
    animate();
  }, []);

  guardarDatos = async ( datos ) => {
    try{

      await AsyncStorage.setItem( datos['producto'] , datos['cantidad'] );
      
    } catch(error){

    }
  }
  
  const onChangeField = useCallback(
    name => text => {
      setValue(name, text);
    },
    []
  );

  useEffect(() => {
    register('producto');
    register('cantidad');
  }, [register]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        autoCompleteType="off"
        placeholder="Producto a comprar"
        onChangeText={onChangeField('producto')}
      />
      <TextInput
        style={styles.input}
        autoCompleteType="off"
        placeholder="Cantidad"
        keyboardType= "numeric"
        onChangeText={onChangeField('cantidad')}
      />
      <View style={styles.submit}>
        <Button title="Agregar" onPress={handleSubmit(onSubmit)} />
      </View>
      
      <Animated.View style={[styles.imagencontainer,{marginLeft:margenLeft}]}>
        <Image style={styles.imagen} source={require('../img/cart.png')} />
        
      </Animated.View>

    </View>
  );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    imagen: {
      width: 60,
      height: 60,
    },
    imagencontainer: {
      marginTop:15,
    },
    input: {
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      fontSize: 15,
    },
    submit: {
      width: 200,
    },
    onSubmit: {
      color: 'red',
    },
  });
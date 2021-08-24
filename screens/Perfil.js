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

class Perfil extends React.Component {
	constructor()
	{
		super();
		this.state={
			name:'',
			lastname:'',
			email:'',
			password:'',
		}
	}
	submit()
	{
		let data = {
		  method: 'POST',
		  credentials: 'same-origin',
		  mode: 'same-origin',
		  body: JSON.stringify({
	            name: this.state.name,
	            lastname: this.state.lastname,
	            email: this.state.email,
	            password: this.state.password
		  }),
		  headers: {
		    'Accept':       'application/json',
		    'Content-Type': 'application/json',
		  }
		}
		return fetch('http://10.0.2.2:8000/createUser', data)
		        .then(response => response.json())  // promise
		        .then(json => {console.log(json);})
	}
	async submitGet()
	{
		fetch('http://10.0.2.2:8000/getUsers').then((response) => response.json()).then((json) => {
		    console.log(json);
		}).catch((error) => {
		    console.error(error);
		});
	}
	render(){
		return(

		<View style={{margin:20}}>
			<TextInput
				placeholder="Nombre"
				onChangeText={(text) => {this.setState({name:text})}}
				style={{ borderWidth: 2, borderColor:'skyblue', margin: 20 }}
			/>
			<TextInput
				placeholder="Apellido"
				onChangeText={(text) => {this.setState({lastname:text})}}
				style={{ borderWidth: 2, borderColor:'skyblue', margin: 20 }}
			/>
			<TextInput
				placeholder="Email"
				onChangeText={(text) => {this.setState({email:text})}}
				style={{ borderWidth: 2, borderColor:'skyblue', margin: 20 }}
			/>
			<TextInput
				placeholder="Contraseña"
				secureTextEntry = {true}
				onChangeText={(text) => {this.setState({password:text})} }
				style={{ borderWidth: 2, borderColor:'skyblue', margin: 20 }}
			/>
			<Button title="submit" onPress={()=>{this.submit()}} />

			</View>
		)
	}
}

export default Perfil
import { StyleSheet, Button, TextInput, ScrollView, View,Alert } from 'react-native';
import React, { useState } from 'react';
import {app,db} from '../utils/firebase';
import { collection, addDoc } from "firebase/firestore";

export default function CreateUserScreen(props) {
  const [data, setData] = useState({
    name: '',
    mail: '',
    phone: ''
  });

  const handleChangeText = (name, value) => {
    setData({ ...data, [name]: value });
  }

  const newUser = async () => {
    if (data.mail === '' ) {
      console.log('Ingresa un correo valido');
    } else if(data.name===''){
      console.log('Ingresa un nombre valido');
    } else if (data.phone===''){
      console.log('Ingresa un numero valido');
    }else{
    await addDoc(collection(db, "users"), {
      name: data.name,
      mail: data.mail,
      phone: data.phone
    });
    console.log("guardado");
    confirmation();
  }
}

const confirmation=()=>{
  Alert.alert('Accion Exitosa',"sera redirigido a la lista de usuarios",[
    {text:'yes',onPress:()=>props.navigation.navigate('UsersList')}
  ])
}

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroput}>
        <TextInput placeholder='name' onChangeText={(value) => handleChangeText('name', value)} />
      </View >
      <View style={styles.inputGroput}>
        <TextInput placeholder='mail' onChangeText={(value) => handleChangeText('mail', value)} />
      </View>
      <View style={styles.inputGroput}>
        <TextInput placeholder='phone' onChangeText={(value) => handleChangeText('phone', value)} />
      </View>
      <View style={styles.inputGroput} >
        <Button title='Save' onPress={() => newUser()} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  inputGroput: {
    flex: 1,
    padding: 0,
    marginBottom: 20,
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc'
  },
  container: {
    flex: 1,
    padding: 35
  }
})
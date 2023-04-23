import { StyleSheet, Button, TextInput, ScrollView, View, ActivityIndicator,Alert } from 'react-native';
import React, { useEffect, useState } from 'react'
import { doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore"; // Actualiza las importaciones
import { db } from "../utils/firebase";

export default function UserDetail(props) {
  const [loading, setloading] = useState(true)
  const [user, setUser] = useState({
    id:'',
    name:'',
    mail:'',
    phone:''
  });
  const userId=props.route.params.id;
  
  const obtenerDocumento = async (userId) => {
      const docRef = doc(db, "users", userId);
      const docSnapshot = await getDoc(docRef);
        const userData = docSnapshot.data();
        setUser(userData);
        setUser({
          ...userData,
          id:doc.id
        })
      setloading(false);
  };

  useEffect(() => {
    obtenerDocumento(userId);
  }, []);

  const handleChangeText = (name, value) => {
    console.log(name,"+",value);
    setUser({ ...user, [name]: value });
  }


  const deleteUser= async() =>{
    const docRef = doc(db, "users", userId); 
    await deleteDoc(docRef); // Elimina el documento de Firestore
    props.navigation.navigate('UsersList')
    console.log("borrando usuario");
    confirmation();
  }

  const confirmationAlert=()=>{
    Alert.alert('Elimnar Usuario',"esta seguro de esto?",[
      {text:'yes',onPress:()=>deleteUser()},
      {text:'No',onPress:()=>console.log("eliminacion cancelada")}
    ])
  }

  // Crea un objeto con los datos que quieres actualizar en el documento

  const confirmation=()=>{
    Alert.alert('Accion Exitosa',"sera redirigido a la lista de usuarios",[
      {text:'yes',onPress:()=>props.navigation.navigate('UsersList')}
    ])
  }

  const updateUse=async()=>{
    const datosActualizados = {
      name: user.name,
      mail: user.mail,
      phone: user.phone
    }
    try {

      await updateDoc(doc(db, "users", userId), datosActualizados);
      console.log("Documento actualizado exitosamente!");
      confirmation();

    } catch (error) {
      console.error("Error al actualizar el documento:", error);
    }

  }

  const confirmationAlert2=()=>{
    Alert.alert('Actualizar  Usuario',"esta seguro de esto?",[
      {text:'yes',onPress:()=>updateUse()},
      {text:'No',onPress:()=>console.log("Actualizacion cancelada")}
    ])
  }

  if(loading){
    return(<View>
      <ActivityIndicator size="large" color="#9e9e9e"/>
    </View>)
  }

  return (
    <ScrollView style={styles.container}>
    <View style={styles.inputGroput}>
      <TextInput value={user?.name} onChangeText={(value) => handleChangeText('name', value)} />
    </View >
    <View style={styles.inputGroput}>
      <TextInput value={user?.mail} onChangeText={(value) => handleChangeText('mail', value)} />
    </View>
    <View style={styles.inputGroput}>
      <TextInput value={user?.phone} onChangeText={(value) => handleChangeText('phone', value)} />
    </View>
    <View style={styles.inputGroput} >
      <Button color="#008000" title='Update' onPress={() => confirmationAlert2()} style={styles.btnUpdate} />
    </View>
    <View style={styles.inputGroput} >
      <Button color='#FF0000' title='Delete' onPress={() => confirmationAlert()} style={styles.btnDelete} />
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
  },
})

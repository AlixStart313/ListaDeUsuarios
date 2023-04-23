import { StyleSheet, Text, View, ScrollView, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { app, db } from "../utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import { ListItem, Avatar } from "@rneui/base";

export default function UsersList(props) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const obtenerDocumentos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersData = querySnapshot.docs.map((doc) => {
          const { name, mail, phone } = doc.data();
          return {
            id: doc.id,
            mail,
            name,
            phone
          };
        });
        setUsers(usersData); // Actualizar el estado después de obtener los datos
      } catch (error) {
        console.error("Error al obtener documentos:", error);
      }
    };
    obtenerDocumentos();
  }, [users]);

  return (
    <ScrollView>
      <Button
        title="Crear nuevo usuario"
        onPress={() => props.navigation.navigate("CreateUserScreen")}
      />
      {users.map((user, index) => {
        return (
          <ListItem key={user.id} bottomDivider onPress={() =>{props.navigation.navigate('UserDetail',{
            id:user.id
          })} } >
            <ListItem.Chevron/>
            <Avatar source={{uri:"https://i.pinimg.com/564x/1d/b9/cc/1db9cca8fb29bf23a56f6b76bd7a15a9.jpg"}} rounded/>
            <ListItem.Content>
              <ListItem.Title>{user.name}</ListItem.Title>
              <ListItem.Subtitle>{user.mail}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
  );
} 
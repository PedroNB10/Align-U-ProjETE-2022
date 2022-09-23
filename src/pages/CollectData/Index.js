import React from 'react';
import { Component, useState, useEffect, useRef } from 'react';
import {
  Platform,
  AppRegistry,
  Text,
  View,
  Image,
  Modal,
  Pressable,
  TouchableOpacity,
  BackHandler, Alert } from "react-native";

import { firebaseAuth, db } from '../../Helpers/firebaseConfig';
import { collection, query, where, getDocs } from "firebase/firestore";
import styles from './styles'
import { EnviarUbidots, ReceberUbidotsMPUX1,ReceberUbidotsMPUX2, ReceberUbidotsMPUY1,ReceberUbidotsMPUY2  } from '../../Helpers/scriptUbidots'

import profilePicture from '../../Images/doctor.png'

import * as Notifications from "expo-notifications"
import * as Permissions from "expo-permissions"
import { StatusBar } from 'expo-status-bar';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function CollectData({ route }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [describe, setDescribe] = useState("")
  const [dayWeek, setDayWeek] = useState("");
  const [link_graph_x_axis, setGraph1] = useState("");
  const [link_graph_y_axis, setGraph2] = useState("");
  const [last_x_variation, setGraph3] = useState("");
  const [last_y_variation, setGraph4] = useState("");
  const [dated_values, setGraph5] = useState("");
  const [modalVisible, setModalVisible] = useState(false);



  const getDocsFirebase = async (q) => {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const dataQuery = doc.data();
      console.log(dataQuery);
      setName(dataQuery.name)
      setEmail(dataQuery.email)
      setAge(dataQuery.age)
      setDescribe(dataQuery.describe)
      setDayWeek(dataQuery.dayWeek)
      setGraph1(dataQuery.link_graph_x_axis)
      setGraph2(dataQuery.link_graph_y_axis)
      setGraph3(dataQuery.last_x_variation)
      setGraph4(dataQuery.last_y_variation)
      setGraph5(dataQuery.dated_values)

      const weekday = ["Domingo","Segunda-Feira","Terça-Feira","Quarta-Feira","Quinta-Feira","Sexta-Feira","Sábado"];
      const d = new Date();
      let day = weekday[d.getDay()];

      console.log(dataQuery.dayWeek)

      if(day == dataQuery.dayWeek){
        Notifications.scheduleNotificationAsync({
          content: {
            title: "Alerta - Align U ⚠️",
            body: 'Não se esqueça, hoje tem medição🧑‍⚕️',
            data: { data: 'goes here' },
          },
          trigger: {
           seconds:1,
           repeats: false,
         },
       
        })

        Notifications.scheduleNotificationAsync({
          content: {
            title: "Alerta - Align U ⚠️",
            body: 'Não se esqueça, hoje tem medição🧑‍⚕️',
            data: { data: 'goes here' },
          },
          trigger: {
           seconds:60*60*24*7,
           repeats: true,
         },
       
        })

      }
      
      return dataQuery;
    })
  }

  const backActionHandler = () => {
    Alert.alert("Alerta!", "Você tem certeza que deseja sair do aplicativo?", [
      {
        text: "Cancelar",
        onPress: () => null,
        style: "cancel"
      },
      { text: "SIM", onPress: () => BackHandler.exitApp()
      () }
    ]);
    return true;
  };

  useEffect( () => {
   
    
    const user = firebaseAuth.currentUser.email;
    const docRef = collection(db, "Users");
    const q = query(docRef, where("email", "==", user));
    const data =  getDocsFirebase(q);
    BackHandler.addEventListener("hardwareBackPress", backActionHandler);
    
    return () =>
      // clear/remove event listener
      BackHandler.removeEventListener("hardwareBackPress", backActionHandler);
  }, [])

  const handleReceiveUbidots = () => {
    ReceberUbidotsMPUX1();
    ReceberUbidotsMPUX2();
    ReceberUbidotsMPUY1();
    ReceberUbidotsMPUY2();
    setModalVisible(!modalVisible);
  }

  const handleSendUbidots = () => {
    EnviarUbidots();
    setModalVisible(!modalVisible);
  }

  return (


    <View style={styles.container}>
      <StatusBar  style="light" />
      <View style={styles.TopView}></View>

      <View style={styles.separateInfoContainer} >
        <View style={styles.LabelContainer}>
          <Image source={profilePicture} style={styles.Icons} />
          <View style={styles.containerText}>
            <Text style={styles.title}>
              Bem-vindo(a) {name}! {'\n'}
            </Text>
            <Text style={styles.title}>
              Esta é a página em que você enviará semanalmente o histórico das suas medições. Para realizar o envio, pressione o botão abaixo.
            </Text>
          </View>
        </View>
        <Text style={styles.title}>{name}</Text>
      </View>


      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.textStyleLabel}>Confirma a medição?</Text>
              <Pressable
                style={[styles.buttonModal]}
                onPress={() => handleSendUbidots()}
              >
                <Text style={styles.textStyle}>SIM</Text>
              </Pressable>
              <Pressable
                style={[styles.buttonModal]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>NÃO</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <TouchableOpacity
          style={[styles.buttonCollect]}
          onPress={() => handleReceiveUbidots()}
        >
          <Text style={styles.titleBtn}>Atualizar  dados</Text>
        </TouchableOpacity>

        
      </View>


    </View>


  )
}


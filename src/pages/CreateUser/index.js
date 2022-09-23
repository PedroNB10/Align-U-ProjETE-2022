import React from 'react';
import { Platform } from 'react-native';
import { createUserWithEmailAndPassword } from '@firebase/auth'
import { firebaseAuth, db } from '../../Helpers/firebaseConfig'
import { useState } from 'react';
import Checkbox from 'expo-checkbox';

import { Ionicons } from '@expo/vector-icons'

import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  ScrollView,
} from 'react-native';
import styles from './styles'
import { collection, doc, setDoc } from "firebase/firestore";




export default function CreateUser({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [describe, setDescribe] = useState("")
  const [dayWeek, setDayWeek] = useState("");
  const [isChecked, setCheck] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const days = ["Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado", "Domingo"];

  const [hidePass, SetHidePass] = useState(true);



  const handleDayOfWeek = (day) => {
    setModalVisible(!modalVisible);
    setDayWeek(day);
  }

  const addFirestore = async () => {
    const data = {
      email,
      password,
      name,
      age,
      describe,
      dayWeek,
      link_graph_x_axis: 'https://stem.ubidots.com/app/dashboards/public/widget/aP-IprXAkmQMwTTMCx9n1fzxwnS7o8DoQe87vosSnbM?embed=true',
      link_graph_y_axis: 'https://stem.ubidots.com/app/dashboards/public/widget/qmlYZoDXnyiw9QZ3Jyx7tAB8O2mBZZuC2s5EcdiPn1k?embed=true',
      last_x_variation: 'https://stem.ubidots.com/app/dashboards/public/widget/SMNbIetcmegglAt2CAi1adW3TriCcX8UM4zMoBHJFbA?embed=true',
      last_y_variation: 'https://stem.ubidots.com/app/dashboards/public/widget/lkVYocYZzI6DmOkpLDToT2DWQqDbBGmzC0fx30LXo7Y?embed=true',
      dated_values: 'https://stem.ubidots.com/app/dashboards/public/widget/rKw5sbqw3cGLwsBLZ_syC6wNqADBaVp1K_v3Hf7tit0?embed=true',
    }

    const newDocRef = doc(collection(db, "Users"));
    await setDoc(newDocRef, data);
  }

  const registerFirebase = () => {

    if (confirm != password) {
      alert('As senhas digitadas não coincidem')
    }
    else if (password.length < 6) {
      alert('Sua precisa ter 6 ou mais dígitos para ser validada')
    }
    else if (password == '123456') {
      alert('Sua senha está muito fácil, coloque letras maiúsculas, minúsculas e caracteres especiais')
    }

    else if (password.toUpperCase() == 'ABCDEF') {
      alert('Sua senha está muito fácil, coloque números e caracteres especiais')
    }



    else {
      createUserWithEmailAndPassword(firebaseAuth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          addFirestore();
          navigation.navigate('home')
        })
        .catch((error) => {
          // setErrorLogin(true)
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }


  }

  function handleCheck() {
    setCheck(!check);
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}

    >
      <ScrollView>
        <Text
          style={styles.title}
        >
          Cadastro
        </Text>
        <Text style={styles.labels}>
          Digite seu nome completo:
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Seu nome"
          type="text"
          onChangeText={(text) => setName(text)}
          value={name}
        />
        <Text style={styles.labels}>
          Digite sua idade:
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Sua idade"
          type="number"
          keyboardType="numeric"
          onChangeText={(text) => setAge(text)}
          value={age}
        />
        <Text style={styles.labels}>
          Insira um email válido:
        </Text>
        <TextInput
          style={styles.input}
          placeholder="exemplo@email.com"
          type="text"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <Text style={styles.labels}>
          Insira uma senha forte com 6 ou mais dígitos:
        </Text>
        {/* <TextInput
          style={styles.input}
          placeholder="Crie uma senha forte com 6 ou mais dígitos"
          secureTextEntry={true}
          type="text"
          onChangeText={(password) => setPassword(password)}
          value={password}
        /> */}




   <View style={styles.inputArea}>
                <TextInput
                    style={styles.inputPassword}
                    placeholder="Digite sua senha"
                    secureTextEntry={hidePass}
                    type="text"
                    onChangeText={(password) => setPassword(password)}
                    value={password}
                />

                    <TouchableOpacity style={styles.iconArea} onPress={ () => SetHidePass(!hidePass) }>
                        <Ionicons style={styles.icon} name="eye"  size={25} />
                    </TouchableOpacity>

            </View>


        <Text style={styles.labels}>
          Confirme a senha:
        </Text>
        <TextInput
          style={styles.input}
          placeholder="******"
          secureTextEntry={true}
          onChangeText={(confirm) => setConfirm(confirm)}
          type="text"
          value={confirm}
        />



        <View style={styles.checkboxContainer}>
          <Text style={styles.label}>Faz algum tratamento médico?</Text>
          <Checkbox
            value={isChecked}
            onValueChange={setCheck}
            style={styles.checkbox}
          />

          <Text style={styles.label}>Sim</Text>


        </View>

        <View>

          {isChecked ?

            <TextInput
              style={styles.input}
              placeholder="Por exemplo: Escoliose, Cifose, Lordose..."
              type="text"
              onChangeText={(describe => setDescribe(describe))}
              value={describe}
            />
            :
            <></>
          }
        </View>
        <View>
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
                  {days.map((day) => (
                    <Pressable
                      key={day}
                      style={[styles.button, styles.buttonDayModal]}
                      onPress={() => handleDayOfWeek(day)}
                    >
                      <Text style={styles.textStyle}>{day}</Text>
                    </Pressable>
                  ))}

                </View>
              </View>

            </Modal>

            <Text style={styles.label}>Clique para selecionar o dia de medição:</Text>
            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Selecione o dia: {dayWeek} </Text>
            </Pressable>
            {(email === "" || password === "" || age === '' || name === '' || dayWeek === '')
              ?
              <TouchableOpacity
                style={styles.buttonLoginDisabled}
                disabled={true}
              >
                <Text style={styles.textButtonLogin}>Cadastrar</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity
                style={styles.buttonLogin}
                onPress={registerFirebase}
              >
                <Text style={styles.textButtonLogin}>Cadastrar</Text>
              </TouchableOpacity>
            }
          </View>

        </View>

        <Text style={styles.registration}>
          Já é cadastrado?
          <Text
            style={styles.linkSubscribe}
            onPress={() => navigation.navigate('login')}
          >
            Login
          </Text>
        </Text>
        <View />

        
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

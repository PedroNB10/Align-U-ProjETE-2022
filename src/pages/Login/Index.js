import React from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged, getAuth } from '@firebase/auth'
import { firebaseAuth } from '../../Helpers/firebaseConfig'
import { useState, useEffect } from 'react';

import { Ionicons } from '@expo/vector-icons'

import {
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView, BackHandler, Alert } from "react-native";

import { MaterialCommunityIcons } from '@expo/vector-icons'
import styles from './styles'
import { Platform } from 'react-native';

import { StatusBar } from 'expo-status-bar';
import profilePicture from '../../Images/icon.png'



export default function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorLogin, setErrorLogin] = useState("");

    const [hidePass, SetHidePass] = useState(true);



    //serve para caso a pessoa feche o app, daí ele loga com os dados armazenados anteriores
    if (firebaseAuth.currentUser) {
        navigation.navigate('home');
    } else {
        onAuthStateChanged(firebaseAuth, (user) => {
            if (user) {
                navigation.navigate('home');
            }
        });
    }


    const loginFirebase = () => {
        signInWithEmailAndPassword(firebaseAuth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const { uid } = user;
                // console.log(uid);
                navigation.navigate('home', { uid })
            })
            .catch((error) => {
                setErrorLogin(true)
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
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

    useEffect(() => {

        // Add event listener for hardware back button press on Android
        BackHandler.addEventListener("hardwareBackPress", backActionHandler);
    
        return () =>
          // clear/remove event listener
          BackHandler.removeEventListener("hardwareBackPress", backActionHandler);
      }, []);

    return (
        
        <KeyboardAvoidingView
            style={styles.container}
           
        >

        <StatusBar  style="light" />

        <Text
                style={styles.title}
            >
                Login
            </Text>
            
        <Image source={profilePicture} style={styles.profileImage} />
         


            <View style={styles.inputArea}> 
            <TextInput
                id="inputname"
                style={styles.input}
                placeholder="Digite seu email"
                type="text"
                onChangeText={(text) => setEmail(text)}
                value={email}
            />
            
             </View>
          

            <View style={styles.inputArea}>
                <TextInput
                    style={styles.input}
                    placeholder="Digite sua senha"
                    secureTextEntry={hidePass}
                    type="text"
                    onChangeText={(password) => setPassword(password)}
                    value={password}
                />

                    <TouchableOpacity style={styles.icon} onPress={ () => SetHidePass(!hidePass) }>
                        <Ionicons name="eye" color="#0E405B" size={25} />
                    </TouchableOpacity>

            </View>

            {(errorLogin)
                ?
                <View style={styles.contentAlert}>
                    <MaterialCommunityIcons
                        name='alert-circle'
                        size={24}
                        color='#bdbdbd'
                    />
                    <Text style={styles.warningAlert}>
                        Email ou senha inválidos!
                    </Text>
                </View>
                :
                <>
                </>
            }
            {(email === "" || password === "")
                ?
                <TouchableOpacity
                    style={styles.buttonLoginDisabled}
                    disabled={true}
                >
                    <Text style={styles.textButtonLogin}>Entrar</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity
                    style={styles.buttonLogin}
                    onPress={loginFirebase}
                >
                    <Text style={styles.textButtonLogin}>Entrar</Text>
                </TouchableOpacity>
            }
            <Text style={styles.registration}>
                Não é cadastrado ainda?
                <Text
                    style={styles.linkSubscribe}
                    onPress={() => navigation.navigate('createUser')}
                >
                    criar perfil
                </Text>
            </Text>
            <View style={{ height: 100 }} />
        </KeyboardAvoidingView>
    );
}


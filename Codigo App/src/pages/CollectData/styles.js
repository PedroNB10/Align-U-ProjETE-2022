import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#0E405B',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },

    TopView: {
      
      width:'100%',
      height: '4%',

   
    },

    separateInfoContainer:{
      
      marginBottom: '7%',
      marginTop: '7%',

    },

    Icons: {
 
      width: 45,
      height: 45,
     left:10,
  
    },

    LabelContainer: {
    
      width: '100%',
      flexDirection: "row",
      flexWrap: "wrap",

    },

    LabelText: {
  
      paddingTop: '1%',
      paddingLeft: '7.7%',
      flexDirection: "row",
      flexWrap: "wrap",
      fontSize: 17,
      color: 'white', 
      fontWeight: 'bold',
     
      
    },

    containerText: {
      marginLeft:16,
      height: '77%',
      display: 'flex',
      justifyContent: 'center',
      width: '82%',
      borderRadius: 30,
      backgroundColor: '#ffff',
      marginTop: 5,
    },

    title: {
      
      color: '#0E405B',
      fontSize: 16,
      textAlign: "center",
    },

    titleBtn: {
      fontSize: 35,
      color: '#ffff',
      textAlign: "center",
    },

    buttonCollect: {
      border: '5 solid #ffff',
      boxshadow: '10 10 5 #aaaaaa',
      alignItems: 'center',
      justifyContent: 'center',
      width: 250,
      height: 250,
      backgroundColor: '#3a82e9',
      borderRadius: 500,
      marginBottom: 280,
    },

    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },

    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    buttonModal: {
      margin: 5,
      padding: 10,
      borderRadius: 10,
      width: 200,
      height: 'auto',
      backgroundColor: "#dfe6e9",
    },
    textStyle: {
      color: '#6c5ce7',
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      color: '#6c5ce7',
      marginBottom: 15,
      textAlign: "center"
    },

    textStyleLabel: {
      color: '#ff7675',
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 20,
    },
    
    
})

export default styles
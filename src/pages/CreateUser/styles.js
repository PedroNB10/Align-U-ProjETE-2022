import { StyleSheet, Platform } from 'react-native'

const styles = StyleSheet.create({
    container: {
      flex: 1,
      display: 'flex',
      backgroundColor: '#0E405B',
      
      justifyContent: 'center',
      paddingTop: Platform.OS === 'ios' ? 0 : 50,        
    },

    title: {
      borderBottomWidth: 2,
      borderBottomColor: '#00BFFF',
      fontSize: 30,
      textAlign: "center",
      marginBottom: 10,
      fontWeight: 'bold',
      color: '#ffff'
    },

    input: {
      backgroundColor: '#ffff',
      borderRadius: 10,
      width: 300,
      marginLeft:'auto',
      marginRight:'auto',
      marginTop:10,
      padding: 10,
      height: 50,

      color: "#4d5156",  
    },

    inputPassword: {
      
      borderRadius: 10,
      width: 300,
      padding: 8,
      height: 50,
      paddingLeft:80,
    },

    buttonLoginDisabled: {
      width: 200,
      height: 0,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:40,
      backgroundColor: "#00BFFF",     
    },

    inputArea:{
      backgroundColor: 'white',
        flexDirection:'row',
        width: 303,
        borderRadius: 10,
        alignItems: 'center',
        height: 50,
        marginLeft:'auto',
      marginRight:'auto',
        marginTop:10,
        justifyContent: 'center',
        

        
        
    },

    iconArea:{
      width:'45%',
      height:50,
      justifyContent: 'center',
      alignItems: 'center',
      paddingRight:40,
      

    },

    icon:{
      color:"#0E405B"
    },

    buttonLogin: {
      width: 200,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:40,
      backgroundColor: "#00008B",
      marginTop: 30,
    },
    
    textButtonLogin: {
      color: '#ffffff',
    },
    
    contentAlert: {
      marginTop: 20,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    
    warningAlert: {
      paddingLeft: 10,
      color: '#FFD700',
      fontSize: 16,
    },
    
    registration: {
      color: '#ffff',
      textAlign: 'center',
      alignItems: 'center',
      marginTop: 10,
    },
    
    linkSubscribe: {
      color: '#00BFFF',
      marginLeft: 5,
      fontSize: 16,
    },
    
    labels: {
      display: 'flex',
      justifyContent: 'center',
      textAlign: 'center',
      width: '100%',
      marginRight:'auto',
      marginTop:10,
      color: '#ffff',
      justifyContent: 'center',
    },
    
    checkboxContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: "row",
      marginBottom: 20,
      marginTop: 20,
    },
    
    checkbox: {
      alignSelf: "center",
      backgroundColor: 'white',
    },
    
    label: {
      margin: 8,
      color:'#ffff',
    },
    
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      
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
      elevation: 5
    },
    
    button: {
      width: 300,
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    
    buttonOpen: {
      backgroundColor: "#ffeaa7",
      marginTop: 10,
    },
    
    buttonClose: {
      backgroundColor: "#ffeaa7",
      marginTop: 10,
    },

    buttonDayModal: {
      backgroundColor: "#ffeaa7",
      marginTop: 10,
      borderRadius: 2,
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
    }
})

export default styles
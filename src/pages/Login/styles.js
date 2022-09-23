import { StyleSheet, Platform } from 'react-native'

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0E405B',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: Platform.OS === 'ios' ? 0 : 100,        
    },
    profileImage: {
      
      height: 150,
      width: 150,
      marginBottom:15,
      marginTop:18,
      
    },
    
    title: {
      borderBottomWidth: 2,
      borderBottomColor: '#00BFFF',
      fontSize: 30,
      marginBottom: 10,
      fontWeight: 'bold',
      color: '#ffff'
    },

    inputArea:{
      backgroundColor: '#ffff',
        flexDirection:'row',
        width: '90%',
        borderRadius: 5,
        alignItems: 'center',
        height: 50,
        marginTop:10
        
    },

    icon:{
      width:'15%',
      height:50,
      justifyContent: 'center',
      alignItems: 'center',

    },

    input: {
      
      borderRadius: 10,
      width: '85%',
     
      padding: 8,
      height: 50,
    },

    
    

    buttonLoginDisabled: {
      width: 200,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:40,
      backgroundColor: "#00BFFF",
      marginTop: 30,
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
      marginTop: 20,
      color: '#ffff',
    },
    linkSubscribe: {
      color: '#00BFFF',
      marginLeft: 5,
      fontSize: 16,
    }
})

export default styles
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({

  Icons: {
 
    width: 30,
    height: 30,
   left:10,

  },
  
    bodyContainer: {
      backgroundColor: '#0E405B',
      width: '100%',
      height: '100%',
      alignItems: 'center',
  

    },

    TopView: {
      
      width:'100%',
      backgroundColor: '#00afff',
      height: '3.85%',

   
    },
    
    mainContainer: {
      
      marginTop: '9%',
      height: '70%',
   
      backgroundColor: 'white',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-around',
  
      
    },
    
    topContainer: {
      width: '100%',
      height: 120,
      borderRadius: 6,
      backgroundColor: '#00cec9',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: '0.5',
     
      
    },
    
    profileImage: {
      
      height: 100,
      width: 100,
      
      
    },

    bottomContainer: { // container das informações de login
    
      marginTop: '9%',
      width: '100%',
    
      marginBottom: '30%',
    },

    LabelContainer: {
      marginLeft: '9%',
      width: '100%',
      flexDirection: "row",
      flexWrap: "wrap",

    },

    separateInfoContainer:{
      marginBottom: '7%',

    },

    LabelText: {
  
      paddingTop: '1%',
      paddingLeft: '7.7%',
      flexDirection: "row",
      flexWrap: "wrap",
      fontSize: 17,
      color: '#0E405B', 
      fontWeight: 'bold',
     
      
    },

    profileName: {
    
      color: '#6c5ce7',
      fontWeight: 'bold',
    },

    Toptitle: {
      marginTop: '14%',
      fontSize: 20,
      color: 'white', 
      paddingBottom: '13%',

    },

    title: {
      width: '100%',
      
      paddingLeft: '25%',
      alignContent: 'flex-start',
      
      fontSize: 17,
      color: '#0E405B', 
    },

    linkEdit: {
     
      fontSize: 12, 
    },
})

export default styles
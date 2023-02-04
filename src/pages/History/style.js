import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
      backgroundColor: 'blue',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      backgroundColor: '#4169E1',
      alignItems: 'center',
      justifyContent: 'center', 
    },
    paragraphContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      width: '60%',
      height: 100,
      backgroundColor: '#dfe6e9',
      marginLeft: 'auto',
      marginRight: 'auto',
    },

    titleParagraph: {
    
      color: '#6c5ce7',
    },

    chartFirstContainer: {
      width: '60%',
      height: '40%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-around',
    },

    titleChart: {
    
      color: 'white',
      fontSize: '2em',
      fontWeight: 'bold',
      marginTop: 10,
      color: '#55efc4',
    },

    containerChart: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      margintop: 10,
      backgroundColor: 'white',
      width: '100%',
      height: 200,
    },

    chartSecondContainer: {
      width: '60%',
      height: '40%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-around',
    },

    containerWebView: {
      flex: 1,
      marginTop: 'Constants.statusBarHeight',
    },
})

export default styles
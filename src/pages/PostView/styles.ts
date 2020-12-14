import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282a36',
  },
  inputContainer: {
    borderColor: '#bd93f9',
    backgroundColor: '#282a36',
    borderRadius:30,
    width:370,
    height:60,
    marginBottom:20,
    flexDirection: 'row',
    alignItems:'center',
    marginLeft: 10,
    elevation: 5,
    position: 'absolute', //Here is the trick
    bottom: 0, //Here is the trick
    borderWidth: 1,

  },
  inputs:{
    height: 60,
    marginHorizontal:16,

    color: '#fff',
    flex:1,

  },
});

export default styles;
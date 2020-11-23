import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282a36',
  },
  inputContainer: {
    borderBottomColor: '#282a36',
    backgroundColor: '#282a36',
    borderRadius:10,
    borderBottomWidth: 1,
    width:370,
    height:45,
    marginBottom:20,
    flexDirection: 'row',
    alignItems:'center',
    marginLeft: 10,
    elevation: 5,
    position: 'absolute', //Here is the trick
    bottom: 0, //Here is the trick

  },
  inputs:{
    height: 100,
    marginHorizontal:16,
    borderColor: '#bd93f9',
    color: '#fff',
    flex:1,

  },
});

export default styles;
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container:{
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,

  },
  topBar:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  logo: {
    color: '#FFF',
  },
  header:{
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'space-between'
  },
  title:{
    color: '#FFF',
    fontSize: 24,
    lineHeight: 32,
    maxWidth: 160,
    marginVertical: 40

  }
});

export default styles;
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    maxWidth: 120,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#e6e6f0',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
    padding: 8,
    marginLeft: 6
  },


  avatar: {
    width: 64,
    height: 64,
    borderRadius: 8,
    // backgroundColor: '#eee',
    alignItems:'center',
    justifyContent:'center',
  },

  profileInfo: {
    // marginLeft: 14,
  },

  buttonContainer: {
    // marginLeft: 14,
  },

  name: {
    fontFamily: 'Archivo_700Bold',
    color: '#32264d',
    fontSize: 14,
    textAlign: 'center'
  },


  contactButton: {
    backgroundColor: '#1E6E72',
    height: 36,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    width: 80,

  },

  contactButtonText: {
    color: '#fff',
    fontFamily: 'Archivo_700Bold',
    fontSize: 14,
  },

  
});

export default styles;
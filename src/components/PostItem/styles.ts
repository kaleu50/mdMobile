import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  postContainer: {
    overflow: 'hidden',
    alignItems: 'center',
    backgroundColor: '#bd93f9',
    position: 'relative',
    marginHorizontal: 20,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  imagePost: {
    width: 380,
    height: 350,
    // flex: 1,
  },
  containerImageProfile: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginHorizontal: 20,

  },
  containerImageProfileTitle: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: -30
  },

  toolsContainer: {
    flexWrap: 'wrap', 
    alignItems: 'flex-start',
    flexDirection:'row',
    marginHorizontal: 20,
    marginBottom: 10
  },

  buttonContainer: {
    flexWrap: 'wrap', 
    alignItems: 'flex-start',
    flexDirection:'row',

  },
  baseText: {
    color: '#fff',
    fontSize: 14,
    marginTop: 16,
    fontWeight: 'bold',
  },

  msgText: {
    color: '#fff',
    fontSize: 14,
    marginTop: 16,
    marginLeft: 16,

  },
});

export default styles;
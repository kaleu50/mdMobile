import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  postContainer: {
    flex: 1,
    overflow: 'hidden',
    alignItems: 'center',
    backgroundColor: '#bd93f9',
    position: 'relative',
    margin: 10,
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
    width: 400,
    height: 400,
    flex: 1,
  },
  containerImageProfile: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
});

export default styles;
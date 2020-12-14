import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282a36',
  },
  header: {
    backgroundColor: '#383A59',
  },
  headerContent: {
    paddingTop: 30,
    paddingBottom: 60,

    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  profileDetail: {
    alignSelf: 'center',
    marginTop: 280,
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor: '#ffffff',
    borderRadius:15,
    overflow: "hidden"
  },
  detailContent: {
    margin: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#bd93f9',
  },
  count: {
    fontSize: 18,
  },
  bodyContent: {
    paddingHorizontal: 20,
    marginTop: 50,
    flexWrap: 'wrap', 
    alignItems: 'flex-start',
    flexDirection:'row',
  },
  textInfo: {
    fontSize: 18,
    marginTop: 20,
    color: '#696969',
  },
});

export default styles;

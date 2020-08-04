import React from 'react';
import {View, Button, StyleSheet, Image, Dimensions, Text} from 'react-native';
import {useAuth} from '../../contexts/auth.context';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Profile from '../Profile/index';
import {ScrollView} from 'react-native-gesture-handler';
import {Container} from './styles';
import {IconButton, Colors} from 'react-native-paper';
import TouchableRoundedImage from '../../components/TouchableRoundedImage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#282a36',
  },
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

interface Props {
  navigation: any;
}

const deviceWidth = Dimensions.get('window').width;

const Tab = createMaterialBottomTabNavigator();

const Dashboard: React.FC<Props> = ({navigation}) => {
  const {logout} = useAuth();

  function handleLogout() {
    // email, senha
    logout();
  }
  function logoutView() {
    return (
      <View style={styles.container}>
        <Button title="Sair" onPress={handleLogout} />
      </View>
    );
  }

  function Feed() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            <View style={styles.containerImageProfile}>
              <TouchableRoundedImage
                onPress={() => {}}
                size={48}
                source={
                  'https://images.unsplash.com/photo-1505999407077-7937810b98ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1488&q=80'
                }
              />
              <Text style={{color: '#fff', fontSize: 24, marginTop: 12}}>
                Isala Kant
              </Text>
            </View>
            <View style={styles.postContainer}>
              <Image
                style={styles.imagePost}
                source={{uri: 'https://picsum.photos/400'}}
              />
              <IconButton
                icon="heart"
                color={Colors.red500}
                size={20}
                onPress={() => console.log('Pressed')}
              />
            </View>
          </View>
          <View>
            <View style={styles.containerImageProfile}>
              <TouchableRoundedImage
                onPress={() => {}}
                size={48}
                source={
                  'https://images.unsplash.com/photo-1507038732509-8b1a9623223a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80'
                }
              />
              <Text style={{color: '#fff', fontSize: 24, marginTop: 12}}>
                Guilherme Prass
              </Text>
            </View>
            <View style={styles.postContainer}>
              <Image
                style={styles.imagePost}
                source={{uri: 'https://picsum.photos/401'}}
              />
              <IconButton
                icon="heart"
                color={Colors.red500}
                size={20}
                onPress={() => console.log('Pressed')}
              />
            </View>
          </View>
          <View>
            <View style={styles.containerImageProfile}>
              <TouchableRoundedImage
                onPress={() => {}}
                size={48}
                source={
                  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
                }
              />
              <Text style={{color: '#fff', fontSize: 24, marginTop: 12}}>
                Juliana Chan
              </Text>
            </View>
            <View style={styles.postContainer}>
              <Image
                style={styles.imagePost}
                source={{uri: 'https://picsum.photos/402'}}
              />
              <IconButton
                icon="heart"
                color={Colors.red500}
                size={20}
                onPress={() => console.log('Pressed')}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <Tab.Navigator barStyle={{backgroundColor: '#6272a4'}}>
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="Perfil" component={Profile} />
      <Tab.Screen name="Sair" component={logoutView} />
    </Tab.Navigator>
  );
};

export default Dashboard;

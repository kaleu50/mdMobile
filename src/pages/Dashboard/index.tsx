import React, {useEffect, useState} from 'react';
import {
  View,
  Button,
  StyleSheet,
  Image,
  Dimensions,
  Text,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import {useAuth} from '../../contexts/auth.context';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Profile from '../Profile/index';
import {ScrollView} from 'react-native-gesture-handler';
import {Container} from './styles';
import {IconButton, Colors} from 'react-native-paper';
import TouchableRoundedImage from '../../components/TouchableRoundedImage';
import PageHeader from '../../components/PageHeader';
import * as usersService from '../../services/users.service';
import ItemProfileList from '../../components/ItemProfileList';
import {User} from 'src/services/models/user.model';
import CreatePost from '../CreatePost';
var _ = require('lodash');
import * as postsService from '../../services/posts.service';
import {Post} from 'src/services/models/posts.model';
import PostItem from '../../components/PostItem';

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
  const [searchText, setSearchText] = useState('');
  const [usersFiltred, setUsersFiltred] = useState([]);

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getFeed();
  }, []);

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

  function handleSearchTextChange(
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) {
    setSearchText(e.nativeEvent.text);
    searchUser(e.nativeEvent.text);
    // _.debounce(()=>{
    //   searchUser(searchText);
    // },1200)
  }

  function searchUser(name: String) {
    const data = {
      searchName: name,
    };
    usersService.getUsersByName(data).then((res) => {
      setUsersFiltred(res);
    });
  }

  function getFeed() {
    postsService.getPostFeed().then((res) => {
      setPosts(res);
    });
  }

  function Feed() {
    return (
      <View style={styles.container}>
        <PageHeader
          hasSearch={true}
          isLogout={true}
          searchTextInput={searchText}
          onSearchTextChange={handleSearchTextChange}
        />

        {!searchText ? (
          <ScrollView>
            {posts &&
              posts.map((post: Post) => {
                return <PostItem key={post._id} post={post} />;
              })}
          </ScrollView>
        ) : (
          <ScrollView>
            <View style={{marginHorizontal: 8}}>
              {!!usersFiltred &&
                usersFiltred.map((user: User) => {
                  return <ItemProfileList key={user._id} user={user} />;
                })}
            </View>
          </ScrollView>
        )}
      </View>
    );
  }

  return (
    <Tab.Navigator barStyle={{backgroundColor: '#6272a4'}}>
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="Novo" component={CreatePost} />
      <Tab.Screen name="Perfil" component={Profile} />
    </Tab.Navigator>
  );
};

export default Dashboard;

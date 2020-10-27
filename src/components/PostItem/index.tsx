import React, {ReactNode, useEffect, useState} from 'react';
import {View, Image, Text} from 'react-native';
import styles from './styles';
import {BorderlessButton} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

import backIcon from '../../assets/images/icons/back.png';
import logoImage from '../../assets/images/logo.png';
import {useAuth} from '../../contexts/auth.context';
import {FormInput} from '../../pages/SignIn/styles';
import TouchableRoundedImage from '../TouchableRoundedImage';
import {Colors, IconButton} from 'react-native-paper';
import {User} from '../../services/models/user.model';
import {Post} from '../../services/models/posts.model';
import * as userService from '../../services/users.service';

interface PostItemProps {
  post: Post;
}

const PostItem: React.FC<PostItemProps> = ({post}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser();
  }, [post]);

  function handleLike() {}

  function getUser() {
    userService.getUserById(post.userId).then((res) => {
      setUser(res);
    });
  }

  return (
    <View>
      {user && (
        <>
          <View style={styles.containerImageProfile}>
            <TouchableRoundedImage
              onPress={() => {}}
              size={48}
              source={user!.refprofilepic}
            />
            <Text style={{color: '#fff', fontSize: 24, marginTop: 12}}>
              {user?.name}
            </Text>
          </View>
          <View style={styles.postContainer}>
            <Image style={styles.imagePost} source={{uri: post.refpostpic}} />
            <IconButton
              icon="heart"
              color={Colors.red500}
              size={20}
              onPress={() => console.log('Pressed')}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default PostItem;
//#8257e5

import React, {ReactNode, useEffect, useState} from 'react';
import {View, Image, Text, Alert} from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';

import TouchableRoundedImage from '../TouchableRoundedImage';
import {User} from '../../services/models/user.model';
import * as userService from '../../services/users.service';
import { Comments } from 'src/services/models/comments.model';

interface PostItemProps {
  comment: Comments;
}

const PostItem: React.FC<PostItemProps> = ({comment}) => {
  const [user, setUser] = useState<User | null>(null);

  const {navigate} = useNavigation();

  useEffect(() => {
    getUser();
  }, [comment]);

  function handleLike() {}

  function getUser() {
    userService.getUserById(post.userId).then((res) => {
      setUser(res);
    });
  }

  return (
    <View>
      {comment && (
        <>
          <View style={styles.containerImageProfile}>
            <TouchableRoundedImage
              onPress={()=>{navigate('UserView', {id: user._id})}}
              size={48}
              source={user!.refprofilepic}
            />
            <View style={{flex: 1, backgroundColor: '#fff'}}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 24,
                  marginTop: 6,
                }}>
                {comment?.text}
              </Text>
              <Text style={{color: '#fff', fontSize: 12}}>
                {comment.createdAt}
              </Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default PostItem;
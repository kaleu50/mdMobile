import React, {ReactNode, useEffect, useState} from 'react';
import {View, Image, Text, Alert} from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';

import TouchableRoundedImage from '../TouchableRoundedImage';
import {User} from '../../services/models/user.model';
import * as userService from '../../services/users.service';
import {Comments} from 'src/services/models/comments.model';
import {TextInput} from 'react-native-paper';

interface CommentItemProps {
  comment: Comments;
}

const CommentItem: React.FC<CommentItemProps> = ({comment}) => {
  const [user, setUser] = useState<User | null>(null);

  const {navigate} = useNavigation();

  useEffect(() => {}, [comment]);

  function handleLike() {}

  return (
    <View>
      {comment && (
        <>
          <View style={styles.containerImageProfile}>
            <TouchableRoundedImage
              onPress={() => {
                navigate('UserView', {id: comment.userId._id});
              }}
              size={40}
              source={comment.userId.refprofilepic}
            />
            <View
              style={{
                flexWrap: 'wrap',
                alignItems: 'flex-start',
                flexDirection: 'row',
              }}>
              <Text style={styles.baseText}>{comment?.userId.name}</Text>
              <Text style={styles.msgText}>{comment.text}</Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default CommentItem;

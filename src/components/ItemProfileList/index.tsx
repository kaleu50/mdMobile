import React, {ReactNode, useState} from 'react';
import {View, Image, Text, Button} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {UserProvider} from 'src/contexts/users.context';
import {User} from 'src/services/models/user.model';
import TouchableRoundedImage from '../TouchableRoundedImage';
import * as usersService from '../../services/users.service';

import styles from './styles';
import { useNavigation } from '@react-navigation/native';

interface ItemProfileListProps {
  user: User;
}
const ItemProfileList: React.FC<ItemProfileListProps> = ({user}) => {

  const [following, setFollowing] = useState(user.alreadyFollow)

  const {navigate} = useNavigation();

  function handleFollow(id: string) {
    usersService
      .followById(id)
      .then((res) => {
        setFollowing(true)
      })
      .catch((err) => {});
  }

  function handleUnFollow(id: string) {
    usersService
      .unFollowById(id)
      .then((res) => {
        setFollowing(false)

      })
      .catch((err) => {});
  }
  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <View style={styles.avatar}>
          <TouchableRoundedImage
            source={user.refprofilepic}
            size={58}
            onPress={() => {
              navigate('UserView', {id: user._id});
            }}
          />
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{user.name} </Text>
        </View>
        <View style={styles.profileInfo}>
          {!following ? (
            <RectButton
              onPress={() => handleFollow(user._id)}
              style={styles.contactButton}>
              <Text style={styles.contactButtonText}>Seguir</Text>
            </RectButton>
          ) : (
            <RectButton
              onPress={() => handleUnFollow(user._id)}
              style={styles.contactButton}>
              <Text style={styles.contactButtonText}>Seguindo</Text>
            </RectButton>
          )}
        </View>
      </View>
    </View>
  );
};
export default ItemProfileList;

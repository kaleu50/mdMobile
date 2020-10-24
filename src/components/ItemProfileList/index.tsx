import React, {ReactNode} from 'react';
import {View, Image, Text, Button} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {UserProvider} from 'src/contexts/users.context';
import {User} from 'src/services/models/user.model';
import TouchableRoundedImage from '../TouchableRoundedImage';
import * as usersService from '../../services/users.service';

import styles from './styles';

interface ItemProfileListProps {
  user: User;
}
const ItemProfileList: React.FC<ItemProfileListProps> = ({user}) => {
  function handleFollow(id: string) {
    usersService
      .followById(id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <View style={styles.avatar}>
          <TouchableRoundedImage
            source={user.refprofilepic}
            size={64}
            onPress={() => {}}
          />
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{user.name} </Text>
        </View>
        <View style={styles.profileInfo}>
          <RectButton
            onPress={() => handleFollow(user._id)}
            style={styles.contactButton}>
            <Text style={styles.contactButtonText}>Seguir</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
};
export default ItemProfileList;

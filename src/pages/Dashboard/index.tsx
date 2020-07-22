import React from 'react';
import {View, Button, StyleSheet} from 'react-native';
import {useAuth} from '../../contexts/auth.context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#282a36'
  },
});

interface Props {
  navigation: any;
}

const Dashboard: React.FC<Props> = ({navigation}) => {

  const {logout} = useAuth();

  function handleLogout() {
    // email, senha
    logout();
  }

  return (
    <View style={styles.container}>
      <Button title="Profile" onPress={() => navigation.navigate('Profile')} />
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default Dashboard;

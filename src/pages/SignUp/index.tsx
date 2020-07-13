import React from 'react';
import {View, Button, StyleSheet} from 'react-native';
import {useAuth} from '../../contexts/auth.context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

const SignUp: React.FC = () => {

  function handleSignUp() {
    // email, senha
    console.log('aqui signup');
  }

  return (
    <View style={styles.container}>
      <Button title="Logout" onPress={handleSignUp} />
    </View>
  );
};

export default SignUp;

import React, {useContext, useRef, useState} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import {useAuth} from '../../contexts/auth.context';
import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
} from './styles';
import { LoginRequest } from 'src/services/models/login.model';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#282a36'
  },
});

interface Props {
  navigation: any
};

const SignIn: React.FC<Props> = ({navigation}) => {
  const {signed, signIn} = useAuth();

  const passwordRef = useRef<any>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  console.log(signed);

  function handleSignIn() {
    const requestLogin = {
      email,
      password
    } as LoginRequest;
    // email, senha
    signIn(requestLogin);
  }

  return (
    <Container style={styles.container}>

      <Form>
        <FormInput
          icon="mail-outline"
          keyboardType="email-address"
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Digite seu e-mail"
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current.focus()}
          value={email}
          onChangeText={setEmail}
        />

        <FormInput
          icon="lock-outline"
          secureTextEntry
          placeholder="Sua senha secreta"
          ref={passwordRef}
          returnKeyType="send"
          onSubmitEditing={handleSignIn}
          value={password}
          onChangeText={setPassword}
        />

        <SubmitButton onPress={handleSignIn}>
          Acessar
        </SubmitButton>
      </Form>

      <SignLink onPress={() => navigation.navigate('SignUp')}>
        <SignLinkText>Criar conta gratuita</SignLinkText>
      </SignLink>
    </Container>
    // <View style={styles.container}>
    //   <Button title="Sign In" onPress={handleSignIn} />
    // </View>
  );
};

export default SignIn;

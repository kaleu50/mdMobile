import React, {useContext, useRef, useState} from 'react';
import {View, Button, StyleSheet, Image, Alert} from 'react-native';
import {useAuth} from '../../contexts/auth.context';
import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
} from './styles';
import {LoginRequest} from 'src/services/models/login.model';
import logoImage from '../../assets/images/hearth-beat-1x1.png';
import * as toastService from '../../services/toast.service';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#282a36',
  },
});

interface Props {
  navigation: any;
}

const SignIn: React.FC<Props> = ({navigation}) => {
  const {signed, signIn} = useAuth();

  const passwordRef = useRef<any>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSignIn() {
    if (email === '' || password === '') {
      Alert.alert(
        'Erro',
        'Verifique todos os campos!',
        [{text: 'OK', onPress: () => {}}],
        {cancelable: false},
      );
    } else {
      const requestLogin = {
        email,
        password,
      } as LoginRequest;
      // email, senha
      signIn(requestLogin)
        .then(() => {
          toastService.showToastWithGravity('Bem vindo!');
        })
        .catch((err) => {
          toastService.showToastWithGravity(
            'Por favor verifique o email e senha!',
          );
        });
    }
  }

  return (
    <Container style={styles.container}>
      <Image
        source={logoImage}
        style={{width: 300, height: 300}}
        resizeMode="contain"
      />

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
          placeholder="Digite sua senha"
          ref={passwordRef}
          returnKeyType="send"
          onSubmitEditing={handleSignIn}
          value={password}
          onChangeText={setPassword}
        />

        <SubmitButton onPress={handleSignIn}>Acessar</SubmitButton>
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

import React, {useState, useRef} from 'react';
import {View, Button, StyleSheet, Platform, Picker, Image, Alert} from 'react-native';
import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
} from './styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import {SignUpRequest} from 'src/services/models/signup.model';
import {useUser} from '../../contexts/users.context';
import {useAuth} from '../../contexts/auth.context';
import logoImage from '../../assets/images/hearth-beat-1x1.png';
import * as toastService from '../../services/toast.service';

interface Props {
  navigation: any;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#282a36',
  },
});

const SignUp: React.FC<Props> = ({navigation}) => {
  const emailRef = useRef<any>();
  const passwordRef = useRef<any>();
  const birthdateRef = useRef<any>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date(1598051730000));
  const [show, setShow] = useState(false);
  const [selectedConditionValue, setSelectedConditionValue] = useState('neurologica');

  // const {signUp} = useUser();

  const {signUp} = useAuth();

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  function handleSubmit() {
    if (email === '' || password === '' || name === '' || date === null || selectedConditionValue === '') {
      Alert.alert(
        'Erro',
        'Verifique todos os campos!',
        [{text: 'OK', onPress: () => {}}],
        {cancelable: false},
      );
    } else {
      const data = {
        name,
        email,
        password,
        birthdate: date,
        condition: selectedConditionValue,
      } as SignUpRequest;
      // email, senha
      signUp(data)
        .then(() => {
          toastService.showToastWithGravity('Criado com sucesso!');
          navigation.navigate('SignIn')
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
        style={{width: 300, height: 300, marginTop: -50}}
        resizeMode="contain"
      />

      <Form>
        <FormInput
          icon="person-outline"
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Nome completo"
          returnKeyType="next"
          onSubmitEditing={() => emailRef.current.focus()}
          value={name}
          onChangeText={setName}
        />

        <FormInput
          icon="mail-outline"
          keyboardType="email-address"
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Digite seu e-mail"
          ref={emailRef}
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
          returnKeyType="next"
          onSubmitEditing={() => birthdateRef.current.focus()}
          value={password}
          onChangeText={setPassword}
        />
        <View>
          <Button
            onPress={showDatepicker}
            title="Data de nascimento"
            ref={birthdateRef}
          />
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={'date'}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}

        <Picker
          selectedValue={selectedConditionValue}
          style={{color: '#fff'}}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedConditionValue(itemValue)
          }>
          <Picker.Item label="Condição Neurológica" value="neurologica" />
          <Picker.Item label="Condição Hormonal" value="hormonal" />
          <Picker.Item label="Condição Psiquiatrica" value="psiquiatrica" />
          <Picker.Item label="Condição Pulmonar" value="pulmonar" />
          <Picker.Item label="Condição Ginecológica" value="ginecologica" />
          <Picker.Item label="Condição Cardíaca" value="cardiaca" />
          <Picker.Item label="Outros" value="outros" />
        </Picker>

        <SubmitButton onPress={handleSubmit}>Criar conta</SubmitButton>
      </Form>

      <SignLink onPress={() => navigation.navigate('SignIn')}>
        <SignLinkText>Já tenho conta</SignLinkText>
      </SignLink>
    </Container>
  );
};

export default SignUp;

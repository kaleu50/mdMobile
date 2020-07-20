import React, {useState, useRef} from 'react';
import {View, Button, StyleSheet, Platform, Picker} from 'react-native';
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
import { Text } from 'src/components/Button/styles';

interface Props {
  navigation: any;
}

const SignUp: React.FC<Props> = ({navigation}) => {
  const emailRef = useRef<any>();
  const passwordRef = useRef<any>();
  const birthdateRef = useRef<any>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date(1598051730000));
  const [show, setShow] = useState(false);
  const [selectedConditionValue, setSelectedConditionValue] = useState('');

  const {updateUser} = useUser();

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  function handleSubmit() {
    const requestLogin = {
      name,
      email,
      password,
      birthdate: date,
      condition: selectedConditionValue,
    } as SignUpRequest;
    // email, senha
    updateUser(requestLogin);
  }

  return (
    <Container>
      <Form>
        <View
          style={{
            backgroundColor: '#bcbec1',
            alignItems: 'center',
            justifyContent: 'center',
            width: 80,
            height: 80,
            borderRadius: 40,
            alignSelf: 'center',
            marginBottom: 20,
          }}>
          <Text style={{color: 'white', fontSize: 28}}>JD</Text>
        </View>
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
            title="Show date picker!"
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
          style={{height: 50, width: 150}}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedConditionValue(itemValue)
          }>
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>

        <SubmitButton onPress={handleSubmit}>Criar conta</SubmitButton>
      </Form>

      <SignLink onPress={() => navigation.navigate('SignIn')}>
        <SignLinkText>Já tenho conta</SignLinkText>
      </SignLink>
    </Container>
  );
};

export default Profile;

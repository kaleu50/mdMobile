import React, {useState, useRef} from 'react';
import {View, Button, StyleSheet, Platform, Picker, Image} from 'react-native';
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
import {useUser, UserProvider} from '../../contexts/users.context';
import {Text} from '../../components/Button/styles';
import {useAuth} from '../../contexts/auth.context';

interface Props {
  navigation: any;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#282a36',
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
});

const Profile: React.FC<Props> = ({navigation}) => {
  const {user} = useAuth();

  const emailRef = useRef<any>();
  const passwordRef = useRef<any>();
  const birthdateRef = useRef<any>();

  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState('');
  const [name, setName] = useState(user?.name);
  const [date, setDate] = useState(new Date(1598051730000));
  const [show, setShow] = useState(false);
  const [selectedConditionValue, setSelectedConditionValue] = useState(
    user?.condition,
  );

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
    const requestUpdate = {
      name,
      email,
      password,
      birthdate: date,
      condition: selectedConditionValue,
    } as SignUpRequest;
    // email, senha
    updateUser(requestUpdate);
  }

  return (
    <Container style={styles.container}>
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
          <Image
            style={styles.tinyLogo}
            source={{
              uri:
                'https://www.google.fr/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
            }}
          />
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
    </Container>
  );
};

export default Profile;

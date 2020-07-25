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
import ImagePicker from 'react-native-image-picker';

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

const optionsImagePicker = {
  title: 'Select Avatar',
  customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const Profile: React.FC<Props> = ({navigation}) => {
  const {user} = useAuth();
  const {updateUser, updateProfilePic} = useUser();

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

  function handleImage() {
    ImagePicker.showImagePicker(optionsImagePicker, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // const source = { image: response.data };
        //   formdata.append('image',{
        //     uri: Platform.OS === 'android' ? photo.uri : 'file://' + photo.uri,
        //     name: 'test',
        //     type: 'image/jpeg' // or your mime type what you want
        // });
        const uploadImage = {
          imageBase64: 'data:' + response.type + ';base64,' + response.data,
        };

        // console.log(uploadImage);
        updateProfilePic(uploadImage);

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        // this.setState({
        //   avatarSource: source,
        // });
      }
    });
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
        <SubmitButton onPress={handleImage}>Alterar foto</SubmitButton>

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

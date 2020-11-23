import React, {useState, useRef} from 'react';
import {View, Button, StyleSheet, Platform, Picker, Image} from 'react-native';
import {Container, Form, FormInput, SubmitButton} from './styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import {SignUpRequest} from 'src/services/models/signup.model';
import {useUser} from '../../contexts/users.context';
import {useAuth} from '../../contexts/auth.context';
import ImagePicker from 'react-native-image-picker';
import TouchableRoundedImage from '../../components/TouchableRoundedImage';
import PageHeader from '../../components/PageHeader';

interface Props {
  navigation: any;
}

const styles = StyleSheet.create({
  containerImage: {
    marginTop: -64,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#282a36',
  },
  tinyLogo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    overflow: 'hidden',
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
  const {user, updateToken, updateLocalUser} = useAuth();
  const {updateUser, updateProfilePic, getUserById} = useUser();

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

  async function handleSubmit() {
    const requestUpdate = {
      name,
      email,
      password,
      birthdate: date,
      condition: selectedConditionValue,
    } as SignUpRequest;

    const resToken = await updateUser(requestUpdate);
    await updateToken(resToken);
    const resUserUpdated = await getUserById(user!._id);
    await updateLocalUser(resUserUpdated);
  }

  function handleImage() {
    ImagePicker.showImagePicker(optionsImagePicker, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const uploadImage = {
          imageBase64: 'data:' + response.type + ';base64,' + response.data,
        };

        updateProfilePic(uploadImage);
        getUserById(user!._id);
        updateLocalUser({...user, refprofilepic: uploadImage.imageBase64});
      }
    });
  }

  return (
    <>
      <View style={{backgroundColor: '#282a36'}}>
        <PageHeader hasSearch={false} isLogout={false} />
      </View>

      <Container style={styles.container}>
        <Form>
          <View style={styles.containerImage}>
            <TouchableRoundedImage
              onPress={handleImage}
              size={128}
              source={user!.refprofilepic}
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
            <Picker.Item label="Cardiaco" value="cardio" />
            <Picker.Item label="Hepatico" value="hepatio" />
            <Picker.Item label="Outros" value="outros" />
          </Picker>

          <SubmitButton onPress={handleSubmit}>Atualizar conta</SubmitButton>
        </Form>
      </Container>
    </>
  );
};

export default Profile;

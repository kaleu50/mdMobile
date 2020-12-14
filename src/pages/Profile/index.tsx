import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Button,
  StyleSheet,
  Platform,
  Picker,
  Image,
  Alert,
  Text,
} from 'react-native';
import {Container, Form, FormInput, SubmitButton} from './styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import {SignUpRequest} from 'src/services/models/signup.model';
import {useUser} from '../../contexts/users.context';
import {useAuth} from '../../contexts/auth.context';
import ImagePicker from 'react-native-image-picker';
import TouchableRoundedImage from '../../components/TouchableRoundedImage';
import PageHeader from '../../components/PageHeader';
import * as toastService from '../../services/toast.service';
import {User} from 'src/services/models/user.model';
import * as userService from '../../services/users.service';
import { useFocusEffect } from '@react-navigation/native';

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
  name: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  profileDetail: {
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    overflow: 'hidden',
  },
  detailContent: {
    margin: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#bd93f9',
  },
  count: {
    fontSize: 18,
  },
});

const optionsImagePicker = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const Profile: React.FC<Props> = ({navigation}) => {
  const {user, updateToken, updateLocalUser} = useAuth();
  const {updateUser, updateProfilePic, getUserById} = useUser();
  const [userInfo, setUserInfo] = useState<User | null>(null);

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
    if (
      email === '' ||
      name === '' ||
      date === null ||
      selectedConditionValue === ''
    ) {
      Alert.alert(
        'Erro',
        'Verifique todos os campos!',
        [{text: 'OK', onPress: () => {}}],
        {cancelable: false},
      );
    } else {
      const requestUpdate = {
        name,
        email,
        password,
        birthdate: date,
        condition: selectedConditionValue,
      } as SignUpRequest;

      const resToken = await updateUser(requestUpdate).then(() => {
        toastService.showToastWithGravity('Atualizado com sucesso!');
      });
      await updateToken(resToken);
      const resUserUpdated = await getUserById(user!._id);
      await updateLocalUser(resUserUpdated);
    }
  }

  function getUser() {
    userService.getUserById(user!.id).then((res) => {
      setUserInfo(res);
      console.log('aqqq')
    });
  }

  function handleImage() {
    ImagePicker.showImagePicker(optionsImagePicker, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const uploadImage = {
          imageBase64: 'data:' + response.type + ';base64,' + response.data,
        };

        updateProfilePic(uploadImage);
        getUserById(user!.id);
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
          {userInfo && (
            <View style={styles.profileDetail}>
              <View style={styles.detailContent}>
                <Text style={styles.title}>Posts</Text>
                <Text style={styles.count}>{userInfo?.posts.length}</Text>
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.title}>Seguidores</Text>
                <Text style={styles.count}>{userInfo?.follow.length}</Text>
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.title}>Seguindo</Text>
                <Text style={styles.count}>{userInfo?.followedby.length}</Text>
              </View>
            </View>
          )}
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
            <Picker.Item label="Condição Neurológica" value="neurologica" />
            <Picker.Item label="Condição Hormonal" value="hormonal" />
            <Picker.Item label="Condição Psiquiatrica" value="psiquiatrica" />
            <Picker.Item label="Condição Pulmonar" value="pulmonar" />
            <Picker.Item label="Condição Ginecológica" value="ginecologica" />
            <Picker.Item label="Condição Cardíaca" value="cardiaca" />
            <Picker.Item label="Outros" value="outros" />
          </Picker>

          <SubmitButton onPress={handleSubmit}>Atualizar conta</SubmitButton>
        </Form>
      </Container>
    </>
  );
};

export default Profile;

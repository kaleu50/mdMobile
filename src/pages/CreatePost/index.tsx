import React, {useState} from 'react';
import {Image, Text, View} from 'react-native';
import {RectButton, TouchableOpacity} from 'react-native-gesture-handler';
import PageHeader from '../../components/PageHeader';
import ImagePicker from 'react-native-image-picker';

import styles, {FormInput, SubmitButton} from './styles';
import {PostCreate} from 'src/services/models/posts.model';
import * as postsService from '../../services/posts.service';

interface Props {
  navigation: any;
}

const optionsImagePicker = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const CreatePost: React.FC<Props> = ({navigation}) => {
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  function handleImage() {
    ImagePicker.showImagePicker(optionsImagePicker, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const uploadImage =
          'data:' + response.type + ';base64,' + response.data;
        setImage(uploadImage);
      }
    });
  }

  function handleSubmit() {
    const data = {
      title: description,
      imageBase64: image,
    } as PostCreate;

    postsService
      .createPost(data)
      .then((res) => {
      })
      .catch((err) => {
      });
  }

  return (
    <View style={styles.container}>
      <PageHeader hasSearch={false} isLogout={false} />
      <View>
        {image === '' ? (
          <RectButton style={styles.contactButton} onPress={handleImage}>
            <Text style={styles.contactButtonText}>Sua Imagem</Text>
          </RectButton>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setImage('');
            }}>
            <Image
              style={{
                alignSelf: 'stretch',
                height: 300,
              }}
              source={{uri: image}}
            />
          </TouchableOpacity>
        )}
      </View>
      <FormInput
        icon="description"
        autoCorrect={false}
        autoCapitalize="none"
        placeholder="Descrição"
        returnKeyType="next"
        value={description}
        onChangeText={setDescription}
      />

      <View style={{marginTop: 180}}>
        <SubmitButton onPress={handleSubmit}>Publicar</SubmitButton>
      </View>
    </View>
  );
};

export default CreatePost;

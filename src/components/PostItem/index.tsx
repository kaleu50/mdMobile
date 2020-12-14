import React, {useEffect, useState} from 'react';
import {View, Image, Text, Alert, TouchableOpacity} from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';

import TouchableRoundedImage from '../TouchableRoundedImage';
import {Divider, IconButton, Menu, Provider} from 'react-native-paper';
import {User} from '../../services/models/user.model';
import {Post} from '../../services/models/posts.model';
import * as userService from '../../services/users.service';
import * as likesService from '../../services/likes.service';
import {CreateLike} from 'src/services/models/likes.model';
import {useAuth} from '../../contexts/auth.context';
// import { format } from "date-fns";
import * as postsService from '../../services/posts.service';
import * as toastService from '../../services/toast.service';
import CommentItem from '../CommentItem';

interface PostItemProps {
  post: Post;
  onDelete?: any;
}

const PostItem: React.FC<PostItemProps> = ({post,onDelete}) => {
  const [userPost, setUserPost] = useState<User | null>(null);
  const [isLiked, setIsLiked] = useState(post.liked);
  const [numbersLike, setNumbersLike] = useState(post.likes || 0);
  const [visible, setVisible] = React.useState(false);
  const {user} = useAuth();

  const {navigate} = useNavigation();

  useEffect(() => {
    getUser();
    console.log('isLiked', isLiked)
  }, [post]);

  function handleLike() {
    let likes = numbersLike;
    const data = {
      post: post._id,
      userId: userPost?._id,
    } as CreateLike;
    likesService.createLike(post._id, data).then((res) => {
      setIsLiked(!isLiked);
      isLiked ? likes-- : likes++;
      setNumbersLike(likes);
    });
  }

  function getUser() {
    userService.getUserById(post.userId).then((res) => {
      setUserPost(res);
    });
  }

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  function deletePost(postId: string) {
    Alert.alert(
      'Deletar',
      'Deseja realmente deletar o post?',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Deletar',
          onPress: () => {
            postsService.deletePost(postId).then((res) => {
              toastService.showToastWithGravity('Seu post foi deletado!');
              onDelete
            });
          },
        },
      ],
      {cancelable: true},
    );
  }

  return (
    <Provider>
      <View style={{marginBottom: 20}}>
        {userPost && (
          <>
            <View style={styles.containerImageProfile}>
              <TouchableRoundedImage
                onPress={() => {
                  navigate('UserView', {id: userPost._id});
                }}
                size={48}
                source={userPost!.refprofilepic}
              />
              <View style={{flex: 1}}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 18,
                    marginTop: 10,
                  }}>
                  {userPost?.name}
                </Text>
                <TouchableOpacity  onPress={() => {navigate('PostView', {id: post._id})}}>
                  <Text style={{color: '#fff', fontSize: 12}}>
                    {post.createdAt}
                  </Text>
                </TouchableOpacity>
              </View>
              {userPost._id === user?.id && (
                <Menu
                  style={{marginTop: -80}}
                  visible={visible}
                  onDismiss={closeMenu}
                  anchor={
                    <IconButton
                      icon="more"
                      color={'#fff'}
                      size={26}
                      onPress={openMenu}
                    />
                  }>
                  <Menu.Item
                    onPress={() => deletePost(post._id)}
                    title="Deletar"
                  />
                </Menu>
              )}
            </View>

            <View style={styles.postContainer}>
              <Image style={styles.imagePost} source={{uri: post.refpostpic}} />
            </View>
            <View style={styles.toolsContainer}>
              <View style={styles.buttonContainer}>
                <IconButton
                  icon={!isLiked ? 'heart-outline' : 'heart'}
                  color={'#8257e5'}
                  size={26}
                  onPress={handleLike}
                />
                <Text style={{color: '#fff', fontSize: 14, marginTop: 14}}>
                  {numbersLike || 0}
                </Text>
              </View>
              <View style={styles.buttonContainer}>
                <IconButton
                  icon="comment-outline"
                  color={'#8257e5'}
                  size={26}
                  onPress={() => console.log('Pressed')}
                />
                <Text style={{color: '#fff', fontSize: 14, marginTop: 14}}>
                  {post.comments.length || 0}
                </Text>
              </View>
            </View>
            <View style={styles.containerImageProfileTitle}>
              <View
                style={{
                  flexWrap: 'wrap',
                  alignItems: 'flex-start',
                  flexDirection: 'row',
                }}>
                <Text style={styles.baseText}>{userPost?.name}</Text>
                <Text style={styles.msgText}>{post.title}</Text>
              </View>
            </View>
          </>
        )}
      </View>
    </Provider>
  );
};

export default PostItem;
//#8257e5

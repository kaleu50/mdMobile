import React, {Component, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TextInput,
} from 'react-native';
import TouchableSquareImage from '../../components/TouchableSquareImage';
import {User} from 'src/services/models/user.model';
import PageHeader from '../../components/PageHeader';
import * as postService from '../../services/posts.service';
import {Post} from 'src/services/models/posts.model';

import styles from './styles';
import {Comments} from 'src/services/models/comments.model';
import PostItem from '../../components/PostItem';

interface Props {
  route: any;
}

const PostView: React.FC<Props> = ({route}) => {
  const [user, setUser] = useState<User | null>(null);
  const [post, setPost] = useState<Post | null>(null);
  const [msg, setMsg] = useState<string>('');

  const [comments, setComments] = useState<Comments[]>([]);

  const {postId} = route.params;

  useEffect(() => {
    getPost(postId);
  }, []);

  function getPost(id: string) {
    postService.getPostById(id).then((res) => {
      setPost(res);
      console.log('post', res);
      // getComments(post!._id);
    });
  }

  function getComments(id: string) {
    postService.getPostCommentsById(id).then((res) => {
      setComments(res);
    });
  }

  function renderComment(post: Post) {}

  return (
    <View style={styles.container}>
      <PageHeader hasSearch={false} isLogout={false} />
      <ScrollView>{post && <PostItem post={post}></PostItem>}</ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputs}
          placeholder="Digite um comentario... "
          value={msg}
          blurOnSubmit={false}
          placeholderTextColor={'#fff'}
          underlineColorAndroid="transparent"
          onChangeText={(text) => setMsg(text)}
          returnKeyType="send"
        />
      </View>
    </View>
  );
};

export default PostView;

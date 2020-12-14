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
import * as conmmentsService from '../../services/comments.service';

import {Post} from 'src/services/models/posts.model';

import styles from './styles';
import {CommentCreate, Comments} from 'src/services/models/comments.model';
import PostItem from '../../components/PostItem';
import CommentItem from '../../components/CommentItem';

interface Props {
  route: any;
}

const PostView: React.FC<Props> = ({route}) => {
  const [user, setUser] = useState<User | null>(null);
  const [post, setPost] = useState<Post | null>(null);
  const [msg, setMsg] = useState<string>('');

  const [comments, setComments] = useState<Comments[]>([]);

  const {id} = route.params;

  useEffect(() => {
    getPost(id);
  }, []);

  function getPost(id: string) {
    postService.getPostById(id).then((res) => {
      setPost(res);
      getComments(res._id);
    });
  }

  function getComments(id: string) {
    conmmentsService.getPostCommentsById(id).then((res) => {
      setComments(res);
    });
  }

  function handleSubmit() {
    const data = {
      post: post?._id,
      text: msg,
    } as CommentCreate;
    conmmentsService.createComment(data).then((res) => {
      getComments(post!._id);
      setMsg('');
    });
  }

  function renderComment(post: Post) {}

  return (
    <View style={styles.container}>
      <PageHeader hasSearch={false} isLogout={false} />
      <ScrollView style={{marginBottom: 80}}>
        {post && <PostItem post={post}></PostItem>}
        {comments &&
          comments.map((item) => <CommentItem  key={item._id} comment={item}></CommentItem>)}
      </ScrollView>
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
          onSubmitEditing={handleSubmit}
        />
      </View>
    </View>
  );
};

export default PostView;

import React, { useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
} from 'react-native';
import TouchableSquareImage from '../../components/TouchableSquareImage';
import {User} from 'src/services/models/user.model';
import PageHeader from '../../components/PageHeader';
import * as userService from '../../services/users.service';
import * as postService from '../../services/posts.service';
import {Post} from 'src/services/models/posts.model';

import styles from './styles';
import { useNavigation } from '@react-navigation/native';

interface Props {
  route: any;
}

const UserView: React.FC<Props> = ({route}) => {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  

  const {navigate} = useNavigation();


  const {id} = route.params;

  useEffect(() => {
    getUser();
  }, []);

  function getUser() {
    userService.getUserById(id).then((res) => {
      setUser(res);
      getPosts(res._id);
    });
  }

  function getPosts(id: string) {
    postService.getPostsById(id).then((res) => {
      setPosts(res);
    });
  }

  function renderPost(post: Post) {
    return (
      <TouchableSquareImage
        size={116}
        key={post._id}
        source={post.refpostpic}
        onPress={() => {navigate('PostView', {postId: user?._id})}}></TouchableSquareImage>
        
    );
  }
  return (
    <>
      {user && (
        <View style={styles.container}>
          <PageHeader hasSearch={false} isLogout={false} />

          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Image
                style={styles.avatar}
                source={{uri: user!.refprofilepic}}
              />
              <Text style={styles.name}>{user?.name}</Text>
            </View>
          </View>

          <View style={styles.profileDetail}>
            <View style={styles.detailContent}>
              <Text style={styles.title}>Posts</Text>
              <Text style={styles.count}>{user?.posts.length}</Text>
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.title}>Seguidores</Text>
              <Text style={styles.count}>{user?.follow.length}</Text>
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.title}>Seguindo</Text>
              <Text style={styles.count}>{user?.followedby.length}</Text>
            </View>
          </View>

          <View>
            <View style={styles.bodyContent}>
              <FlatList
                data={posts}
                numColumns={3}
                renderItem={({item}) => renderPost(item)}
                keyExtractor={(item) => item._id}
              />
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default UserView;

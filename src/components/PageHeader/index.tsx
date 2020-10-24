import React, {ReactNode, useState} from 'react';
import {View, Image, Text} from 'react-native';
import styles from './styles';
import {BorderlessButton} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

import backIcon from '../../assets/images/icons/back.png';
import logoImage from '../../assets/images/logo.png';
import {useAuth} from '../../contexts/auth.context';
import {FormInput} from '../../pages/SignIn/styles';

interface PageHeaderProps {
  isLogout?: boolean;
  hasSearch?: boolean;
  headerRight?: ReactNode;
  searchTextInput?: string;
  onSearchTextChange?: any;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  hasSearch,
  isLogout,
  headerRight,
  searchTextInput,
  onSearchTextChange,
}) => {
  const {navigate, goBack} = useNavigation();

  const {logout} = useAuth();

  function handleGoBack() {
    if (!isLogout) {
      goBack();
    } else {
      logout();
    }
  }

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <BorderlessButton onPress={handleGoBack}>
            <Image source={backIcon} resizeMode="contain" />
          </BorderlessButton>
          {hasSearch ? (
            <FormInput
              style={{width: 250}}
              icon="search"
              placeholder="Pesquisar..."
              value={searchTextInput}
              onChange={onSearchTextChange}
            />
          ) : null}
          <Text style={styles.logo}>SH</Text>
        </View>
      </View>
    </View>
  );
};

export default PageHeader;
//#8257e5

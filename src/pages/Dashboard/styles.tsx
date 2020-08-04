import {Platform, StyleSheet, Image} from 'react-native';
import styled from 'styled-components/native';


export const Container = styled.KeyboardAvoidingView.attrs({
    enabled: Platform.OS === 'ios',
    behavior: 'padding',
  })`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 0 30px;
  `;
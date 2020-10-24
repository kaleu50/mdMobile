import {Platform, StyleSheet, Image} from 'react-native';
import styled from 'styled-components/native';

import Input from '../../components/Input';
import Button from '../../components/Button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#282a36',
  },
  postContainer: {
    flex: 1,
    overflow: 'hidden',
    alignItems: 'center',
    backgroundColor: '#bd93f9',
    position: 'relative',
    margin: 10,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  imagePost: {
    width: 400,
    height: 400,
    flex: 1,
  },
  containerImageProfile: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  contactButton: {
    backgroundColor: '#1E6E72',
    height: 300,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',

  },

  contactButtonText: {
    color: '#fff',
    fontFamily: 'Archivo_700Bold',
    fontSize: 16,
  },
});

export default styles;

export const FormInput = styled(Input)`
  margin-top: 20px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
`;
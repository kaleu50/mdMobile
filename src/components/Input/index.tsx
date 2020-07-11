import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, TInput } from './styles';

interface propsIputs {
  style: {};
  icon: string;
  rest: any;
}

const Input: React.FC<propsIputs> = ({ style, icon, ...rest }: propsIputs, ref: any) => {
  return (
    <Container style={style}>
      {icon && <Icon name={icon} size={20} color="rgba(255, 255, 255, 0.6)" />}
      <TInput {...rest} ref={ref} />
    </Container>
  );
}

Input.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  icon: PropTypes.string,
} as any;

Input.defaultProps = {
  style: {},
  icon: null,
} as any;
//@ts-ignore
export default forwardRef(Input);
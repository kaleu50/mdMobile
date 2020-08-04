import React, {forwardRef} from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {View, Image, StyleSheet} from 'react-native';

interface propsInputs {
  onPress: any;
  size: number;
  source: string;
}

const getStyles = (size: number) =>
  StyleSheet.create({
    profileImgContainer: {
      margin: 8,
      height: size + 2,
      width: size + 2,
      borderRadius: size / 2 + 1,
      borderWidth: 1,
    },
    profileImg: {
      height: size,
      width: size,
      borderRadius: size / 2,
    },
  });

const TouchableRoundedImage: React.FC<propsInputs> = (
  {onPress, size, source}: propsInputs,
  ref: any,
) => {
  const styles = getStyles(size);
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.profileImgContainer}>
        <Image
          style={styles.profileImg}
          source={{
            uri: source,
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

TouchableRoundedImage.propTypes = {
  onPress: PropTypes.func,
  size: PropTypes.number,
  source: PropTypes.string,
} as any;

TouchableRoundedImage.defaultProps = {
  onPress: () => {},
} as any;

//@ts-ignore
export default forwardRef(TouchableRoundedImage);

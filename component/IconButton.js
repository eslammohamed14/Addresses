import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';

const IconButton = ({containerStyle, icon, iconStyle, onPress}) => {
  return (
    <TouchableOpacity style={containerStyle} onPress={onPress}>
      <Image
        source={icon}
        style={[
          styles.image,
          {
            ...iconStyle,
          },
        ]}
      />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  image: {
    width: 30,
    height: 30,
    //tintColor: COLORS.white,
  },
});
export default IconButton;

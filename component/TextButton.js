import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import {SIZES} from '../constants';

const TextButton = ({
  buttonContainerStyle,
  loading,
  label,
  labelStyle,
  onPress,
  disabled,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          ...buttonContainerStyle,
        },
      ]}
      disabled={disabled}
      onPress={onPress}>
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text
          style={[
            styles.labelText,
            {
              ...labelStyle,
            },
          ]}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  labelText: {
    fontSize: SIZES.h3,
    lineHeight: 22,
  },
});

export default TextButton;

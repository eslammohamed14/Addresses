import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../constants';

const Header = ({
  containerStyle,
  title,
  titleStyle,
  leftComponent,
  rightComponent,
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          ...containerStyle,
        },
      ]}>
      {/* left */}
      {leftComponent}

      {/* title */}
      <View style={styles.title}>
        <Text
          style={[
            styles.titleText,
            {
              ...titleStyle,
            },
          ]}>
          {title}
        </Text>
      </View>
      {/* right */}
      {rightComponent}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',

    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray1,
  },
  title: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: SIZES.h2,
    lineHeight: 22,
  },
});

export default Header;

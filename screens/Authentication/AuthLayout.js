import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {SIZES, COLORS} from '../../constants';

const AuthLayout = ({title, children}) => {
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.title}>
          <Text style={styles.titleText}>{title}</Text>
        </View>

        {/* children */}

        {children}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: SIZES.padding,
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
  },
  title: {
    marginTop: SIZES.padding,
    alignItems: 'center',
  },
  titleText: {
    textAlign: 'center',
    fontSize: SIZES.h1,
    lineHeight: 30,
  },
});

export default AuthLayout;

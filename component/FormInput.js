import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from 'react-native';

import {SIZES, COLORS} from '../constants';

const FormInput = ({
  containerStyle,
  inputContainerStyle,
  label,
  labelStyle,
  placeholder,
  inputStyle,
  prependComponent,
  appendComponent,
  onChange,
  secureTextEntry,
  keyboardType = 'default',
  autoCompleteType = 'off',
  autoCapitaliza = 'none',
  errorMsg = '',
  maxLength,
  value,
}) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{...containerStyle}}>
        {/* label & error message */}
        <View style={styles.label}>
          <Text
            style={{
              ...labelStyle,
            }}>
            {label}
          </Text>

          <Text style={styles.labelText}>{errorMsg}</Text>
        </View>

        {/* textInput */}
        <View
          style={[
            styles.inputContainer,
            {
              ...inputContainerStyle,
            },
          ]}>
          {prependComponent}

          <TextInput
            placeholder={placeholder}
            style={{
              flex: 1,
              ...inputStyle,
            }}
            value={value}
            onChangeText={text => onChange(text)}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitaliza}
            autoCompleteType={autoCompleteType}
            maxLength={maxLength}
          />

          {appendComponent}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  label: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelText: {
    color: COLORS.red,
    fontSize: SIZES.body4,
    lineHeight: 22,
  },
  inputContainer: {
    flexDirection: 'row',
    height: 55,
    paddingHorizontal: SIZES.padding,
    marginTop: SIZES.base,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.lightGray2,
  },
});

export default FormInput;

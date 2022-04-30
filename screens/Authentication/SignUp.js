import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

import {SIZES, COLORS, icons, LocalStorage} from '../../constants';
import AuthLayout from './AuthLayout';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {FormInput, TextButton} from '../../component';
import {utils} from '../../utils';
import {useNavigation} from '@react-navigation/native';

const SignUp = ({}) => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const [showPass, setShowPass] = useState(false);

  const isEnableSignUp = () => {
    return (
      email !== '' &&
      password !== '' &&
      emailError === '' &&
      passwordError === ''
    );
  };

  /*********************sign up************************ */

  const signUpUser = (email, password) => {
    console.log(email, '\n', password, '\n', 'data');
    setLoading(true);
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({user}) => {
        LocalStorage.storeData('Token', user.getIdToken(true));

        navigation.navigate('SignIn');
      })
      .catch(er => {
        console.log(er, 'signupError');
        setLoading(false);
        alert('Check Your Information');
      });
  };

  return (
    <AuthLayout title={'Getting Started'}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/********* * text inputs **********/}

          {/* email */}
          <FormInput
            label={'Email'}
            labelStyle={styles.labelStyle}
            keyboardType="email-address"
            autoCompleteType="email"
            onChange={value => {
              utils.validateEmail(value, setEmailError);
              setEmail(value);
            }}
            errorMsg={emailError}
            appendComponent={
              <View style={styles.iconContainer}>
                <Image
                  source={
                    email === '' || (email !== '' && emailError === '')
                      ? icons.correct
                      : icons.cross
                  }
                  style={[
                    styles.icon,
                    {
                      tintColor:
                        email === ''
                          ? COLORS.gray
                          : email !== '' && emailError === ''
                          ? COLORS.green
                          : COLORS.red,
                    },
                  ]}
                />
              </View>
            }
          />

          {/* pass */}
          <FormInput
            label={'Password'}
            secureTextEntry={!showPass}
            labelStyle={styles.labelStyle}
            //keyboardType="password"
            autoCompleteType="password"
            onChange={value => {
              utils.validatePassword(value, setPasswordError);
              setPassword(value);
            }}
            containerStyle={{
              marginTop: SIZES.radius,
            }}
            errorMsg={passwordError}
            appendComponent={
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => setShowPass(!showPass)}>
                <Image
                  source={showPass ? icons.eye_close : icons.eye}
                  style={[
                    styles.icon,
                    {
                      tintColor: COLORS.gray,
                    },
                  ]}
                />
              </TouchableOpacity>
            }
          />

          {/* sign up */}
          <View style={styles.buttonContainer}>
            <TextButton
              label={'Sign Up'}
              loading={loading}
              disabled={isEnableSignUp() ? false : true}
              labelStyle={{
                color: COLORS.white,
              }}
              buttonContainerStyle={{
                backgroundColor: isEnableSignUp()
                  ? COLORS.primary
                  : COLORS.transparentPrimray,
                width: '100%',
                height: 60,
                borderRadius: SIZES.radius,
              }}
              onPress={() => {
                signUpUser(email, password);
              }}
            />
          </View>

          {/* sign in */}

          <View style={styles.signIn}>
            <Text style={styles.signInText}>Already have an account?</Text>
            <TextButton
              label={'Sign In'}
              labelStyle={styles.signInLabel}
              onPress={() => navigation.navigate('SignIn')}
            />
          </View>
        </View>
      </ScrollView>
    </AuthLayout>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: SIZES.padding * 2,
  },
  labelStyle: {
    color: COLORS.gray,
    fontSize: SIZES.body4,
    lineHeight: 22,
  },
  iconContainer: {
    width: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  icon: {
    height: 20,
    width: 20,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: SIZES.padding,
  },
  signIn: {
    flexDirection: 'row',
    marginTop: SIZES.radius,
    justifyContent: 'center',
  },
  signInText: {
    fontSize: SIZES.body3,
    lineHeight: 22,
    color: COLORS.gray,
  },
  signInLabel: {
    color: COLORS.primary,
    fontSize: SIZES.body3,
    lineHeight: 22,
    paddingLeft: SIZES.base,
  },
});

export default SignUp;

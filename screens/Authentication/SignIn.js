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

import {FormInput, TextButton} from '../../component';
import {utils} from '../../utils';
import {useNavigation} from '@react-navigation/native';

const SignIn = props => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  function isEnableSignIn() {
    return !!email && !!password && !emailError && !passwordError;
  }

  const loginUser = async () => {
    setLoading(true);

    await auth()
      .signInWithEmailAndPassword(email, password)
      .then(({user}) => {
        LocalStorage.storeData('Token', user.getIdToken());
        setEmail('');
        setPassword('');
        setLoading(false);
        props.refresh();
      })
      .catch(e => {
        alert('Check Your Information');
        setLoading(false);
      });
  };

  return (
    <AuthLayout title={"Let's Sign You In"}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* text inputs */}
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

          <FormInput
            label={'Password'}
            labelStyle={styles.labelStyle}
            secureTextEntry={!showPass}
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

          {/* sign in */}
          <View style={styles.buttonContainer}>
            <TextButton
              label={'Sign In'}
              loading={loading}
              disabled={isEnableSignIn() ? false : true}
              labelStyle={{
                color: COLORS.white,
              }}
              buttonContainerStyle={{
                ...styles.logInButton,
                backgroundColor: isEnableSignIn()
                  ? COLORS.primary
                  : COLORS.transparentPrimray,
              }}
              onPress={loginUser}
            />
          </View>

          {/* sign up */}

          <View style={styles.signUp}>
            <Text style={styles.signUpText}>Don't have an account?</Text>
            <TextButton
              label={'Sign Up'}
              labelStyle={styles.signUpLabel}
              onPress={() => navigation.navigate('SignUp')}
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
  signUp: {
    flexDirection: 'row',
    marginTop: SIZES.radius,
    justifyContent: 'center',
  },
  signUpText: {
    fontSize: SIZES.body3,
    lineHeight: 22,
    color: COLORS.gray,
  },
  signUpLabel: {
    color: COLORS.primary,
    fontSize: SIZES.body3,
    lineHeight: 22,
    paddingLeft: SIZES.base,
  },
  logInButton: {
    fontSize: SIZES.h3,
    lineHeight: 22,
    width: '100%',
    borderRadius: SIZES.radius,
    height: 60,
  },
});

export default SignIn;

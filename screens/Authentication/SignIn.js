import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

import {SIZES, COLORS, icons, images, LocalStorage} from '../../constants';
import AuthLayout from './AuthLayout';
import auth from '@react-native-firebase/auth';

import {FormInput, TextButton} from '../../component';
import {utils} from '../../utils';
import {useNavigation} from '@react-navigation/native';

const SignIn = props => {
  const navigation = useNavigation();

  const [initializing, setInitializing] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  function onAuthStateChanged(user) {
    setEmail(email);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  function isEnableSignIn() {
    return (
      email !== '' &&
      password !== '' &&
      emailError === '' &&
      passwordError === ''
    );
  }

  const loginUser = async (email, password) => {
    setLoading(true);
    console.log(email, password, 'data');

    await auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        console.log(user, 'user');
        LocalStorage.storeData('Token', email);
        setEmail('');
        setPassword('');
        setLoading(false);
        //instead of navigate
        props.refresh();
        //navigation.navigate('Home');
      })
      .catch(e => {
        console.log(e, '==========');
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
                fontSize: SIZES.h3,
                lineHeight: 22,
                width: '100%',
                borderRadius: SIZES.radius,
                height: 60,
                backgroundColor: isEnableSignIn()
                  ? COLORS.primary
                  : COLORS.transparentPrimray,
              }}
              onPress={() => {
                loginUser(email, password);
              }}
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
});

export default SignIn;

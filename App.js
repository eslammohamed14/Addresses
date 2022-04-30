import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {LocalStorage} from './constants';

import SignIn from './screens/Authentication/SignIn';
import SignUp from './screens/Authentication/SignUp';
import Home from './screens/Home/Home';
import AddPlace from './screens/Places/AddPlace';
import PlacesList from './screens/Places/PlacesList';

const Stack = createStackNavigator();

const App = () => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      LocalStorage.getData('Token').then(id => {
        setToken(id);
        setLoading(false);
      });
    }
  }, [loading]);

  if (loading) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator color="#389167" size={'large'} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {token ? (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={'Home'}>
          <Stack.Screen
            name="Home"
            options={{
              headerShown: false,
            }}>
            {props => <Home {...props} refresh={() => setLoading(true)} />}
          </Stack.Screen>
          <Stack.Screen name="AddPlace" component={AddPlace} />
          <Stack.Screen name="PlacesList" component={PlacesList} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={'SignIn'}>
          <Stack.Screen
            name="SignIn"
            options={{
              headerShown: false,
            }}>
            {props => <SignIn {...props} refresh={() => setLoading(true)} />}
          </Stack.Screen>

          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;

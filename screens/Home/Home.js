import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {TextButton} from '../../component';
import {SIZES, COLORS, icons, images, LocalStorage} from '../../constants';
import auth from '@react-native-firebase/auth';
import MapView, {Marker, Callout} from 'react-native-maps';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {allPlaces, utils} from '../../utils';

const Home = props => {
  const navigation = useNavigation();
  const [mark, setMark] = useState(null);
  const [places, setPlaces] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    allPlaces().then(data => {
      setPlaces(data);
    });
  }, [isFocused]);

  /**************logout****************** */
  const logOut = () => {
    auth()
      .signOut()
      .then(() => {
        props.refresh();
        LocalStorage.clearStorage();
        console.log('User signed out!');
      })
      .catch(er => {
        console.log(er, 'logout error');
      });
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      <View style={{flex: 0.9}}>
        <MapView
          style={{flex: 1}}
          initialRegion={{
            latitude: 30.033333,
            longitude: 31.233334,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          minZoomLevel={3}
          onPress={e => setMark(e.nativeEvent.coordinate)}>
          {mark && (
            <Marker coordinate={mark}>
              <Callout
                onPress={() => {
                  navigation.navigate('AddPlace', {
                    coordinates: mark,
                    header: 'ADD NEW PLACE',
                  });
                }}
                tooltip>
                <View>
                  <View
                    style={{
                      backgroundColor: COLORS.primary,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: SIZES.radius,
                      padding: SIZES.base,
                    }}>
                    <Text
                      style={{
                        color: COLORS.white,
                      }}>
                      Add Place
                    </Text>
                  </View>
                </View>
              </Callout>
            </Marker>
          )}
          {places?.map((item, index) => {
            return (
              <Marker
                key={item.uid}
                coordinate={item.coordinates}
                onPress={() =>
                  navigation.navigate('AddPlace', {
                    id: item.uid,
                    editable: true,
                    type: item.type,
                    name: item.name,
                    phone: item.phone,
                    coordinates: item.coordinates,
                    header: 'EDIT PLACE',
                  })
                }>
                <Image
                  source={icons[item?.type]}
                  style={{width: 26, height: 28}}
                  resizeMode="contain"
                />
              </Marker>
            );
          })}
        </MapView>
      </View>
      {/* buttons */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: SIZES.padding,
        }}>
        <View
          style={{
            alignItems: 'center',
            marginTop: SIZES.padding,
            width: '48%',
          }}>
          <TextButton
            label={'Places List'}
            labelStyle={{
              color: COLORS.white,
            }}
            buttonContainerStyle={{
              backgroundColor: COLORS.primary,
              width: '100%',
              height: 60,
              borderRadius: SIZES.radius,
            }}
            onPress={() => {
              navigation.navigate('PlacesList');
            }}
          />
        </View>

        <View
          style={{
            alignItems: 'center',
            marginTop: SIZES.padding,
            width: '48%',
          }}>
          <TextButton
            label={'Log out'}
            labelStyle={{
              color: COLORS.white,
            }}
            buttonContainerStyle={{
              backgroundColor: COLORS.primary,
              width: '100%',
              height: 60,
              borderRadius: SIZES.radius,
            }}
            onPress={() => {
              logOut();
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default Home;

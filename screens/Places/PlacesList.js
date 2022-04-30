import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import {IconButton, Header, FormInput, TextButton} from '../../component';
import {SIZES, COLORS, icons, images, LocalStorage} from '../../constants';
import {allPlaces, utils} from '../../utils';
import {useNavigation} from '@react-navigation/native';

const PlacesList = () => {
  const navigation = useNavigation();

  const [places, setPlaces] = useState([]);

  function renderHeader() {
    return (
      <Header
        title={'MY PLACES'}
        containerStyle={{
          height: 50,
          marginHorizontal: SIZES.padding,
          marginTop: 30,
        }}
        leftComponent={
          <IconButton
            icon={icons.back}
            containerStyle={{
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              borderRadius: SIZES.radius,
              borderColor: COLORS.gray2,
            }}
            iconStyle={{
              height: 20,
              width: 20,
              tintColor: COLORS.gray2,
            }}
            onPress={() => navigation.goBack()}
          />
        }
        rightComponent={<View style={{width: 40}} />}
      />
    );
  }

  function listOfPlaces() {
    return (
      <View
        style={{
          flex: 1,
          paddingHorizontal: SIZES.padding,
          backgroundColor: COLORS.white,
        }}>
        <FlatList
          data={places?.sort((a, b) => (a.name > b.name ? 1 : -1))}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => `${item.id}`}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  height: 60,
                  marginTop: SIZES.padding,
                  paddingHorizontal: SIZES.padding,
                  borderWidth: 1,
                  borderColor: COLORS.lightGray1,
                  borderRadius: SIZES.radius,
                  shadowColor: '#000000',
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity: 0.1,
                  shadowRadius: 1,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={icons[item?.type]}
                    style={{
                      width: 20,
                      height: 20,
                      resizeMode: 'contain',
                    }}
                  />
                  <Text
                    style={{
                      fontSize: SIZES.body3,
                      paddingLeft: SIZES.radius,
                    }}>
                    {item.name}
                  </Text>
                </View>
                <TouchableOpacity
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
                    source={icons.filter}
                    style={{
                      width: 20,
                      height: 20,
                      resizeMode: 'contain',
                      tintColor: COLORS.gray,
                    }}
                  />
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    );
  }

  useEffect(() => {
    allPlaces().then(data => setPlaces(data));
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      {/* Header */}
      {renderHeader()}

      {/* List Of Places */}
      {listOfPlaces()}
    </View>
  );
};

export default PlacesList;

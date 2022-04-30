import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {IconButton, Header} from '../../component';
import {SIZES, COLORS, icons} from '../../constants';
import {allPlaces} from '../../utils';
import {useNavigation} from '@react-navigation/native';

const PlacesList = () => {
  const navigation = useNavigation();

  const [places, setPlaces] = useState([]);

  function renderHeader() {
    return (
      <Header
        title={'MY PLACES'}
        containerStyle={styles.headerContainer}
        leftComponent={
          <IconButton
            icon={icons.back}
            containerStyle={styles.backContainer}
            iconStyle={styles.backIcon}
            onPress={() => navigation.goBack()}
          />
        }
        rightComponent={<View style={{width: 40}} />}
      />
    );
  }

  function listOfPlaces() {
    return (
      <View style={styles.listContainer}>
        <FlatList
          data={places?.sort((a, b) => (a.name > b.name ? 1 : -1))}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => `${item.uid}`}
          renderItem={({item, index}) => {
            return (
              <View style={styles.singlePlaceContainer}>
                <View style={styles.singlePlace}>
                  <Image source={icons[item?.type]} style={styles.leftIcon} />
                  <Text style={styles.placeName}>{item.name}</Text>
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
                  <Image source={icons.filter} style={styles.rightIcon} />
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
    <View style={styles.container}>
      {/* Header */}
      {renderHeader()}

      {/* List Of Places */}
      {listOfPlaces()}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerContainer: {
    height: 50,
    marginHorizontal: SIZES.padding,
    marginTop: 30,
  },
  backContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: SIZES.radius,
    borderColor: COLORS.gray2,
  },
  backIcon: {
    height: 20,
    width: 20,
    tintColor: COLORS.gray2,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: SIZES.padding,
    backgroundColor: COLORS.white,
  },
  singlePlaceContainer: {
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
  },
  singlePlace: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  placeName: {
    fontSize: SIZES.body3,
    paddingLeft: SIZES.radius,
  },
  rightIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: COLORS.gray,
  },
});

export default PlacesList;

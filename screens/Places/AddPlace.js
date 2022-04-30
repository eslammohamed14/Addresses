import React, {useState, useMemo} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {IconButton, Header, FormInput, TextButton} from '../../component';
import {SIZES, COLORS, icons} from '../../constants';
import {addPlace, updatePlace, utils} from '../../utils';
import {useNavigation} from '@react-navigation/native';

const data = [
  {
    title: 'Home',
    key: 'home',
    icon: icons.home,
  },
  {
    title: 'Park',
    key: 'park',
    icon: icons.park,
  },
  {
    title: 'Restaurant',
    key: 'restaurant',
    icon: icons.restaurant,
  },
];

// TODO: Move this component to `/components`
const CoordinateInput = ({label, value, onChange, hidden = false}) => {
  if (hidden) {
    return null;
  }

  return (
    <View
      style={{
        paddingHorizontal: SIZES.padding,
        marginTop: SIZES.padding,
      }}>
      <FormInput
        label={label}
        labelStyle={styles.labelStyle}
        keyboardType="number-pad"
        value={String(value)}
        onChange={onChange}
      />
    </View>
  );
};

const AddPlace = ({route}) => {
  const navigation = useNavigation();
  const {source, coordinates, header, getAllPlaces} = route?.params;

  const editable = useMemo(
    () => route?.params?.editable || false,
    [route?.params?.editable],
  );

  const placeId = useMemo(() => route?.params?.id || null, [route?.params?.id]);

  const [placeNameError, setPlaceNameError] = useState('');
  const [placePhoneError, setPlacePhoneError] = useState('');
  const [latitude, setLatitude] = useState(coordinates?.latitude);
  const [longitude, setLongitude] = useState(coordinates?.longitude);
  const [placeName, setPlaceName] = useState(route?.params?.name || '');
  const [placePhone, setPlacePhone] = useState(route?.params?.phone || '');
  const [selectedType, setSelectedType] = useState(route?.params?.type || '');

  const addNewPlace = () => {
    addPlace({
      name: placeName,
      phone: placePhone,
      type: selectedType,
      coordinates: {
        longitude,
        latitude,
      },
    });
    navigation.navigate('Home');
  };

  const updateExistingPlace = () => {
    if (!placeId) {
      alert('Invalid Place ID provided.');
    }

    updatePlace(placeId, {
      name: placeName,
      phone: placePhone,
      type: selectedType,
      coordinates: {
        longitude,
        latitude,
      },
    });
    navigation.navigate('Home');
  };

  const saveChanges = () => {
    return editable ? updateExistingPlace() : addNewPlace();
  };

  function isEnableAdd() {
    return (
      placeName !== '' &&
      placePhone !== '' &&
      placeNameError === '' &&
      placePhoneError === '' &&
      selectedType !== ''
    );
  }

  function renderHeader() {
    return (
      <Header
        title={header}
        containerStyle={styles.headerContainer}
        leftComponent={
          <IconButton
            icon={icons.back}
            containerStyle={styles.backIconContainer}
            iconStyle={styles.backIcon}
            onPress={() => navigation.goBack()}
          />
        }
        rightComponent={<View style={{width: 40}} />}
      />
    );
  }

  function placeType() {
    return (
      <View style={styles.typeContainer}>
        <Text style={styles.typeHeader}>Choose Place Type</Text>
        <FlatList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.key}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                style={[
                  styles.singleType,
                  {
                    backgroundColor:
                      selectedType === item.key
                        ? COLORS.lightGray2
                        : COLORS.white,
                  },
                ]}
                onPress={() => setSelectedType(item.key)}>
                <Image source={item.icon} style={styles.iconType} />
                <Text style={styles.typeText}>{item.title}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }

  function PlaceName() {
    return (
      <View
        style={{
          paddingHorizontal: SIZES.padding,
        }}>
        <FormInput
          label={'Place Name'}
          labelStyle={styles.labelStyle}
          keyboardType="default"
          value={placeName}
          onChange={value => {
            utils.validateInput(value, 4, setPlaceNameError);
            setPlaceName(value);
          }}
          errorMsg={placeNameError}
        />
      </View>
    );
  }

  function PlacePhone() {
    return (
      <View
        style={{
          paddingHorizontal: SIZES.padding,
          marginTop: SIZES.padding,
        }}>
        <FormInput
          label={'Place Phone Number'}
          labelStyle={styles.labelStyle}
          keyboardType="number-pad"
          value={placePhone}
          onChange={value => {
            utils.validatePhoneNumber(value, setPlacePhoneError);
            setPlacePhone(value);
          }}
          errorMsg={placePhoneError}
        />
      </View>
    );
  }

  function addButton() {
    return (
      <View style={styles.buttonContainer}>
        <TextButton
          label={source === 'home' ? 'Add Place' : 'Save'}
          disabled={isEnableAdd() ? false : true}
          labelStyle={{
            color: COLORS.white,
          }}
          buttonContainerStyle={{
            backgroundColor: isEnableAdd()
              ? COLORS.primary
              : COLORS.transparentPrimray,
            width: '100%',
            height: 60,
            borderRadius: SIZES.radius,
          }}
          onPress={saveChanges}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      {renderHeader()}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Type */}
        {placeType()}

        {/* Place Name */}
        {PlaceName()}

        {/* Place Phone */}
        {PlacePhone()}

        <View>
          {/* latitude */}
          <CoordinateInput
            label="latitude"
            value={latitude}
            hidden={!editable}
            onChange={value => {
              setLatitude(value);
            }}
          />

          {/* longitude */}
          <CoordinateInput
            label="longitude"
            value={longitude}
            hidden={!editable}
            onChange={value => {
              setLongitude(value);
            }}
          />
        </View>

        {/* Add Button */}
        {addButton()}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  labelStyle: {
    fontSize: SIZES.h3,
    color: COLORS.black,
    fontWeight: 'bold',
  },
  headerContainer: {
    height: 50,
    marginHorizontal: SIZES.padding,
    marginTop: 30,
  },
  backIconContainer: {
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
  typeContainer: {
    height: 150,
    marginTop: SIZES.padding,
    paddingHorizontal: SIZES.padding,
    width: '100%',
  },
  typeHeader: {
    fontSize: SIZES.h3,
    color: COLORS.black,
    fontWeight: 'bold',
  },
  singleType: {
    height: 100,
    width: SIZES.width * 0.29,
    padding: SIZES.base,
    alignItems: 'center',
    marginTop: SIZES.radius,
    justifyContent: 'center',
    borderRadius: SIZES.radius,
  },
  iconType: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  typeText: {
    fontSize: SIZES.body3,
    paddingTop: SIZES.base,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: SIZES.padding,
    paddingHorizontal: SIZES.padding,
  },
});
export default AddPlace;

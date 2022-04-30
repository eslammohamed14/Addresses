import AsyncStorage from '@react-native-async-storage/async-storage';

const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    //Alert.alert("error while storing locale");
  }
};

const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    //Alert.alert("error while storing locale");
  }
};

function getData(key) {
  return new Promise((resolve, reject) => {
    try {
      let value = AsyncStorage.getItem(key, () => {
        resolve(value);
      });
    } catch (error) {
      // Error retrieving data
      //Alert.alert("error wjile getting locale");
    }
  });
}

const removeItemValue = async key => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (exception) {
    return false;
  }
};

const LocalStorage = {
  getData: getData,
  storeData: storeData,
  removeData: removeItemValue,
  clearStorage: clearStorage,
};

export default LocalStorage;

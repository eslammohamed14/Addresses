import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const currentUser = () => auth().currentUser;

export const addPlace = place => {
  return firestore()
    .collection('users')
    .doc(currentUser().uid)
    .collection('places')
    .add(place);
};

export const allPlaces = () => {
  return firestore()
    .collection('users')
    .doc(currentUser().uid)
    .collection('places')
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        return [];
      }

      return snapshot.docs.map(doc => {
        const uid = doc.id;
        const docData = doc.data();
        return {uid, ...docData};
      });
    });
};

export const updatePlace = (placeId, data) => {
  return firestore()
    .collection('users')
    .doc(currentUser().uid)
    .collection('places')
    .doc(placeId)
    .set(data);
};

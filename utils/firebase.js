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

// const DB = () => {
//   getPlace = () => {
//     let Places = [];

//     return new Promise((resolve, reject) => {
//       firestore()
//         .collection('labs')
//         .get()
//         .then(snapshot => {
//           if (snapshot.empty) {
//             console.log('No matching documents.');
//             return;
//           }

//           labs = snapshot.docs.map(doc => {
//             let docID = doc.id;
//             let docData = doc.data();
//             return {docID, ...docData};
//           });
//           resolve(labs);
//         });
//     });
//   };

//   savePlace = labs => {
//     return new Promise((resolve, reject) => {
//       firestore()
//         .collection('labs')
//         .add({
//           name: labs[3].name,
//           image: labs[3].image,
//           id: labs[3].id,
//         })
//         .then(ref => {
//           console.log('Added document with ID: ', ref.id);
//           resolve(ref.id);
//         });
//     });
//   };

//   deletePlace = docID => {
//     return new Promise((resolve, reject) => {
//       firestore()
//         .collection('notes')
//         .doc(docID)
//         .delete()
//         .then(() => {
//           resolve(true);
//         });
//     });
//   };
// };

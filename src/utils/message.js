import { ToastAndroid, AsyncStorage, Platform } from 'react-native'
import firebase from './firebase'
import RNFetchBlob from 'react-native-fetch-blob'

const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs

let collection = firebase.firestore.collection('entry')

export async function sendSOSMessage(data) {
    let doc = collection.doc()
    let lat = data.latlng[0]
    let lon = data.latlng[1]
    let name = data.name
    await doc.set({
        latitude: lat,
        longitude: lon,
        name: name,
        ack: false,
        time: Date.now()
    })
    return doc.id
}

export async function updateEntry(id, data) {
    let doc = collection.doc(id)
    await doc.update(data)
    return true
}

export function listenToAck(id){
    return new Promise((resolve, reject) => {
        collection.doc(id).onSnapshot((doc) => {
            let _doc = doc.data()
            if(_doc.ack) {
                resolve(true)
            }
        })
    })
}

export async function setId(currentId) {
    try {
        await AsyncStorage.setItem('entryId', currentId);
    } catch (error) {
        console.log(error)
    }
}

export async function getId() {
    let entryId = null;
    try {
        entryId = await AsyncStorage.getItem('entryId') || null;
    } catch (error) {
        // Error retrieving data
        console.log(error.message);
    }
    return entryId;
}

export async function deleteId(){
    try {
        await AsyncStorage.removeItem('entryId');
    } catch (error) {
        // Error retrieving data
        console.log(error.message);
    }
}

export function uploadImage(uri, mime = 'application/octet-stream') {
    return new Promise((resolve, reject) => {
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
      let uploadBlob = null

      const imageRef = FirebaseClient.storage().ref('images').child('image_001')

      fs.readFile(uploadUri, 'base64')
        .then((data) => {
          return Blob.build(data, { type: `${mime};BASE64` })
        })
        .then((blob) => {
          uploadBlob = blob
          return imageRef.put(blob, { contentType: mime })
        })
        .then(() => {
          uploadBlob.close()
          return imageRef.getDownloadURL()
        })
        .then((url) => {
          resolve(url)
        })
        .catch((error) => {
          reject(error)
      })
    })
}
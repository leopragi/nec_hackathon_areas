import {PermissionsAndroid} from 'react-native';

export async function requestSMSPermission() {
  try {
    const isGranted = await PermissionsAndroid.check( PermissionsAndroid.PERMISSIONS.SEND_SMS )
    if(!isGranted) {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.SEND_SMS,
            {
              title: 'Arears Permission',
              message: 'AREARS need to access SMS permission for SOS',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              requestSMSPermission()
          }      
    }
  } catch (err) {
    console.warn(err);
  }
}
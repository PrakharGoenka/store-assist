import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';

export default function BarCode() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const addToCart =  async ( name ) => {
    try {
      const res = await axios.post(
        `http://192.168.1.101:5000/cart/add`,
        {'name': name}
      )
      console.log(res.data)
      ToastAndroid.showWithGravityAndOffset(
        res.data,
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        0,
        120
      )
    } catch (error) {
      console.log(error)
    }    
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    name = null
    if(data === '051111407592') {
      name = "Men's Solid Regular Fit T-Shirt";
    }
    Alert.alert(
      "Add to Cart",
      "Add " + data + " to Cart?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Ok",
          onPress: () => addToCart(name)
        }
      ],
      {
        cancelable: false
      }
    );
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}

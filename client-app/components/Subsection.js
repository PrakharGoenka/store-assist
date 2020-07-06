import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import ItemCarousel from './ItemCarousel';

export default class Subsection extends Component{
  state = {
    userData: null
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.carousel}>
          <Text> Top Picks</Text>
          <ItemCarousel />
        </View>
      </View>
    );
  };  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  carousel: {
    flex: 5,
    padding: 20,
    alignItems: 'center',
    alignContent: "space-around",
    justifyContent: "flex-start",
  },
  button: {
    flex: 1,
    justifyContent: "flex-end"
  }
});

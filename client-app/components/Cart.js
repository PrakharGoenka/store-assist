import React, { Component } from 'react';
import axios from 'axios';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import ItemCarousel from './ItemCarousel';

export default class Cart extends Component{
  state = {
    items: []
  }

  async componentDidMount() {
    try {
      const res = await axios.get(
        `http://192.168.0.126:5000/cart/view`
      )
      const { items } = res.data
      this.setState ({
        items
      })
    } catch(error) {
      console.log(error)
    }
  }

  
  render() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.carousel}>
          <ItemCarousel carouselItems={this.state.items} isCart={1}/>
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
  }
});

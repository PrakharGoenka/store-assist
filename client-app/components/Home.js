import React, { Component } from 'react';
import axios from 'axios'
import { StyleSheet, Text, View, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import ItemCarousel from './ItemCarousel';

export default class Home extends Component{
  state = {
    userData: null
  }

  componentDidMount() {
    axios.get('https://reqres.in/api/users/2')
    .then(res => {
        this.props.navigation.setOptions({
          title: `Welcome ${res.data.data.first_name}!`
        })
        this.setState({
          userData: res.data
      })
    })
    .catch(console.log)    
  }

  render() {
    const carouselItems = [
      {
        desc: "Canon EOS 1500D 24.1 Digital SLR Camera (Black) with EF S18-55 is II Lens, 16GB Card and Carry Case", 
        name: "Canon EOS 1500D 24.1", 
        url: "https://images-eu.ssl-images-amazon.com/images/I/51UHoxzInpL._AC_SX184_.jpg"
      }, 
      {
        desc: "Sony Alpha ILCE5100L 24.3MP Digital SLR Camera (Black) with 16-50mm Lens with Free Case (Bag)", 
        name: "Sony Alpha ILCE5100L 24.3MP", 
        url: "https://images-eu.ssl-images-amazon.com/images/I/41+-LjzbkuL._AC_SX184_.jpg"
      }, 
      {
        desc: "Canon EOS 200D II 24.1MP Digital SLR Camera + EF-S 18-55mm is STM Lens + EF-S 55-250mm is STM Lens (Black)", 
        name: "Canon EOS 200D", 
        url: "https://images-na.ssl-images-amazon.com/images/I/415ZSUQ2erL.jpg"
      }, 
      {
        desc: "Sony Alpha ILCE 6000Y 24.3 MP Mirrorless Digital SLR Camera with 16-50 mm and 55-210 mm Zoom Lenses (APS-C Sensor, Fast Auto Focus, Eye AF) - Black", 
        name: "Sony Alpha ILCE 6000Y 24.3 MP ", 
        url: "https://images-eu.ssl-images-amazon.com/images/I/51QiHopSU8L._AC_SX184_.jpg"
      }
    ]

    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.carousel}>
          <Text> Trending today</Text>
          <ItemCarousel carouselItems={carouselItems}/>
        </View>
        <View style={styles.carousel}>
          <Text> You may like</Text>
          <ItemCarousel carouselItems={carouselItems}/>
        </View>
        <View style={styles.button}>
          <Button
            title="Store Assist"
            onPress={() => 
              this.props.navigation.navigate('Assist')}
          />
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

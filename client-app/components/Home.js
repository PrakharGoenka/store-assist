import React, { Component } from 'react';
import axios from 'axios'
import { StyleSheet, Text, View, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import ItemCarousel from './ItemCarousel';

export default class Home extends Component{
  state = {
    Top5: [],
    Trending: []
  }

  async componentDidMount() {
    try {
      const res = await axios.get('http://192.168.1.104:5000/home')
      const { Top5, Trending } = res.data
      this.setState({
        Top5,
        Trending
      })    
    } catch(error) {
      console.log(error)
    }    
  }

  render() {
    const { Top5, Trending } = this.state

    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.carousel}>
          <Text> You may like </Text>
          <ItemCarousel carouselItems={Top5}/>
        </View>
        <View style={styles.carousel}>
          <Text> Trending today </Text>
          <ItemCarousel carouselItems={Trending}/>
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

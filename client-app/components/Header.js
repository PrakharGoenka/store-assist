import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

export default class Header extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}> {this.props.title} </Text>
        <View style={styles.buttons}>
          <MaterialCommunityIcons.Button
            name="barcode-scan" 
            size={24} 
            color="black"
            backgroundColor="white" 
            onPress={() => 
              this.props.navigation.navigate('BarCode')
            }
          />
          <Entypo.Button 
            name="shopping-cart" 
            size={24} 
            color="orange" 
            backgroundColor="white"
            onPress={() => 
              this.props.navigation.navigate('Cart')
            }
          />
        </View>        
      </View> 
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignContent: "space-between",
    alignItems: "center",
    justifyContent: "space-between"
  },
  title: {
    fontSize: 20, 
    fontWeight: "bold"
  },
  buttons: {
    flexDirection: "row"
  }
})

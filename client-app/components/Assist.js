import React, { Component } from 'react';
import axios from 'axios';
import { Text, View, StyleSheet, Dimensions, ScrollView } from 'react-native';
const { width } = Dimensions.get("window");

export default class Assist extends Component {
  _isMounted = false;
  state = {
    tileDimensions : [],
    tiles : []
  }

  async componentDidMount() {
    this._isMounted = true;
    try {
      const res = await axios.get(
        "http://192.168.0.126:5000/section/Furniture"
      )
      const subsections = res.data.sections
      this.setState ({
        tileDimensions : calcTileDimensions(width, 2),
        tiles : subsections
      })
    } catch(error) {
      console.log(error)
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { navigation } = this.props
    return (
      <ScrollView>
        <View style={styles.container}>
          {this.state.tiles.map(i => Item({...this.state.tileDimensions, text: i, navigation}))}     
        </View>
      </ScrollView>
    );
  }
}

const Item = ({size, margin, text, navigation}) => (
    <View key={text} 
      style={[styles.item, {width: size, height: size, marginHorizontal: margin}]} 
      onStartShouldSetResponder={() => navigation.navigate('Subsection', {subsection : text})}>
      <Text style={styles.itemText}>{text}</Text>
    </View>
)

const calcTileDimensions = (deviceWidth, tpr) => {
  const margin = deviceWidth / (tpr * 10);
  const size = (deviceWidth - margin * (tpr * 2)) / tpr;
  return { size, margin };
};

const styles = StyleSheet.create({
  container: {
     justifyContent: "flex-start", flexDirection: "row", flexWrap: "wrap", marginTop: 30
  },
  item: {
    backgroundColor: 'black',  
     alignSelf: "flex-start",
     alignItems: 'center',
     justifyContent: 'center',
     marginBottom: 20
  },
  itemText: {
    color: 'white',
    fontSize: 20
  }
});
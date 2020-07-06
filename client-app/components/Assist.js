import React, { Component } from 'react';
import axios from 'axios';
import { Text, View, StyleSheet, Dimensions, ScrollView, ImageBackground } from 'react-native';
const { width } = Dimensions.get("window");
const image = {uri : 'https://www.publicdomainpictures.net/pictures/30000/velka/plain-white-background.jpg'}
export default class Assist extends Component {
  _isMounted = false;
  state = {
    currentSection : 'Apparel',
    tileDimensions : [],
    tiles : []
  }

  async componentDidMount() {
    this._isMounted = true;
    try {
      const res = await axios.get(
        `http://192.168.0.126:5000/section/${this.state.currentSection}`
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
      <View style={styles.container}>
        <ImageBackground source={image} style={styles.image}>
          <Text style={styles.heading}>Current Section</Text>
          <Text style={styles.subHeading}>{this.state.currentSection}</Text>
          <ScrollView>
            <View style={styles.container}>
              {this.state.tiles.map(i => Item({...this.state.tileDimensions, text: i, navigation}))}     
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
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
    backgroundColor: '#' + Math.floor(Math.random()*16777215).toString(16),
     alignSelf: "flex-start",
     alignItems: 'center',
     justifyContent: 'center',
     marginBottom: 20,
     borderRadius: 10,
     borderWidth: 1,
     borderColor: '#fff'
  },
  itemText: {
    color: 'black',
    fontSize: 20
  },
  heading: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 22
  },
  subHeading: {
    textAlign: 'center',
    fontSize: 18,
    color: 'blue',
    borderBottomColor: 'black',
    borderBottomWidth: 1
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  }
});
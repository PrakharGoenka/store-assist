import React, { Component } from 'react';
import axios from 'axios';
import { Text, View, StyleSheet, Dimensions, ScrollView, ImageBackground,  Button, Platform } from 'react-native';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

const { width } = Dimensions.get("window");
const image = {uri : 'https://previews.123rf.com/images/photobyphotoboy/photobyphotoboy1609/photobyphotoboy160900333/63312735-blur-apparel-in-the-mall.jpg'}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


export default class Assist extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      currentSection : 'Apparel',
      tileDimensions : [],
      tiles : [],
      expoPushToken: '',
      notification: false
    }
    this.registerForPushNotificationsAsync()
    .then(token => {
        this.setState({
          expoPushToken: token
        })
        axios.get(`http://192.168.0.126:5000/token/${token}`)
      }
    )

    Notifications.addNotificationReceivedListener(notification => {
      this.updateSection(notification.request.content.body)
      console.log(notification.request.content.body, '23432')
    });

  }

  async updateSection(btId) {
    console.log('***********function called**************');
    const response = await axios.get(`http://192.168.0.126:5000/bt/${btId}`);
    const section = response.data
    try {
      // const res = await axios.get(
      //   `http://192.168.0.126:5000/section/${section.name}`
      // )
      console.log(section, 'edknnn,mmnlknknknklnl')
      const subsections = section.sections
      console.log(subsections, 'please')
      this.setState ({
        tileDimensions : calcTileDimensions(width, 2),
        tiles : subsections,
      })
    } catch(error) {
      console.log(error)
    }
  }
  // async componentWillMount() {
  //   this.registerForPushNotificationsAsync()
  //   .then(token => this.setState({
  //     expoPushToken: token
  //   })
  //   const res = axios.get(`http://192.168.0.126:5000/token/${token}`)
  //   );
  // }
  

  // componentWillUnmount() {
  //   this._isMounted = false;
  // }

  registerForPushNotificationsAsync = async() =>  {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
    console.log(token);
    return token;
  }
  
  render() {
    if(!this.state.tiles || !this.state.tileDimensions || !this.state.currentSection) {
      return <Text>{this.state.currentSection}</Text>;
    }
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
     justifyContent: "flex-start", flexDirection: "row", flexWrap: "wrap", marginTop: 0
  },
  item: {
    backgroundColor: '#' + Math.floor(Math.random()*16777215).toString(16),
     alignSelf: "flex-start",
     alignItems: 'center',
     justifyContent: 'center',
     marginBottom: 20,
     borderRadius: 10,
     borderWidth: 1,
     borderColor: 'black'
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
    borderBottomWidth: 1,
    marginBottom: 10
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    width: 480,
    height: 750
  }
});
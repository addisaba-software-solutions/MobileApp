import React from 'react';
import { Image, SafeAreaView,ScrollView, StyleSheet, View,Button } from 'react-native';
import { Divider, Icon, Text, Button } from 'react-native-elements';
import Layout from '../constants/Layout';
import { HomeScreenPics } from '../constants/Pics';
import { randomNo } from '../utils/randomNo';

const { pic, title } = HomeScreenPics[randomNo(1, HomeScreenPics.length)];



class intro extends React.Component {
  render() {
onJoinUsPress(){

  this.props.navigation.navigate('');
}

onLoginPress(){
  this.props.navigation.navigate('');
}
    return (
        
      <SafeAreaView style={styles.container}>
       {/* <ScrollView> */}
        <View style={styles.imageContainer}>
          <Image source={Image} style={styles.image} />
        </View>
        <View style={styles.containers}>
     <View style={styles.buttonContainer}>
      <Button style={styles.loginTextSection}
  title="Join Us"
  type="outline"/>
    </View>
    <View style={styles.buttonContainer}>
      <Button style={styles.loginTextSection}
      
  title="Login"
  type="outline"/>
    </View>
  </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  containers: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
   

  },
  buttonContainer: {
    flex: 1,
    
    
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  imageContainer: {
    margin: 20,
  },
  image: {
    width: Layout.window.width - 60,
    height: Layout.window.height / 2 - 60,
    borderRadius: 20,
  },
  name: {
    color: '#5E5E5E',
    alignSelf: 'flex-start',
    marginLeft: 30,
  },
  desc: {
    color: '#5E5E5E',
    alignSelf: 'flex-start',
    marginTop: 5,
    marginHorizontal: 30,
    fontSize: 14,
  },
  button_arc:{
width:Layout.window.width - 60,
borderRadius: 20,
marginLeft:30

  },
  btn:{
   
   
    marginLeft: 20,
   

  },
  divider: {
    backgroundColor: '#C0C0C0',
    width: Layout.window.width - 60,
    margin: 20,
  },
  socialLinks: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'row',
    width: Layout.window.width,
    marginLeft: 40,
  },
  iconContainer: {
    paddingHorizontal: 8,
    paddingVertical: 15,
  },
  loginTextSection: {

      flex: 2,
      alignItems: 'flex-start',
      //justifyContent: 'flex-start',
      
      //width: Layout.window.width - 60,
 }, loginTextSection2: {

  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 50,
  width: Layout.window.width - 60,
},
})

export default intro
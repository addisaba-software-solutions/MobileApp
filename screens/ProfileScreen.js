import React from 'react'
import { Image, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import { Divider, Text, Button } from 'react-native-elements'
import Layout from '../constants/Layout'
import { HomeScreenPics } from '../constants/Pics'
import * as Animatable from 'react-native-animatable'
import { randomNo } from '../utils/randomNo'
// import ChatView from './MessageDetailUi'
import Icon from 'react-native-vector-icons/AntDesign'
// import { EvilIcons, Entypo } from '@expo/vector-icons'


const AnimatedIcon = Animatable.createAnimatableComponent(Icon)
// const AnimatedIconEvilIcons = Animatable.createAnimatableComponent(EvilIcons)
// const AnimatedIconEntypo = Animatable.createAnimatableComponent(Entypo)

const { pic, title } = HomeScreenPics[randomNo(1, HomeScreenPics.length)]

const Social = ({ name }) => (
  <Icon
    name={name}
    type="font-awesome"
    containerStyle={styles.iconContainer}
    size={32}
  />
)

class ProfileScreen extends React.Component {
  render() {
    const { navigate } = this.props.navigation;

    return (
      <SafeAreaView style={styles.container}>


        {/* <ScrollView> */}


        <View style={styles.imageContainer}>
          <Image source={pic} style={styles.image} />
        </View>

        {/* ============================================================ */}

        <ScrollView>
          <Text h4 style={styles.name}>
            {title}
          </Text>


          {/* ============================================================ */}

          <View style={{ flexDirection: "row" }, styles.fixToText}>
            {/* <AnimatedIcon
                      ref={this.handleSmallAnimatedIconRef}
                      name={'rightcircleo'}
                      // color={liked ? colors.heartColor : colors.textPrimary}
                      size={18}
                      style={styles.icon}
                      onPress={() => navigate('Profile')}
                    /> */}
            <Text style={styles.desc}>Fashion Designer at Amelia & Co.</Text>

            <View style={styles.editAboutMe}>
              <AnimatedIcon
                ref={this.handleSmallAnimatedIconRef}
                name={'edit'}
                // color={liked ? colors.heartColor : colors.textPrimary}
                size={18}
                color='red'
                style={styles.icon}
                onPress={() => navigate('EditInfoScreen')}
              />
            </View>


          </View>
          {/* <Divider style={styles.divider} /> */}
          <Divider style={styles.divider} />

          {/* ============================================================ */}
          <View style={{ flexDirection: "row" }, styles.fixToText}>

            <View style={styles.socialLinks}>
              <Text style={styles.rs} >Women</Text>
              <Text style={styles.rs} >Looking For: Romance</Text>
            </View>

            <View style={styles.editPrefer}>
              <AnimatedIcon
                ref={this.handleSmallAnimatedIconRef}
                name={'edit'}
                color='red'
                size={18}
                style={styles.icon}
                onPress={() => navigate('EditInfoScreen')}
              />
            </View>
          </View>

          {/* ============================================================ */}
          <Divider style={styles.divider} />
          <Text style={styles.desc}>
            I love to travel. I have a cat named pickles, if he likes you, I
            probably will too.
        </Text>
          <View style={styles.editHobby}>

            <AnimatedIcon
              ref={this.handleSmallAnimatedIconRef}
              name={'edit'}
              color='red'
              size={18}
              // color='pink'
              style={styles.icon}
              onPress={() => navigate('EditInfoScreen')}
            />


          </View>
          <Divider style={styles.divider} />


          {/* ============================================================ */}

          <Text style={styles.desc}>Find me on Social here</Text>



          {/* <View style={styles.socialLinksLoveLikeReport}>
            <Social name="snapchat" />
            <Social name="instagram" />
            <Social name="facebook-square" />

          </View> */}
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  editPrefer: {
    marginRight: 45,
    marginTop: 6
  },
  editHobby: {
    marginLeft: 345,
    // paddingBottom: 789
  },
  editAboutMe: {
    marginLeft: 80,
    marginTop: 6
    // color: 'pink100'
  },
  fixToText: {
    flexDirection: 'row',
    paddingLeft: 0
    // justifyContent: 'space-between',
  },
  containers: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    justifyContent: 'space-between',

  },
  buttonContainer: {
    flex: 1,

    width: 50, height: 50,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  imageContainer: {
    margin: 10,
  },
  image: {
    width: Layout.window.width - 40,
    height: Layout.window.height / 2 - 80,
    borderRadius: 100,
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
  button_arc: {
    width: Layout.window.width - 60,
    borderRadius: 20,
    marginLeft: 30

  },
  btn: {


    marginLeft: 20,


  },
  divider: {
    backgroundColor: '#c71251',
    width: Layout.window.width - 60,
    margin: 20,
  },
  socialLinks: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'row',
    width: Layout.window.width,
    marginLeft: 35,
  },
  socialLinksLoveLikeReport: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'row',
    width: Layout.window.width,
    marginLeft: 35,
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

export default ProfileScreen

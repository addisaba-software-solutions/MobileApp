import * as WebBrowser from 'expo-web-browser';
import ViewOverflow from 'react-native-view-overflow';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Button
} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { Divider, Icon } from 'react-native-elements';

import { MonoText } from '../components/StyledText';
import { Card } from '../components/Card'
import { HomeScreenPics } from '../constants/Pics'

class HomeScreen extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ flexDirection: "row" }, styles.fixToText}>
          <View style={styles.buttonStyle}>
            <Button title="Swipe Left to Ignore"
              color="#FF0000"
              // onPress={() => Alert.alert('Button with adjusted color pressed')}
            />
          </View>
          <View style={styles.buttonStyle}>
            <Button title="Swipe Right Like"
                          onPress={() => Alert.alert('Button with adjusted color pressed')}

            ></Button>
          </View>
        </View>
        <Swiper
          cards={HomeScreenPics}
          renderCard={Card}
          infinite
          backgroundColor="white"
          cardHorizontalMargin={0}
          stackSize={2}
          useViewOverflow={Platform.OS === 'ios'}
        />
      </SafeAreaView>

    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})

export default HomeScreen

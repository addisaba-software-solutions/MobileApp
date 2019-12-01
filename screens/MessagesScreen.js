import React from 'react'
import axios from 'axios'
import API from './../api.jsx'
import { Alert } from 'react-native'
import {
  // Text,

  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  // Button,
  TextInput,
  // FlatList,
  Keyboard,
} from 'react-native'
import { ListItem, Header, SearchBar } from 'react-native-elements'
import { Messages } from '../constants/Messages'
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animate from 'react-native-animatable';
import { connect } from 'react-redux'
import URL from './../apiImage'
import {
  getAllUser, getMessage, clickToChat, sendMessage, addMessage,
} from './../store/userAction';

//import MessageDetailUi from './MessageDetailUi';
// import ChatView from './MessageDetailUi'



class MessagesScreen extends React.Component {

  state = {
    searchBarFocused: false,
  };
  componentDidMount() {

    this.props.getAllUser();


    this.keyboardDidShow = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShow
    );
    this.keyboardWillShow = Keyboard.addListener(
      'keyboardWillShow',
      this.keyboardWillShow
    );
    this.keyboardWillHide = Keyboard.addListener(
      'keyboardWillHide',
      this.keyboardWillHide
    );
  }

  keyboardDidShow = () => {
    this.setState({ searchBarFocused: true });
  };

  keyboardWillShow = () => {
    this.setState({ searchBarFocused: true });
  };

  keyboardWillHide = () => {
    this.setState({ searchBarFocused: false });
  };
  // goToSignup = () => this.props.navigation.navigate('MessageDetailUi')

  chatView = ($id) => {
    alert($id)
  }
  showbox(cur_user){
    // cur_user_id=cur_user.email;
  this.props.clickToChat(cur_user);
    this.props.getMessage(cur_user.email);
   
    
    // navigate('ChatView');
    this.props.navigation.navigate('ChatView')
  // this.props.getAllUser();
      // this.scrollTop();
}

  render() {
    const { navigate } = this.props.navigation;

    return (
      <SafeAreaView>
        <View style={{ flex: 1, paddingTop: 20 }}>
          <View
            style={{
              height: 80,
              backgroundColor: '#74C7ED',
              justifyContent: 'center',
              paddingHorizontal: 5,
            }}>
            <Animate.View
              animation="slideInRight"
              duration={1000}
              style={{
                height: 50,
                backgroundColor: 'white',
                flexDirection: 'row',
                padding: 5,
                alignItems: 'center',
              }}>
              <Icon
                name={
                  this.state.searchBarFocused ? 'md-arrow-back' : 'ios-search'
                }
                style={{ fontSize: 25 }}
              />
              <TextInput
                placeholder="Search"
                style={{ fontSize: 25, paddingLeft: 15 }}
              />
            </Animate.View>

          </View>

        </View>
        <ScrollView>
          {

            // Messages.map((user, i) => (

            this.props.users.map(data => (
            
              <ListItem
              onPress={()=>this.showbox(data)} 
                key={data.id}
                leftAvatar={{ source: { uri: URL+data.image }, size: 'medium' }}
                title={data.firstName + " " + data.lastName}
                chevron
                // onPress={() => navigate('ChatView')}
              />
            ))}
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: '#3F3F3F',
  },
  subtitle: {
    color: '#A5A5A5',
  },
})

function mapStateToProps(state) {
  return {
    is_typing: state.capd.is_typing,
    users: state.capd.users,
    message: state.capd.messages,
    currentUserDetail: state.capd.currentUserDetail,
    message_counter: state.capd.message_counter,

  }
}


const mapDispatchToProps = {
  getAllUser,
  clickToChat,
  getMessage,
  sendMessage,
  addMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(MessagesScreen);
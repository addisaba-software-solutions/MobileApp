import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, KeyboardAvoidingView, TextInput, TouchableHighlight, Keyboard } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import AutogrowInput from 'react-native-autogrow-input';
import {AsyncStorage} from 'react-native';
import { connect } from 'react-redux'
import {
  getAllUser, getMessage, clickToChat, sendMessage, addMessage,
} from './../store/userAction';

//used to make random-sized messages
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//The bubbles that appear on the left or the right for the messages.
class MessageBubble extends Component {
  render() {

    //These spacers make the message bubble stay to the left or the right, depending on who is speaking, even if the message is multiple lines.
    var leftSpacer = this.props.direction === 'left' ? null : <View style={{ width: 60 }} />;
    var rightSpacer = this.props.direction === 'left' ? <View style={{ width: 60 }} /> : null;

    var bubbleStyles = this.props.direction === 'left' ? [styles.messageBubble, styles.messageBubbleLeft] : [styles.messageBubble, styles.messageBubbleRight];

    var bubbleTextStyle = this.props.direction === 'left' ? styles.messageBubbleTextLeft : styles.messageBubbleTextRight;

    return (
      <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
        {leftSpacer}
        <View style={bubbleStyles}>
          <Text style={bubbleTextStyle}>
            {this.props.text}
          </Text>
        </View>
        {rightSpacer}
      </View>
    );
  }
}

//The bar at the bottom with a textbox and a send button.
class InputBar extends Component {

  //AutogrowInput doesn't change its size when the text is changed from the outside.
  //Thus, when text is reset to zero, we'll call it's reset function which will take it back to the original size.
  //Another possible solution here would be if InputBar kept the text as state and only reported it when the Send button
  //was pressed. Then, resetInputText() could be called when the Send button is pressed. However, this limits the ability
  //of the InputBar's text to be set from the outside.
  componentWillReceiveProps(nextProps) {
    if (nextProps.text === '') {
      this.autogrowInput.resetInputText();
    }
  }

  render() {
    return (
      <View style={styles.inputBar}>
        <AutogrowInput style={styles.textBox}
          ref={(ref) => { this.autogrowInput = ref }}
          multiline={true}
          defaultHeight={30}
          onChangeText={(text) => this.props.onChangeText(text)}
          onContentSizeChange={this.props.onSizeChange}
          value={this.props.text} />
        <TouchableHighlight style={styles.sendButton} onPress={() => this.props.onSendPressed()}>
          <Text style={{ color: 'white' }}>Send</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

//TODO: separate these out. This is what happens when you're in a hurry!
const styles = StyleSheet.create({

  //ChatView

  outer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'white'
  },

  messages: {
    flex: 1
  },

  //InputBar

  inputBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingVertical: 3,
  },

  textBox: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#db3058',
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10
  },

  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 15,
    marginLeft: 5,
    paddingRight: 15,
    borderRadius: 5,
    backgroundColor: '#db3058'
  },

  //MessageBubble

  messageBubble: {
    borderRadius: 5,
    marginTop: 8,
    marginRight: 10,
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    flex: 1
  },

  messageBubbleLeft: {
    backgroundColor: '#d5d8d4',
  },

  messageBubbleTextLeft: {
    color: 'black'
  },

  messageBubbleRight: {
    backgroundColor: '#db3058'
  },

  messageBubbleTextRight: {
    color: 'white'
  },
})
// The actual chat view itself- a ScrollView of BubbleMessages, with an InputBar at the bottom, which moves with the keyboard
class ChatView extends Component {

  constructor(props) {
    super(props);
    // settings
    var messages = [];

    // for (var i = 0; i < numberOfMessages; i++) {
    //   var messageLength = getRandomInt(10, 120);

    //   var direction = getRandomInt(1, 2) === 1 ? 'right' : 'left';

    //   message = loremIpsum.substring(0, messageLength);

    //   messages.push({
    //     direction: direction,
    //     text: message
    //   })
    
  

    this.state = {
      messages: messages,
      inputBarText: ''
    }
  }

  static navigationOptions = {
    title: 'Chat',
    marginRight: 100
  };

  //fun keyboard stuff- we use these to get the end of the ScrollView to "follow" the top of the InputBar as the keyboard rises and falls
  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide.bind(this));
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }
componentDidMount(){
  AsyncStorage.setItem('email',"stefan@gmail.com")
}

  //When the keyboard appears, this gets the ScrollView to move the end back "up" so the last message is visible with the keyboard up
  //Without this, whatever message is the keyboard's height from the bottom will look like the last message.
  keyboardDidShow(e) {
    this.scrollView.scrollToEnd();
  }

  //When the keyboard dissapears, this gets the ScrollView to move the last message back down.
  keyboardDidHide(e) {
    this.scrollView.scrollToEnd();
  }

  //scroll to bottom when first showing the view
  componentDidMount() {
    setTimeout(function () {
      this.scrollView.scrollToEnd();
    }.bind(this))
  }

  //this is a bit sloppy: this is to make sure it scrolls to the bottom when a message is added, but 
  //the component could update for other reasons, for which we wouldn't want it to scroll to the bottom.
  componentDidUpdate() {
    setTimeout(function () {
      this.scrollView.scrollToEnd();
    }.bind(this))
  }

  _sendMessage() {
    var receiver = null;
    // var message = $('#message').val();
    // $('#message').val('');

    this.props.currentUserDetail.map(active => {
      receiver = active.email;
    })
    this.props.sendMessage(receiver, this.state.inputBarText);
     this.props.getMessage(receiver);
     this.props.getAllUser();

    //this.state.messages.push({ direction: "right", text: this.state.inputBarText });

    this.setState({
      messages: this.state.messages,
      inputBarText: ''
    });
  }

  _onChangeInputBarText(text) {
    this.setState({
      inputBarText: text
    });
  }


  _onInputSizeChange() {
    setTimeout(function () {
      this.scrollView.scrollToEnd({ animated: false });
    }.bind(this))
  }

  render() {

    var messages = [];

    this.state.messages.forEach(function (message, index) {
      messages.push(
        <MessageBubble key={index} direction={message.direction} text={message.text} />
      );
    });

    return (
      <View style={styles.outer}>
        <ScrollView ref={(ref) => { this.scrollView = ref }} style={styles.messages}>
        {
        this.props.message.map(msg => (
          <MessageBubble key={msg.id} direction={
            msg.sender_id===AsyncStorage.getItem('email')?(
            "left"
            ):(
              "right"
            )
          } 
          text={msg.message} />
        )
        )
        }
        </ScrollView>
        <InputBar onSendPressed={() => this._sendMessage()}
          onSizeChange={() => this._onInputSizeChange()}
          onChangeText={(text) => this._onChangeInputBarText(text)}
          text={this.state.inputBarText} />
        <KeyboardSpacer />
      </View>
    );
  }
}
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

export default connect(mapStateToProps, mapDispatchToProps)(ChatView);
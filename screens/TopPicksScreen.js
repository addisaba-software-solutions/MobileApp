import React from 'react'
import { KeyboardAvoidingView, TextInput, StyleSheet, View, TouchableOpacity, Image, Button, ImageBackground, ScrollView } from 'react-native'
import { Text, Divider, Tile, Card } from 'react-native-elements'
import { SafeAreaView } from 'react-navigation'
// import { TopPicksScreenPics } from '../constants/Pics'
import Layout from '../constants/Layout'
import * as Animatable from 'react-native-animatable'
import Icon from 'react-native-vector-icons/AntDesign'
import { EvilIcons, SimpleLineIcons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import {
  getAllPosts, AddPost, addComment,
  incrementLike, decrementLike, sharePost, getProfile, profile,
  loading,
} from './../store/userAction';


import URL from './../apiImage'

// import SweetAlert from 'react-native-sweet-alert';



const AnimatedIcon = Animatable.createAnimatableComponent(Icon, SimpleLineIcons)
// const AnimatedIconEvilIcons = Animatable.createAnimatableComponent(EvilIcons)
const AnimatedIconSimpleLineIcons = Animatable.createAnimatableComponent(SimpleLineIcons)

const colors = {
  transparent: 'transparent',
  white: '#fff',
  heartColor: '#e92f3c',
  textPrimary: '#515151',
  black: '#000',
}

const card = {
  firstName: 'Yohannes',
  // photographer: 'Patrycja',
  photo: { uri: 'https://picsum.photos/id/1005/5760/3840' },
  key: 'pkarniej'
}

//  const ImagesExample = () => (
//    <Image source = {{uri:'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png'}}
//    style = {{ width: 200, height: 200 }}
//    />
// )


class TopPicksScreen extends React.Component {

  state = {
    search: '',
  };

  updateSearch = search => {
    this.setState({ search });
  };

  constructor(props) {
    super(props)

    this.state = {
      liked: false,
      comment: ''
    }

    this.lastPress = 0
  }
  componentDidMount() {
    this.props.getAllPosts();
  }

  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }
  // =================================================================
  handleLargeAnimatedIconRef = (ref) => {
    this.largeAnimatedIcon = ref
  }
  // =================================================================
  handleSmallAnimatedIconRef = (ref) => {
    this.smallAnimatedIcon = ref
  }
  // =================================================================
  submitLike(post_id) {
    this.props.incrementLike(post_id);
    this.props.getAllPosts();
  }
  // {/* ========================================================================================================= */}

  submitComment(post_id) {
    var cmt = $("#textarea" + post_id).val();
    if (cmt === '') {
      this.setState({
        messageBoxError: true,
        post_id: post_id,

      })

    }
    else {
      this.setState({
        messageBoxError: false,
        post_id: post_id,
      })
      $("#textarea" + post_id).val('');
      this.props.addComment(post_id, cmt);
      this.props.getAllPosts();
    }

  }
  // {/* ========================================================================================================= */}


  profile = (email) => {
    const visited = email;
    if (visited != localStorage.getItem('email')) {
      axios.request({
        method: 'get',
        url: API + '/profile-visited',
        params: {
          visited: visited,
          visiter: localStorage.getItem('email'),
        },
      })
        .then(data => {

          console.log("xxxxxx", data)
        })
        .catch(ex => {
          console.log("Exxxxxx", ex)
        })

    }
  }
  // {/* ========================================================================================================= */}




  animateIcon = () => {
    const { liked } = this.state
    this.largeAnimatedIcon.stopAnimation()

    if (liked) {
      this.largeAnimatedIcon.bounceIn()
        .then(() => this.largeAnimatedIcon.bounceOut())
      this.smallAnimatedIcon.pulse(200)
    } else {
      this.largeAnimatedIcon.bounceIn()
        .then(() => {
          this.largeAnimatedIcon.bounceOut()
          this.smallAnimatedIcon.bounceIn()
        })
        .then(() => {
          if (!liked) {
            this.setState(prevState => ({ liked: !prevState.liked }))
          }
        })
    }
  }
  // =================================================================
  handleOnPress = () => {
    const time = new Date().getTime()
    const delta = time - this.lastPress
    const doublePressDelay = 400

    if (delta < doublePressDelay) {
      this.animateIcon()
    }
    this.lastPress = time
  }
  // =================================================================
  handleOnPressLike = () => {
    this.smallAnimatedIcon.bounceIn()
    this.setState(prevState => ({ liked: !prevState.liked }))
  }
  // =================================================================
  handleOnPressShare = (postId) => {
    this.smallAnimatedIcon.bounceIn()
    this.props.sharePost(postId);
    alert(postId);
    this.props.getAllPosts();
  }
  // =================================================================
  handleOnPressComment = () => {
    // this.smallAnimatedIcon.bounceIn()
    alert('Comment')
  }
  // =================================================================
  handleOnPressProfile = () => {
    // this.smallAnimatedIcon.bounceIn()
    alert('Profile')
  }
  onComment = () => {
    alert(this.state.comment)
  }

  // =================================================================




  render() {
    const { navigate } = this.props.navigation;
    const { liked } = this.state;

    return (


      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding">


        <View style={styles.polaroidTextContainerComp}>
          <Text color={colors.heartColor}>Compose</Text>
          <AnimatedIcon
            ref={this.handleSmallAnimatedIconRef}
            name={'form'}
            // color={liked ? colors.heartColor : colors.textPrimary}
            size={18}
            color={colors.heartColor}
            style={styles.icon}
            onPress={() => navigate('PostScreen')}

          />
          {/* <Divider style={styles.divider} /> */}

        </View>
        <ScrollView>
          {
            this.props.posts.map(post => (

              <View >


                <TouchableOpacity

                  activeOpacity={1}
                  style={styles.card}
                  onPress={this.handleOnPress}
                >


                  <View style={{ flexDirection: "row" }, styles.fixToSmallPhoto}>
                    <Image source={{ uri: URL + post.client_users.image }}
                      style={{
                        width: 45, height: 45, marginTop: 5, borderRadius: 200
                      }}
                    />

                    <View >
                      <Text style={{ marginTop: 5, fontWeight: 'bold', marginLeft: 15, fontSize: 16 }} >{post.client_users.firstName + '  ' + post.client_users.lastName}</Text>
                      <Text style={{ marginLeft: 15 }} >{post.client_users.email}</Text>
                    </View>

                    <AnimatedIcon
                      ref={this.handleSmallAnimatedIconRef}
                      name={'message1'}
                      color={colors.heartColor}
                      size={26}
                      style={{ marginLeft: 120, marginTop: 10 }}
                      onPress={() => navigate('ChatView')}

                    />

                  </View>

                  <Divider style={styles.divider} />



                  <AnimatedIcon
                    ref={this.handleLargeAnimatedIconRef}
                    name="heart"
                    color={colors.heartColor}
                    size={80}
                    style={styles.animatedIcon}
                    duration={500}
                    delay={200}
                  />
                  <View >
                    <Text >
                      {post.body}
                    </Text>
                  </View>


                  {post.image ? (
                    <View style={{ width: 340, height: 400 }}>
                      <Image source={{ uri: URL + post.image }}
                        style={{ width: '100%', height: '100%' }}
                      />
                    </View>

                  ) : null}



                  <View style={styles.photoDescriptionContainer}
                  >
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={this.handleOnPressLike}
                    >
                      <View style={{ flexDirection: "row" }, styles.fixToText}>
                        <AnimatedIcon
                          ref={this.handleSmallAnimatedIconRef}
                          name={liked ? 'heart' : 'hearto'}
                          color={liked ? colors.heartColor : colors.textPrimary}
                          size={18}
                          style={styles.icon}
                        />
                        <AnimatedIcon
                          ref={this.handleSmallAnimatedIconRef}
                          name={'message1'}
                          color={colors.heartColor}
                          size={18}
                          style={styles.icon}
                          onPress={this.handleOnPressComment}

                        />
                        <AnimatedIcon
                          ref={this.handleSmallAnimatedIconRef}
                          name={'upload'}
                          color={colors.heartColor}
                          size={18}
                          style={styles.icon}
                          onPress={() => this.handleOnPressShare(post.id)}

                        />
                        <View style={styles.profile}>
                          <AnimatedIcon
                            ref={this.handleSmallAnimatedIconRef}
                            name={'rightcircleo'}
                            color={colors.heartColor}
                            size={18}
                            style={styles.icon}
                            onPress={() => navigate('Profile')}
                          />
                        </View>
                      </View>

                      {/* =========================================== */}

                    </TouchableOpacity>


                    <View style={styles.polaroidTextContainer}
                    >
                    </View>
                  </View>
                  <View style={{ flexDirection: "row" }, styles.fixToComment}>
                    <TextInput
                      name='comment'
                      style={styles.input}
                      placeholder='Write a Comment'
                      autoCapitalize="none"
                      placeholderTextColor='black'
                      onChangeText={(text) => this.setState({ comment: text })}
                    />
                    <View style={styles.comSub}>
                      <AnimatedIconSimpleLineIcons
                        ref={this.handleSmallAnimatedIconRef}
                        name={'cursor'}
                        color={colors.heartColor}
                        size={25}
                        style={styles.icon}
                        onPress={() => this.onComment()}
                      />
                    </View>

                  </View>

                </TouchableOpacity>

              </View>
            )
            )

          }
        </ScrollView>

        <View style={{ height: 50 }} />


      </KeyboardAvoidingView>
    )
  }

}

const styles = StyleSheet.create({
  // redMessage: {
  //   
  // },
  divider: {
    backgroundColor: '#c71251',
    width: Layout.window.width - 110,
    // margin: 10,
    marginLeft: 60,
    marginBottom: 10
  },
  fixToSmallPhoto: {
    flexDirection: 'row',
    padding: 10,
    marginRight: 10,
  },
  stretch: {
    width: 50,
    height: 200,
    resizeMode: 'stretch'
  },
  input: {
    width: 315,
    height: 40,
    backgroundColor: 'pink',
    margin: 5,
    padding: 10,
    color: 'black',
    borderRadius: 50,
    fontSize: 14,
    fontWeight: '200',
    marginRight: 2,
    // borderColor: 'black',
    // borderRadius: 854

  },
  profile: {
    paddingLeft: 205
  },
  comSub: {
    marginTop: 9

  },
  fixToText: {
    flexDirection: 'row',
    paddingLeft: 20
    // justifyContent: 'space-between',
  },

  fixToComment: {
    flexDirection: 'row',
    marginLeft: 10
    // justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center'
  },
  card: {
    // height: 415,
    // width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 50,
    shadowColor: colors.heartColor,
    paddingTop: 45,
    paddingBottom: 50,
    marginTop: 10,
    shadowOffset: {
      width: 10,
      height: 10
    },
    shadowRadius: 15,
    shadowOpacity: 10,
    elevation: 10
  },
  // Compose: {
  //   paddingLeft: 350,
  //   marginTop: 100,
  //   paddingTop: 50
  // },
  image: {
    marginTop: 10,
    height: 200,
    width: '92%'
  },
  photoDescriptionContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 10
  },

  icon: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  animatedIcon: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    borderRadius: 160,
    opacity: 0
  },
  text: {
    textAlign: 'center',
    fontSize: 13,
    backgroundColor: colors.transparent,
    color: colors.textPrimary
  },
  textPhotographer: {
    fontWeight: 'bold',
    textAlign: 'center'
  },
  polaroidTextContainer: {
    flexDirection: 'row',
    textAlign: 'left',
    paddingTop: 10,
    paddingLeft: 290

  },
  polaroidTextContainerComp: {
    flexDirection: 'row',
    textAlign: 'left',
    marginTop: 5,
    paddingLeft: 290,
    // paddingTop: 10,
    marginBottom: 10

  }

})
function mapStateToProps(state) {
  return {
    posts: state.capd.posts,
    loading: state.capd.loading,
    profile: state.capd.profile,
  }
}


const mapDispatchToProps = {
  getAllPosts,
  AddPost,
  sharePost,
  addComment,
  incrementLike,
  getProfile,

};
export default connect(mapStateToProps, mapDispatchToProps)(TopPicksScreen);

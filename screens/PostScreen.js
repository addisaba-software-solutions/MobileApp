import React from 'react'
import {
    View,
    Button,
    TextInput,
    StyleSheet,
    Text,
    Image,
    KeyboardAvoidingView
} from 'react-native'

import * as Animatable from 'react-native-animatable'
import Icon from 'react-native-vector-icons/AntDesign'
const AnimatedIcon = Animatable.createAnimatableComponent(Icon)

const colors = {
    transparent: 'transparent',
    white: '#fff',
    heartColor: '#e92f3c',
    textPrimary: '#515151',
    black: '#000',
}



export default class PostScreen extends React.Component {
    goToPost = () => this.props.navigation.navigate('TopPicks')

    constructor(props){        
        super(props);        
        this.state={            
            title:'',
            description:''
        }  
        // this.pickSingleWithCamera =this.pickSingleWithCamera.bind(this);
      }

    static navigationOptions = {
        title: 'Post',
        marginRight: 100
      };
    state = {
        title: '',
        description: '',
        photo: null
    }
    // ===========================================================
    // handleUploadPhoto = async () => {
    //     ImagePicker.openCropper({
    //         path: 'my-file-path.jpg',
    //         width: 300,
    //         height: 400
    //       }).then(image => {
    //         console.log(image);
    //       });
    //     // alert('photo')
    //   };
    // ===========================================================


    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    }
    onPost=()=>{
        alert('Description:   ' +this.state.description +'Title   '+ this.state.title)
        this.goToPost();
        
    }
    render() {
        // const { photo } = this.state
        const { navigate } = this.props.navigation;

        return (

            <KeyboardAvoidingView
            style={styles.container}
            behavior="padding">
            <>
                <View style={styles.card}>
                    <View style={styles.container}>
                        <Text style={styles.Title}>TELL US ABOUT YOUR DAY </Text>

                        <TextInput
                            style={styles.input}
                            name='title'
                            placeholder='Title'
                            autoCapitalize="none"
                            placeholderTextColor='pink'
                            onChangeText={(text) => this.setState({ title: text })}
                            />
                        <TextInput
                            style={styles.input}
                            name='description'
                            placeholder='Description'
                            autoCapitalize="none"
                            placeholderTextColor='white'
                            onChangeText={(text) => this.setState({ description: text })}
                        />

                        <View style={styles.polaroidTextContainer}>
                            <AnimatedIcon
                                ref={this.handleSmallAnimatedIconRef}
                                name={'link'}
                                size={40}
                                style={styles.icon, styles.fixToText}
                                onPress={this.handleUploadPhoto}
                            />
              
                            <AnimatedIcon
                                ref={this.handleSmallAnimatedIconRef}
                                name={'check'}
                                size={40}
                                // type='submit'
                                style={styles.icon}
                                onPress={() => this.onPost()}

                            />
                        </View>
                    </View>
                </View>
            </>
            <View style={{ height: 200 }} />

            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        width: 200,
        height: 40,
        backgroundColor: '#42A5F5',
        margin: 5,
        padding: 10,
        color: 'black',
        borderRadius: 50,
        fontSize: 14,
        fontWeight: '100',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        marginTop: 90,
        marginLeft: 15,
        //   marginRight: 654654654,

        height: 345,
        width: '95%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 50,
        shadowColor: colors.black,
        paddingTop: 10,
        paddingBottom: 30,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 10,
        shadowOpacity: 0.3,
        elevation: 10
    },
    polaroidTextContainer: {
        flexDirection: 'row',
        textAlign: 'left',
        paddingTop: 40,
        paddingLeft: 100,
        marginRight: 100

    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 100
    },
    Title: {
        width: 400,
        height: 50,
        // backgroundColor: '#42A5F5',
        margin: 5,
        padding: 10,
        color: 'black',
        textAlign: 'center',
        borderRadius: 50,
        fontSize: 25,
        marginBottom: 10,
        // paddingTop:50,
        fontWeight: '400',

    }
})
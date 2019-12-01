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
// import ImagePicker from 'react-native-image-picker';
const AnimatedIcon = Animatable.createAnimatableComponent(Icon)

const colors = {
    transparent: 'transparent',
    white: '#fff',
    heartColor: '#e92f3c',
    textPrimary: '#515151',
    black: '#000',
}

export default class EditInfoScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

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
    handleUploadPhoto = async () => {
        // ImagePicker.openCropper({
        //     path: 'my-file-path.jpg',
        //     width: 300,
        //     height: 400
        //   }).then(image => {
        //     console.log(image);
        //   });
        // // alert('photo')
    };
    // ===========================================================


    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    }
    onPost = async () => {
        alert('Posted')
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
                            <Text style={styles.Title}>Edit Your Information </Text>

                            <TextInput
                                style={styles.input}
                                placeholder='Some Text Here'
                                autoCapitalize="none"
                                multiline={true}
                                placeholderTextColor='black'
                                onChangeText={val => this.onChangeText('title', val)}
                            />

                            <AnimatedIcon
                                ref={this.handleSmallAnimatedIconRef}
                                name={'check'}
                                size={40}
                                // type='submit'
                                style={styles.icon, styles.Submit}
                                onPress={() => navigate('Profile')}

                            />
                        </View>
                    </View>
                </>
                <View style={{ height: 150 }} />

            </KeyboardAvoidingView>

        )
    }
}

const styles = StyleSheet.create({
    Submit: {
        marginTop: 30
    },
    input: {
        width: 300,
        height: 150,
        backgroundColor: 'pink',
        margin: 5,
        padding: 60,
        color: 'black',
        borderRadius: 30,
        fontSize: 14,
        fontWeight: '100',
    },
    container: {
        marginTop: 10,
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
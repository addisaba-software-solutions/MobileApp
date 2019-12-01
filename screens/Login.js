import React, { Component, Fragment } from 'react';
import { StyleSheet, SafeAreaView, View, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { HideWithKeyboard } from 'react-native-hide-with-keyboard';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import ErrorMessage from '../components/ErrorMessage';
import axios from 'axios'
import API from './../api.jsx'
import {AsyncStorage} from 'react-native';

import AppLogo from '../components/AppLogo';


const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label('Email')
    .email('Enter a valid email')
    .required('Please enter a registered email'),
  password: Yup.string()
    .label('Password')
    .required()
    .min(6, 'Password must have at least 6 characters ')
})

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordVisibility: true,
      rightIcon: 'ios-eye',
      isLogging:false,
      errors:[],
    }
  }

  goToSignup = () => this.props.navigation.navigate('Signup')
  goTomain = () => this.props.navigation.navigate('Main')
  goToForgotPassword = () => this.props.navigation.navigate('ForgotPassword')

  handlePasswordVisibility = () => {
    this.setState(prevState => ({
      rightIcon: prevState.rightIcon === 'ios-eye' ? 'ios-eye-off' : 'ios-eye',
      passwordVisibility: !prevState.passwordVisibility
    }))
  }

  onLogin() {
    axios.request({
      method: 'get',
      url: API + '/user_login',
      params: {
        email:this.state.email,
        password:this.state.password,
      },
    })
      .then(res => {
        if (res.data.success) {
          AsyncStorage.setItem('token', res.data.success.token);
          AsyncStorage.setItem('id', res.data.success.id);
          AsyncStorage.setItem('firstName', res.data.success.firstName);
          AsyncStorage.setItem('lastName', res.data.success.lastName);
          AsyncStorage.setItem('email', res.data.success.email);
          AsyncStorage.setItem('image', res.data.success.image);
          this.setState({
            isLogging: true,
          });
          this.goTomain();
        }
        else {
          this.setState({ isFetching: false, errors: res.data.error })
        }

      })
      .catch(ex => {
        console.log("error", ex);
        this.setState({ isFetching: false, errors: ex.data.error })
      })
   
  }

  render() {
    const { passwordVisibility, rightIcon } = this.state
    return (
      <SafeAreaView style={styles.container}>
        <HideWithKeyboard style={styles.logoContainer}>
          <AppLogo />
        </HideWithKeyboard>
        {/* <Formik
          initialValues={{ email: '', password: '' }}
          // onSubmit={() => {
          //   this.handleOnLogin()
          // }}
          validationSchema={validationSchema}>
          {({
            handleChange,
            values,
            handleSubmit,
            errors,
            isValid,
            touched,
            handleBlur,
            isSubmitting
          }) => ( */}
        <Fragment>
          <FormInput
            name='email'
            // value={values.email}
            onChangeText={(text) => this.setState({ email: text })}
            placeholder='Enter email'
            autoCapitalize='none'
            iconName='ios-mail'
            iconColor='#2C384A'
          // onBlur={handleBlur('email')}
          />
          {/* <ErrorMessage errorValue={touched.email && errors.email} /> */}
          <FormInput
            name='password'
            // value={values.password}
            onChangeText={(text) => this.setState({ password: text })}
            placeholder='Enter password'
            secureTextEntry={passwordVisibility}
            iconName='ios-lock'
            iconColor='#2C384A'
            // onBlur={handleBlur('password')}
            rightIcon={
              <TouchableOpacity onPress={this.handlePasswordVisibility}>
                <Ionicons name={rightIcon} size={28} color='grey' />
              </TouchableOpacity>
            }
          />
          {/* <ErrorMessage errorValue={touched.password && errors.password} /> */}
          <View style={styles.buttonContainer}>
            <FormButton
              buttonType='outline'
              onPress={() => this.onLogin()}
              title='LOGIN'
              buttonColor='#039BE5'
            // disabled={!isValid || isSubmitting}
            // loading={isSubmitting}
            />
          </View>
          {/* <ErrorMessage errorValue={errors.general} /> */}
        </Fragment>
        {/* //     )}
        // </Formik> */}
        <Button
          title="Don't have an account? Sign Up"
          onPress={this.goToSignup}
          titleStyle={{
            color: '#F57C00'
          }}
          type='clear'
        />
        <Button
          title='Forgot Password?'
          onPress={this.goToForgotPassword}
          titleStyle={{
            color: '#039BE5'
          }}
          type='clear'
        />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50
  },
  logoContainer: {
    marginBottom: 15,
    alignItems: 'center'
  },
  buttonContainer: {
    margin: 25
  }
})

export default Login

import React, { Component, Fragment } from 'react'
import { StyleSheet, SafeAreaView, View, TouchableOpacity, Text } from 'react-native'
import { Button, CheckBox, Radio } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons'
import { Formik } from 'formik'
import * as Yup from 'yup'
import FormInput from '../components/FormInput'
import FormButton from '../components/FormButton'
import ErrorMessage from '../components/ErrorMessage'
import { ScrollView } from 'react-native-gesture-handler'
import SegmentedControlTab from 'react-native-segmented-control-tab'


const validationSchema = Yup.object().shape({
  name: Yup.string()
    .label('Name')
    .required()
    .min(2, 'Must have at least 2 characters'),
  email: Yup.string()
    .label('Email')
    .email('Enter a valid email')
    .required('Please enter a registered email'),
  password: Yup.string()
    .label('Password')
    .required()
    .min(6, 'Password should be at least 6 characters '),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Confirm Password must matched Password')
    .required('Confirm Password is required'),
  check: Yup.boolean().oneOf([true], 'Please check the agreement')
})

class Signup extends Component {
  state = {
    passwordVisibility: true,
    confirmPasswordVisibility: true,
    passwordIcon: 'ios-eye',
    confirmPasswordIcon: 'ios-eye',
    fname: '',
    lname: '',
    country: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    selectedIndex: 0,
    selectedIndex1: 0,
    selectedIndex2: 0,
    selectedIndex4: 0,
    selectedIndex5: 0,
    selectedIndex6: 0,
    selectedIndex7: 0,
    selectedIndex8: 0,
    selectedIndex9: 0,
    selectedIndex10: 0,
    selectedIndex11: 0,
    selectedIndex12: 0
  }

  goToLogin = () => this.props.navigation.navigate('Login')

  handlePasswordVisibility = () => {
    this.setState(prevState => ({
      passwordIcon:
        prevState.passwordIcon === 'ios-eye' ? 'ios-eye-off' : 'ios-eye',
      passwordVisibility: !prevState.passwordVisibility
    }))
  }

  handleConfirmPasswordVisibility = () => {
    this.setState(prevState => ({
      confirmPasswordIcon:
        prevState.confirmPasswordIcon === 'ios-eye' ? 'ios-eye-off' : 'ios-eye',
      confirmPasswordVisibility: !prevState.confirmPasswordVisibility
    }))
  }
  // handleIndexChange = index => {
  //   this.setState({
  //     ...this.state,
  //     selectedIndex: index
  //   });
  // };
  // handleIndexChange1 = index1 => {
  //   this.setState({
  //     ...this.state,
  //     selectedIndex1: index1
  //   });
  // };
  // handleIndexChange2 = index2 => {
  //   this.setState({
  //     ...this.state,
  //     selectedIndex2: index2
  //   });
  // };
  // handleIndexChange3 = index3 => {
  //   this.setState({
  //     ...this.state,
  //     selectedIndex3: index3
  //   });
  // };
  // handleIndexChange4 = index4 => {
  //   this.setState({
  //     ...this.state,
  //     selectedIndex4: index4
  //   });
  // };
  // handleIndexChange5 = index5 => {
  //   this.setState({
  //     ...this.state,
  //     selectedIndex5: index5
  //   });
  // };
  // handleIndexChange6 = index6 => {
  //   this.setState({
  //     ...this.state,
  //     selectedIndex6: index6
  //   });
  // };
  // handleIndexChange7 = index7 => {
  //   this.setState({
  //     ...this.state,
  //     selectedIndex7: index7
  //   });
  // };
  // handleIndexChange8 = index8 => {
  //   this.setState({
  //     ...this.state,
  //     selectedIndex8: index8
  //   });
  // };
  handleOnSignup = async (values, actions) => {

    alert('First Name:'+ this.state.fname +'last name:'+this.state.lname+'phone:'+this.state.phone+'email:'+this.state.email+'Country'
    +this.state.country+'password'+this.state.password+'confirm Password:'+this.state.confirmPassword)
  }

  render() {
    const {
      passwordVisibility,
      confirmPasswordVisibility,
      passwordIcon,
      confirmPasswordIcon
    } = this.state
    return (
      <SafeAreaView style={styles.container}>

        <ScrollView>
          <Text style={styles.txtcontrainer}> step 1:Registration</Text>
          <Formik
            initialValues={{
              fname: '',
              lname: '',
              country: '',
              phone: '',
              email: '',
              password: '',
              confirmPassword: '',
              check: false
            }}
            // onSubmit={(values, actions) => {
            //   this.handleOnSignup(values, actions)
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
              isSubmitting,
              setFieldValue
            }) => (
                <Fragment>
                  <FormInput
                    name='First Name'
                    // value={values.fname}
                    onChangeText={(text) => this.setState({ fname: text })}
                    placeholder='Enter your First Name'
                    iconName='md-person'
                    iconColor='#2C384A'
                    onBlur={handleBlur('fname')}
                  />
                  <ErrorMessage errorValue={touched.name && errors.name} />
                  <FormInput
                    name='Last Name'
                    // value={values.lname}
                    onChangeText={(text) => this.setState({ lname: text })}
                    placeholder='Enter your Last name'
                    iconName='md-person'
                    iconColor='#2C384A'
                    onBlur={handleBlur('lname')}
                  />
                  <ErrorMessage errorValue={touched.name && errors.name} />
                  <FormInput
                    name='phone'
                    // value={values.phone}
                    onChangeText={(text) => this.setState({ phone: text })}
                    placeholder='phone number'
                    iconName='md-person'
                    iconColor='#2C384A'
                    onBlur={handleBlur('phone')}
                  />
                  <ErrorMessage errorValue={touched.name && errors.name} />
                  <FormInput
                    name='country'
                    // value={values.name}
                    onChangeText={(text) => this.setState({ country: text })}
                    placeholder='Enter your country'
                    iconName='md-person'
                    iconColor='#2C384A'
                    onBlur={handleBlur('country')}
                  />
                  <ErrorMessage errorValue={touched.name && errors.name} />
                  <FormInput
                    name='email'
                    // value={values.email}
                    onChangeText={(text) => this.setState({ email: text })}
                    placeholder='Enter email'
                    autoCapitalize='none'
                    iconName='ios-mail'
                    iconColor='#2C384A'
                    onBlur={handleBlur('email')}
                  />
                  <ErrorMessage errorValue={touched.email && errors.email} />
                  <FormInput
                    name='password'
                    // value={values.password}
                    onChangeText={(text) => this.setState({ password: text })}
                    placeholder='Enter password'
                    iconName='ios-lock'
                    iconColor='#2C384A'
                    onBlur={handleBlur('password')}
                    secureTextEntry={passwordVisibility}
                    rightIcon={
                      <TouchableOpacity onPress={this.handlePasswordVisibility}>
                        <Ionicons name={passwordIcon} size={28} color='grey' />
                      </TouchableOpacity>
                    }
                  />
                  <ErrorMessage errorValue={touched.password && errors.password} />
                  <FormInput
                    name='password'
                    // value={values.confirmPassword}
                    onChangeText={(text) => this.setState({ confirmPassword: text })}
                    placeholder='Confirm password'
                    iconName='ios-lock'
                    iconColor='#2C384A'
                    onBlur={handleBlur('confirmPassword')}
                    secureTextEntry={confirmPasswordVisibility}
                    rightIcon={
                      <TouchableOpacity
                        onPress={this.handleConfirmPasswordVisibility}>
                        <Ionicons
                          name={confirmPasswordIcon}
                          size={28}
                          color='grey'
                        />
                      </TouchableOpacity>
                    }
                  />
                  <ErrorMessage
                    errorValue={touched.confirmPassword && errors.confirmPassword}
                  />
                  {/* <Text style={styles.txtcontrainer}> step 2:Match Form</Text>

                  <View>
                    <Text style={styles.txtcontrainer2}>Pets ... </Text>
                    <SegmentedControlTab
                      values={["Cat", "Dog"]}
                      selectedIndex={this.state.selectedIndex}
                      onTabPress={this.handleIndexChange}
                    />
                  </View>

                  <View>
                    <Text style={styles.txtcontrainer2}>My flock ... </Text>
                    <SegmentedControlTab
                      values={["EARLY BIRDS", "NIGHT OWLS"]}
                      selectedIndex={this.state.selectedIndex1}
                      onTabPress={this.handleIndexChange1}
                    />
                  </View>
                  <View>
                    <Text style={styles.txtcontrainer2}>Kickstarts my day ... </Text>
                    <SegmentedControlTab
                      values={["COFFE", "NIGHT OWLS"]}
                      selectedIndex={this.state.selectedIndex2}
                      onTabPress={this.handleIndexChange2}
                    />
                  </View>
                  <View>
                    <Text style={styles.txtcontrainer2}>In my fridge ... </Text>
                    <SegmentedControlTab
                      values={["MEAT", "TOFU"]}
                      selectedIndex={this.state.selectedIndex3}
                      onTabPress={this.handleIndexChange3}
                    />
                  </View>
                  <View>
                    <Text style={styles.txtcontrainer2}>Phone are for ... </Text>
                    <SegmentedControlTab
                      values={["TEXTING", "TALKING"]}
                      selectedIndex={this.state.selectedIndex4}
                      onTabPress={this.handleIndexChange4}
                    />
                  </View>
                  <View>
                    <Text style={styles.txtcontrainer2}>After a long day ... </Text>
                    <SegmentedControlTab
                      values={["TEXTING", "TALKING"]}
                      selectedIndex={this.state.selectedIndex5}
                      onTabPress={this.handleIndexChange5}
                    />
                  </View>
                  <View>
                    <Text style={styles.txtcontrainer2}>I’m hungry ... </Text>
                    <SegmentedControlTab
                      values={["I COOK", "ORDER IN"]}
                      selectedIndex={this.state.selectedIndex6}
                      onTabPress={this.handleIndexChange6}
                    />
                  </View>
                  <View>
                    <Text style={styles.txtcontrainer2}>Going out ... </Text>
                    <SegmentedControlTab
                      values={["ON THE GUEST LIST", "THERE AIN’T NO LIST"]}
                      selectedIndex={this.state.selectedIndex7}
                      onTabPress={this.handleIndexChange7}
                    />
                  </View>
                  <View>
                    <Text style={styles.txtcontrainer2}>My life is ... </Text>
                    <SegmentedControlTab
                      values={["ONLINE", "OFFLINE"]}
                      selectedIndex={this.state.selectedIndex8}
                      onTabPress={this.handleIndexChange8}
                    />
                  </View> */}
                  <CheckBox
                    containerStyle={styles.checkBoxContainer}
                    checkedIcon='check-box'
                    iconType='material'
                    uncheckedIcon='check-box-outline-blank'
                    title='Agree to terms and conditions'
                    checkedTitle='You agreed to our terms and conditions'
                    checked={values.check}
                    onPress={() => setFieldValue('check', !values.check)}
                  />
                  <View style={styles.buttonContainer}>
                    <FormButton
                      buttonType='outline'
                      // onPress={() => this.onRegister()}
                      title='SIGNUP'
                      buttonColor='#F57C00'
                      // disabled={!isValid || isSubmitting}
                      // loading={isSubmitting}
                      onPress={() => this.handleOnSignup()}
                    />
                  </View>
                  <ErrorMessage errorValue={errors.general} />
                </Fragment>
              )}
          </Formik>
          <Button
            title='Have an account? Login'
            onPress={this.goToLogin}
            titleStyle={{
              color: '#039BE5'
            }}
            type='clear'
          />
        </ScrollView>
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
  txtcontrainer: {
    alignItems: 'center',
    fontSize: 25,
    justifyContent: 'center',

  }, txtcontrainer2: {
    alignItems: 'center',
    fontSize: 14
  },
  logoContainer: {
    marginBottom: 15,
    alignItems: 'center'
  },
  buttonContainer: {
    margin: 25
  },
  checkBoxContainer: {
    backgroundColor: '#fff',
    borderColor: '#fff'
  }
})

export default Signup

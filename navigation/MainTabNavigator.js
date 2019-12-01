import React from 'react'
import { Icon } from 'expo'
import { Platform } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
import TabBarIcon from '../components/TabBarIcon'
import HomeScreen from '../screens/HomeScreen'
import LinksScreen from '../screens/LinksScreen'
import SettingsScreen from '../screens/SettingsScreen'
import MessagesScreen from '../screens/MessagesScreen'
import ProfileScreen from '../screens/ProfileScreen'
import TopPicksScreen from '../screens/TopPicksScreen'
import Login from '../screens/Login'
import Signup from '../screens/Signup'
import ForgotPassword from '../screens/ForgotPassword'
import ChatView from '../screens/MessageDetailUi'
import PostScreen from '../screens/PostScreen'
import EditInfoScreen from '../screens/EditInfoScreen'

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});


// ================================================================================
// const Navigation = createStackNavigator({
//   Signup: Signup,
//   Login: Login,

// });

const TopPicksStack = createStackNavigator(
  {
    TopPicks: TopPicksScreen,    
    PostScreen: PostScreen,

  },
  config
);

TopPicksStack.navigationOptions = {
  tabBarLabel: 'News Feed',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      } />
  ),
};
TopPicksStack.path = '';
//  Explorer start

// ================================================================================

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);
HomeStack.navigationOptions = {
  tabBarLabel: 'Explore',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

HomeStack.path = '';
// ================================================================================

const ForgotPasswordStack = createStackNavigator(
  {
    ForgotPassword: ForgotPassword,
  },
  config
);

ForgotPasswordStack.navigationOptions = {
  tabBarLabel: 'ForgotPassword',
};

ForgotPasswordStack.path = '';
// =================================================================================
const SignupStack = createStackNavigator(
  {
    Signup: Signup,
  },
  config
);

SignupStack.navigationOptions = {
  tabBarLabel: 'Signup',
};

SignupStack.path = '';
//  SignupStack ends
//  link start
// =====================================================================================

const LinksStack = createStackNavigator(
  {
    Links: LinksScreen,
  },
  config
);


LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

LinksStack.path = '';

// =====================================================================================

const MessagesStack = createStackNavigator(
  {
    Messages: MessagesScreen,
    ChatView: ChatView,

  },
  config
);


MessagesStack.navigationOptions = {
  tabBarLabel: 'Messages',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      } />
  ),
};
MessagesStack.path = '';
// ======================================================================================

const ProfileStack = createStackNavigator(
  {
    Profile: ProfileScreen,
    EditInfoScreen: EditInfoScreen,
    Settings: SettingsScreen
  },
  config

);

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      } />
  ),
};

ProfileStack.path = '';
// ======================================================================================
const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen
  },
  config

);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Setting',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      } 
      />
  ),
};

SettingsStack.path = '';

// ================================================================================

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  TopPicksStack,
  MessagesStack,
  ProfileStack,
  // Navigation
  // ChatViewStack,
  // PostScreenStack,
  // LoginStack,
  SettingsStack,
  // EditInfoScreenStack
});

tabNavigator.path = '';

// const topNavigator = createMaterialTopTabNavigator({
//   HomeStack,
//   TopPicksStack,
//   MessagesStack,
//   ProfileStack,
//   ChatViewStack,
//   PostScreenStack

// })

// topNavigator.path = '';


export default createAppContainer(tabNavigator);


import { createStackNavigator } from 'react-navigation-stack';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import TopPicksScreen from '../screens/TopPicksScreen'
import PostScreen from '../screens/PostScreen'
import ProfileScreen from '../screens/ProfileScreen'
import EditInfoScreen from '../screens/EditInfoScreen'
import MessagesScreen from '../screens/MessagesScreen'
import MainTabNavigator from './MainTabNavigator';

import {AsyncStorage} from 'react-native';

const AuthNavigation = createStackNavigator(
  {
    Login: { screen: Login },
    Signup: { screen: Signup },
//  Main: MainTabNavigator 

    TopPicksScreen: {screen: TopPicksScreen},
    // PostScreen: { screen: PostScreen },
    ProfileScreen: { screen: ProfileScreen},
    // EditInfoScreen: { screen: EditInfoScreen},
    // MessagesScreen: { screen: MessagesScreen}

  },
  // {
  //   initialRouteName:
  //   AsyncStorage.getItem('token')?("TopPicksScreen"):("Login")
    
  // },
  {
    initialRouteName: 'ProfileScreen'
  }
)

export default AuthNavigation
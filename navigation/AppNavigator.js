import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs'
import MainTabNavigator from './MainTabNavigator';
import AuthNavigation from './AuthNavigation';

const AppNavigator= createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html

    
      Auth: AuthNavigation,
      Main: MainTabNavigator 
    },
    {
      initialRouteName: 'Auth'
   
    }
  
  );
  const AppContainer = createAppContainer(AppNavigator);
  export default AppContainer;

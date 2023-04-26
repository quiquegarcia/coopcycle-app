import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import { connect } from 'react-redux'

import i18n from '../../i18n'
import { selectInitialRouteName, selectIsAuthenticated, selectShowRestaurantsDrawerItem } from '../../redux/App/selectors'
import { headerLeft } from '..'
import { stackNavigatorScreenOptions } from '../styles'

import DrawerContent from '../components/DrawerContent'

import AccountNavigator from './AccountNavigator'
import CheckoutNavigator from './CheckoutNavigator'
import CourierNavigator from './CourierNavigator'
import DeliveryNavigator from './DeliveryNavigator';
import DispatchNavigator from './DispatchNavigator'
import RestaurantNavigator from './RestaurantNavigator'
import StoreNavigator from './StoreNavigator'
import About from '../home/About'
import Terms from '../home/Terms'
import Privacy from '../home/Privacy'
import AccountRegisterConfirm from '../account/RegisterConfirm'
import AccountResetPasswordNewPassword from '../account/ResetPasswordNewPassword'
import { HeaderBackButton } from '@react-navigation/elements'

const RegisterConfirmStack = createStackNavigator()

const RegisterConfirmNavigator = ({ route }) => (
  <RegisterConfirmStack.Navigator
    screenOptions={ stackNavigatorScreenOptions }>
    <RegisterConfirmStack.Screen
      name="RegisterConfirmHome"
      component={ AccountRegisterConfirm }
      options={({ navigation }) => ({
        title: i18n.t('REGISTER_CONFIRM'),
        headerLeft: headerLeft(navigation),
      })}
      initialParams={{ ...route.params }}
    />
  </RegisterConfirmStack.Navigator>
)

const ResetPasswordStack = createStackNavigator()

const ResetPasswordNavigator = ({ route }) => (
  <ResetPasswordStack.Navigator
    screenOptions={ stackNavigatorScreenOptions }>
    <ResetPasswordStack.Screen
      name="ResetPasswordHome"
      component={ AccountResetPasswordNewPassword }
      options={({ navigation }) => ({
        title: i18n.t('RESET_PASSWORD_NEW_PASSWORD'),
        headerLeft: headerLeft(navigation),
      })}
      initialParams={{ ...route.params }}
    />
  </ResetPasswordStack.Navigator>
)

const AboutStack = createStackNavigator()

const AboutNavigator = () => (
  <AboutStack.Navigator
    screenOptions={ stackNavigatorScreenOptions }>
    <AboutStack.Screen
      name="AboutHome"
      component={ About }
      options={({ navigation }) => ({
        title: i18n.t('ABOUT'),
        headerLeft: headerLeft(navigation),
      })}
    />
  </AboutStack.Navigator>
)

const TermsStack = createStackNavigator()

const TermsNavigator = () => (
  <TermsStack.Navigator
    screenOptions={ stackNavigatorScreenOptions }>
    <TermsStack.Screen
      name="TermsHome"
      component={ Terms }
      options={({ navigation }) => ({
        title: i18n.t('TERMS_OF_SERVICE'),
        headerLeft: (props) => <HeaderBackButton { ...props } onPress={ () => navigation.goBack() } />,
      })}
    />
  </TermsStack.Navigator>
)

const PrivacyStack = createStackNavigator()

const PrivacyNavigator = () => (
  <PrivacyStack.Navigator
    screenOptions={ stackNavigatorScreenOptions }>
    <PrivacyStack.Screen
      name="PrivacyHome"
      component={ Privacy }
      options={({ navigation }) => ({
        title: i18n.t('PRIVACY'),
        headerLeft: (props) => <HeaderBackButton { ...props } onPress={ () => navigation.goBack() } />,
      })}
    />
  </PrivacyStack.Navigator>
)

function mapStateToProps(state) {

  const user = state.app.user

  return {
    isAuthenticated: selectIsAuthenticated(state),
    user,
    initialRouteName: selectInitialRouteName(state),
    showRestaurantsDrawerItem: selectShowRestaurantsDrawerItem(state),
  }
}

const Drawer = createDrawerNavigator()

const DrawerNav = ({ initialRouteName, user, isAuthenticated, showRestaurantsDrawerItem }) => {

  return (
    <Drawer.Navigator
      drawerContent={ (props) => <DrawerContent { ...props } /> }
      initialRouteName={ initialRouteName }
      screenOptions={{
        headerShown: false,
      }}
      >
      <Drawer.Screen
        name="CheckoutNav"
        component={ CheckoutNavigator } />
      <Drawer.Screen
        name="DeliveryNav"
        component={ DeliveryNavigator } />
      <Drawer.Screen
        name="AccountNav"
        component={ AccountNavigator } />
      <Drawer.Screen
        name="AboutNav"
        component={ AboutNavigator } />
      <Drawer.Screen
        name="TermsNav"
        component={ TermsNavigator } />
      <Drawer.Screen
        name="PrivacyNav"
        component={ PrivacyNavigator } />
      <Drawer.Screen
        name="RegisterConfirmNav"
        component={ RegisterConfirmNavigator } />
      <Drawer.Screen
        name="ResetPasswordNav"
        component={ ResetPasswordNavigator } />

      { (isAuthenticated && user.hasRole('ROLE_COURIER')) && (
        <Drawer.Screen
          name="CourierNav"
          component={ CourierNavigator } />
      )}
      { showRestaurantsDrawerItem && (
        <Drawer.Screen
          name="RestaurantNav"
          component={ RestaurantNavigator } />
      )}
      { (isAuthenticated && user.hasRole('ROLE_STORE')) && (
        <Drawer.Screen
          name="StoreNav"
          component={ StoreNavigator } />
      )}
      { (isAuthenticated && user.hasRole('ROLE_ADMIN')) && (
        <Drawer.Screen
          name="DispatchNav"
          component={ DispatchNavigator } />
      )}
    </Drawer.Navigator>
  )
}

export default connect(mapStateToProps)(DrawerNav)

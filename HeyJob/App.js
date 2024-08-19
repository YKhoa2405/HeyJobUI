import React, { useReducer } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'
import { KeyboardAvoidingView, Platform } from "react-native";
import { bgButton1, orange } from './src/assets/theme/color';
import Toast from 'react-native-toast-message';


import Wellcome from './src/screens/Auth/Wellcome';
import Login from './src/screens/Auth/Login';
import Register from './src/screens/Auth/Register';
import ForgotPass from './src/screens/Auth/ForgotPass';
import Home from './src/screens/Home/Home';
import Profile from './src/screens/Auth/Profile';
import Chat from './src/screens/Chat/Chat';
import Notification from './src/screens/Notification/Notification';
import JobDetail from './src/screens/Home/JobDetail';
import UploadCV from './src/screens/Home/UploadCV';
import SaveJob from './src/screens/Job/SaveJob';
import JobSearch from './src/screens/Home/JobSearch';
import JobSearchDetail from './src/screens/Home/JobSearchDetail';
import ChooseRole from './src/screens/Auth/ChooseRole';
import HomeEmployers from './src/screens/Employers/HomeEmployers';
import Statistical from './src/screens/Employers/Statistical';
import AddPost from './src/screens/Employers/AddPost';
import ProfileEmployer from './src/screens/Auth/ProfileEmployer';
import UserReducer from './src/reducer/UserReducer';
import MyContext from './src/config/MyContext';
import UpdateEmployer from './src/screens/Auth/UpdateEmployer';
import ListJobEmployer from './src/screens/Job/ListJobEmployer';
import CVApply from './src/screens/Employers/CVApply';
import JobReducer from './src/reducer/JobReducer';
import ApplyJob from './src/screens/Job/ApplyJob';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
// const Drawer = createDrawerNavigator();



export default function App() {
  const [user, dispatch] = useReducer(UserReducer, null);
  // const [jobState, dispatchJob] = useReducer(JobReducer, initialJobState);

  return (
    <MyContext.Provider value={[user, dispatch]}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="AuthStack" component={AuthStack} />
          <Stack.Screen name="MainTab" component={MainTab} />
          <Stack.Screen name="JobDetail" component={JobDetail} />
          <Stack.Screen name="UploadCV" component={UploadCV} />
          <Stack.Screen name="SaveJob" component={SaveJob} />
          <Stack.Screen name="JobSearch" component={JobSearch} />
          <Stack.Screen name="JobSearchDetail" component={JobSearchDetail} />
          <Stack.Screen name="ChooseRole" component={ChooseRole} />
          <Stack.Screen name="HomeEmployers" component={HomeEmployers} />
          <Stack.Screen name="AddPost" component={AddPost} />
          <Stack.Screen name="Statistical" component={Statistical} />
          <Stack.Screen name="UpdateEmployer" component={UpdateEmployer} />
          <Stack.Screen name="ListJobEmployer" component={ListJobEmployer} />
          <Stack.Screen name="CVApply" component={CVApply} />
          <Stack.Screen name="ApplyJob" component={ApplyJob} />





        </Stack.Navigator>
        <Toast />

      </NavigationContainer>
    </MyContext.Provider>

    // <UpdateEmployer></UpdateEmployer>
  );
}

function MainTab() {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            }
            else if (route.name === 'Chat') {
              iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
            }
            else if (route.name === 'Notification') {
              iconName = focused ? 'notifications' : 'notifications-outline';
            }
            else if (route.name === 'Profile') {
              iconName = focused ? 'person-circle' : 'person-circle-outline';
            }

            return <Icon name={iconName} size={28} color={color} />;
          },
          tabBarActiveTintColor: orange,
          tabBarInactiveTintColor: 'gray',
          tabBarShowLabel: false,
          headerShown: false,
          tabBarHideOnKeyboard: true,
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Chat" component={Chat} />
        <Tab.Screen name="Notification" component={Notification} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </KeyboardAvoidingView>

  );
}

function MainEmployers() {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'HomeEmployers') {
              iconName = focused ? 'layers' : 'layers-outline';
            }
            else if (route.name === 'Statistical') {
              iconName = focused ? 'stats-chart' : 'stats-chart-outline';
            }
            else if (route.name === 'AddPost') {
              iconName = focused ? 'bar-chart' : 'bar-chart-outline';
            }

            return <Icon name={iconName} size={28} color={color} />;
          },
          tabBarActiveTintColor: orange,
          tabBarInactiveTintColor: 'gray',
          tabBarShowLabel: false,
          headerShown: false,
          tabBarHideOnKeyboard: true,
        })}
      >
        <Tab.Screen name="HomeEmployers" component={HomeEmployers} />
        <Tab.Screen name="AddPost" component={AddPost} />
        <Tab.Screen name="Statistical" component={Statistical} />

      </Tab.Navigator>
    </KeyboardAvoidingView>

  );
}


function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Wellcome">
      <Stack.Screen
        name="Wellcome"
        component={Wellcome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotPass"
        component={ForgotPass}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

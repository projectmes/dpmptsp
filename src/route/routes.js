import React from 'react';
import {Text} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ListIcons from 'react-native-vector-icons/Octicons';
import ProfilIcons from 'react-native-vector-icons/FontAwesome';
import EditIcons from 'react-native-vector-icons/Feather';
import Splash from '../pages/splash';
import Login from '../pages/login';
import Step from '../pages/step';
import Izin from '../pages/izin';
import Profil from '../pages/profil';
import EditProfil from '../pages/editprofil';
import DataPemohon from '../pages/datapemohon';
import Notif from '../pages/notif';
import Register from '../pages/register';
import PanduanDaftar from '../pages/panduandaftar';
import {styles, color} from '../assets/style/style';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const ProfilStack = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profil"
        component={Profil}
        options={{
          headerStyle: {elevation: 0, backgroundColor: color.primaryColor},
          headerTintColor: color.lightColor,
          headerRight: ({tintColor}) => (
            <EditIcons
              name="edit"
              color={tintColor}
              size={25}
              onPress={() => navigation.navigate('EditProfil')}
              style={{marginRight: 10}}
            />
          ),
        }}
      />
      <Stack.Screen
        name="EditProfil"
        component={EditProfil}
        options={{
          headerStyle: {elevation: 0, backgroundColor: color.primaryColor},
          headerTintColor: color.lightColor,
          headerTitle: 'Edit Profil',
        }}
      />
    </Stack.Navigator>
  );
};

const IzinStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Izin"
        component={Izin}
        options={{
          headerStyle: {elevation: 0, backgroundColor: color.primaryColor},
          headerTintColor: color.lightColor,
        }}
      />
    </Stack.Navigator>
  );
};

const BottomTab = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: color.primaryColor,
        inactiveTintColor: '#e0e0e0',
        style: {elevation: 0, borderWidth: 0},
        labelStyle: {fontSize: 14, fontWeight: 'bold'},
      }}>
      <Tab.Screen
        component={IzinStack}
        name="Izin"
        options={{
          tabBarLabel: 'Izin',
          tabBarIcon: ({color, size}) => (
            <ListIcons name="checklist" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        component={ProfilStack}
        name="Profil"
        options={{
          tabBarLabel: 'Profil',
          tabBarIcon: ({color, size}) => (
            <ProfilIcons name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const StackNav = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerStyle: {elevation: 0, backgroundColor: color.primaryColor},
            headerTintColor: color.lightColor,
          }}
        />
         <Stack.Screen
          name="PanduanDaftar"
          component={PanduanDaftar}
          options={{
            headerStyle: {elevation: 0, backgroundColor: color.primaryColor},
            headerTintColor: color.lightColor,
            headerTitle: 'Panduan Pendaftaran',
          }}
        />
        <Stack.Screen
          name="Step"
          component={Step}
          options={{
            headerStyle: {elevation: 0, backgroundColor: color.primaryColor},
            headerTintColor: color.lightColor,
            headerTitle: 'Data',
          }}
        />
        <Stack.Screen
          name="Notif"
          component={Notif}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DataMohon"
          component={DataPemohon}
          options={{
            headerStyle: {elevation: 0, backgroundColor: color.primaryColor},
            headerTintColor: color.lightColor,
            headerTitle: 'List Permohonan',
          }}
        />
        <Stack.Screen
          name="Tab"
          component={BottomTab}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNav;

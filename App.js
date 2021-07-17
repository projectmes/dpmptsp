/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  ScrollView,
  View,
  Text,
} from 'react-native';

const App: () => React$Node = () => {
  const nama = "DPMPTSP";
  return (
  <View>
    <Text>Haloo ${nama} </Text>
  </View>    
  );
};


export default App;

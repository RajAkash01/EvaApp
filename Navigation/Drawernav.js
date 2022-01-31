import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Maps from '../Screens/Maps';
import RouteLog from '../Screens/RouteLog';
import CardDetail from '../Screens/CardDetail';

const Drawer = createDrawerNavigator();

function Drawernav(props) {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        presentation: 'modal',
        drawerActiveBackgroundColor: '#e4e6eb',
        drawerLabelStyle: { color: 'black' },
      }}
      defaultStatus="closed"
    >
      <Drawer.Screen name="Maps" component={Maps} />
      <Drawer.Screen name="Routelog" component={RouteLog} />
      <Drawer.Screen name="Records" component={CardDetail} />
    </Drawer.Navigator>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
export default Drawernav;

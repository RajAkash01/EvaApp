import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Modal,
  Text,
  Switch,
} from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Callout,
  Polyline,
  Geojson,
} from 'react-native-maps';
import darkmapstyle, { standardmap } from '../Miscellaneous/Mapdata';
import { Octicons, Feather } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('screen');

const myPlace = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [64.165329, 48.844287],
      },
    },
  ],
};
function Maps({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [maplat, setmaplat] = useState(37.78825); //25.287102
  const [maplong, setmaplong] = useState(-122.4324); //83.113285
  const [Upmaplat, setupmaplat] = useState(0);
  const [Upmaplong, setupmaplong] = useState(0);

  const [markerlat, setmarkerlat] = useState(37.78456);
  const [markerlong, setmarkerlong] = useState(-122.4324);
  const [Upmarkerlat, setupmarkerlat] = useState(0);
  const [Upmarkerlong, setupmarkerlong] = useState(0);

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return (
    <View>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        customMapStyle={isEnabled == true ? darkmapstyle : standardmap}
        region={{
          latitude: maplat,
          longitude: maplong,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
        <Polyline
          coordinates={[
            { latitude: 37.8025259, longitude: -122.4351431 },
            { latitude: 37.7896386, longitude: -122.421646 },
            { latitude: 37.7665248, longitude: -122.4161628 },
            { latitude: 37.7734153, longitude: -122.4577787 },
            { latitude: 37.7948605, longitude: -122.4596065 },
            { latitude: 37.8025259, longitude: -122.4351431 },
          ]}
          strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
          strokeColors={[
            '#7F0000',
            '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
            '#B24112',
            '#E5845C',
            '#238C23',
            '#7F0000',
          ]}
          strokeWidth={6}
        />
        <Marker
          coordinate={{
            latitude: markerlat,
            longitude: markerlong,
          }}
          image={require('../assets/pin.png')}
          title="pointed location"
          description="location of exact latitude and longitude"
        ></Marker>
        {/* <Geojson
      geojson={myPlace}
      strokeColor="red"
      fillColor="green"
      strokeWidth={2}
    /> */}
      </MapView>

      <Modal style={{ flex: 1 }} animationType="slide" visible={modalVisible}>
        <Text style={{ marginTop: 19, fontSize: 18, marginBottom: 10 }}>
          For Map Location
        </Text>
        <TextInput
          style={{
            justifyContent: 'center',
            alignSelf: 'center',
            fontSize: 16,
          }}
          placeholder="Enter latitude (e.g 25.287102)"
          onChangeText={(t) => setupmaplat(Number(t))}
        />
        <TextInput
          style={{
            justifyContent: 'center',
            alignSelf: 'center',
            fontSize: 16,
          }}
          placeholder="Enter longitude (e.g 83.113285)"
          onChangeText={(t) => setupmaplong(Number(t))}
        />

        <TouchableOpacity
          onPress={() => [
            setmaplat(Upmaplat),
            console.log(Upmaplat, Upmaplong),
            setmaplong(Upmaplong),
          ]}
        >
          <Text>Update</Text>
        </TouchableOpacity>
        <Text style={{ marginTop: 19, fontSize: 18, marginBottom: 10 }}>
          For Marker location
        </Text>
        <TextInput
          style={{
            justifyContent: 'center',
            alignSelf: 'center',
            fontSize: 16,
          }}
          placeholder="Enter latitude"
          onChangeText={(t) => setupmarkerlat(Number(t))}
        />
        <TextInput
          style={{
            justifyContent: 'center',
            alignSelf: 'center',
            fontSize: 16,
          }}
          placeholder="Enter longitude"
          onChangeText={(t) => setupmarkerlong(Number(t))}
        />
        <TouchableOpacity
          onPress={() => [
            setmarkerlat(Upmarkerlat),
            console.log(Upmarkerlat, Upmarkerlong),
            setmarkerlong(Upmarkerlong),
          ]}
        >
          <Text>Update</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', top: 10 }}>
          <Text style={{ fontSize: 18 }}>Dark Mode</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignSelf: 'center',
            marginTop: 20,
          }}
          onPress={() => setModalVisible(false)}
        >
          <Text style={{ fontSize: 16 }}>Done</Text>
        </TouchableOpacity>
      </Modal>

      <TouchableOpacity
        style={{
          backgroundColor: '#E0DEDE',
          borderRadius: 29,
          width: 65,
          height: 60,
          justifyContent: 'center',
          alignItems: 'center',
          top: 25,
          left: 20,
        }}
        onPress={() => navigation.openDrawer()}
      >
        <Feather name="menu" size={28} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: '#E0DEDE',
          borderRadius: 29,
          width: 65,
          height: 60,
          justifyContent: 'center',
          alignItems: 'center',
          left: 320,
          bottom: 29,
        }}
        onPress={() => setModalVisible(true)}
      >
        <Feather name="filter" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container2: {
    ...StyleSheet.absoluteFillObject,
    height: height,
    width: width,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    width: width,
    height: height,
  },
});
export default Maps;

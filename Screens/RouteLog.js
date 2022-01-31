import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Modal,
  Pressable,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import Colors from '../Colors';
import 'react-native-reanimated';
import { MotiView, MotiText } from 'moti';

function RouteLog(props) {
  const fakedata = [
    {
      id: 1,
      title: 'Pickup',
      description: '27 Runte point suite 872',
      pickuprecordgiven: true,
    },
    {
      id: 2,
      title: 'Drop',
      description: '27 Runte point suite 872',
      pickuprecordgiven: false,
    },
    {
      id: 3,
      title: 'Pickup',
      description: '27 Runte point suite 872',
      pickuprecordgiven: false,
    },
    {
      id: 4,
      title: 'Pickup',
      description: '27 Runte point suite 872',
      pickuprecordgiven: false,
    },
  ];
  const lastelement = fakedata.slice(-1).map((item) => {
    return item.id;
  });
  const Pbartogo = fakedata
    .filter((item) => item.pickuprecordgiven == true)
    .map((item) => {
      return item.id;
    });
  const Card = ({ title, description, pickuprecordgiven }) => {
    const [threedot, setthreedot] = useState(false);
    return (
      <View style={{ left: 29, top: 19 }}>
        <View
          style={{
            left: 10,
            width: 330,
            height: 110,
            borderWidth: 1,
            borderColor: Colors.Outline,
            borderRadius: 15,
            backgroundColor: '#fff',
            marginBottom: 20,
          }}
        >
          <View style={{ left: 20, top: 19 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 17 }}>{title}</Text>
            <Text style={{ color: 'grey' }}>{description}</Text>
            <View style={{ flexDirection: 'row', top: 15 }}>
              <TouchableOpacity style={{ paddingRight: 35 }}>
                <Text style={{ fontWeight: 'bold', color: Colors.purple }}>
                  {pickuprecordgiven == true ? 'View Photos' : 'Upload photos'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={{ fontWeight: 'bold', color: Colors.purple }}>
                  {pickuprecordgiven == true ? "Doc's Viewing" : "Upload Doc's"}
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{
                left: 260,
                bottom: 60,
                justifyContent: 'center',
                alignItems: 'center',
                width: 32,
              }}
              onPress={() =>
                threedot == false ? setthreedot(true) : setthreedot(false)
              }
            >
              <Entypo name="dots-three-horizontal" size={24} color="black" />
            </TouchableOpacity>
            <View style={styles.arrowborderb} />
            <View style={styles.arrow} />
            {/* Progress bar Cicrcle here */}
            <MotiView
              from={{ opacity: 0, scale: 0, height: 0 }}
              animate={{ opacity: 1, scale: 1, height: 25 }}
              transition={{ type: 'timing', duration: 710 }}
              style={{
                width: 25,
                height: 25,
                backgroundColor:
                  pickuprecordgiven == true ? Colors.purple : Colors.Outline,
                borderRadius: 20,
                borderWidth: 3,
                borderColor: '#fff',
                right: 58,
                bottom: 130,
              }}
            />
            {threedot == true ? (
              <TouchableOpacity
                style={{
                  width: 150,
                  height: 40,
                  position: 'absolute',
                  borderRadius: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  left: 140,
                  top: 17,
                  borderWidth: 1,
                  borderColor: '#F5F5F5',
                  backgroundColor: '#fff',
                }}
              >
                <Text>Update delay Reason</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: 'bold', fontSize: 20, left: 20, bottom: 2 }}>
        Stop Details
      </Text>
      <View style={{ flexDirection: 'row', flex: 1 }}>
        {/* Progress line here */}

        <View
          style={{
            width: 10,
            height: 115 * lastelement,
            backgroundColor: Colors.Outline,
            borderRadius: 30,
            position: 'absolute',
            right: 382,
            top: 29,
          }}
        />
        {/* {console.log(Pbartogo)} */}
        <MotiView
          from={{ height: 0 }}
          animate={{ height: 115 * Pbartogo }}
          transition={{ type: 'timing', duration: 2300 }}
          style={{
            width: 10,
            height: 115 * Pbartogo,
            backgroundColor: Colors.purple,
            borderRadius: 30,
            right: -20,
            top: 29,
          }}
        />

        <FlatList
          data={fakedata}
          keyExtractor={(index) => index.id.toString()}
          renderItem={({ item }) => {
            return (
              <Card
                title={item.title}
                description={item.description}
                pickuprecordgiven={item.pickuprecordgiven}
              />
            );
          }}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#F7F7FB',
    flex: 1,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 19,
    alignSelf: 'center',
    marginTop: -32,
    right: 196,
    bottom: 96,
    transform: [{ rotate: '90deg' }],
  },
  arrowborderb: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: Colors.Outline,
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5,
    right: 198,
    bottom: 93.6,
    transform: [{ rotate: '90deg' }],
  },
});
export default RouteLog;

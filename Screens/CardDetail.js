import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import { create } from 'apisauce';
import { Avatar } from 'react-native-paper';
import Colors from '../Colors';

const { width, height } = Dimensions.get('window');
function CardDetail(props) {
  const [listings, setlistings] = useState();
  useEffect(() => {
    fetech();
  }, []);

  const fetech = async () => {
    const api = create({
      baseURL: 'https://reqres.in',
      headers: { 'Content-Type': 'application/json' },
    });
    const endpoint = `/api/users?page=2`;
    const response = await api.get(endpoint);
    setlistings(response.data);
    // console.log(response.data);
  };
  const Card = ({ Fname, Lname, Email, avatar }) => {
    return (
      <View
        style={{
          height: 100,
          left: 12,
        }}
      >
        {/* <Image
          source={{ uri: avatar }}
          style={{
            width: 50,
            height: 60,
            borderRadius: 40,
            overflow: 'hidden',
          }}
        /> */}
        <View
          style={{
            width: 390,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: Colors.Outline,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              top: 5,
              left: 6,
            }}
          >
            <Avatar.Image size={70} source={{ uri: avatar }} />
            <Text style={{ left: 10 }}>{Fname + ' ' + Lname}</Text>
          </View>
          <Text style={{ left: 85, bottom: 40 }}>{Email}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Text
        style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10, left: 16 }}
      >
        CardDetailScreen
      </Text>
      {listings == undefined ? (
        console.log('undefined got')
      ) : (
        <FlatList
          data={listings.data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            return (
              <Card
                Fname={item.first_name}
                Lname={item.last_name}
                Email={item.email}
                avatar={item.avatar}
              />
              // console.log(item)
            );
          }}
        />
      )}
      {/* {console.log(listings.data)} */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
export default CardDetail;

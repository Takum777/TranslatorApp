import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Profile = ({ userInfo }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: userInfo.picture }} style={styles.image} />
      <Text style={styles.text}>Name: {userInfo.given_name}</Text>
      <Text style={styles.text}>Surname: {userInfo.family_name}</Text>
      <Text style={styles.text}>Email: {userInfo.email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default Profile;

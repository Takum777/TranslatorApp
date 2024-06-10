import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Logo = () => (
  <View style={styles.container}>
    <Image source={require('../../assets/logo.png')} style={styles.logo} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
});

export default Logo;

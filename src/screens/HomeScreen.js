import React from 'react';
import { View, StyleSheet } from 'react-native';
import Translator from '../components/Translator';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Translator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;

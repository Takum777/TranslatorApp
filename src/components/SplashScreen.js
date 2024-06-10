import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Main');
    }, 3000); // 3 секунды

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
      <Text style={styles.text}>Loading...</Text>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Светлый фон
  },
  logo: {
    width: 200,  // Задайте подходящие размеры для вашего логотипа
    height: 200,
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
    color: '#000', // Черный текст
  },
});

export default SplashScreen;

import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Button, StyleSheet } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator.js';
import SplashScreen from './src/components/SplashScreen';
import { NavigationContainer } from '@react-navigation/native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: 'YOUR_EXPO_CLIENT_ID',
    androidClientId: 'YOUR_ANDROID_CLIENT_ID',
  });

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      fetchUserInfo(authentication.accessToken);
    }
  }, [response]);

  const fetchUserInfo = async (token) => {
    const response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const user = await response.json();
    setUserInfo(user);
  };

  if (isLoading) {
    return <SplashScreen />;
  }

  if (!userInfo) {
    return (
      <View style={styles.container}>
        <Button
          disabled={!request}
          title="Login with Google"
          onPress={() => {
            promptAsync();
          }}
        />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <AppNavigator userInfo={userInfo} />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;

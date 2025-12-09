import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking, StyleSheet, Platform } from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuTrigger, MenuProvider } from 'react-native-popup-menu';
import { rgbaColor } from 'react-native-reanimated/lib/typescript/Colors';

export default function RootLayout() {


  return (
    <ThemeProvider value={DefaultTheme}>
      <MenuProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{
            headerShown: true,
            headerStyle: { backgroundColor: "white" },
            headerTitle: () => (
              <View style={headerStyle.headerTitleContainer}>
                <Image
                  source={require('../assets/images/raspberry-pi.webp')}
                  style={headerStyle.headerLeftImage}
                />
                <Text style={headerStyle.headerTitle}>Raspberry Pi Demo</Text>
              </View>
            ),
            headerRight: () => (
              <Menu>
                <MenuTrigger customStyles={{ TriggerTouchableComponent: TouchableOpacity, triggerWrapper: headerStyle.controlButton }}>
                  <Image
                    source={require('../assets/images/hq720.jpg')}
                    style={headerStyle.headerRightImage}
                  />
                </MenuTrigger>
                <MenuOptions customStyles={{ optionsContainer: headerStyle.optionsContainer }}>
                  <MenuOption onSelect={() => Linking.openURL('https://ai.google.dev/gemini-api/docs/live?hl=ja')}>
                    <Text>公式ドキュメント</Text>
                  </MenuOption>
                  <MenuOption onSelect={() => Linking.openURL('https://aistudio.google.com/apikey')}>
                    <Text>APIキー発行</Text>
                  </MenuOption>
                  <MenuOption onSelect={() => Linking.openURL('https://github.com/dammy216/matsuzaki-info-app')}>
                    <Text>GitHub</Text>
                  </MenuOption>
                </MenuOptions>
              </Menu>
            ),
          }} />
        </Stack>
        <StatusBar style="auto" />
      </MenuProvider>
    </ThemeProvider>
  );
}

const headerStyle = StyleSheet.create({
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 20,
  },
  headerLeftImage: {
    width: 32,
    height: 32,
  },
  headerRightImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  controlButton: {
    alignSelf: 'flex-end',
    marginRight: Platform.OS === 'web' ? 24 : 0,
  },
  optionsContainer: {
    marginTop: 40,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 136,
  },
});

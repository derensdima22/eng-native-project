import { StyleSheet, Image, Platform } from 'react-native';

import { View, Text, NativeBaseProvider } from 'native-base';

export default function TabTwoScreen() {
  return (
    <NativeBaseProvider>
      <View>
        <Text>Hi</Text>
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});

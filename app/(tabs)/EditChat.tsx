import React from 'react';
import { VStack, HStack, Box, Text, Input, Switch, Icon, Button, Center, Divider, NativeBaseProvider } from 'native-base';
import { MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import { Keyboard, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

// Images
import Photo from "@assets/images/icons/editChat/Photo.svg";


{/* <Box bg="white" w="83%" h="80%" p={5} borderRadius="2xl" shadow={2}> */}
export default function ProfileScreen() {
  return (
    <NativeBaseProvider>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Center flex={1} bg="#e9eff6">
          <Box bg="white" w="83%" h="80%" p={hp("2%")} borderRadius="2xl" shadow={2} style={{flexDirection: "column", justifyContent: "space-between"}}>
            {/* Заголовок */}
            <Text fontSize="md" fontWeight="bold" textAlign="center">
              Edit
            </Text>

            {/* Аватарка */}
            <Center>
              <Box bg="blue.600" size={hp("8%")} borderRadius="full" justifyContent="center" alignItems="center">
                <Icon as={<Ionicons name="camera" />} size="lg" color="white" />
              </Box>
              <Text fontSize="md" mt={hp("1.1%")} color="#000000">
                Set a new photo
              </Text>
            </Center>

            {/* Поля ввода */}
            <VStack space={hp("2.5%")}>
              <Input
                placeholder="Chat name"
                placeholderTextColor="#8F8F8F"
                variant="unstyled"
                bg="#F5F7F9"
                borderRadius="lg"
                fontSize="md"
                height={hp("5%")}
                _focus={{ borderColor: 'blue.500' }}
              />
              <Input
                placeholder="Description (optional)"
                placeholderTextColor="#8F8F8F"
                variant="unstyled"
                bg="#F5F7F9"
                borderRadius="lg"
                fontSize="md"
                _focus={{ borderColor: 'blue.500' }}
                height={hp("9%")}
                multiline
              />

              <HStack alignItems="center" justifyContent="space-between">
                <Text color="gray.500" fontSize="xs">
                  Make chat private{'\n'}
                  (requires an invitation to join)
                </Text>
                <Switch size="md" />
              </HStack>
            </VStack>

            <Divider />

            {/* Опции */}
            <VStack space={4}>
              <HStack alignItems="center" justifyContent="space-between">
                <HStack space={2} alignItems="center">
                  <Icon as={<FontAwesome name="image" />} size="md" color="blue.600" />
                  <Text fontSize="md">Set a Wallpaper</Text>
                </HStack>
                <Icon as={<MaterialIcons name="arrow-forward-ios" />} size="xs" color="gray.400" />
              </HStack>

              <Divider />
              
              <HStack alignItems="center" justifyContent="space-between">
                <HStack space={2} alignItems="center">
                  <Icon as={<Ionicons name="musical-notes" />} size="md" color="blue.600" />
                  <Text fontSize="md">Set a Soundtrack</Text>
                </HStack>
                <Icon as={<MaterialIcons name="arrow-forward-ios" />} size="xs" color="gray.400" />
              </HStack>

              <Divider />
              
              <HStack alignItems="center" justifyContent="space-between">
                <HStack space={2} alignItems="center">
                  <Icon as={<Ionicons name="chatbox-ellipses" />} size="md" color="blue.600" />
                  <Text fontSize="md">Set a Chat Bot</Text>
                </HStack>
                <Icon as={<MaterialIcons name="arrow-forward-ios" />} size="xs" color="gray.400" />
              </HStack>
            </VStack>

            {/* Кнопки */}
            <HStack space={5} justifyContent="center">
              <TouchableOpacity
                style={{
                  borderRadius: 20,
                  backgroundColor: "#CDCDCD",
                  paddingHorizontal: hp("2%"),
                  paddingVertical: hp("1%")
                }}
              >
                <Text fontSize="md" color="white">
                  Cancel
                </Text>
                </TouchableOpacity>
              <TouchableOpacity
                style={{
                  borderRadius: 20,
                  backgroundColor: "#0052CD",
                  paddingHorizontal: hp("2%"),
                  paddingVertical: hp("1%")
                }}
              >
                <Text fontSize="md" color="white">
                  Set changes
                </Text>
              </TouchableOpacity>
            </HStack>
          </Box>
        </Center>
      </TouchableWithoutFeedback>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    backgroundColor: "#E8EDF2",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  containerEditChat: {
    backgroundColor: "#FFFFFF",

  }
});

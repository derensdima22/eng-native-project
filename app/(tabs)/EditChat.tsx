import React, { useState } from 'react';
import { VStack, HStack, Box, Text, Input, Switch, Icon, Button, Center, Divider, NativeBaseProvider } from 'native-base';
import { MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import { Keyboard, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

// Components
import { EditChatModal } from '../components/Profile/EditChatModal';

// Images
import { Photo } from "@assets/images/icons";


export default function ProfileScreen() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  
  const handlePhotoPress = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <NativeBaseProvider>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Center flex={1} bg="#e9eff6">
          <Box bg="white" w="83%" h="80%" p={hp("2%")} borderRadius="2xl" shadow={2} style={{flexDirection: "column", justifyContent: "space-between"}}>
            <Text fontSize="md" fontWeight="bold" textAlign="center">
              Edit
            </Text>

            <Center>
              <Box bg="blue.600" size={hp("8%")} borderRadius="full" justifyContent="center" alignItems="center">
                <Icon as={<Ionicons name="camera" />} size="lg" color="white" />
              </Box>
              <TouchableOpacity onPress={handlePhotoPress}>
                <Text fontSize="md" mt={hp("1.1%")} color="#000000">
                  Set a new photo
                </Text>
              </TouchableOpacity>
            </Center>

            <VStack space={hp("2.5%")}>
              <Input
                placeholder="Chat name"
                placeholderTextColor="#8F8F8F"
                variant="Filled"
                bg="#F5F7F9"
                borderRadius="lg"
                fontSize="md"
                height={hp("5%")}
                _focus={{ borderColor: 'blue.500' }}
              />
              <Input
                placeholder="Description (optional)"
                placeholderTextColor="#8F8F8F"
                variant="Filled"
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
                <Switch size="md" offTrackColor="#F5F7F9"/>
              </HStack>
            </VStack>

            <Divider />

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

      <EditChatModal
        isModalVisible={isModalVisible}
        handleCloseModal={handleCloseModal}
      />
    </NativeBaseProvider>
  );
};

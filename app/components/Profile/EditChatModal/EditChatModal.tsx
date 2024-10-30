import React, { FC, useState, useEffect } from 'react';
import { ModalBox } from '../../ModalBox';
import { View, Text, Image, Button, Divider } from 'native-base';
import { TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

// Images
import { Camera as CameraIcon } from "@assets/images/icons";

interface EditChatModalProps {
  isModalVisible: boolean;
  handleCloseModal: () => void;
}

export const EditChatModal: FC<EditChatModalProps> = (props) => {
  const { isModalVisible, handleCloseModal } = props;
  const [images, setImages] = useState<string[] | []>([]);
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View>
        <Text>We need your permission to show the camera</Text>
        <Button onPress={requestPermission}>grant permission</Button>
      </View>
    );
  }

  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert("Permission Denied", "Camera permission is required to use this feature.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, result.assets[0].uri]);
    }
  };

  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, result.assets[0].uri]); // Добавляем выбранное изображение в массив
    }
  };

  return (
    <ModalBox
      isModalVisible={isModalVisible}
      handleCloseModal={handleCloseModal}
      styleModal={{
        paddingHorizontal: 10,
        paddingBottom: 16,
      }}
    >
      <View style={styles.containerModal}>
        <Text style={styles.headerText}>The app can only access the photos you select</Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={true} 
          style={styles.viewPhoto}
          contentContainerStyle={{ alignItems: 'center', justifyContent: "flex-start", gap: 10 }}
        >
          <View style={styles.cameraContainer}>
            <CameraView style={styles.camera} facing={facing}>
              <TouchableOpacity style={styles.cameraButton} onPress={openCamera}>
                <CameraIcon style={styles.cameraIcon}/>
              </TouchableOpacity>
            </CameraView>
          </View>

          {!!images && images.map((image) => (
            <View key={image} style={styles.photoPlaceholder}>
              {images && <Image source={{ uri: image }} alt="Selected Image" style={styles.previewImage} />}
            </View>
          ))}
        </ScrollView>
        
        <TouchableOpacity onPress={openGallery} style={[styles.actionButton, styles.actionButtonProfile]}>
          <Text style={styles.modalActionText}>Open Gallery</Text>
        </TouchableOpacity>

        <Divider my={2} bg="#E8EDF2"/>

        <TouchableOpacity onPress={() => setImages([...images.slice(0, -1)])} style={[styles.actionButton, styles.actionButtonProfile]}>
          <Text style={styles.modalActionText}>Remove Photo</Text>
        </TouchableOpacity>

        <Divider my={2} bg="#E8EDF2"/>

        <TouchableOpacity onPress={handleCloseModal} style={styles.actionButton}>
          <Text style={[styles.modalActionText, { color: "#9F0000" }]}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </ModalBox>
  );
};

const styles = StyleSheet.create({
  containerModal: {
    width: "100%",
    alignItems: 'center',
  },
  headerText: {
    color: "#8F8F8F",
    fontSize: 12,
  },
  viewPhoto: {
    width: "100%",
    paddingVertical: 21,
    flexDirection: "row",
    gap: 10,
  },
  cameraContainer: {
    width: wp("22%"),
    aspectRatio: 1,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "black",
  },
  camera: {
    width: "100%",
    height: "100%",
  },
  cameraButton: {
    position: "relative",
    width: "100%",
    height: "100%",
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  cameraIcon: {
    position: "absolute",
    bottom: 5,
    right: 5,
  },
  photoPlaceholder: {
    width: wp("22%"),
    aspectRatio: 1,
    backgroundColor: "#d3d3d3",
    borderRadius: 10,
  },
  previewImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  actionButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    width: "100%",
  },
  actionButtonProfile: {
    // borderBottomWidth: 1,
    // borderBottomColor: '#E8EDF2',
  },
  modalActionText: {
    color: "#0052CD",
    fontSize: 16,
    fontWeight: "600",
  },
});

import React, { FC, useState, useEffect } from 'react';
import { View, Text, Image, Button, Divider } from 'native-base';
import { TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

// Components
import { ModalBox } from '@components/ModalBox';

// Hooks
import { useGalleryPhotos } from '@/hooks/profile/useGalleryPhotos';

// Styles
import { styles } from './EditChatModalStyles';

// Images
import { Camera as CameraIcon } from "@assets/images/icons";

interface EditChatModalProps {
  isModalVisible: boolean;
  handleCloseModal: () => void;
  changeImage: (uri: string) => void;
}

export const EditChatModal: FC<EditChatModalProps> = (props) => {
  const { isModalVisible, handleCloseModal, changeImage } = props;
  const [permission, requestPermission] = useCameraPermissions();

  const {
    images,
    hasPermission,
    openCamera,
    openGallery,
    setImages
  } = useGalleryPhotos(isModalVisible);

  if (!permission || hasPermission === null) return <View />;

  if (!permission.granted || !hasPermission) {
    return (
      <View>
        <Text>We need your permission to show the camera</Text>
        <Button onPress={requestPermission}>Grant Permission</Button>
      </View>
    );
  }

  return (
    <ModalBox
      isModalVisible={isModalVisible}
      handleCloseModal={handleCloseModal}
      styleModal={{ paddingHorizontal: 10, paddingBottom: 16 }}
    >
      <View style={styles.containerModal}>
        <Text style={styles.headerText}>The app can only access the photos you select</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator
          style={styles.viewPhoto}
          contentContainerStyle={{ alignItems: 'center', justifyContent: 'flex-start', gap: 10 }}
        >
          <View style={styles.cameraContainer}>
            <CameraView style={styles.camera} facing="back">
              <TouchableOpacity style={styles.cameraButton} onPress={openCamera}>
                <CameraIcon style={styles.cameraIcon} />
              </TouchableOpacity>
            </CameraView>
          </View>

          {images.slice(-3).map((image) => (
            <TouchableOpacity
              key={image}
              style={styles.photoPlaceholder}
              onPress={() => changeImage(image)}
            >
              <Image source={{ uri: image }} alt="Selected Image" style={styles.previewImage} />
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity onPress={openGallery} style={styles.actionButton}>
          <Text style={styles.modalActionText}>Open Gallery</Text>
        </TouchableOpacity>

        <Divider my={2} bg="#E8EDF2" />

        <TouchableOpacity onPress={() => setImages(images.slice(0, -1))} style={styles.actionButton}>
          <Text style={styles.modalActionText}>Remove Photo</Text>
        </TouchableOpacity>

        <Divider my={2} bg="#E8EDF2" />

        <TouchableOpacity onPress={handleCloseModal} style={styles.actionButton}>
          <Text style={[styles.modalActionText, { color: '#9F0000' }]}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </ModalBox>
  );
};

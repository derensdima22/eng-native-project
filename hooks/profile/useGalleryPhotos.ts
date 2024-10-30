import { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { Alert } from 'react-native';

export const useGalleryPhotos = (isModalVisible: boolean) => {
  const [images, setImages] = useState<string[] | []>([]);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    const getGalleryPhotos = async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === 'granted') {
        setHasPermission(true);
        const assets = await MediaLibrary.getAssetsAsync({
          mediaType: 'photo',
          first: 3,
          sortBy: [[MediaLibrary.SortBy.creationTime, false]],
        });

        const uris = await Promise.all(
          assets.assets.map(async (asset) => {
            if (asset.uri.startsWith('ph://')) {
              const assetInfo = await MediaLibrary.getAssetInfoAsync(asset.id);
              return assetInfo.localUri || asset.uri;
            }
            return asset.uri;
          })
        );

        setImages(uris);
      } else {
        setHasPermission(false);
        Alert.alert('Permission Denied', 'Access to gallery is required to view photos.');
      }
    };

    if (isModalVisible) {
      getGalleryPhotos();
    }
  }, [isModalVisible]);

  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Camera permission is required to use this feature.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setImages([result.assets[0].uri, ...images.slice(0, 2)]);
    }
  };

  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setImages([result.assets[0].uri, ...images.slice(0, 2)]);
    }
  };

  return { images, hasPermission, openCamera, openGallery, setImages };
};

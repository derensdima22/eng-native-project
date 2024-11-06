import React, { useState } from "react";
import { Animated, View, TouchableOpacity } from "react-native";
import { GestureHandlerRootView, PanGestureHandler, PanGestureHandlerGestureEvent, State } from "react-native-gesture-handler";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { NativeBaseProvider, ScrollView } from "native-base";

// Components
import {
  ProfileHeaderGroupButtons,
  GroupHeaderContainer,
  GroupInfoMembers,
  ProfileEditChat,
  ProfileContainer
} from "@components/Profile";

// Hooks
import { useProfileAnimation } from '@hooks/profile/useProfileAnimation';

// Import Icons
import { Arrow, QRCode } from "@assets/images/icons";

// Styles
import { styles } from './ProfileScreenStyles';

// Data
import { data } from "./data";

// Types
type GestureEvent = PanGestureHandlerGestureEvent;


export default function ProfileScreen() {
  const {
    panY,
    isEndReached,
    headerHeight,
    imageOpacity,
    onGestureEvent,
    onHandlerStateChange,
  } = useProfileAnimation();
  const [isEditVisible, setIsEditVisible] = useState(false);

  const handleCloseEdit = () => {
    setIsEditVisible(false);
  };

  const handleOpenEditModal = () => {
    setIsEditVisible(true);
  };

  return (
    <ProfileContainer
      handleOpenEditModal={handleOpenEditModal}
      panY={panY}
      isEndReached={isEndReached}
      headerHeight={headerHeight}
      imageOpacity={imageOpacity}
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onHandlerStateChange}
      background="../../assets/images/example.webp"
    >
      <GroupInfoMembers
        panY={panY}
        description="TextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextText"
        members={3}
        users={data}
      />
      <ProfileEditChat isEditVisible={isEditVisible} handleCloseEdit={handleCloseEdit}/>
    </ProfileContainer>


  );
};

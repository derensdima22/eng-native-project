import React, { useState } from "react";
import { PanGestureHandlerGestureEvent } from "react-native-gesture-handler";

// Components
import {
  GroupHeaderContainer,
  GroupInfoMembers,
  ProfileEditChat,
  ProfileContainer,
} from "@components/Profile";

// Hooks
import { useProfileAnimation } from '@hooks/profile/useProfileAnimation';

// Import Icons
import { Arrow, QRCode } from "@assets/images/icons";

// Styles
import { styles } from './ProfileScreenStyles';

// Data
import { data } from "./data";

// Buttons
import { chatButtons } from "@/constants/ProfileButtons";

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
      panY={panY}
      chatButtons={chatButtons}
      headerHeight={headerHeight}
      imageOpacity={imageOpacity}
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onHandlerStateChange}
      background="../../assets/images/example.webp"
      componentProp={<GroupHeaderContainer handleOpenEditModal={handleOpenEditModal} panY={panY} isEndReached={isEndReached} />}
    >
      <GroupInfoMembers
        panY={panY}
        description="TextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextText"
        members={3}
        users={data}
      />
      <ProfileEditChat isEditVisible={isEditVisible} handleCloseEdit={handleCloseEdit} />
    </ProfileContainer>
  );
};

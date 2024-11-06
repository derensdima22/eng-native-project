import React, { useState } from "react";

// Components
import {
  ProfileContainer,
  GroupHeaderContainerProfile,
  TabContentSection,
} from "@components/Profile";

// Hooks
import { useProfileAnimation } from '@hooks/profile/useProfileAnimation';

// Styles
import { styles } from './ProfileScreenStyles';

// Data
import { dataUserProfileAll } from "./data";

// Buttons
import { profileButtons } from "@/constants/ProfileButtons";


export default function TabTwoScreen() {
  const {
    panY,
    headerHeight,
    isEndReached,
    imageOpacity,
    onGestureEvent,
    onHandlerStateChange,
    triggerAnimationToEnd,
  } = useProfileAnimation();
  
  const [isViewTransition, setIsViewTransition] = useState<boolean>(false);

  const onTransaction = () => {
    if (!isEndReached) {
      triggerAnimationToEnd();
    };
    
    setIsViewTransition(true);
  }

  return (
    <ProfileContainer
      panY={panY}
      chatButtons={profileButtons}
      headerHeight={headerHeight}
      imageOpacity={imageOpacity}
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onHandlerStateChange}
      background="../../assets/images/example.webp"
      componentProp={
        <GroupHeaderContainerProfile
          panY={panY}
          numberCoin={120}
          secondNumberCoin={14}
          onTransaction={onTransaction}
        />
      }
    >
      <TabContentSection
        panY={panY}
        about="TextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextText"
        data={dataUserProfileAll}
        defaultTab="all"
      />
    </ProfileContainer>
  );
};

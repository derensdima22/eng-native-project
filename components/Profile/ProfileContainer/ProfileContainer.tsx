import React, { FC, ReactNode, useState } from "react";
import { Animated, View, TouchableOpacity } from "react-native";
import { GestureHandlerRootView, PanGestureHandler, PanGestureHandlerGestureEvent, State } from "react-native-gesture-handler";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { NativeBaseProvider, ScrollView } from "native-base";

// Components
import {
  ProfileHeaderGroupButtons,
  GroupHeaderContainer,
  GroupInfoMembers,
  ProfileEditChat
} from "@components/Profile";

// Import Icons
import { Arrow, QRCode } from "@assets/images/icons";

// Hooks
import { useProfileAnimation } from "@/hooks/profile";

// Styles
import { styles } from "./ProfileContainerStyle";

interface ProfileContainerType {
  panY: Animated.Value;
  background: string;
  handleOpenEditModal: () => void;
  children: ReactNode;
  isEndReached: boolean;
  headerHeight: Animated.AnimatedInterpolation<string | number>
  imageOpacity: Animated.AnimatedInterpolation<string | number>
  onGestureEvent: (...args: any[]) => void;
  onHandlerStateChange: (event: PanGestureHandlerGestureEvent) => void
}

export const ProfileContainer: FC<ProfileContainerType> = (props) => {
  const {
    panY,
    isEndReached,
    headerHeight,
    imageOpacity,
    onGestureEvent,
    onHandlerStateChange,
    handleOpenEditModal,
    children
  } = props;
  
  return (
    <NativeBaseProvider>
      <View style={{height: "100%"}}>
        <GestureHandlerRootView style={{ flex: 1, backgroundColor: "black" }}>
          <PanGestureHandler
            onGestureEvent={onGestureEvent}
            onHandlerStateChange={onHandlerStateChange}
          >
            <Animated.View style={{ flex: 1 }}>
              <Animated.View style={[styles.header, { height: headerHeight }]}>
                <View style={styles.headerButtons}>
                  <TouchableOpacity><Arrow height={hp("4%")}/></TouchableOpacity>
                  <TouchableOpacity><QRCode height={hp("4%")}/></TouchableOpacity>
                </View>
                <View style={{position: "relative"}}>
                  <GroupHeaderContainer handleOpenEditModal={handleOpenEditModal} panY={panY} isEndReached={isEndReached} />
                  <ProfileHeaderGroupButtons panY={panY} />
                </View>
              </Animated.View>

              <Animated.Image
                source={require("../../../assets/images/example.webp")}
                style={[styles.headerImage, { opacity: imageOpacity }]}
                resizeMode="cover"
              />

              {children}
            </Animated.View>
          </PanGestureHandler>
        </GestureHandlerRootView>
      </View>
    </NativeBaseProvider>
  );
};

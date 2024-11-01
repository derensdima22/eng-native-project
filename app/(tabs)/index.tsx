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
  ProfileEditChat
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
    <NativeBaseProvider>
      {/* !!!!!!!!!!!!!!!!!!!!!!!! */}
      <ScrollView height="100%">
      <GestureHandlerRootView style={{ flex: 1 }}>
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
                source={require("../../assets/images/example.webp")}
                style={[styles.headerImage, { opacity: imageOpacity }]}
                resizeMode="cover"
              />

            <GroupInfoMembers
              panY={panY}
              description="TextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextText"
              members={3}
              users= {data}
            />
          </Animated.View>
        </PanGestureHandler>
      </GestureHandlerRootView>
      </ScrollView>
      <ProfileEditChat isEditVisible={isEditVisible} handleCloseEdit={handleCloseEdit}/>
    </NativeBaseProvider>
  );
};

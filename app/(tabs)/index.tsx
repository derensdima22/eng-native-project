import React, { useRef, useState } from "react";
import { Animated, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { GestureHandlerRootView, PanGestureHandler, PanGestureHandlerGestureEvent, State } from "react-native-gesture-handler";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

// Components
import { ProfileHeaderGroupButtons } from "../components/Profile/ProfileHeader";
import { GroupHeaderContainer } from "../components/Profile/GroupHeaderContainer";
import { GroupInfoMembers } from "../components/Profile/GroupInfoMembers";

// Import Icons
import Arrow from "../../assets/images/icons/Arrow.svg";
import QRCode from "../../assets/images/icons/QRCode.svg";

// Data
import { data } from "./data";
import { NativeBaseProvider } from "native-base";

// Types
type GestureEvent = PanGestureHandlerGestureEvent;


export default function ProfileScreen() {
  const panY = useRef(new Animated.Value(0)).current;
  const [isEndReached, setIsEndReached] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const midpoint = -hp("12.5%"); 

  const headerHeight = panY.interpolate({
    inputRange: [-hp("25%"), 0],
    outputRange: [hp("24%"), hp("57%")],
    extrapolate: "clamp",
  });

  const imageOpacity = panY.interpolate({
    inputRange: [-hp("25%"), 0],
    outputRange: [0.4, 1],
    extrapolate: "clamp",
  });

  const onGestureEvent = Animated.event<GestureEvent>(
    [{ nativeEvent: { translationY: panY } }],
    { useNativeDriver: false }
  );

  const onHandlerStateChange = (event: GestureEvent) => {
    if (event.nativeEvent.state === State.BEGAN) {
      if (!isDragging) {
        setIsDragging(true);
        panY.setOffset(panY._value);
        panY.setValue(0);
      }
    }

    if (event.nativeEvent.state === State.END) {
      setIsDragging(false);
      panY.flattenOffset();

      const currentValue = panY._value;
      if (currentValue < midpoint) {
        Animated.spring(panY, {
          toValue: -hp("25%"),
          useNativeDriver: false,
        }).start(() => setIsEndReached(true));
      } else {
        Animated.spring(panY, {
          toValue: 0,
          useNativeDriver: false,
        }).start(() => setIsEndReached(false));
      }
    }
  };

  return (
    <NativeBaseProvider>
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
                <GroupHeaderContainer panY={panY} isEndReached={isEndReached} />
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
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: wp("9%"),
    paddingBottom: hp("5%"),
    paddingTop: hp("5%"),
    position: "relative",
    width: "100%",
    overflow: "hidden",
    justifyContent: "space-between",
    zIndex: 100,
    borderStartColor: "transparent"
  },
  headerButtons: {
    margin: 0,
    padding: 0,
    height: hp("4%"),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    backgroundColor: "#000000"
  },
  container: {
    position: "absolute",
    top: hp("57%"),
    left: 0,
    right: 0,
    backgroundColor: "#E8EDF2",
    height: "100%"
  },
});

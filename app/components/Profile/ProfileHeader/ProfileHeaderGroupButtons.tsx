import React, { FC, useEffect, useState } from 'react';
import { Animated, TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { TouchableHighlight } from 'react-native-gesture-handler';

// import Icons
import {
  Bell,
  MuteBell,
  Search,
  Leave,
  Report,
} from "@assets/images/icons";

interface ProfileHeaderGroupButtonsProps {
  panY: Animated.Value;
  mute?: boolean;
}

export const ProfileHeaderGroupButtons: FC<ProfileHeaderGroupButtonsProps> = (props) => {
  const { panY, mute = true } = props;
  const [isVisible, setIsVisible] = useState(true);

  const buttonHeight = panY.interpolate({
    inputRange: [-hp("25%"), 0],
    outputRange: [0, wp("15%")],
    extrapolate: "clamp",
  });

  const opacity = panY.interpolate({
    inputRange: [-hp("23%"), 0],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const iconScale  = panY.interpolate({
    inputRange: [-hp("15%"), 0],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  useEffect(() => {
    const opacityListener = opacity.addListener(({ value }) => {
      setIsVisible(value > 0);
    });
  
    return () => {
      opacity.removeListener(opacityListener);
    };
  }, [opacity]);

  return (
    <Animated.View style={[styles.buttonsGroup, { opacity }]}>
      {isVisible && <>
        <View>
        <TouchableHighlight
          style={[styles.iconButtons, { height: buttonHeight, backgroundColor: mute ? "#0052CD" : "#50504E" }]}
          onPress={() => console.log("mute")}
          >
          <Animated.View style={{ transform: [{ scale: iconScale }] }}>
            {mute ? <MuteBell /> : <Bell />}
          </Animated.View>
        </TouchableHighlight>
        <Text style={styles.textBottom}>Muted</Text>
      </View>

      {isVisible && <View>
        <TouchableHighlight
          style={[styles.iconButtons, { height: buttonHeight, backgroundColor: "#50504E" }]}
          onPress={() => console.log("Search")}
        >
          <Animated.View style={{ transform: [{ scale: iconScale }] }}>
            <Search />
          </Animated.View>
        </TouchableHighlight>
        <Text style={styles.textBottom}>Search</Text>
      </View>}

      <View>
        <TouchableHighlight
          style={[styles.iconButtons, { height: buttonHeight, backgroundColor: "#50504E" }]}
          onPress={() => console.log("Leave")}
        >
          <Animated.View style={{ transform: [{ scale: iconScale }] }}>
            <Leave />
          </Animated.View>
        </TouchableHighlight>
        <Text style={styles.textBottom}>Leave</Text>
      </View>

      <View>
        <TouchableHighlight
          style={[styles.iconButtons, { height: buttonHeight, backgroundColor: "#50504E" }]}
          onPress={() => console.log("Report")}
        >
          <Animated.View style={{ transform: [{ scale: iconScale }] }}>
            <Report />
          </Animated.View>
        </TouchableHighlight>
        <Text style={styles.textBottom}>Report</Text>
      </View>
      </>}
  </Animated.View>
  );
};

const styles = StyleSheet.create({
  buttonsGroup: {
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconButtons: {
    width: wp("15%"),
    height: wp("15%"),
    padding: hp("2%"),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#50504E",
    opacity: 0.5,
    borderRadius: 15,
  },
  textBottom: {
    textAlign: "center",
    fontSize: 12,
    color: "#FFFFFF",
    paddingTop: 4,
  }
})
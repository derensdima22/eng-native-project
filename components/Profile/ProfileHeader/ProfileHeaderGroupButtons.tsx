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

// Hooks
import { useAnimatedButtonStyles } from '@/hooks/profile';

// Styles
import { styles } from "./ProfileHeaderGroupButtonsStyle";

interface ProfileHeaderGroupButtonsProps {
  panY: Animated.Value;
  mute?: boolean;
}

export const ProfileHeaderGroupButtons: FC<ProfileHeaderGroupButtonsProps> = (props) => {
  const { panY, mute = true } = props;
  const { buttonHeight, opacity, iconScale, isVisible } = useAnimatedButtonStyles(panY);

  return (
    <Animated.View style={[styles.buttonsGroup, { opacity }]}>
      {isVisible && <>
        <View>
        <TouchableHighlight
          style={[styles.iconButtons, { height: buttonHeight }]}
          onPress={() => console.log("mute")}
        >
          <>
            <View style={[styles.backgroundLayer, { backgroundColor: mute ? "#0052CD" : "#50504E" }]} />
            <Animated.View style={[styles.icon, { transform: [{ scale: iconScale }] }]}>
              {mute ? <MuteBell /> : <Bell />}
            </Animated.View>
          </>
        </TouchableHighlight>
        <Text style={styles.textBottom}>Muted</Text>
      </View>

      {isVisible && <View>
        <TouchableHighlight
          style={[styles.iconButtons, { height: buttonHeight }]}
          onPress={() => console.log("Search")}
        >
          <>
            <View style={styles.backgroundLayer} />
            <Animated.View style={[styles.icon, { transform: [{ scale: iconScale }] }]}>
              <Search />
            </Animated.View>
          </>
        </TouchableHighlight>
        <Text style={styles.textBottom}>Search</Text>
      </View>}

      <View>
        <TouchableHighlight
          style={[styles.iconButtons, { height: buttonHeight }]}
          onPress={() => console.log("Leave")}
        >
          <>
            <View style={styles.backgroundLayer} />
            <Animated.View style={[styles.icon, { transform: [{ scale: iconScale }] }]}>
              <Leave />
            </Animated.View>
          </>  
        </TouchableHighlight>
        <Text style={styles.textBottom}>Leave</Text>
      </View>

      <View>
        <TouchableHighlight
          style={[styles.iconButtons, { height: buttonHeight }]}
          onPress={() => console.log("Report")}
        >
          <>
            <View style={styles.backgroundLayer} />
            <Animated.View style={[styles.icon, { transform: [{ scale: iconScale }] }]}>
              <Report />
            </Animated.View>
          </>
        </TouchableHighlight>
        <Text style={styles.textBottom}>Report</Text>
      </View>
      </>}
  </Animated.View>
  );
};

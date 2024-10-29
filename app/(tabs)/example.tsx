import React, { useRef } from "react";
import { Animated, Text, View, Image, StyleSheet, Dimensions } from "react-native";
import { GestureHandlerRootView, PanGestureHandler, State } from "react-native-gesture-handler";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function ProfileScreen() {
  const panY = useRef(new Animated.Value(0)).current;

  const headerHeight = panY.interpolate({
    inputRange: [-hp("25%"), 0],
    outputRange: [hp("24%"), hp("57%")],
    extrapolate: "clamp",
  });

  const avatarOpacity = panY.interpolate({
    inputRange: [-hp("35%"), 0],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const avatarTranslateX = panY.interpolate({
    inputRange: [-hp("25%"), 0],
    outputRange: [0, -80],
    extrapolate: "clamp",
  });

  const imageOpacity = panY.interpolate({
    inputRange: [-hp("25%"), 0],
    outputRange: [0.5, 1],
    extrapolate: "clamp",
  });

  const tabsTranslateY = panY.interpolate({
    inputRange: [-hp("25%"), 0],
    outputRange: [-hp("33%"), 0],
    extrapolate: "clamp",
  });

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationY: panY } }],
    { useNativeDriver: false }
  );

  const onHandlerStateChange = (event) => {
    if (event.nativeEvent.state === State.BEGAN) {
      panY.setOffset(panY._value);
      panY.setValue(0);
    }
    if (event.nativeEvent.state === State.END) {
      panY.flattenOffset();
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
      >
        <Animated.View style={{ flex: 1 }}>
          <Animated.View style={[styles.header, { height: headerHeight }]}>
            <Animated.Image
              source={require("../../assets/images/car.jpg")}
              style={[
                styles.avatar,
                {
                  opacity: avatarOpacity,
                  transform: [{ translateX: avatarTranslateX }],
                },
              ]}
            />
            <Text style={styles.userName}>User Name</Text>
            <View style={styles.iconsRow}>
              <View style={styles.iconContainer}>
                <Text style={styles.iconText}>1305</Text>
              </View>
              <View style={styles.iconContainer}>
                <Text style={styles.iconText}>90</Text>
              </View>
            </View>
          </Animated.View>

          <Animated.Image
              source={require("../../assets/images/car.jpg")}
              style={[styles.headerImage, { opacity: imageOpacity }]}
              resizeMode="cover"
            />

          {/* Вкладки и Контент */}
          <Animated.View style={[styles.container, { transform: [{ translateY: tabsTranslateY }] }]}>
            <View style={styles.tabs}>
              <Text style={styles.tabText}>Description</Text>
              <Text style={styles.tabText}>TextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextText</Text>
            </View>

            <View style={styles.tabsContainer}>
              <View style={styles.tabs}>
                <Text style={styles.tabText}>Items</Text>
                <Text style={styles.tabText}>Collections</Text>
                <Text style={styles.tabText}>Documents</Text>
              </View>

              {/* Контент */}
              <View style={styles.content}>
                <Text>Legal contract 1</Text>
                <Text>Legal contract 2</Text>
                <Text>Legal contract 3</Text>
              </View>
            </View>
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 35,
    position: "relative",
    width: "100%",
    overflow: "hidden",
    zIndex: 100,
    borderStartColor: "transparent"
  },
  headerImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    backgroundColor: "#000000"
  },
  avatar: {
    width: hp("8%"),
    height: hp("8%"),
    borderRadius: 50,
    position: "absolute",
    bottom: 10,
    left: 10,
  },
  userName: {
    position: "absolute",
    bottom: 10,
    left: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "blue",
  },
  iconsRow: {
    position: "absolute",
    top: 10,
    right: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconContainer: {
    backgroundColor: "#000",
    padding: 4,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  iconText: {
    color: "#fff",
    fontSize: 12,
  },
  descriptionContainer: {
    position: "absolute",
    top: hp("58.6%"),
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  container: {
    position: "absolute",
    top: hp("57%"),
    left: 0,
    right: 0,
    backgroundColor: "#E8EDF2",
    height: "100%"
  },
  tabsContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  content: {
    backgroundColor: "#fff",
    paddingVertical: 16,
  },
});

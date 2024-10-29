import React, { FC, useEffect, useMemo, useState } from 'react';
import { Animated, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

// Import Icons
import Star from "@assets/images/icons/Star.svg";
import Favorite from "@assets/images/icons/Favorite.svg";
import Dots from "@assets/images/icons/Dots.svg";

interface GroupHeaderContainerProps {
  panY: Animated.Value;
  isEndReached: boolean;
}

export const GroupHeaderContainer: FC<GroupHeaderContainerProps> = (props) => {
  const { panY, isEndReached } = props;

  const [isFavorite, setIsFavorite] = useState(false);

  const favoriteIcon = useMemo(() => {
    return isFavorite
      ? <Favorite height={hp("3%")} width={hp("3%")} />
      : <Star height={hp("3%")} width={hp("3%")} />;
  }, [isFavorite]);

  const avatarOpacity = panY.interpolate({
    inputRange: [-hp("55%"), 0],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const avatarTranslateX = panY.interpolate({
    inputRange: [-hp("25%"), 0],
    outputRange: [0, -80],
    extrapolate: "clamp",
  });

  const containerTranslateY = panY.interpolate({
    inputRange: [-hp("25%"), 0],
    outputRange: [hp("5.5%"), 0],
    extrapolate: "clamp",
  });

  const handlePress = () => {
    if (isEndReached) {
      console.log("Filled Star pressed");
    } else {
      console.log("Star pressed");
      setIsFavorite(!isFavorite);
    }
  };

  return (
    <Animated.View style={[styles.groupHeaderContainer, { transform: [{ translateY: containerTranslateY }] }]}>
      <View style={styles.userContainer}>
        <Animated.Image
          source={require("../../../../assets/images/example.webp")}
          style={[
            styles.avatar,
            {
              opacity: avatarOpacity,
              transform: [{ translateX: avatarTranslateX }],
            },
          ]} />
        <Animated.View style={[{ transform: [{ translateX: avatarTranslateX }], justifyContent: "center" }]}>
          <Text style={styles.userName}>Group name</Text>
          <Text style={styles.members}>3 members</Text>
        </Animated.View>
      </View>
      <TouchableOpacity style={styles.headerStar} onPress={handlePress}>
      {isEndReached
        ? <Dots height={hp("3%")} width={hp("3%")}/>
        : favoriteIcon}
      </TouchableOpacity>
    </Animated.View>
  )

};

const styles = StyleSheet.create({
  groupHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 0,
    margin: 0,
  },
  userContainer: {
    flexDirection: "row",
    alignContent: "center",
  },
  avatar: {
    width: wp("18%"),
    aspectRatio: "1/1",
    borderRadius: 50,
    marginRight: 10,
    
  },
  userName: {
    fontSize: wp("5%"),
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  members: {
    fontSize:  wp("5%"),
    color: "#FFFFFF",
  },
  headerStar: {
    padding: hp("1%"),
    height: hp("4%"),
    width: wp("15%"),
    backgroundColor: "#50504E",
    opacity: 0.75,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center"
  },
})

import React, { FC, useEffect, useMemo, useState } from 'react';
import { Animated, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

// Hooks
import { useGroupHeaderAnimations } from '@/hooks/profile';

// Import Icons
import { Star, Favorite, Dots } from "@assets/images/icons";

// Styles
import { styles } from "./GroupHeaderContainerStyle";

interface GroupHeaderContainerProps {
  panY: Animated.Value;
  isEndReached: boolean;
  handleOpenEditModal?: () => void;
}

export const GroupHeaderContainer: FC<GroupHeaderContainerProps> = (props) => {
  const { panY, isEndReached, handleOpenEditModal } = props;
  const { avatarOpacity, avatarTranslateX, containerTranslateY } = useGroupHeaderAnimations(panY);

  const [isFavorite, setIsFavorite] = useState(false);

  const favoriteIcon = useMemo(() => {
    return isFavorite
      ? <Favorite height={hp("3%")} width={hp("3%")} />
      : <Star height={hp("3%")} width={hp("3%")} />;
  }, [isFavorite]);

  const handlePress = () => {
    if (isEndReached) {
      console.log("Filled Star pressed");
      handleOpenEditModal && handleOpenEditModal();
    } else {
      console.log("Star pressed");
      setIsFavorite(!isFavorite);
    }
  };

  return (
    <Animated.View style={[styles.groupHeaderContainer, { transform: [{ translateY: containerTranslateY }] }]}>
      <View style={styles.userContainer}>
        <Animated.Image
          source={require("../../../assets/images/example.webp")}
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

import React, { FC, useEffect, useMemo, useState } from 'react';
import { Animated, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Menu, Pressable } from 'native-base';

// Components
import { ListSettings } from '@/components/ListSettings';

// Hooks
import { useGroupHeaderAnimations } from '@/hooks/profile';

// Import Icons
import { Star, Favorite, Dots } from "@assets/images/icons";

// Styles
import { styles } from "./GroupHeaderContainerStyle";

// Data
import { OptionsSettingProfile } from '@/constants/OptionsSettingProfile';

interface GroupHeaderContainerProps {
  panY: Animated.Value;
  isEndReached: boolean;
  handleOpenEditModal?: () => void;
}

export const GroupHeaderContainer: FC<GroupHeaderContainerProps> = (props) => {
  const { panY, isEndReached, handleOpenEditModal } = props;
  const { avatarOpacity, avatarTranslateX, containerTranslateY } = useGroupHeaderAnimations(panY);

  const [isFavorite, setIsFavorite] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const favoriteIcon = useMemo(() => {
    return isFavorite
      ? <Favorite height={hp("3%")} width={hp("3%")} />
      : <Star height={hp("3%")} width={hp("3%")} />;
  }, [isFavorite]);

  const handlePress = () => {
    if (!isEndReached) {
      console.log("Star pressed");
      setIsFavorite(!isFavorite);
    }
  };

  const actionInteractions = (type: string) => {
    switch (type) {
      case "edit":
        console.log( "edit");
        handleOpenEditModal && handleOpenEditModal();
        setIsOpen(false);
        break;
      case "mute":
        console.log( "mute");
        setIsOpen(false);
        break;
      case "search":
        console.log( "search");
        break;
      case "favourites":
        console.log( "favourites");
        break;
      case "report":
        console.log( "report");
        break;
      case "delete":
        console.log( "delete");
        break;
      default:
        console.log( "default");
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
      {isEndReached
        ? <Menu
            isOpen={isOpen}
            onOpen={() => setIsOpen(true)}
            onClose={() => setIsOpen(false)}
            borderRadius={12}
            padding={0}
            placement="bottom right"
            trigger={triggerProps => {
              return <Pressable style={styles.headerStar} accessibilityLabel="More options menu" {...triggerProps}>
                <Dots />
              </Pressable>;
        }}>
        <ListSettings
          width={180}
          data={OptionsSettingProfile}
          actionInteractions={actionInteractions}
        />
        </Menu>
        : <TouchableOpacity style={styles.headerStar} onPress={handlePress}>{favoriteIcon}</TouchableOpacity>}
    </Animated.View>
  )

};

import React, { FC, useEffect, useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import { Animated, Easing } from "react-native";
import { Box, View } from "native-base";
import { SearchInput } from "../SearchInput";
import { RoomsCategories } from "../RoomsCategories";

interface AnimatedRoomCategoryBlockProps {
  handleSearchChange: (value: any) => void;
  searchValue: string;
  scrollY: any;
  setModalVisible?: any;
}

export const AnimatedRoomCategoryBlock: FC<AnimatedRoomCategoryBlockProps> = ({
  handleSearchChange,
  searchValue,
  scrollY,
  setModalVisible,
}) => {
  const [placeholderAnimationEnded, setPlaceholderAnimationEnded] =
    useState(false);

  const createRoomBlockOpacity = scrollY.interpolate({
    inputRange: [0, 50, 100],
    outputRange: [1, 0.5, 0],
    extrapolate: "clamp",
  });

  const createRoomBlockTranslateY = scrollY.interpolate({
    inputRange: [0, 300],
    outputRange: [84, 0],
    easing: Easing.linear,
  });

  const createRoomBlock = (
    <Animated.View
      style={{
        opacity: createRoomBlockOpacity,
        transform: [{ translateY: createRoomBlockTranslateY }],
        paddingLeft: 4,
        paddingRight: 4,
        width: "100%",
      }}
    >
      <View paddingLeft={4} paddingRight={4} width={"full"}>
        <SearchInput
          onSearchChange={handleSearchChange}
          searchValue={searchValue}
          placeholderAnimationEnded={placeholderAnimationEnded}
          setPlaceholderAnimationEnded={setPlaceholderAnimationEnded}
        />
      </View>
    </Animated.View>
  );

  return (
    <Box
      style={{ width: "100%", position: "relative" }}
    >
      {createRoomBlock}
      <Animated.View
        style={{
          height: createRoomBlockTranslateY,
          zIndex: -1,
        }}
      />
      {!placeholderAnimationEnded ? <RoomsCategories /> : null}
    </Box>
  );
};

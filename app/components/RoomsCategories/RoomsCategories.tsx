import { HStack, Text, View, VStack } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";

const buttons = [
  {
    key: "official",
    icon: "star",
    show: true,
    accessibilityLabel: "Starred chats",
    name: "Favourite",
  },
  {
    key: "groups",
    icon: "people",
    show: true,
    accessibilityLabel: "Other chats",
    name: "Groups",
  },
  {
    key: "private",
    icon: "compass",
    show: true,
    accessibilityLabel: "Meta",
    name: "Private",
  },
];

const CategoryButton = ({ item, onTabPress }: any) => {
  return (
    <View key={item.key} style={{ flex: 1 }}>
      <TouchableOpacity
        accessibilityLabel={item.accessibilityLabel}
        onPress={() => onTabPress(item.key)}
        style={{ paddingBottom: 10, position: "relative" }}
      >
        <VStack space={1.5} width={"100%"}>
          <HStack space={2} justifyContent={"center"} alignItems={"center"}>
            <Text
              style={{
                color: "#0052CD",
                fontFamily: '900',
              }}
            >
              {item.name}
            </Text>
          </HStack>
          <View
            height={0.5}
            backgroundColor="#0052CD"
            borderRadius={5}
          />
        </VStack>
      </TouchableOpacity>
    </View>
  );
};

export const RoomsCategories = () => {
  return (
    <HStack
      style={{
        width: "100%",
        flexDirection: "row",
        paddingLeft: 20,
        paddingRight: 20,
      }}
      space={"xl"}
      zIndex={2}
    >
      {buttons.map((item) => {
        if (!item.show) return null;
        return (
          <CategoryButton
            item={item}
            onTabPress={() => (console.log('hi'))}
            key={item.key}
          />
        );
      })}
    </HStack>
  );
};


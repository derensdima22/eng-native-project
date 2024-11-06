import { Text, View } from 'native-base';
import React, { FC } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';



import { OptionsType } from '@/constants/OptionsSettingProfile';

interface ListSettingsProps {
  width: number;
  data: OptionsType[];
  actionInteractions: (type: string) => void;
}

export const ListSettings: FC<ListSettingsProps> = ({width, data, actionInteractions}) => (
  <View style={[styles.optionsContainer, { width: width}]}>
    {data.map(({ icon: Icon, ...option }, index) => (
      <TouchableOpacity
        key={option.id}
        style={[
          styles.option,
          index === data.length - 1 && styles.noBorder,
        ]}
        onPress={() => {
          console.log("option", option.id);
          actionInteractions(option.id);
          // setSelectedMessage(null);
        } }
      >
        <Text style={{ ...styles.optionText, color: option.color }}>
          {option.name}
        </Text>
        <Icon />
      </TouchableOpacity>
    ))}
    </View>
);


const styles = StyleSheet.create({
  optionsContainer: {
    backgroundColor: "white",
    paddingHorizontal: 12,
    paddingVertical: 2,
    borderRadius: 12,
    alignItems: "center",
  },
  option: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#CECECE",
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  optionText: {
    fontSize: 14,
    fontWeight: "400",
  },
})
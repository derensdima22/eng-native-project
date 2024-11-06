// TabContentSection.tsx
import React, { FC, ReactNode, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Animated } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

// Components
import { TabsContainer, TabsItems } from '@components/Profile';

// Types
import { AlternateType, dataUserProfileAllType, DefaultType, tabsHeaderDefault } from '@/app/(tabs)/data';

// Styles
import { styles } from "./TabContentSectionStyle";


interface TabContentSectionProps<T> {
  panY: Animated.Value;
  about: string;
  data: dataUserProfileAllType<T>[];
  defaultTab: "all" | "items";
}

export const TabContentSection: FC<TabContentSectionProps<DefaultType | AlternateType>> = (props) => {
  const { panY, about, data, defaultTab } = props;

  const tabsTranslateY = panY.interpolate({
    inputRange: [-hp('25%'), 0],
    outputRange: [-hp('33%'), 0],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View style={[styles.containerAnimation, { transform: [{ translateY: tabsTranslateY }] }]}>
      <View style={styles.aboutContainer}>
        <Text style={styles.aboutTitle}>Description</Text>
        <Text style={styles.aboutText}>{about}</Text>
      </View>

      <TabsContainer
        headerTabs={tabsHeaderDefault}
        defaultTab="items"
      >
        <TabsItems />
      </TabsContainer>
    </Animated.View>
  );
};

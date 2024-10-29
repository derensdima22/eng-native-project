import React from 'react';
import { Avatar, View, Text } from 'native-base';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ExampleData } from '@/app/(tabs)/data';

interface ProfileMemberUserProps {
  item: ExampleData;
  onPress: () => void;
}

export const ProfileMemberUser = (props: ProfileMemberUserProps) => {
  const { item, onPress } = props;

  return (
    <TouchableOpacity style={styles.userRow} onPress={onPress}>
      <View style={styles.userDetails}>
        <Avatar source={item.avatar ? { uri: item.avatar } : undefined} />
        <View style={styles.userInfo}>
          <Text>{item.name}</Text>
          <Text>{item.status}</Text>
        </View>
      </View>
      <Text style={styles.userRole}>{item.role}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  userRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  userDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfo: {
    marginLeft: 10,
  },
  userRole: {
    color: '#8F8F8F',
  },
});
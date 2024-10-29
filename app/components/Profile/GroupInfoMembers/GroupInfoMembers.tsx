import React, { FC, useState } from 'react';
import {
  Animated,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Modal from 'react-native-modal';
import { ExampleData } from '@/app/(tabs)/data';

// Components
import { ProfileMemberUser } from '../ProfileMemberUser';

// Import Icons
import ArrowRight from '@assets/images/icons/ArrowRight.svg';
import AddUser from '@assets/images/icons/AddUser.svg';
import { ProfileModalUser } from '../ProfileModalUser';

interface GroupInfoMembersProps {
  panY: Animated.Value;
  description: string;
  members: number;
  users: ExampleData[];
}

export const GroupInfoMembers: FC<GroupInfoMembersProps> = (props) => {
  const { panY, description, members, users } = props;

  const [showAddMembers, setShowAddMembers] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<ExampleData | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const handleUserPress = (user: ExampleData) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  const tabsTranslateY = panY.interpolate({
    inputRange: [-hp('25%'), 0],
    outputRange: [-hp('33%'), 0],
    extrapolate: 'clamp',
  });

  const handleArrowPress = () => {
    setShowAddMembers((prev) => !prev);
  };

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY: tabsTranslateY }] }]}>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionTitle}>Description</Text>
        <Text style={styles.descriptionText}>{description}</Text>
      </View>

      <View style={styles.tabsContainer}>
        {showAddMembers && (
          <View style={styles.addMembersContainer}>
            <AddUser />
            <Text style={styles.addMembersText}>Add Members</Text>
          </View>
        )}
        <View style={styles.memberContainer}>
          <Text style={styles.memberContainerText}>Members: {members}</Text>
          <TouchableOpacity style={styles.arrowButton} onPress={handleArrowPress}>
            <ArrowRight />
          </TouchableOpacity>
        </View>

        <FlatList
          data={users}
          renderItem={({ item }) => <ProfileMemberUser item={item} onPress={() => handleUserPress(item)} />}
          keyExtractor={(item: ExampleData) => item.id}
          showsVerticalScrollIndicator={true}
          contentContainerStyle={styles.userListContent}
          style={{ flexGrow: 1 }}
        />
      </View>

      <ProfileModalUser
        isModalVisible={isModalVisible}
        handleCloseModal={handleCloseModal}
        selectedUser={selectedUser}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: hp('57%'),
    left: 0,
    right: 0,
    backgroundColor: '#E8EDF2',
    height: '100%',
    paddingHorizontal: 30,
  },
  descriptionContainer: {
    backgroundColor: '#FFFFFF',
    fontSize: 14,
    padding: 15,
    borderRadius: 15,
    marginVertical: 25,
  },
  descriptionTitle: {
    color: '#8F8F8F',
  },
  descriptionText: {},
  tabsContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
  },
  addMembersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 7,
  },
  addMembersText: {
    fontSize: 14,
    color: '#000000',
  },
  memberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 7,
    borderBottomWidth: 1,
    borderBottomColor: '#E8EDF2',
  },
  memberContainerText: {
    color: '#8F8F8F',
  },
  arrowButton: {
    width: 50,
    alignItems: 'flex-end',
  },
  userListContent: {
    minHeight: hp('30%'),
  },



  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 15,
  },
  modalUserName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalActions: {
    width: '100%',
    marginTop: 15,
  },
  actionButton: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  modalActionText: {
    fontSize: 16,
  },
  closeButtonText: {
    color: 'red',
    marginTop: 20,
  },
});

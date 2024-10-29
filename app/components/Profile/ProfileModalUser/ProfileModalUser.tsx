import React, { FC, useMemo } from 'react';
import Modal from 'react-native-modal';
import {
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { ExampleData } from '@/app/(tabs)/data';
import { Avatar, View, Text } from 'native-base';

// Icons
import Profile from "@assets/images/icons/profile/Profile.svg";
import Administrator from "@assets/images/icons/profile/Administrator.svg";
import Ban from "@assets/images/icons/profile/Ban.svg";
import Unban from "@assets/images/icons/profile/Unban.svg";
import KickOut from "@assets/images/icons/profile/KickOut.svg";
import { ModalBox } from '../../ModalBox';

interface ProfileModalUserProps {
  isModalVisible: boolean;
  handleCloseModal: () => void;
  selectedUser: ExampleData | null;
  isAdmin?: boolean;
}

export const ProfileModalUser:FC<ProfileModalUserProps> = (props) => {
  const {
    isModalVisible,
    handleCloseModal,
    selectedUser,
    isAdmin = true,
  } = props;

  const isBanned = useMemo(() => {
    return selectedUser?.role === "banner";
  }, [selectedUser?.role])

  return (
    <ModalBox
      isModalVisible={isModalVisible}
      handleCloseModal={handleCloseModal}
      isBanned={isBanned}
      styleModal={{
        paddingHorizontal: 16,
        paddingBottom: 16,
        alignItems: 'flex-start',
      }}
    >
      {selectedUser && (
        <>
          <View style={[styles.userDetailsContainer, { justifyContent: isBanned ? "space-between" : "flex-start" }]}>
            <View style={styles.userDetails}>
              <Avatar source={selectedUser.avatar ? { uri: selectedUser.avatar } : undefined} />
              <View style={styles.userInfo}>
                <Text style={styles.userInfoName}>{selectedUser.name}</Text>
                <Text style={styles.userInfoStatus}>{selectedUser.status}</Text>
              </View>
            </View>
            {isBanned && <View style={{ maxWidth: 130}}>
              <Text style={styles.bannedInfo}>banned by {selectedUser.name} till 12 Aug 2024</Text>  
            </View>}
          </View>


          <View style={styles.modalActions}>
            <TouchableOpacity style={[styles.actionButton, styles.actionButtonProfile]}>
              <Profile />
              <Text style={styles.modalActionText}>Profile</Text>
            </TouchableOpacity>
            {isAdmin && <>
              <TouchableOpacity style={[styles.actionButton, styles.actionButtonOther]}>
                <Administrator />
                <Text style={styles.modalActionText}>Appoint as an administrator</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionButton, styles.actionButtonOther]}>
                {isBanned? <Unban /> : <Ban />}
                <Text style={[styles.modalActionText, { color: isBanned? "#12B829" : "#9F0000"}]}>
                  {isBanned? "Unban" : "Ban"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionButton, styles.actionButtonOut]}>
                <KickOut />
                <Text style={[styles.modalActionText, { color: "#9F0000"}]}>Kick out</Text>
              </TouchableOpacity>
            </>}
          </View>
        </>
      )}
  </ModalBox>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    height: "100%",
    margin: 0,
    padding: 0,
    position: "relative",
  },
  modalContent: {
    // borderTopWidth: 1,
    // borderBottomColor: '#E8EDF2',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 32,
    alignItems: 'flex-start',
  },
  verticalComponent: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  bannedInfo: {
    fontSize: 12,
    color: "#9F0000",
  },
  verticalContent: {
    position: "absolute",
    top: 16,
    alignSelf: 'center',
    marginBottom: 16,
    height: 3,
    width: 45,
    borderRadius: 3,
    opacity: 0.9
  },
  userDetailsContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  userDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfo: {
    marginLeft: 10,
  },
  userInfoName: {
    fontSize: 14,
  },
  userInfoStatus: {
    fontSize: 12,
    color: "#8F8F8F",
  },
  modalActions: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    paddingHorizontal: 15,
    width: '100%',
    marginTop: 15,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButtonProfile: {
    paddingTop: 15,
    paddingBottom: 21,
    borderBottomWidth: 1,
    borderBottomColor: '#E8EDF2',
  },
  actionButtonOther: {
    paddingVertical: 21,
    borderBottomWidth: 1,
    borderBottomColor: '#E8EDF2',
  },
  actionButtonOut: {
    paddingTop: 21,
    paddingBottom: 15,
  },
  modalActionText: {
    fontSize: 14,
    fontWeight: "600",
  },
  closeButtonText: {
    color: 'red',
    marginTop: 20,
  },
})
import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export const styles = StyleSheet.create({
  buttonsGroup: {
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconButtons: {
    width: wp("15%"),
    height: wp("15%"),
    padding: hp("2%"),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#50504E",
    opacity: 0.5,
    borderRadius: 15,
  },
  textBottom: {
    textAlign: "center",
    fontSize: 12,
    color: "#FFFFFF",
    paddingTop: 4,
  }
});

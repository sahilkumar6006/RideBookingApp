import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import CustomDropdown from "@/src/components/Dropdown";
import { verticalScale } from "react-native-size-matters";

const CompleteProfileScreen = () => {
  const navigation = useNavigation();
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.header}>Profile</Text>
      </View>
      <View style={styles.profileImageContainer}>
        <View style={styles.profileImage} />
        <TouchableOpacity style={styles.cameraIcon}>
          <Icon name="camera" size={18} color="white" />
        </TouchableOpacity>
      </View>
      <TextInput style={styles.input} placeholder="Full Name" />
      <View style={styles.phoneContainer}>
        <TouchableOpacity style={styles.countryPicker}>
          <Text>🇧🇩 +880</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.phoneInput}
          placeholder="Your mobile number"
          keyboardType="phone-pad"
        />
      </View>
      <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Street" />
      <CustomDropdown
        label="Select City"
        options={[
          { label: "Dhaka", value: "dhaka" },
          { label: "Chittagong", value: "chittagong" }
        ]}
        selectedValue={selectedCity}
        onSelect={setSelectedCity}
      />

      <CustomDropdown
        label="Select District"
        options={[
          { label: "Gulshan", value: "gulshan" },
          { label: "Banani", value: "banani" }
        ]}
        selectedValue={selectedDistrict}
        onSelect={setSelectedDistrict}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.navigate("BottomNavigation")}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={() => navigation.navigate("BottomNavigation")}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "white", marginTop: verticalScale(20) },
  headerContainer: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  backButton: { padding: 10 },
  header: { fontSize: 20, fontWeight: "bold", textAlign: "center", flex: 1 },
  profileImageContainer: { alignItems: "center", marginVertical: 10 },
  profileImage: { width: 80, height: 80, borderRadius: 40, backgroundColor: "#ddd" },
  cameraIcon: { position: "absolute", bottom: 0, right: 0, backgroundColor: "green", borderRadius: 20, padding: 5 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 5, marginVertical: 8 },
  phoneContainer: { flexDirection: "row", alignItems: "center", borderWidth: 1, borderRadius: 5, borderColor: "#ccc", marginVertical: 8 },
  countryPicker: { padding: 10, borderRightWidth: 1, borderColor: "#ccc" },
  phoneInput: { flex: 1, padding: 10 },
  buttonContainer: { flexDirection: "row", justifyContent: "space-between", marginTop: 20 },
  cancelButton: { borderWidth: 1, borderColor: "green", padding: 12, borderRadius: 5, flex: 1, marginRight: 10 },
  cancelText: { textAlign: "center", color: "green", fontWeight: "bold" },
  saveButton: { backgroundColor: "green", padding: 12, borderRadius: 5, flex: 1, marginLeft: 10 },
  saveText: { textAlign: "center", color: "white", fontWeight: "bold" },
});

export default CompleteProfileScreen;

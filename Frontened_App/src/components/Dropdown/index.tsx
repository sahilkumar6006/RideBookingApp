import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const CustomDropdown = ({ label, options, selectedValue, onSelect }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <TouchableOpacity style={styles.dropdown} onPress={() => setModalVisible(true)}>
        <Text style={styles.selectedText}>
          {selectedValue ? options.find(opt => opt.value === selectedValue)?.label : label}
        </Text>
        <Icon name="chevron-down" size={16} color="gray" />
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setModalVisible(false)}
          activeOpacity={1}
        />
        <View style={styles.modalContainer}>
          <FlatList
            data={options}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.option}
                onPress={() => {
                  onSelect(item.value);
                  setModalVisible(false);
                }}
              >
                <Text>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
  },
  selectedText: { color: "black" },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 10,
    maxHeight: "50%",
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
});

export default CustomDropdown;

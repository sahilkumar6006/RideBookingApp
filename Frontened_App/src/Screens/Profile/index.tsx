import React from "react";
import { View, Text } from "react-native";
import InputContainer from "../../components/InputContainer";
import ImagePickerComponent from "@/src/components/ImagePickerComponent";
const Profie = () => {
  const [firstName, setFirstName] = React.useState("");
  const [selectedImage, setSelectedImage] = React.useState(null);
  return (
    <View style={{ flex: 1}}>
      <Text>Profie</Text>
      <ImagePickerComponent selectedImage={selectedImage} setSelectedImage={setSelectedImage}/>
      <InputContainer
        placeholder="First Name"
        title={"First Name"}
        value={firstName}
        onChangeText={setFirstName}
        iconName={"edit"}
        inputStyle={undefined}
        editable={undefined}
        onPress={undefined}
      />
    </View>
  );
};

export default Profie;

import React from "react";
import { View, Text } from "react-native";
import InputContainer from "../../components/InputContainer";
import ImagePickerComponent from "@/src/components/ImagePickerComponent";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Profie = () => {
  const user = useSelector((state: RootState) => state.user);
  const [firstName, setFirstName] = React.useState("");
  const [selectedImage, setSelectedImage] = React.useState(null);

  return (
    <View style={{ flex: 1}}>
      <Text>Profie</Text>
      <Text>{user.fullName}</Text>
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

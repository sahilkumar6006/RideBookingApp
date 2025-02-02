import React, { useRef } from "react";
import { StyleSheet, TextInput, View } from "react-native";

export const OtpCodeBlock = ({
  inputRef,
  value,
  handleChange,
  index,
  handleKeyPress,
}) => {
  return (
    <TextInput
      maxLength={1}
      keyboardType="number-pad"
      ref={inputRef}
      multiline={false}
      onKeyPress={({ nativeEvent }) =>
        handleKeyPress({ nativeEvent }, index + 1)
      }
      value={value}
      onChangeText={(text) => handleChange(text, index)}
      style={styles.otpCodeBlock}
    />
  );
};

export const OtpInput = ({ code = ["", "", "", "", "", ""], style, fn }) => {
  const refs = Array.from({ length: 6 }, () => useRef(null));

  const handleChange = (num, index) => {
    const number = num.replace(/\D/g, "");
    fn((prev) => prev.map((v, i) => (i === index ? number : v.toString())));
  };

  const handleKeyPress = ({ nativeEvent }, position) => {
    if (nativeEvent.key === "Backspace" && position > 1) {
      refs[position - 2]?.current?.focus();
    } else if (!isNaN(parseInt(nativeEvent.key, 10)) && position < 6) {
      refs[position]?.current?.focus();
    }
  };

  return (
    <View style={[styles.container, style]}>
      {refs.map((ref, index) => (
        <OtpCodeBlock
          key={index.toString()}
          index={index}
          inputRef={ref}
          value={code[index]}
          handleChange={handleChange}
          handleKeyPress={handleKeyPress}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 30,
  },
  otpCodeBlock: {
    fontSize: 20,
    textAlignVertical: "center",
    borderRadius: 8,
    width: 42,
    height: 46,
    color: "#000000",
    marginHorizontal: 6,
    backgroundColor: "#EBEBEB",
    paddingLeft: 15,
    textAlign: "center",
  },
});

export default OtpInput;

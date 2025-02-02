import { useNavigation } from "@react-navigation/native";
import React, { useRef } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Swiper from "react-native-swiper";

const Onboarding = () => {
  const navigation = useNavigation();
  const swiperRef = useRef(null); 

  const data = [
    {
      title: "Anywhere you are",
      description:
        "Sell houses easily with the help of Listenoryx and to make this line big I am writing more.",
      image: require("../../assets/images/Onboarding1.png"),
    },
    {
      title: "At anytime",
      description:
        "Sell houses easily with the help of Listenoryx and to make this line big I am writing more.",
      image: require("../../assets/images/Book.png"),
    },
    {
      title: "Book your car",
      description:
        "Sell houses easily with the help of Listenoryx and to make this line big I am writing more.",
      image: require("../../assets/images/Book.png"),
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={{ marginTop: 40, alignSelf: "flex-end", padding: 10 }}>
        Skip
      </Text>

      <Swiper
        ref={swiperRef} // Assign the ref to Swiper
        loop={false}
        showsPagination={true}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
      >
        {data.map((item, index) => (
          <View style={styles.container2} key={index}>
            <Image
              source={item.image}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            {index === data.length - 1 ? (
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("WelcomeScreen")}
              >
                <Text style={styles.buttonText}>Go</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.button}
                onPress={() => swiperRef.current?.scrollBy(1)} // Move to next slide
              >
                <Text
                  style={[styles.buttonText, { fontSize: 30, marginTop: -10 }]}
                >
                  →
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  container2: {
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#28a745",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
  dot: {
    backgroundColor: "#ddd",
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: "#28a745",
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
});

export default Onboarding;

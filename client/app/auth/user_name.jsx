import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  BackHandler,
  Image,
  TextInput,
  ScrollView,
  Modal,
} from "react-native";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addUsername, setToken } from "../../store/CreateSlices/UserSlice.js";
// import { MyLogo, StartImage } from "../../constants/svg_Icons.jsx";
import { SafeAreaView } from "react-native-safe-area-context";
import Carousel from "../../components/Authentication/Carousel.jsx";
import Ionicons from "@expo/vector-icons/Ionicons";

const UserName = () => {
  const [urName, setUrName] = useState("");
  const [flag, setFlag] = useState(false);
  const dispatchEvent = useDispatch();

  const handleSubmit = async () => {
    if (urName !== "") {
      dispatchEvent(addUsername(urName));
      dispatchEvent(setToken(true));
      router.replace("/home");
    } else {
      Alert.alert("Error", "Please enter your name");
    }
  };
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Want to back", "Back to Get Stated Page", [
        {
          text: "Cancel",
          onPress: () => setFlag(false),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => BackHandler.exitApp(),
        },
      ]);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  return (
    <SafeAreaView className="flex-1 bg-[#f6f6f6] justify-center ">
      {/* <View className=" flex-[1] items-center justify-center">
        <MyLogo width={200} height={200} />
      </View> */}
      {flag ? (
        <ScrollView className="flex-1 mt-4">
          <View className="  flex-[1]">
            <View className="flex-[1] items-center justify-center space-y-4">
              <Image
                source={require("../../assets/images/my_logo.png")}
                className="mx-auto w-[300px] h-[320px] "
              />
              <Text className="text-[26px] text-[#3cbd09] font-baloo ">
                Let's get started!
              </Text>
              <Text className="text-[14px] text-[#939493] font-bold ">
                Ready to take charge of your financial future!
              </Text>
            </View>

            <View className=" mx-8 mt-[40px] ">
              <Text className="text-[18px] text-[#3cbd09] font-bold ">
                Enter Username
              </Text>
              <TextInput
                value={urName}
                onChangeText={(text) => setUrName(text)}
                className="border-[1px] text-[18px] border-[#3cbd09] rounded-[10px] py-4 px-[20px] my-2"
                placeholder="Username"
              />
              <TouchableOpacity
                onPress={() => {
                  handleSubmit();
                }}
                className="mt-[28px] bg-[#3cbd09] rounded-[10px] py-4"
              >
                <Text className="text-[18px]  text-[#ffffff] font-bold  text-center uppercase ">
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      ) : (
        <Carousel setFlag={setFlag} />
      )}
    </SafeAreaView>
  );
};

export default UserName;

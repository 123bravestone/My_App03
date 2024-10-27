import { SafeAreaView } from "react-native-safe-area-context";
import Carousel from "../../components/Authentication/Carousel.jsx";
import { useEffect } from "react";
import { Alert, BackHandler } from "react-native";

const Get_Started = () => {
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Exit MoneyFi App", "Press OK to go back", [
        {
          text: "Cancel",
          onPress: () => null,
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
    <SafeAreaView className="flex-1 bg-white ">
      <Carousel />
    </SafeAreaView>
  );
};

export default Get_Started;

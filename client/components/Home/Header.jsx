import { View, Text } from "react-native";
import React from "react";
import { useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { MoneyFiIcon } from "../../constants/svg_Icons";

const Header = () => {
  const navigator = useNavigation();

  const onToggle = () => {
    navigator.dispatch(DrawerActions.openDrawer());
  };
  return (
    <View className="flex-row items-center justify-between px-4 pb-2 bg-[#ffffff] border-b-2 border-[#d3d3d3] ">
      <View className="flex-row items-end gap-2">
        <MoneyFiIcon width={40} height={40} />

        <Text className="text-[22px] tracking-[1px] font-baloo text-[#000000] ">
          Money<Text className="text-[#61f22d] ">Fi</Text>
        </Text>
      </View>

      {/* <Text className="text-[#853e3a] font-baloo text-[28px] ">
          {username.slice(0, 1)}
        </Text> */}

      <AntDesign
        onPress={onToggle}
        name="menu-unfold"
        size={28}
        color="black"
      />
    </View>
  );
};

export default Header;

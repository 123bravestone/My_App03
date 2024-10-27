import { View, Text, Alert, Image } from "react-native";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Drawer } from "expo-router/drawer";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";

import { setToken } from "../../../store/CreateSlices/UserSlice.js";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons.js";

const CustomDrawerContent = (props) => {
  const username = useSelector((state) => state.user.username);
  const router = useRouter();
  const dispatchEvent = useDispatch();

  return (
    <DrawerContentScrollView
      {...props}
      scrollEnabled={false}
      contentContainerStyle={{ backgroundColor: "#ffffff" }}
    >
      <View className="p-[20px] border-b-2 border-[#c1c1c1] ">
        <View
          // style={{
          //       width: 100,
          //       height: 100,
          //       borderRadius: 50,
          //       alignSelf: "center",
          //     }}
          className="w-[60px] h-[60px] bg-[#0e0e0e] rounded-full self-center justify-center "
        >
          <Text className="text-[40px] font-baloo text-[#ffffff] text-center">
            {username[0]}
          </Text>
        </View>

        <Text className="text-[24px] font-baloo text-[#0e0e0e] text-center pt-[10px]">
          {username}
        </Text>
      </View>
      <View className="flex-1 bg-white pt-[10px] ">
        <DrawerItemList {...props} />

        <DrawerItem
          labelStyle={{
            color: "#dc2626",
            fontWeight: "bold",
            fontSize: 18,
            marginLeft: -16,
          }}
          icon={() => (
            <MaterialCommunityIcons name="logout" size={28} color={"#dc2626"} />
          )}
          label="Logout"
          onPress={() => {
            dispatchEvent(setToken(false));
            router.replace("/auth");
          }}
        />
      </View>
    </DrawerContentScrollView>
  );
};

const DrawerLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={CustomDrawerContent}
        screenOptions={{
          drawerPosition: "right",
          drawerType: "slide",
          drawerActiveTintColor: "#000000",
          drawerInactiveTintColor: "#18d40a",
          drawerActiveBackgroundColor: "#16ce0836",
          // drawerInactiveBackgroundColor: "#853e3a36",

          drawerLabelStyle: {
            fontWeight: "bold",
            fontSize: 18,
            marginLeft: -16,
          },
        }}
        // className="bg-[#18d40a]"
      >
        <Drawer.Screen
          name="tabbar"
          options={{
            headerShown: false,
            drawerLabel: "Home",
            headerTitle: "Home",
            title: "overview",

            drawerIcon: ({ color, focused, size }) => (
              <View>
                <MaterialCommunityIcons name="home" size={size} color={color} />
              </View>
            ),
          }}
        />
        <Drawer.Screen
          name="expense_graph"
          options={{
            headerShown: false,
            drawerLabel: "Expense Graph",
            headerTitle: "Expense Graph",
            title: "overview",

            drawerIcon: ({ color, focused, size }) => (
              <View>
                <SimpleLineIcons name="pie-chart" size={18} color={color} />
              </View>
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default DrawerLayout;

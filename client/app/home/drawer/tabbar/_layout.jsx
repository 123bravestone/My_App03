import React from "react";
import { Tabs } from "expo-router";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { Dimensions, StatusBar, View } from "react-native";
import { Colors } from "../../../../constants";
import Ionicons from "@expo/vector-icons/Ionicons";

const TabLayout = () => {
  const { width } = Dimensions.get("window");
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarVisibilityAnimationConfig: {
            duration: 200,
            delay: 100,
            animation: "timing",

            easing: "ease-in-out",
          },
          // tabBarVisibilityAnimationConfig: {
          //   duration: 200,
          //   delay: 100,
          //   animation: "timing",

          //   easing: "ease-in-out",
          // },
          tabBarStyle: {
            // flex: 1,
            backgroundColor: Colors.grey,
            position: "absolute",
            bottom: 20,
            justifyContent: "center",
            alignSelf: "center",
            height: 63,
            marginHorizontal: 100,
            paddingHorizontal: 10,
            paddingVertical: 8,
            paddingBottom: 8,
            borderRadius: 40,
            borderWidth: 1,
            borderTopWidth: 1,
            borderColor: "#333",
            borderTopColor: "#333",
          },

          tabBarShowLabel: false,
          tabBarInactiveTintColor: Colors.white,
          tabBarActiveTintColor: Colors.black,
        }}
      >
        <Tabs.Screen
          name="home_screen"
          options={{
            tabBarHideOnKeyboard: true,

            tabBarIcon: ({ color, size, focused }) => (
              <View
                style={{
                  padding: 12,
                  width: "100%",
                  alignItems: "center",

                  backgroundColor: focused ? "#55f943" : Colors.grey,
                }}
                className="rounded-l-[30px] "
              >
                <Ionicons name="home" size={18} color={color} />
              </View>
            ),
            headerShown: false,
          }}
        />

        <Tabs.Screen
          name="expenses"
          options={{
            tabBarHideOnKeyboard: true,

            tabBarIcon: ({ color, size, focused }) => (
              <View
                style={{
                  padding: 12,
                  width: "100%",
                  alignItems: "center",
                  backgroundColor: focused ? "#55f943" : Colors.gray,
                }}
                className="rounded-r-[30px] "
              >
                <Ionicons name="wallet" size={18} color={color} />
              </View>
            ),
            headerShown: false,
          }}
        />
      </Tabs>
      <StatusBar barStyle="light-content" />
    </>
  );
};

export default TabLayout;

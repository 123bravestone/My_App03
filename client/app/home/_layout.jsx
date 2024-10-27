import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const HomeLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="drawer" options={{ headerShown: false }} />
      <Stack.Screen name="my_tran" options={{ headerShown: false }} />
    </Stack>
  );
};

export default HomeLayout;

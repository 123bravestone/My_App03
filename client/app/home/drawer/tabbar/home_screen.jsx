import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";

import React, { useEffect, useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";

import { useDispatch, useSelector } from "react-redux";
import {
  addAllSpends,
  addMonthAmount,
} from "../../../../store/CreateSlices/UserSlice.js";

import { Colors } from "../../../../constants/index.js";
import { PieChart } from "react-native-gifted-charts";
import Money_Spend from "../../../../components/Home/Money_Spend.jsx";
import moment from "moment";
import Header from "../../../../components/Home/Header.jsx";

const homeScreen = () => {
  const monthAmount = useSelector((state) => state.user.monthAmount);
  const username = useSelector((state) => state.user.username);
  const dispatchEvent = useDispatch();
  const [visible, setVisible] = useState(false);
  const [mthAmount, setMthAmount] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [pieItems, setPieItems] = useState({});

  const pieData = [
    {
      value: monthAmount.amountSpend,

      color:
        ((monthAmount.amountSpend / monthAmount.amount) * 100).toFixed(2) > 80
          ? "red"
          : ((monthAmount.amountSpend / monthAmount.amount) * 100).toFixed(2) >
            50
          ? "#FF7F97"
          : Colors.tintColor,
      focused: true,
      text: ((monthAmount.amountSpend / monthAmount.amount) * 100).toFixed(2),
    },

    {
      value: monthAmount.amount - monthAmount.amountSpend,

      color: "#87fb4e",
      gradientCenterColor: "#87fb4e",
      // color: "#FFA5BA",
      // gradientCenterColor: "#FF7F97",
      text: (
        ((monthAmount.amount - monthAmount.amountSpend) / monthAmount.amount) *
        100
      ).toFixed(2),
    },
  ];

  // var a = moment().format("YYYY-MM-DD");

  const handleOK = async () => {
    dispatchEvent(
      addMonthAmount({
        amount: parseInt(mthAmount),
        amountSpend: 0,
        addDate: moment().format("YYYY-MM-DD"),
      })
    );

    dispatchEvent(addAllSpends([]));

    setVisible(false);
  };

  var given = moment(monthAmount.addDate, "YYYY-MM-DD");
  var current = moment().startOf("day");

  var b = 1 + moment.duration(current.diff(given)).asDays();

  useEffect(() => {
    setMthAmount(monthAmount.amount - monthAmount.amountSpend);

    setPieItems(pieData[1]);
  }, [monthAmount.amountSpend, monthAmount.amount]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Header />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="flex-1 " style={[styles.container]}>
          <View className=" border-b-2 border-[#c6c6c6] ">
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => setVisible(!visible)}
                style={{ gap: 10 }}
              >
                <View>
                  <Text
                    style={[styles.userText, { fontSize: 18 }]}
                    className=""
                  >
                    Hi, {username}
                  </Text>

                  <Text className="text-[16px] font-[500] text-[#000000] ">
                    Your{" "}
                    <Text className="text-[20px] font-baloo">
                      Money: D-{b ? b : 0}
                    </Text>
                  </Text>
                </View>
                <Text
                  style={{
                    color: Colors.black,
                    fontSize: 32,
                    fontWeight: "700",
                  }}
                >
                  ₹{monthAmount.amount !== 0 ? mthAmount : "00"}.
                  <Text style={{ fontSize: 22 }}>00 </Text>
                  <Text className="text-[20px] font-[400] ">+</Text>
                </Text>
              </TouchableOpacity>

              <View style={{ paddingVertical: 20, alignItems: "center" }}>
                <PieChart
                  data={pieData}
                  donut
                  showGradient
                  sectionAutoFocus
                  // focusOnPress
                  // toggleFocusOnPress
                  semiCircle
                  radius={100}
                  innerRadius={50}
                  innerCircleColor={Colors.white}
                  onPress={(item) => {
                    setPieItems(item);
                    setPercentage(0);
                  }}
                  centerLabelComponent={() => (
                    <Text
                      style={{
                        color: pieItems.focused
                          ? Colors.tintColor
                          : parseFloat(pieItems.text) < 50
                          ? "red"
                          : "#55f943",

                        fontSize: 18,
                        fontWeight: "700",
                      }}
                    >
                      {pieItems.text ? pieItems.text : percentage}%
                    </Text>
                  )}
                />
              </View>
            </View>

            {visible && (
              <View className="flex flex-row items-center gap-2 mb-2">
                <View className="flex-row bg-[#dedcdc] px-[10px] py-[10px] rounded-[10px]">
                  <Text className="text-[#484848] text-[20px] ">₹</Text>
                  <TextInput
                    className=" text-[18px]  text-[#545353] "
                    placeholder="amount*"
                    placeholderTextColor="#989898"
                    keyboardType="numeric"
                    value={mthAmount}
                    onChangeText={(text) => setMthAmount(Math.floor(text))}
                  />
                </View>

                <TouchableOpacity
                  onPress={() => {
                    if (mthAmount !== "") {
                      Alert.alert(
                        "Alert",
                        "Your previous month amount will be reset. Are your sure to confirm?",
                        [
                          {
                            text: "Cancel",
                            onPress: () => setVisible(false),
                          },
                          {
                            text: "OK",
                            onPress: () => handleOK(),
                          },
                        ]
                      );
                    } else {
                      Alert.alert("Error", "Please enter amount");
                    }
                    // dispatchEvent(
                    //   addMonthAmount(
                    //     (
                    //       parseInt(mthAmount.amount1) + parseInt(mthAmount.amount2)
                    //     ).toLocaleString("en-US")
                    //   )
                    // );
                    // setVisible(false);
                  }}
                  className=" bg-blue-500 rounded-[10px] justify-center px-[20px] py-[10px]"
                >
                  <Text className="text-[20px] font-baloo text-[#ffffff]">
                    OK
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <Money_Spend />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default homeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
  },
});

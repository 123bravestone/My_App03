import { View, Text, Alert, TouchableOpacity, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants";
import moment from "moment";
// import RNDateTimePicker from "@react-native-community/datetimepicker";
import {
  addAllSpends,
  addMonthAmount,
  addMonthlySpends,
} from "../../store/CreateSlices/UserSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { WalletCardIcon } from "../../constants/svg_Icons.jsx";
// import axios from "axios";

// let a = "May 2024";
// let c = moment([2024, 2, 1]).format("ddd, DD MMM");
let a = moment().format("MMMM YYYY");
let c = moment().format("ddd, DD MMM");

const Money_Spend = () => {
  const { allSpends, monthAmount, monthlySpends } = useSelector(
    (state) => state.user
  );
  const dispatchEvent = useDispatch();
  let amt = 0;

  // console.log("monthAmount:", monthAmount);

  const [spending, setSpending] = useState({
    id: "",
    title: "",
    amount: 0,
    monthYear: "",
    date: "",
    time: "",
  });

  // const [mthSpends, setMthSpends] = useState({
  //   id: "",
  //   monthYear: "",
  //   spends: [],
  // });

  const handleSpending = async () => {
    setSpending(
      (spending.id = moment().format("YYYYMMDDhhmmss")),
      (spending.date = c),
      (spending.time = moment().format("hh:mm a")),
      // (spending.monthYear = moment().format("MMMM YYYY"))
      (spending.monthYear = a)
    );

    if (
      spending.title === "" ||
      spending.amount === "" ||
      spending.amount === 0 ||
      !spending.amount
    ) {
      setSpending({ title: "", amount: "", date: "", id: "", time: "" });
      Alert.alert("Error", "Please fill all the vaild fields");
      return;
    } else {
      dispatchEvent(addAllSpends([spending, ...allSpends]));

      if (monthlySpends.length > 0 && a === monthlySpends[0].monthYear) {
        dispatchEvent(
          addMonthlySpends(
            monthlySpends.map((spend, index) => {
              if (index === 0) {
                return {
                  ...spend,
                  spends: [spending, ...spend.spends],
                };
              }
              return spend;
            })
          )
        );
        setSpending({
          title: "",
          amount: "",
          date: "",
          id: "",
          time: "",
        });
        return;
      }

      dispatchEvent(
        addMonthlySpends([
          {
            id: new Date().getTime(),
            monthYear: a,
            spends: [spending],
          },
          ...monthlySpends,
        ])
      );
      setSpending({ title: "", amount: "", date: "", id: "", time: "" });
    }
  };

  const handleMessage = (id) => {
    const singleSpend = allSpends.find((spend) => spend.id === id);
    Alert.alert(
      "Message",
      `${singleSpend.title} and Rs. ${singleSpend.amount} was spending on ${singleSpend.date}`,

      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            Alert.alert(
              "Delete",
              "Are you sure you want to delete this spending?",

              [
                {
                  text: "No",
                  style: "cancel",
                },
                {
                  text: "Yes",
                  onPress: () => {
                    dispatchEvent(
                      addAllSpends(allSpends.filter((spend) => spend.id !== id))
                    );
                    dispatchEvent(
                      addMonthAmount({
                        ...monthAmount,
                        amountSpend:
                          monthAmount.amountSpend - singleSpend.amount,
                      })
                    );
                  },
                },
              ]
            );
          },
        },
      ]
    );
  };

  useEffect(() => {
    if (allSpends.length > 0) {
      dispatchEvent(addMonthAmount({ ...monthAmount, amountSpend: amt }));
    }
  }, [allSpends]);

  return (
    <View className="flex-1 mb-[80px] ">
      <Text className="text-[#000000] text-[20px] font-baloo mt-[10px]">
        Add Spending
      </Text>

      <View className="flex-1">
        <TextInput
          className=" text-[20px] bg-[#e2e1e1] text-[#575151] px-[20px] py-[10px] rounded-[10px]"
          placeholder="Title of money spend*"
          placeholderTextColor="#989898"
          value={spending.title}
          onChangeText={(text) => setSpending({ ...spending, title: text })}
        />
      </View>
      <View className="flex-1 flex-row justify-between my-[20px] ">
        <View className="flex-row bg-[#e2e1e1] px-[10px] py-[10px] rounded-[10px]">
          <Text className="text-[#484848] text-[20px] ">₹</Text>
          <TextInput
            className=" text-[18px]  text-[#545353] "
            placeholder="amount*"
            placeholderTextColor="#989898"
            keyboardType="numeric"
            value={spending.amount}
            onChangeText={(text) =>
              setSpending({ ...spending, amount: Math.floor(parseInt(text)) })
            }
          />
        </View>
        <View className="bg-[#e2e1e1] px-[20px] py-[10px] rounded-[10px] justify-center">
          <Text className="text-[#989898] text-[16px] ">
            {moment().format("hh:mm a")}/{c}
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleSpending}
          className=" bg-blue-500 rounded-[10px] justify-center px-[20px]"
        >
          <Text className="text-[20px] font-baloo text-[#ffffff]">OK</Text>
        </TouchableOpacity>
      </View>

      {/* data store */}

      <View className="flex-row items-center justify-between mt-4">
        <Text className="text-[20px] text-black font-baloo">
          Money_Spending
        </Text>
        <Text className="text-[20px] text-black font-baloo">
          {moment().format("MMMM YYYY")}
        </Text>
      </View>
      {allSpends.length > 0 ? (
        allSpends.map((item, index) => {
          amt = amt + item.amount;
          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleMessage(item.id)}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: 10,
                paddingHorizontal: 15,
                marginVertical: 5,
                borderRadius: 10,
                backgroundColor: Colors.grey,
              }}
            >
              <View
                style={{
                  padding: 10,
                  backgroundColor: Colors.black,
                  borderRadius: 30,
                  marginRight: 15,
                }}
              >
                <WalletCardIcon width={26} height={26} color={Colors.white} />
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View style={{ flexDirection: "column", gap: 5, width: "60%" }}>
                  <Text
                    style={{
                      fontWeight: "700",
                      color: Colors.white,
                      fontSize: 16,
                    }}
                  >
                    {item.title.slice(0, 20)}...
                  </Text>
                  <Text style={{ color: Colors.white, fontSize: 14 }}>
                    {item.time} / {item.date}
                  </Text>
                </View>
                <Text
                  style={{
                    fontWeight: "700",
                    color: Colors.white,
                    fontSize: 18,
                  }}
                >
                  ₹{item.amount}.
                  <Text style={{ fontSize: 12, color: "#cccbcb" }}>
                    {/* {amt[1]} */}
                    00
                  </Text>
                </Text>
              </View>
            </TouchableOpacity>
          );
        })
      ) : (
        <View className="flex-1 justify-center items-center">
          <Text className="text-[24px] text-black font-baloo">No Data</Text>
        </View>
      )}
    </View>
  );
};

export default Money_Spend;

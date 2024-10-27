import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
  StyleSheet,
  Platform,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
// import { IncomeType } from "@/types";
import { Colors } from "../../constants";
import {
  RupeesIcon,
  WalletAddMoneyIcon,
  WalletCardIcon,
} from "../../constants/svg_Icons";
import Feather from "@expo/vector-icons/Feather";
import moment from "moment";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch, useSelector } from "react-redux";
import { addAllIncomes } from "../../store/CreateSlices/UserSlice.js";

const data = [
  { label: "Salary", value: "1", icon: "red" },
  { label: "Freelancing", value: "2", icon: "blue" }, // { label: "Item 2", value: "2" },
  { label: "Stock Market", value: "3", icon: "gray" },
  { label: "Business", value: "4", icon: "yellow" }, // { label: "Item 4", value: "4" },
  { label: "Car Rent", value: "5", icon: "purple" }, // { label: "Item 5", value: "5" },
  { label: "Online Business", value: "6", icon: "orange" }, // { label: "Item 6", value: "6" },
  { label: "Home Rent", value: "7", icon: "green" }, // { label: "Item 3", value: "3" },
];

const IncomeBlock = ({ incomeList }) => {
  const allIncomes = useSelector((state) => state.user.allIncomes);

  const dispatchEvent = useDispatch();

  let amt = 0;

  const [visible, setVisible] = useState(false);
  // const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  // const [dateValue, setDateValue] = useState("");
  const [mthExpenses, setMthExpenses] = useState({
    // id: moment().format("YYYYMMDDhhmmss"),
    id: "",
    amount: 0,
    name: "",
    value: "",
    icon: "",
    dateValue: "",
  });

  const toggleDatePicker = () => {
    setDatePickerVisibility(!isDatePickerVisible);
  };

  const onChange = ({ type }, selectedDate) => {
    if (type === "set") {
      const currentDate = selectedDate || date;
      setDate(currentDate);

      if (Platform.OS === "android") {
        toggleDatePicker();
        setMthExpenses({
          ...mthExpenses,
          dateValue: moment(currentDate).format("DD MMM YYYY"),
        });
      }
    } else {
      toggleDatePicker();
    }
  };

  // useEffect(() => {
  //   // dispatchEvent(addAllIncomes([]));
  //   console.log("allIncomes", allIncomes);
  // }, []);

  const handleIncomes = () => {
    if (!mthExpenses.amount || !mthExpenses.name) {
      Alert.alert("Please enter all the fields");
      return;
    } else {
      dispatchEvent(addAllIncomes([mthExpenses, ...allIncomes]));
      setMthExpenses({
        ...mthExpenses,

        amount: 0,
        name: "",
        value: "",
      });
      setVisible(!visible);
    }
    // console.log(mthExpenses);
  };

  const renderItem = ({ item, index }) => {
    if (index === 0) {
      return (
        <TouchableOpacity onPress={() => setVisible(!visible)}>
          <View
            style={{
              flex: 1,
              borderWidth: 2,
              borderColor: "#666",
              borderStyle: "dashed",
              padding: 10,
              borderRadius: 10,
              marginRight: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Feather name="plus" size={24} color="black" />
            <Text style={{ color: "black", marginTop: 10, fontSize: 12 }}>
              Add Item
            </Text>
          </View>
        </TouchableOpacity>
      );
    }

    let icon = <RupeesIcon width={20} height={20} />;
    if (item.name === "Freelancing") {
      icon = <WalletCardIcon width={20} height={20} color={Colors.white} />;
    } else if (item.name === "Interest") {
      icon = <WalletAddMoneyIcon width={20} height={20} color={Colors.white} />;
    } else {
      icon = <RupeesIcon width={20} height={20} color={Colors.white} />;
    }

    // const amt = item.amount?.split(".");
    // if (!amt) return null;
    return (
      <TouchableOpacity
        key={item.id}
        onPress={() => {
          Alert.alert(
            "Monthly Income",
            `${item.name} / ₹${item.amount} created on ${item.dateValue}`,
            [
              {
                text: "No",
                style: "cancel",
              },
              {
                text: "Delete",
                onPress: () => {
                  Alert.alert("Delete", "Are you sure you want to delete?", [
                    {
                      text: "No",
                      style: "cancel",
                    },
                    {
                      text: "Confirm",
                      onPress: () => {
                        dispatchEvent(
                          addAllIncomes(
                            allIncomes.filter((income) => income.id !== item.id)
                          )
                        );
                      },
                    },
                  ]);
                },
              },
            ]
          );
        }}
        style={{
          backgroundColor: Colors.grey,
          padding: 20,
          borderRadius: 20,
          marginRight: 15,
          width: 150,
          gap: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              borderColor: "#ffffff",
              borderWidth: 1,
              borderRadius: 20,
              padding: 5,
              alignSelf: "flex-start",
            }}
          >
            {icon}
          </View>

          <TouchableOpacity onPress={() => {}}>
            <Feather name="more-horizontal" size={24} color="#cccbcb" />
          </TouchableOpacity>
        </View>
        <Text style={{ color: "white" }}>{item.name}</Text>
        <Text style={{ color: "white", fontSize: 16, fontWeight: "700" }}>
          {/* ₹{amt[0]}. */}₹{item.amount}.
          <Text style={{ fontSize: 12, color: "#cccbcb" }}>
            {/* {amt[1]} */}
            00
          </Text>
        </Text>
      </TouchableOpacity>
    );
  };

  const staticItem = [{ name: "Add Item" }];

  return (
    <View>
      <View className="flex-row justify-between items-center">
        <Text className="text-[14px] text-[#000000] text-center">
          My{" "}
          <Text className="text-[20px] font-baloo text-[#000000] text-center">
            Incomes
          </Text>
        </Text>
        {allIncomes.length > 0 &&
          allIncomes.map((income) => {
            amt = amt + income.amount;
          })}
        <Text className="text-[20px] font-bold text-[#45af3b] ">
          ₹{amt}.<Text className="text-[14px] text-[#409c3fcc]">00</Text>
        </Text>
      </View>

      <FlatList
        data={staticItem.concat(allIncomes)}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      {isDatePickerVisible && (
        <RNDateTimePicker
          mode="date"
          display="spinner"
          value={date}
          onChange={onChange}
          maximumDate={new Date()}
          minimumDate={new Date(2023, 0, 1)}
        />
      )}

      {visible && (
        <View className="flex-1 ">
          <Text className="text-[#000000] text-[20px] font-baloo mt-[10px]">
            Add Your Income
          </Text>

          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
            containerStyle={{
              borderRadius: 10,
            }}
            itemContainerStyle={{
              marginVertical: -8,
              // height: 10,
              // padding: "0",
              borderRadius: 10,
            }}
            placeholderStyle={styles.placeholderStyle}
            activeColor="#b9b9b9"
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            search
            maxHeight={200}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? "Select item" : "..."}
            searchPlaceholder="Search..."
            value={mthExpenses.value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              // setValue(item.value);
              setMthExpenses({
                ...mthExpenses,
                name: item.label,
                value: item.value,
                dateValue: moment().format("DD-MM-YYYY"),
                id: moment().format("YYYYMMDDhhmmss"),
              });
              setIsFocus(false);
            }}
            renderLeftIcon={() => (
              <AntDesign
                style={styles.icon}
                color={isFocus ? "blue" : "black"}
                name="Safety"
                size={20}
              />
            )}
          />
          <View className="flex-1 flex-row justify-between my-[20px] ">
            <View className="flex-row items-center px-[10px] py-[10px] rounded-[10px] bg-[#e4e3e3]">
              <Text className="text-[#000000] text-[20px] font-bold">₹</Text>
              <TextInput
                className=" text-[18px]  text-[#414040] rounded-[10px]"
                placeholder="amount*"
                placeholderTextColor="#989898"
                keyboardType="numeric"
                value={mthExpenses.amount}
                onChangeText={(text) =>
                  setMthExpenses({ ...mthExpenses, amount: Math.floor(text) })
                }
              />
            </View>
            <Pressable
              onPress={toggleDatePicker}
              className="bg-[#e4e3e3] px-[20px] py-[10px] rounded-[10px] justify-center"
            >
              <Text
                className={`${
                  mthExpenses.dateValue ? "text-[#090909]" : "text-[#414040]"
                } text-[16px] `}
              >
                {mthExpenses.dateValue
                  ? mthExpenses.dateValue
                  : moment().format("DD, MMM YYYY")}
              </Text>
            </Pressable>
            <TouchableOpacity
              onPress={handleIncomes}
              className=" bg-blue-500 rounded-[10px] justify-center px-[20px]"
            >
              <Text className="text-[20px] font-baloo text-[#ffffff]">OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default IncomeBlock;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    // padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    backgroundColor: "white",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

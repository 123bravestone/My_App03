import {
  View,
  Text,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import React from "react";
// import { MyLogo, StartImage } from "../../constants/svg_Icons";
import img1 from "../../assets/images/my_logo.png";
import img2 from "../../assets/images/start_img.png";
import img3 from "../../assets/images/money_calculation.png";
import img4 from "../../assets/images/money_tree.png";
import { useEffect, useRef, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { styled } from "nativewind";
import { router } from "expo-router";

const Carousel = ({ setFlag }) => {
  const flatlistRef = useRef();

  const screenWidth = Dimensions.get("window").width;
  const [titlename, setTitleName] = useState("");
  // const [flag, setFlag] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const StyleView = styled(View);

  const images = [
    {
      id: "1",
      image: img1,
      width: 240,
      height: 260,
      title: "Welcome!",
      button: "Get Started",

      point1: "Take control of your finances",
      point2: "Track spending, automatically allocate calculate budgets",
      point3: "Plan your savings effortlessly",
    },
    {
      id: "2",
      image: img2,
      width: 400,
      height: 260,
      title: "Money Spending",
      button: "Track Your Spending",
      point1: "Record daily expenses and monitor your spending.",
      point2: "Better understand your financial habits",
    },
    {
      id: "3",
      image: img3,
      width: 380,
      height: 240,
      title: "Money Calculation",
      button: "Set Your Budget",

      point1: "Set monthly budgets.",
      point2: "Visualize your income vs. expenses.",
      point3: "Keep your finances balanced and organized",
    },
    {
      id: "4",
      image: img4,
      width: 300,
      height: 300,
      title: "Money Savings",
      button: "Start Saving",

      point1: "Set savings targets and watch your progress.",
      point2:
        "Build a savings plan that helps you reach your financial dreams faster.",
    },
  ];
  //Display Image UI
  const renderItem = ({ item, index }) => {
    return (
      <View key={index} style={{ width: screenWidth }} className="flex-[1] ">
        {/* <item.image width={item.width} height={item.height} /> */}
        <View className="flex-[2] justify-center items-center my-4">
          <Image
            source={item.image}
            style={{ width: item.width, height: item.height }}
          />
        </View>
        <View className="flex-1 mx-4 justify-end mb-4">
          <StyleView
            style={{
              shadowColor: "#000",

              shadowRadius: 8,
              shadowOpacity: 0.5,
              elevation: 10,
            }}
            className="space-y-2 bg-[#f3f3f2] p-4 rounded-[20px]"
          >
            <Text className="text-[26px] font-baloo text-center  text-[#3cbd09] my-2">
              {item.title}
            </Text>
            <Text className="text-[18px] font-bold text-[#090909]  ">
              {`\u25CF ${item.point1}`}
            </Text>
            <Text className="text-[18px] font-bold text-[#090909] ">
              {`\u25CF ${item.point2}`}
            </Text>
            {item.point3 && (
              <Text className="text-[18px] font-bold text-[#090909] ">
                {`\u25CF ${item.point3}`}
              </Text>
            )}
          </StyleView>
        </View>
      </View>
    );
  };

  // Handle Scroll
  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const activeIndex = Math.round(scrollPosition / screenWidth);
    setCurrentIndex(activeIndex);
  };

  //Render Dot Indicators
  const renderDots = () => {
    return images.map((dot, index) => {
      if (currentIndex === index) {
        useEffect(() => {
          setTitleName(dot.button);
        }, [currentIndex]);

        return (
          <View
            key={index}
            className="w-[16px] h-[8px] bg-[#3d423d95] rounded-full mx-2"
          />
        );
      } else {
        return (
          <View
            key={index}
            className="w-[16px] h-[8px] bg-[#d6d8d6] rounded-full mx-2"
          />
        );
      }
    });
  };

  // Auto scroll loop
  // useEffect(() => {
  //   let interval = setInterval(() => {
  //     if (currentIndex === images.length - 1) {
  //       flatlistRef.current?.scrollToIndex({
  //         index: 0,
  //         animate: true,
  //       });
  //     } else if (currentIndex >= 0) {
  //       flatlistRef.current?.scrollToIndex({
  //         index: currentIndex + 1,
  //         animate: true,
  //       });
  //     }
  //   }, 3000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [currentIndex]);

  const getItemLayout = (data, index) => {
    return {
      length: screenWidth,
      offset: screenWidth * index,
      index: index,
    };
  };
  return (
    <View className="flex-1">
      <View className="flex-[2]">
        <FlatList
          keyExtractor={(item) => item.id}
          data={images}
          ref={flatlistRef}
          getItemLayout={getItemLayout}
          renderItem={renderItem}
          horizontal={true}
          pagingEnabled={true}
          onScroll={handleScroll}
          showsHorizontalScrollIndicator={false}
        />
        <View className="flex-row justify-center mt-1">{renderDots()}</View>
      </View>
      <View className="flex-[1] items-center justify-center">
        <Text className="text-[26px] font-baloo text-center  text-[#3cbd09] my-4">
          {titlename}
        </Text>
        <TouchableOpacity
          onPress={() => {
            if (currentIndex === images.length - 1) {
              // router.push("/auth/user_name");
              setFlag(true);
            } else if (currentIndex >= 0) {
              flatlistRef.current?.scrollToIndex({
                index: currentIndex + 1,
                animate: true,
              });
            }
          }}
        >
          <Ionicons name="arrow-forward-circle" size={100} color="#3cbd09" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Carousel;

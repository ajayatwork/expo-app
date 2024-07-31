import { View, Text, Dimensions, Image, StyleSheet } from "react-native";
import React from "react";

// added imports
import Carousel from "react-native-reanimated-carousel";
import SkeletonPlaceholder from "expo-react-native-skeleton-placeholder";
type Props = {
  title: string;
  products: any;
  isLoading: boolean;
};

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);

const renderItem = ({ item, index }: any) => {
  return (
    <View style={Styles.mainCont} key={index}>
      <View style={Styles.discountcont}>
        <Text style={Styles.price}>{`- ${item?.discountPercentage}%`}</Text>
      </View>
      <Image
        source={{ uri: item?.thumbnail }}
        width={SLIDER_WIDTH - 40}
        height={200}
        resizeMode="contain"
      />
      <View style={Styles.priceCont}>
        <Text style={Styles.price}>$ {item?.price}</Text>
      </View>
    </View>
  );
};

const CustomCarousel = ({ title, products, isLoading }: Props) => {
  return (
    <>
      <Text
        style={{
          marginLeft: 15,
          marginTop: 20,
          marginBottom: 15,
          fontFamily: "Poppins_600SemiBold",
          fontSize: 18,
        }}
      >
        {title}
      </Text>
      {isLoading ? (
        <CaraouselLoader />
      ) : (
        <Carousel
          loop
          width={SLIDER_WIDTH}
          height={250}
          autoPlay={true}
          data={products}
          renderItem={renderItem}
          scrollAnimationDuration={1500}
          style={{marginBottom: 10}}
        />
      )}
    </>
  );
};
const CaraouselLoader = () => {
  return (
    <SkeletonPlaceholder
      speed={800}
      backgroundColor="#E0E0E0"
      highlightColor="#F5F5F5"
      shimmerWidth={80}
    >
      <View
        style={{ width: SLIDER_WIDTH - 20, height: 250, marginHorizontal: 18 }}
      />
    </SkeletonPlaceholder>
  );
};

const Styles = StyleSheet.create({
  priceCont: {
    width: 80,
    backgroundColor: "#6D28D9",
    alignItems: "center",
    height: 30,
    justifyContent: "center",
    borderRadius: 20,
    position: "relative",
    bottom: 10,
  },
  price: {
    color: "#fff",
  },
  discountcont: {
    width: 80,
    backgroundColor: "#84CC16",
    alignItems: "center",
    height: 25,
    justifyContent: "center",
    borderRadius: 20,
    position: "absolute",
    right: 10,
    top: 10,
  },
  mainCont: {
    elevation: 5,
    padding: 10,
    borderWidth: 2,
    borderColor: "#D3D3D3",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    margin: 10,
    borderRadius: 5,
  },
});

export default CustomCarousel;

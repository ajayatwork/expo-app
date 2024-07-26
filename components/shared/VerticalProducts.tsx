import { View, Text, StyleSheet, FlatList, Image, Pressable } from "react-native";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { DollarSign, Heart, Star } from "lucide-react-native";
import { router, useNavigation } from "expo-router";
type Props = {
  title: string;
  productsData: {
    image: string;
    title: string;
    price: string | number;
    discount: string | number;
    ratings: string | number;
  }[];
};

const renderItems = (item: any, index: number, color:boolean, setColor:Dispatch<SetStateAction<boolean>>, navigation:any) => {
  return (
    <Pressable style={Styles.productCont}>
    <View key={index}>
        <Heart size={25} color={color ? "#e51616" : '#000'} style={{top: 0, right: 10, position: 'absolute'}}
        onPress={()=>setColor((prev)=>!prev)}
        />
      <View style={Styles.rating}>
        <Text style={{ color: "#fff", fontWeight: "600" }}>{item?.rating}</Text>
        <Star size={20} color={"#fff"} />
      </View>
      <Image
        source={{ uri: item?.thumbnail }}
        width={180}
        height={250}
        resizeMode="contain"
      />
      <Pressable onPress={()=>router.push({
        pathname: `/(home)/product-detail/${item?.id}` 
    })}>
      <View style={{ marginLeft: 10 }}>
        <Text style={{ fontWeight: "600", textShadowRadius: 1, fontFamily: "Poppins_400Regular" }}>
          {item.title}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <DollarSign size={18} color={"#6D28D9"} />
          <Text style={Styles.price}>{item?.price}</Text>
        </View>
      </View>
      </Pressable>
    </View>
    </Pressable>
  );
};


const VerticalProducts = ({ title, productsData }: Props) => {
  const navigation = useNavigation();
  const [color, setColor] = useState(false);
  return (
    <>
      <Text style={Styles.title}>{title}</Text>
      <FlatList
        columnWrapperStyle={{ justifyContent: "space-between" }}
        data={productsData}
        renderItem={({ item, index }) => renderItems(item, index, color, setColor, navigation)}
        showsVerticalScrollIndicator={false}
        numColumns={2}
      />
    </>
  );
};

const Styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "500",
    marginLeft: 15,
    marginVertical: 15,
    fontFamily: "HindSiliguri_600SemiBold"
  },
  productCont: {
    width: "45%",
    flexDirection: "column",
    gap: 2,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 10,
  },
  price: {
    fontWeight: "600",
    fontSize: 15,
    color: "#6D28D9",
    fontFamily: "Poppins_500Medium"
  },
  rating: {
    backgroundColor: "#ffd700",
    width: 70,
    height: 25,
    alignItems: "center",
    justifyContent: 'space-around',
    borderRadius: 15,
    position: "absolute",
    right: 0,
    bottom: 0,
    flexDirection: "row",
    zIndex: 55,
    fontFamily: "Poppins_400Regular"
  },
});

export default VerticalProducts;

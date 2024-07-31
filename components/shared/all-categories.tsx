import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import {getProductsFromCategory} from "@/utils/products"
import { useDispatch, useSelector } from "react-redux";
import {getProducts} from '@/redux/productSlice/productsSlice'
import { RootState } from "@/redux/store";
type Category = {
  text: string;
};

type CatProp = {
  allCategories: Category[];
};

export default function AllCategories({ allCategories }: CatProp) {
  const [activeCat, setactiveCat] = useState("All");
  const categoriesWithAll = ["All", ...allCategories];
  const dispatch = useDispatch();
  useEffect(()=>{
    (async function getData(){
      const res = await getProductsFromCategory(activeCat);
      dispatch(getProducts(res?.data?.products))
    })();
  }, [activeCat])
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ marginVertical: 20 }}
    >
      {categoriesWithAll.length > 0 &&
        categoriesWithAll.slice(0, 8).map((item:any, ind) => (
          <TouchableOpacity key={ind} onPress={() => setactiveCat(item)}>
            <View
              style={[
                styles.container,
                activeCat === item && {backgroundColor: "#19c563"}
              ]}
            >
              <Text style={[styles.cat,  activeCat === item && {color: "#fff"}]}>{item}</Text>
            </View>
          </TouchableOpacity>
        ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 0.6,
    gap: 2,
    marginHorizontal: 10,
    width: 90,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    height: 40
  },
  cat: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
  }
});

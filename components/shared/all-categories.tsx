import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";

type Category = {
  text: string;
};

type CatProp = {
  allCategories: Category[];
};

export default function AllCategories({ allCategories }: CatProp) {
  const [active, setActive] = useState("All");

  // Create a new array including "All" without mutating the original array
  const categoriesWithAll = ["All", ...allCategories];
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ marginTop: 20 }}
    >
      {categoriesWithAll.length > 0 &&
        categoriesWithAll.slice(0, 8).map((item:any, ind) => (
          <TouchableOpacity key={ind} onPress={() => setActive(item)}>
            <View
              style={[
                styles.container,
                active === item && {backgroundColor: "#19c563"}
              ]}
            >
              <Text style={[styles.cat,  active === item && {color: "#fff"}]}>{item}</Text>
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

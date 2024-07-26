import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useFocusEffect, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, Button } from 'react-native-paper';
import CustomCarousel from '@/components/shared/CustomCarousel';

import {getProducts, getAllProducts} from '@/utils/products'
import VerticalProducts from '@/components/shared/VerticalProducts';
const Home = () => {
  const [featuredProducts, setfeaturedProducts] = useState([]);
  const [allProducts, setallProducts] = useState([]);
  const [showLoading ,setshowLoading] = useState(false);
  const [limit, setLimit] = useState(10);
  const getAllProds = async ()=>{
    try {
      const res = await getAllProducts(limit);
      setallProducts(res?.data?.products);
    } catch (error) {
    }finally{
      setshowLoading(false);
    }
  }
  useFocusEffect(useCallback(()=>{
    (async function getFeaturedProducts(){
      try {
        const res = await getProducts();
        if(res?.status){
          setfeaturedProducts(res?.data?.products)
        }
      } catch (error) {
        
      }
    })();
    getAllProds();
  },[]))

  useEffect(()=>{
    getAllProds();
  }, [limit])
  // check whether we are at the end of the flatlist if so update the limit and call the api
  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 20;
  let ans =  layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom;
  if(ans){
    setshowLoading(true);
  }
  return ans;
};

  return (
    <ScrollView contentContainerStyle={{backgroundColor: "#fff"}} showsVerticalScrollIndicator={true} 
    onScroll={({nativeEvent})=>{
      if (isCloseToBottom(nativeEvent)) {
        setLimit((prev)=>prev+10);
        setshowLoading(false);
      }
    }}
    scrollEventThrottle={100}
    >
    <View style={{alignItems: "flex-start"}}>
      <CustomCarousel title='Top Products this week' products={featuredProducts}/>
      {allProducts.length > 0 && <VerticalProducts title={"For you"} productsData={allProducts}/>}
      {
        showLoading && <ActivityIndicator animating={true} size={'large'} color='#6D28D9' style={{justifyContent: "center"}}/>
      }
    </View>
    </ScrollView>
  )
}

const Styles = StyleSheet.create({
  temp:{
    position: 'absolute',
    right: 20,
    top: 30
  }
})

export default Home
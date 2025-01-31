import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useFocusEffect, useRouter } from 'expo-router';
import { ActivityIndicator, Button } from 'react-native-paper';
import CustomCarousel from '@/components/shared/CustomCarousel';
import AntDesign from '@expo/vector-icons/AntDesign';
import {getProducts, getAllProducts, getAllCategories} from '@/utils/products'
import VerticalProducts from '@/components/shared/VerticalProducts';
import AllCategories from '@/components/shared/all-categories';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
const Home = () => {
  const [featuredProducts, setfeaturedProducts] = useState([]);
  const [allCategories, setallCategories] = useState([]);
  const [allProducts, setallProducts] = useState([]);
  const [showLoading ,setshowLoading] = useState(false);
  const [isLoading ,setisLoading] = useState(false);
  const [limit, setLimit] = useState(10);

  const filteredProducts = useSelector((state:RootState)=>state.product.items);
  console.log("MY FILTER PRODUCTSSS", filteredProducts);
  const getAllProds = async ()=>{
    try {
      setisLoading(true);
      const res = await getAllProducts(limit);
      setallProducts(res?.data?.products);
    } catch (error) {
    }finally{
      setshowLoading(false);
      setisLoading(false);
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
    (async function getAllCat(){
      try {
        const res = await getAllCategories();
        console.log("CATGGG", res?.data);
        setallCategories(res?.data);
      } catch (error) {
        console.log("ER", error);
      }
    })();
    getAllProds();
  },[]))

useEffect(() => {
  const fetchData = async () => {
    await getAllProds();
    setshowLoading(false);
  };
  fetchData();
}, [limit]);
  // check whether we are at the end of the flatlist if so update the limit and call the api
  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}:any) => {
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
    scrollEnabled={isLoading ? false : true}
    >
    <View style={{alignItems: "flex-start"}}>
      <CustomCarousel title='Top Products this week' products={featuredProducts} isLoading={isLoading}/>

      {/* sub heading category */}
      <View style={{width: "100%", flexDirection: 'row', justifyContent: "space-between"}}>
        <Text style={[Styles.subHeading,{marginHorizontal: 10, fontSize: 19}]}>Categories</Text>
       <View style={{flexDirection: 'row', justifyContent: "flex-end", alignItems: "center", marginRight: 10}}>
         <Text style={[Styles.subHeading,{color: "rgb(25, 197, 99)"}]}>All</Text>
        <AntDesign name="right" size={20} color="rgb(25, 197, 99)" />
       </View>
      </View>

      {/* all categories */}

      <AllCategories allCategories={allCategories}/>
      {allProducts.length > 0 && <VerticalProducts title={"For you"} productsData={filteredProducts} isLoading={isLoading}/>}
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
  },
  subHeading:{
    fontFamily: "Poppins_500Medium",
    fontSize: 15
  },
})

export default Home
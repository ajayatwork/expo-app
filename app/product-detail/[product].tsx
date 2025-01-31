import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useFocusEffect, useLocalSearchParams, useNavigation } from 'expo-router';
import { getSingleProduct } from '@/utils/products';
import { ThemedText } from '@/components/ThemedText';
import AntDesign from '@expo/vector-icons/AntDesign';
import { FontAwesome } from '@expo/vector-icons';
import { ShoppingCart } from 'lucide-react-native';
import QrModal from '@/components/shared/qr-modal';
import SkeletonPlaceholder from 'expo-react-native-skeleton-placeholder';
import { FadeInLeft, FadeOutRight } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
interface Product {
  thumbnail?: string;
  returnPolicy?: string;
  title?: string;
  rating?: number;
  reviews?: { length: number }[];
  tags?: string[];
  price?: number;
  description?: string;
  meta?:{
    qrCode?:string
  }
}[]


interface ProductDetailProps {
  singleProduct: Product;
}
const ProductDetail =()=> {
  const { product } = useLocalSearchParams();
  const navigation = useNavigation();
  const [singleProduct, setSingleProduct] = useState<Product>({});
  const [showQrModal, setshowQrModal] = useState(false); 
  const [isLoading, setisLoading] = useState(false);
  useFocusEffect(
    useCallback(() => {
      if (singleProduct) {
        navigation.setOptions({ 
          headerShown: true,
          headerTitle: singleProduct?.title 
        });
      }
    }, [singleProduct, navigation])
  );

  useEffect(() => {
    (async function getDetails() {
      try {
        setisLoading(true);
        const res = await getSingleProduct(product);
        setSingleProduct(res?.data);
      } catch (error) {
        console.error(error);
      } finally {
        setisLoading(false);
      }
    })();
  }, [product]);

  return (
    <>
    {
      isLoading ? <SkeletonLoader /> :  <>
     <Animated.View entering={FadeInLeft} exiting={FadeOutRight} style={styles.container}>
    <Image style={styles.image} source={{uri: singleProduct?.thumbnail}}/>
    <View style={styles.returnPolicy}>
      <Text style={{fontSize: 12, color:"#fff"}}>{singleProduct?.returnPolicy}</Text>
    </View>
    </Animated.View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{marginLeft: 15, padding: 5}}>
      {/* all other information */}
      <View>
        <ThemedText type='title' style={{fontWeight: "500", marginTop: 15}}>{singleProduct.title}</ThemedText>
 
        {/* ratings and all */}
        <View style={{flexDirection: "row"}}>
        <View style={styles.rating}>
         <View style={{flexDirection: 'row', gap: 3}}>
          <AntDesign name="star" size={24} color="#e5e500" style={{marginLeft: 5}}/>
          <Text style={{color: "#000", fontWeight: "700"}}>{singleProduct.rating}</Text>
         </View>
 
          <View>
            <Text>{singleProduct.reviews?.length} Reviews</Text>
          </View>
        </View>
 
        <View style={[styles.rating, {marginLeft: 10, width: "50%", justifyContent: "flex-start"}]}>
         <View style={{flexDirection: 'row', gap: 5, marginLeft: 15}}>
          <AntDesign name="tago" size={24} color="#dedede" style={{marginLeft: 2}}/>
          {
            [singleProduct].map((i:any, ind:number)=><Text
            key={ind}
            style={{color: "#000", fontWeight: "700"}}>{i?.tags?.join(",")}</Text>)
          }
         </View>
        </View>
        </View>
 
        {/* Price */}
        <View style={styles.price}>
          <FontAwesome name="dollar" size={20} color="black" style={{marginLeft: 5}}/>
        <Text style={{fontWeight: "700", fontSize: 15}}>{singleProduct.price}</Text>
        <Text style={{fontWeight: "500", }}>or from <Text style={{fontWeight: "800", fontSize: 20}}>5$</Text> a month</Text>
        </View>
 
        {/* Description */}
        <View style={styles.description}>
          <View style={{justifyContent: 'space-between', flexDirection: 'row', marginBottom: 15}}>
            <ThemedText style={{fontSize: 20, fontWeight: "500"}}>Description</ThemedText>
          <AntDesign name="qrcode" size={30} color="black" onPress={()=>setshowQrModal(true)} style={{marginRight: 20}}/>
          </View>
          <Text>{singleProduct.description}</Text>
        </View>
 
        {/* Add To Cart button */}
        <TouchableOpacity style={styles.addBtn}>
          <ShoppingCart size={30} color={"#fff"}/>
          <Text style={{color: "#fff", fontSize: 15, fontWeight: "500" }}>Add To  cart</Text>
        </TouchableOpacity>
      </View>
      {
        showQrModal && <QrModal qrcode={singleProduct?.meta?.qrCode} showQr={showQrModal} setshowQr={setshowQrModal}/>
      }
    </ScrollView>
    </>
    }
    </>
  );
};


const SkeletonLoader = ()=>{
  return(
    <SkeletonPlaceholder borderRadius={10} speed={1500} backgroundColor="#E0E0E0" highlightColor="#F5F5F5">
      <>
      <View style={{ width: "95%", height: 420, marginHorizontal: "auto", borderTopEndRadius: 10, borderBottomRightRadius: 10, marginVertical: 10 }} />
        <SkeletonPlaceholder.Item marginLeft={20}>
        </SkeletonPlaceholder.Item>
         <SkeletonPlaceholder.Item width={320} height={20} marginTop={0} marginLeft={15}/>
          <SkeletonPlaceholder.Item marginTop={6} width={60} height={20} marginLeft={15}/>
          <SkeletonPlaceholder.Item marginTop={120} width={120} height={40} marginHorizontal={'auto'}/>
      </>
    </SkeletonPlaceholder>
  )
} 
export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#dedede"
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginVertical: 28,
    width: "100%",
  },
  image:{
    width: "100%",
    height: 400,
    resizeMode: "contain"
  },
  rating:{
    width: "40%",
    flexDirection: 'row',
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 0.3,
    gap: 5,
    marginTop: 25,
    justifyContent: "space-around"
  },
  price:{
    flexDirection: 'row', 
    alignItems: 'center',
    marginTop: 25,
    gap: 5,
    width: '80%',
    backgroundColor: "#e9e9e9",
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    marginHorizontal:"auto"
  },
  returnPolicy:{
    backgroundColor: '#6666ff',
    width: "40%",
    height: 30,
    alignItems: "center",
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderRadius: 15
  },
  addBtn:{
    flexDirection: 'row',
    alignItems: "center",
    backgroundColor: '#6666ff',
    height: 50,
    justifyContent: 'center',
    width: '80%',
    marginHorizontal: "auto",
    borderRadius: 15,
    gap: 15
  },
    scrollViewContent: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    paddingTop: 10,
    backgroundColor: 'white',
  },
  parallaxHeader: {
    marginLeft: 15,
    padding: 5,
  },
});

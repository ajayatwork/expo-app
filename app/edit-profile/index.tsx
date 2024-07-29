import React, { useState, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { router, useFocusEffect, useNavigation } from 'expo-router';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import CountryPicker from 'react-native-country-picker-modal';
import { getProfile, updateProfile } from '@/utils/profile';
import { TextInput, Button, Text, Avatar } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as ImagePicker from 'expo-image-picker';
import { useCustomToast } from "@/hooks/useCustomToast";
import Entypo from '@expo/vector-icons/Entypo';
const validationSchema = Yup.object().shape({
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone_number: Yup.string().required('Phone number is required'),
  address: Yup.string().required('Address is required')
});

const EditProfileScreen = () => {
   const [profileData, setProfileData] = useState({
    profile_pic: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    country_code: '',
    email: '',
    dob: new Date(),
    address: ''
  });
  const navigation = useNavigation();
  const [countryCode, setCountryCode] = useState<any>(profileData.country_code);
  const [country, setCountry] = useState<any>(null);
   const { catchError, showsuccesToast } = useCustomToast();
  const [withCountryNameButton, setWithCountryNameButton] =
    useState<boolean>(false);
  const [withFlag, setWithFlag] = useState<boolean>(true);
  const [withEmoji, setWithEmoji] = useState<boolean>(true);
  const [withFilter, setWithFilter] = useState<boolean>(true);
  const [withAlphaFilter, setWithAlphaFilter] = useState<boolean>(false);
  const [withCallingCode, setWithCallingCode] = useState<boolean>(true);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isCountryPickerVisible, setCountryPickerVisible] = useState(false);
  const [isNewPic, setisNewPic] = useState(false);
  const [isLoading, setisLoading] = useState<boolean>(false);
    const onSelect = (country: any) => {
    setCountryCode(country.cca2);
    setCountry(country);
  };


 const formatDate = (date: Date | null) => {
    if (!date) return "";
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };


  useFocusEffect(
    useCallback(() => {
      (async function fetchProfileDetails() {
        const res = await getProfile();
        const profile = res?.data?.data;
        if (profile) {
          console.log("prifle", profile);
          setProfileData({
            ...profile,
            dob: new Date(profile.dob)
          });
        }
      })();
    }, [])
  );

  const handleImageSelect = async (fieldVal:any)=>{
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      fieldVal("profile_pic", result.assets[0].uri);
      setisNewPic(true);
    }
  }

  const handleSave = async (values:any) => {
    console.log("VALUESSS", values)
    for(const Key in values){
      if(values[Key]!=profileData[Key]){
        console.log("THESE VALUES ARE DIFFF", values[Key])
      }
    }
    const updatedProfile = {
      ...values,
      dob: profileData.dob.toISOString(),
      country_code: profileData.country_code,
    };
    try {
      setisLoading(true);
      const res = await updateProfile(updatedProfile);
      console.log("RESSSS", res);
      if(res?.status){
        showsuccesToast(res?.data?.message);
        router.replace("/(Profile)")
      }
    } catch (error) {
      console.log("Error is error",error);
    }finally{
      setisLoading(false);
    }
  };

  return (
    <Formik
      initialValues={profileData}
      validationSchema={validationSchema}
      onSubmit={(values)=>handleSave(values)}
      enableReinitialize
    >
      {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
        <View style={styles.container}>
          <Entypo name="chevron-small-left" size={35} color="black" onPress={()=>navigation.goBack()}/>
          <TouchableOpacity onPress={()=>handleImageSelect(setFieldValue)}>
            {values.profile_pic ? (
            <Avatar.Image size={200} source={{ uri: !isNewPic ? `http://nodemaster.visionvivante.com:4040/${profileData.profile_pic}` : values.profile_pic }} style={styles.avatar}/>
          ) : (
            <View style={styles.placeholderAvatar}>
              <Text style={styles.placeholderText}>{values?.first_name?.charAt(0)}</Text>
            </View>
          )}
          </TouchableOpacity>
          <TextInput
            label="First Name"
            value={values.first_name}
            onChangeText={handleChange('first_name')}
            onBlur={handleBlur('first_name')}
            style={styles.input}
            mode="outlined"
            error={touched.first_name && errors.first_name}
          />
          {touched.first_name && errors.first_name && (
            <Text style={styles.errorText}>{errors.first_name}</Text>
          )}
          <TextInput
            label="Last Name"
            value={values.last_name}
            onChangeText={handleChange('last_name')}
            onBlur={handleBlur('last_name')}
            style={styles.input}
            mode="outlined"
            error={touched.last_name && errors.last_name}
          />
          {touched.last_name && errors.last_name && (
            <Text style={styles.errorText}>{errors.last_name}</Text>
          )}
          <TextInput
            label="Email"
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            style={styles.input}
            mode="outlined"
            error={touched.email && errors.email}
          />
          {touched.email && errors.email && (
            <Text style={styles.errorText}>{errors.email}</Text>
          )}
          <TouchableOpacity onPress={() => setDatePickerVisible(true)}>
            <TextInput
              label="DOB"
              value={values.dob.toDateString()}
              editable={false}
              style={styles.input}
              mode="outlined"
            />
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            date={values.dob}
            onConfirm={(date) => {
              formatDate(date)
              setDatePickerVisible(false);
              setFieldValue('dob', date);
            }}
            onCancel={() => {
              setDatePickerVisible(false);
            }}
          />
         <View>
           <CountryPicker
            visible={isCountryPickerVisible}
           {...{
                  countryCode,
                  withFilter,
                  withFlag,
                  withCountryNameButton,
                  withAlphaFilter,
                  withCallingCode,
                  withEmoji,
                  onSelect,
                }}
           countryCode={values.country_code}
          />
          <TextInput
            label="Phone Number"
            value={values?.phone_number.toString()}
            onChangeText={handleChange('phone_number')}
            onBlur={handleBlur('phone_number')}
            style={styles.input}
            mode="outlined"
            error={touched.phone_number && errors.phone_number}
          />
          {touched.phone_number && errors.phone_number && (
            <Text style={styles.errorText}>{errors.phone_number}</Text>
          )}
         </View>
          <TextInput
            label="Address"
            value={values.address}
            onChangeText={handleChange('address')}
            onBlur={handleBlur('address')}
            style={styles.input}
            mode="outlined"
            error={touched.address && errors.address}
          />
          {touched.address && errors.address && (
            <Text style={styles.errorText}>{errors.address}</Text>
          )}
          <Button 
          mode="contained"
           onPress={()=>handleSubmit()} 
           style={styles.button}
           loading={isLoading}
           disabled={isLoading}
           >
            Save
          </Button>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  avatar: {
    alignSelf: 'center',
    marginBottom: 20,
    resizeMode: 'cover',
    backgroundColor: "#fff",
    borderWidth: 1
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 20,
  },
  placeholderAvatar: {
    width: 200,
    height: 200,
    borderRadius:100,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
    resizeMode: "contain"
  },
  placeholderText: {
    fontSize: 100,
    color: '#fff',
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginBottom: 16,
  },
});

export default EditProfileScreen;

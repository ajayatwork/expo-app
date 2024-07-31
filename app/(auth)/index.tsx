import {
  View,
  Text,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import React, {useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput, Button, useTheme } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import { loginToApi } from "../../utils/login";
import { useRouter } from "expo-router";
import { useCustomToast } from "@/hooks/useCustomToast";
type LoginCreds = {
  email: string | undefined;
  password: string | undefined;
};
import axios from 'axios'

const login = () => {
  const router = useRouter();
  const {showsuccesToast, catchError} = useCustomToast();
  const [isLoading, setisLoading] = useState(false);
  const [userData, setuserData] = useState<LoginCreds>({
    email: "",
    password: "",
  });
  const [ispassVisible, setisPassVisble] = useState<boolean>(false);

  const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter valid email")
      .required("Email Address is Required"),
    password: Yup.string()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required("Password is required"),
  });

  const handleLogin = async(values:any)=>{
    try {
      setisLoading(true);
      // call api
      let res = await loginToApi(values);
      showsuccesToast(res?.data?.message);
      router.replace("/(home)");
      await AsyncStorage.setItem("token", res?.data?.data?.token)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Err", error)
      catchError(error.response?.data?.errors);
    } 
    }finally{
      setisLoading(false);
    }
  }
  return (
    <KeyboardAvoidingView style={Styles.container}>
      <Text style={Styles.text}>Login</Text>
      <View style={Styles.loginCont}>
        <Formik
          validationSchema={loginValidationSchema}
          initialValues={userData}
          onSubmit={(values) => handleLogin(values)}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <TextInput
                label="Email"
                mode="outlined"
                style={Styles.input}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                error={touched.email && errors.email ? true : false}
              />
              {touched.email && errors.email && (
                <Text style={Styles.errorTxt}>{errors.email}</Text>
              )}
              <TextInput
                label="Password"
                mode="outlined"
                secureTextEntry={!ispassVisible ? true : false}
                style={Styles.input}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                error={touched.password && errors.password ? true : false}
                right={
                  ispassVisible ? (
                    <TextInput.Icon
                      icon={"eye-off"}
                      onPress={() => setisPassVisble(false)}
                    />
                  ) : (
                    <TextInput.Icon
                      icon={"eye"}
                      onPress={() => setisPassVisble(true)}
                    />
                  )
                }
              />
              {touched.password && errors.password && (
                <Text style={Styles.errorTxt}>{errors.password}</Text>
              )}
              <Button
                mode="contained"
                disabled={isLoading}
                loading={isLoading}
                onPress={() => handleSubmit()}
                style={Styles.loginBtn}
              >
               Login
              </Button>
            </>
          )}
        </Formik>

        {/* sign up button */}
        <TouchableOpacity onPress={() => router.push("/signup")} style={{marginTop: 10, alignItems: 'center'}}>
          <Text style={Styles.signUpText}>Don't Have an account? sign up</Text>
        </TouchableOpacity>
        {/* forgot password */}
          <TouchableOpacity onPress={() => router.push("/forget-pass")} style={{marginTop: 10, alignItems: 'center'}}>
          <Text style={Styles.signUpText}>Forgot password? Reset here</Text>
        </TouchableOpacity>
      </View>

      {/* login button */}
    </KeyboardAvoidingView>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#000",
    fontSize: 20,
  },
  labelText: {
    color: "#fff",
    fontSize: 12,
  },
  loginCont: {
    marginTop: 15,
    textAlign: "left",
  },
  input: {
    width: 320,
    borderColor: "#fff",
    borderWidth: 1,
    marginTop: 15,
    height: 50,
    borderRadius: 5,
    color: "#fff",
    paddingHorizontal: 10,
    fontSize: 15,
  },
  loginBtn: {
    marginTop: 25,
  },
  eye: {
    position: "absolute",
    right: 10,
    top: 130,
  },
  errorTxt: {
    fontSize: 13,
    color: "#D22B2B",
  },
  signUpText: {
    color: "#4169E1",
    fontSize: 15,
  },
});

export default login;


// custom errors handling
  // const handleSubmit = async()=>{
  //  let isValid = true;
  //  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  // if (!userData.email) {
  //   setErrors((prevErr) => ({ ...prevErr, emailErr: "Email is required*" }));
  //   isValid = false;
  // } else if(!emailRegex.test(userData.email)){
  //   setErrors((prevErr) => ({ ...prevErr, emailErr: "Email is not valid*" }));
  //   isValid = false;
  // }
  // else {
  //   setErrors((prevErr) => ({ ...prevErr, emailErr: null }));
  // }

  // if (!userData.password) {
  //   setErrors((prevErr) => ({ ...prevErr, passErr: "Password is required*" }));
  //   isValid = false;
  // } else {
  //   setErrors((prevErr) => ({ ...prevErr, passErr: null }));
  // }
  //   // if only valid call login api
  //   if(isValid){
  //     try {
  //       setisLoading(true);
  //      const res = await loginToApi(userData);
  //      if(res?.status === 200){
  //       console.log("res?.data?.token", res?.data?.data?.token)
  //        await AsyncStorage.setItem("token", res?.data?.data?.token);
  //        router.replace("/(home)")
  //     }
  //     }finally{
  //       setisLoading(false);
  //     }
  //   }
  // }
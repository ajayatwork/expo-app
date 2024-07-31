import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import React, { useRef, useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useRouter } from "expo-router";
import * as Yup from "yup";
import { Formik } from "formik";
import { TextInput, Button } from "react-native-paper";
import { signupApi } from "@/utils/signup";
import { useCustomToast } from "@/hooks/useCustomToast";
import PhoneInput from "react-native-phone-number-input";
const SignUp = () => {
  const router = useRouter();
  const { catchError, showsuccesToast } = useCustomToast();
  const [isLoading, setisLoading] = useState(false);
  const [isDateVisible, setisDateVisible] = useState(false);
  const [isPassVisible, setisPassVisible] = useState<boolean>(false);
  const [countryCode, setCountryCode] = useState<any>("91");
  const phoneInput = useRef<PhoneInput>(null);
  const [country, setCountry] = useState<any>(null);

  const signUpSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email address is invalid")
      .required("Email address is required"),
    password: Yup.string()
      .min(8, (min) => `Password must contain at least 8 characters`)
      .required("Password is required*"),
    firstName: Yup.string().required("First name is required*"),
    lastName: Yup.string().required("Last name is required*"),
    dob: Yup.string().required("Date of birth is required"),
    phoneNo: Yup.string()
      .min(8, (min) => `  Number must have 10 digits`)
      .required("Phone Number is required*")
      .matches(/^[0-9]{10}$/, 'Phone number is not valid'),
    address: Yup.string().required("Address is required*"),
    countryCode: Yup.string().default("91"),
  });

  const handleSignUp = async (userData: any) => {
    console.log("USERDATA", userData);
    try {
      setisLoading(true);
      // call api;
      const res = await signupApi(userData);
      showsuccesToast(res?.data?.message);
      router.replace("/(auth)");
    } catch (error) {
        console.log("errr", error);
        error && catchError(error?.response?.data?.errors);
    } finally {
      setisLoading(false);
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  return (
    <View style={Styles.container}>
      <Text style={Styles.text}>Sign up</Text>
      <Formik
        validationSchema={signUpSchema}
        initialValues={{
          email: "",
          password: "",
          firstName: "",
          lastName: "",
          dob: new Date(),
          phoneNo: "",
          address: "",
          countryCode: "",
        }}
        onSubmit={(values) => handleSignUp(values)}
      >
        {({
          handleSubmit,
          handleBlur,
          handleChange,
          setFieldValue,
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
              secureTextEntry={!isPassVisible}
              style={Styles.input}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              error={touched.password && errors.password ? true : false}
              right={
                !isPassVisible ? (
                  <TextInput.Icon
                    icon={"eye"}
                    size={25}
                    color={"#000"}
                    onPress={() => setisPassVisible(true)}
                  />
                ) : (
                  <TextInput.Icon
                    icon={"eye-off"}
                    size={25}
                    color={"#000"}
                    onPress={() => setisPassVisible(false)}
                  />
                )
              }
            />
            {touched.password && errors.password && (
              <Text style={Styles.errorTxt}>{errors.password}</Text>
            )}
            <TextInput
              label="First Name"
              mode="outlined"
              style={Styles.input}
              onChangeText={handleChange("firstName")}
              onBlur={handleBlur("firstName")}
              value={values.firstName}
              error={touched.firstName && errors.firstName ? true : false}
            />
            {touched.firstName && errors.firstName && (
              <Text style={Styles.errorTxt}>{errors.firstName}</Text>
            )}
            <TextInput
              label="Last Name"
              mode="outlined"
              style={Styles.input}
              onChangeText={handleChange("lastName")}
              onBlur={handleBlur("lastName")}
              value={values.lastName}
              error={touched.lastName && errors.lastName ? true : false}
            />
            {touched.lastName && errors.lastName && (
              <Text style={Styles.errorTxt}>{errors.lastName}</Text>
            )}
            <TextInput
              mode="outlined"
              placeholder="DD-MM-YYYY"
              value={values.dob.toDateString()}
              editable={false}
              left={<TextInput.Icon icon="calendar" onPress={()=>setisDateVisible(true)}/>}
              style={Styles.input}
              />
            <DateTimePickerModal
              isVisible={isDateVisible}
              mode="date"
              onConfirm={(date) => {
                setFieldValue("dob",date);
                setisDateVisible(false);
              }}
              onCancel={() => setisDateVisible(false)}
            />
            {touched.dob && errors.dob && (
              <Text style={Styles.errorTxt}>{errors.dob}</Text>
            )}
            <PhoneInput
            ref={phoneInput}
            defaultValue={values.countryCode}
            defaultCode="IN"
            layout="first"
            onChangeText={(text) => {
              handleChange("phoneNo")("phoneNo")
              setFieldValue("phoneNo", text, true);
            }}
            onChangeCountry={(country)=>{
              setFieldValue("countryCode", (country?.callingCode[0] || "91"));
            }}
            containerStyle={[Styles.input, {backgroundColor: "#fff"}]}
            countryPickerButtonStyle={{width: "15%"}}
            
          />
            {touched.phoneNo && errors.phoneNo && (
              <Text style={Styles.errorTxt}>{errors.phoneNo}</Text>
            )}
            <TextInput
              label="Address"
              mode="outlined"
              style={Styles.input}
              onChangeText={handleChange("address")}
              onBlur={handleBlur("address")}
              value={values.address}
              error={touched.address && errors.address ? true : false}
            />
            {touched.address && errors.address && (
              <Text style={Styles.errorTxt}>{errors.address}</Text>
            )}
            <Button
              mode="contained"
              disabled={isLoading}
              loading={isLoading}
              onPress={() => handleSubmit()}
              style={Styles.loginBtn}
            >
              Sign up
            </Button>
          </>
        )}
      </Formik>
      {/* login button */}
    </View>
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
    width: "95%",
    borderColor: "#fff",
    borderWidth: 1,
    marginTop: 15,
    borderRadius: 5,
    color: "#fff",
    paddingHorizontal: 10,
    fontSize: 15,
  },
  loginBtn: {
    marginTop: 25,
    width: 250,
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
    marginTop: 10,
  },
});

export default SignUp;

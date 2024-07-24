import React, { useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import { forgotPass } from "@/utils/forgotpass";
import { useCustomToast } from "@/hooks/useCustomToast";
import { Link, useRouter } from "expo-router";
// Validation schema using Yup
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
});

const ForgotPasswordScreen = () => {
  const router = useRouter();
  const [isLoading, setisLoading] = useState(false);
  const { showsuccesToast, catchError } = useCustomToast();
  const handlePassForgot = async (userData: any) => {
    try {
      setisLoading(true);
      const res = await forgotPass(userData);
      console.log(res);
      showsuccesToast(res?.data?.message);
       router.push({
          pathname: "/otp-input",
          params: { email: userData.email },
        }) 
    } catch (error) {
      console.log("ERR", error);
      catchError(error?.response.data.message);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ color: "#000", textAlign: "center", fontSize: 20 }}>
        Forgot Password
      </Text>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          // Handle password reset logic here
          console.log(values);
          handlePassForgot(values);
          actions.setSubmitting(false);
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isSubmitting,
        }) => (
          <View>
            <TextInput
              label="Email"
              mode="outlined"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              style={styles.input}
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
            <Button
              mode="contained"
              onPress={() => handleSubmit()}
              loading={isLoading}
              disabled={isLoading}
              style={styles.button}
            >
              Reset Password
            </Button>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
});

export default ForgotPasswordScreen;

import {
  View,
  Text,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { submitOtp } from "@/utils/otpinput";
import { Link, useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
const OtpInput = () => {
  const [otpLength, setOtpLength] = useState(new Array(6).fill(""));
  const [isLoading, setisLoading] = useState(false);
  const { email } = useLocalSearchParams();
  console.log("EMAIL", email);
  const router = useRouter();
  const otpRef = useRef<Array<any>>([]);

  const handleChange = (
    text: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    const key = text.nativeEvent.key;
    let newOtp = [...otpLength];

    if (key === "Backspace") {
      newOtp[index] = "";
      setOtpLength(newOtp);
      if (index > 0) {
        otpRef.current[index - 1].focus();
      }
      return;
    }
    if (key >= "0" && key <= "9") {
      newOtp[index] = key;
      setOtpLength(newOtp);

      if (index + 1 < otpLength.length) {
        otpRef.current[index + 1].focus();
      }
    }
  };

  const handleOtpSubmit = async () => {
    try {
      setisLoading(true);
      const res = await submitOtp(otpLength.join(""), email);
      if (res?.status == 200) {
        router.push({
          pathname: "/reset-password",
          params: { email: email },
        });
      }
    } catch (error) {
      console.log("ERRR", error);
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    otpRef.current[0]?.focus();
  }, []);

  return (
    <View style={Styles.container}>
      <Text style={Styles.title}>Enter your 6 digit OTP Below</Text>
      {/* otp boxes */}
      <View style={Styles.otpField}>
        {otpLength.map((value, index) => (
          <View key={index}>
            <TextInput
              mode="outlined"
              value={value}
              ref={(el: any) => (otpRef.current[index] = el)}
              onKeyPress={(text) => handleChange(text, index)}
              keyboardType="numeric"
              maxLength={1}
              style={Styles.otpInput}
            />
          </View>
        ))}
      </View>
      <Button
        style={Styles.sbmtBtn}
        mode="contained"
        disabled={otpLength.includes("")}
        onPress={() => handleOtpSubmit()}
        loading={isLoading}
      >
        Submit
      </Button>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#000",
    fontSize: 18,
  },
  otpField: {
    flexDirection: "row",
    gap: 10,
    marginTop: 30,
  },
  otpInput: {
    width: 50,
    height: 50,
    textAlign: "center",
  },
  sbmtBtn: {
    marginTop: 25,
    width: 150,
  },
});

export default OtpInput;

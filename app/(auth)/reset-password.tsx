import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { router, useLocalSearchParams } from 'expo-router';
import {resetPassword} from '@/utils/resetpass'
import { useCustomToast } from '@/hooks/useCustomToast';

const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ""], 'Passwords must match')
    .required('Confirm Password is required'),
});


const ResetPasswordScreen = () => {
  const {email} = useLocalSearchParams();
  const { showsuccesToast, catchError } = useCustomToast();
  const [isLoading, setisLoading] = useState(false);
  const handleResetPassword = async (userData:any)=>{
  try {
    setisLoading(true);
    const res = await resetPassword(userData.password, email);
    if(res?.status){
      showsuccesToast(res?.data?.message);
      router.replace("/(auth)");
    }
  } catch (error) {
    catchError(error?.response.data.message);
  }finally{
    setisLoading(false);
  }
}
  return (
    <Formik
      initialValues={{ password: '', confirmPassword: '' }}
      validationSchema={ResetPasswordSchema}
      onSubmit={values => {
        handleResetPassword(values);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.container}>
          <TextInput
            label="Password"
            secureTextEntry
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            style={styles.input}
          />
          {touched.password && errors.password && (
            <HelperText type="error">{errors.password}</HelperText>
          )}
          <TextInput
            label="Confirm Password"
            secureTextEntry
            onChangeText={handleChange('confirmPassword')}
            onBlur={handleBlur('confirmPassword')}
            value={values.confirmPassword}
            style={styles.input}
          />
          {touched.confirmPassword && errors.confirmPassword && (
            <HelperText type="error">{errors.confirmPassword}</HelperText>
          )}
          <Button mode="contained" onPress={()=>handleSubmit()} style={styles.button} 
          loading={isLoading}
          disabled={isLoading}  
          >
            Reset Password
          </Button>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
});

export default ResetPasswordScreen;
import { View, Text, StyleSheet, TextInput, NativeSyntheticEvent, TextInputChangeEventData, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react-native'
type LoginCreds = {
  email: string | undefined,
  password: string | undefined
}

type LoginErrors = {
  emailErr: string | null,
  passErr: string | null
}

const login = () => {
  const [userData, setuserData] = useState<LoginCreds>({
    email: "",
    password: ""
  })
  const [errors, setErrors] = useState<LoginErrors>({
    emailErr: null,
    passErr: null
  })

  const [ispassVisible, setisPassVisble] = useState<boolean>(false)
  const handleChange = (text: string, label:string)=>{
    switch(label){
      case "email":
        setuserData({...userData, email: text});
        setErrors({...errors, emailErr: null});
        break;
      case "password":
        setuserData({...userData, password: text})
        setErrors({...errors, passErr:null});
        break;
      default:
        return null;
    }
  }

  const handleSubmit = async()=>{
   let isValid = true;
   let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!userData.email) {
    setErrors((prevErr) => ({ ...prevErr, emailErr: "Email is required*" }));
    isValid = false;
  } else if(!emailRegex.test(userData.email)){
    setErrors((prevErr) => ({ ...prevErr, emailErr: "Email is not valid*" }));
    isValid = false;
  }
  else {
    setErrors((prevErr) => ({ ...prevErr, emailErr: null }));
  }

  if (!userData.password) {
    setErrors((prevErr) => ({ ...prevErr, passErr: "Password is required*" }));
    isValid = false;
  } else {
    setErrors((prevErr) => ({ ...prevErr, passErr: null }));
  }
    // if only valid call login api
    if(isValid){
      console.log("GOT USER DATA--->>>",userData);
    }
  }

  useEffect(()=>{
    console.log(errors);
  }, [errors])
  return (
    <View style={Styles.container}>
      <Text style={Styles.text}>Login</Text>
      <View style={Styles.loginCont}>

        <Text style={Styles.labelText}>Email</Text>
        <TextInput 
        value={userData.email}
        onChangeText={(text)=>handleChange(text, "email")}
        style={Styles.input}
        />

        <Text style={Styles.errorTxt}>{errors.emailErr}</Text>

        <Text style={Styles.labelText}>Password</Text>
        <TextInput 
        value={userData.password}
        onChangeText={(text)=>handleChange(text, "password")}
        secureTextEntry={ispassVisible ? false : true}
        style={Styles.input}
        />
        <Text style={Styles.errorTxt}>{errors.passErr}</Text>

        {
          ispassVisible ? 
          <EyeOff
           color={'#fff'}
           size={20}
           onPress={()=>setisPassVisble((prev)=>!prev)}
           style={Styles.eye}
           /> : 
           <Eye 
           color={'#fff'}
           size={20}
           onPress={()=>setisPassVisble((prev)=>!prev)}
           style={Styles.eye}
           />
        }
      </View>

      {/* login button */}
      <TouchableOpacity style={Styles.loginBtn} onPress={handleSubmit}>
        <Text style={[Styles.text, {color: "#000"}]}>Login</Text>
      </TouchableOpacity>
    </View>
  )
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center"
  },
  text:{
    color: "#fff",
    fontSize: 20
  },
  labelText:{
    color: "#fff",
    fontSize: 12,
  },
  loginCont:{
    marginTop: 15,
    textAlign: "left",
  },
  input:{
    width: 300,
    borderColor:"#fff",
    borderWidth: 1,
    marginTop: 15,
    height: 40,
    borderRadius: 5,
    color: "#fff",
    paddingHorizontal: 10,
    fontSize: 15
  },
  loginBtn:{
    marginTop: 25,
    backgroundColor: "#fff",
    width: 160,
    height: 40,
    textAlign: 'center',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  eye:{
    position: "absolute",
    right: 10,
    top: 130
  },
  errorTxt:{
    fontSize: 13,
    color: "#D22B2B"
  }
})

export default login
<View style={Styles.loginCont}>
  <Text style={Styles.labelText}>Email</Text>
  <TextInput
    value={userData.email}
    onChangeText={(text) => handleChange(text, "email")}
    style={Styles.input}
  />

  <Text style={Styles.errorTxt}>{errors.emailErr}</Text>

  <Text style={Styles.labelText}>Password</Text>
  <TextInput
    value={userData.password}
    onChangeText={(text) => handleChange(text, "password")}
    secureTextEntry={ispassVisible ? false : true}
    style={Styles.input}
  />
  <Text style={Styles.errorTxt}>{errors.passErr}</Text>
  {ispassVisible ? (
    <EyeOff
      color={"#fff"}
      size={20}
      onPress={() => setisPassVisble((prev) => !prev)}
      style={Styles.eye}
    />
  ) : (
    <Eye
      color={"#fff"}
      size={20}
      onPress={() => setisPassVisble((prev) => !prev)}
      style={Styles.eye}
    />
  )}

  <Text style={Styles.labelText}>First Name</Text>
  <TextInput
    value={userData.firstName}
    onChangeText={(text) => handleChange(text, "firstName")}
    style={Styles.input}
  />

  <Text style={Styles.errorTxt}>{errors.firsrNameErr}</Text>

  <Text style={Styles.labelText}>Last Name</Text>
  <TextInput
    value={userData.lastName}
    onChangeText={(text) => handleChange(text, "lastName")}
    style={Styles.input}
  />

  <Text style={Styles.errorTxt}>{errors.lastNameErr}</Text>

  <Text style={Styles.labelText}>Date of birth</Text>
  <Calendar onPress={() => setisDateVisible(true)} size={30} color={"#fff"}>
    <DateTimePickerModal
      isVisible={isDateVisible}
      onConfirm={(date) => {
        setisDateVisible(false);
        setuserData({ ...userData, dob: date });
        setErrors({ ...errors, dobErr: null });
      }}
      onCancel={() => {
        setisDateVisible(false);
      }}
    />
  </Calendar>
  <TextInput value={date} editable={false} style={Styles.input} />
  <Text style={Styles.errorTxt}>{errors.dobErr}</Text>

  <Text style={Styles.labelText}>Phone Number</Text>
  <TextInput
    value={userData.phoneNo}
    onChangeText={(text) => handleChange(text, "phoneNo")}
    keyboardType="numeric"
    style={Styles.input}
  />
  <Text style={Styles.errorTxt}>{errors.phoneNoErr}</Text>

  {/* log in button */}
  <TouchableOpacity onPress={() => router.push("/")}>
    <Text style={Styles.signUpText}>Already a user? log in</Text>
  </TouchableOpacity>
</View>;

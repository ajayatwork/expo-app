import { View, Text, StyleSheet } from 'react-native';
import React, { useCallback, useState } from 'react';
import { router, useFocusEffect } from 'expo-router';
import { getProfile } from '@/utils/profile';
import { Avatar, Button } from 'react-native-paper';

type ProfileData = {
  profile_pic: string | null,
  first_name: string,
  last_name: string,
  phone_number: string,
  country_code: string,
  email: string,
  dob: Date | string,
  address: string,
};

const ProfileScreen = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  useFocusEffect(
    useCallback(() => {
      (async function getProfileDetails() {
        const res = await getProfile();
        setProfileData(res?.data?.data);
      })();
    }, [])
  );

  if (!profileData) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        {profileData.profile_pic ? (
          <Avatar.Image size={190} source={{ uri: `http://nodemaster.visionvivante.com:4040/${profileData.profile_pic}` }} style={{backgroundColor: "#fff", borderWidth: 1}}/>
        ) : (
          <View style={styles.placeholderAvatar}>
            <Text style={styles.placeholderText}>{profileData?.first_name?.charAt(0)}</Text>
          </View>
        )}
      </View>
      <View style={styles.separator}>
        <View style={styles.rowContainer}>
          <Text style={styles.info}>Name:</Text>
          <Text style={styles.detail}>{profileData.first_name} {profileData.last_name}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.info}>Email:</Text>
          <Text style={styles.detail}>{profileData.email}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.info}>DOB:</Text>
          <Text style={styles.detail}>{new Date(profileData.dob).toDateString()}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.info}>Address:</Text>
          <Text style={styles.detail}>{profileData.address}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.info}>Phone:</Text>
          <Text style={styles.detail}>+{profileData.country_code} {profileData.phone_number}</Text>
        </View>
      </View>
      <Button mode={"contained"} onPress={()=>router.push("/edit-profile")} style={{marginTop: 30}}>
        Edit Profile
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  placeholderAvatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 100,
    color: '#fff',
  },
  separator: {
    marginTop: 25,
    alignItems: 'center',
    width: '100%',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    width: '90%',
  },
  info: {
    fontSize: 18,
    fontWeight: '600',
  },
  detail: {
    fontSize: 18,
  },
});

export default ProfileScreen;

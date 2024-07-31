import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Searchbar, IconButton } from 'react-native-paper';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = (query:string) => setSearchQuery(query);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchbar}
        />
        <IconButton
          icon="magnify"
          size={28}
          onPress={() => console.log('Searching for:', searchQuery)}
          style={styles.icon}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 16,
    alignItems: "center",
    backgroundColor: "#fff"
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  searchbar: {
    flex: 1,
    backgroundColor: "#e8fcf1"
  },
  icon: {
    marginLeft: 8,
  },
});

export default SearchScreen;

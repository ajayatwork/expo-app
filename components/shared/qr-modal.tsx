import { StyleSheet, Text, View ,Modal, Image, Pressable } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'
import { CrossIcon, X } from 'lucide-react-native'

type Props = {
    qrcode: string | undefined,
    showQr: boolean,
    setshowQr: Dispatch<SetStateAction<boolean>>
}

const QrModal = ({qrcode, showQr, setshowQr}: Props) => {
  return (
   <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showQr}
        onRequestClose={() => {
          setshowQr(!showQr);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image source={{uri: qrcode}} width={250} height={250} resizeMode='cover'/>
            <X
              size={30}
              color={'#000'}
              style={styles.button}
              onPress={() => setshowQr(!showQr)}>
            </X>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default QrModal

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    padding: 10,
    position: 'absolute',
    right: 10,
    top: 5
  },
});
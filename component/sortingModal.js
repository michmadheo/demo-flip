import React from 'react';
import {View, Text, TouchableOpacity, Modal} from 'react-native';

function SortingModal(props){

  return(
    <Modal visible={props.modalVisible} transparent={true}>
        <TouchableOpacity onPress={props.actionClose} style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:"rgba(0, 0, 0, 0.2);"}}>
          <View style={{width:'80%', backgroundColor:'white', borderRadius:5, paddingVertical:20}}>
            <TouchableOpacity onPress={props.actionUn} style={button}>
              <View style={sortingStyle}>
                <View style={{backgroundColor:props.sortActive === 0?"#fc6444":'white', height:10, width:10, borderRadius:100}}/>
              </View>
              <Text style={text}>URUTKAN</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.actionAZ} style={button}>
            <View style={sortingStyle}>
                <View style={{backgroundColor:props.sortActive === 1?"#fc6444":'white', height:10, width:10, borderRadius:100}}/>
              </View>
              <Text style={text}>Nama A-Z</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.actionZA} style={button}>
            <View style={sortingStyle}>
                <View style={{backgroundColor:props.sortActive === 2?"#fc6444":'white', height:10, width:10, borderRadius:100}}/>
              </View>
              <Text style={text}>Nama Z-A</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.actionNew} style={button}>
            <View style={sortingStyle}>
                <View style={{backgroundColor:props.sortActive === 3?"#fc6444":'white', height:10, width:10, borderRadius:100}}/>
              </View>
              <Text style={text}>Tanggal Terbaru</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.actionOld} style={button}>
            <View style={sortingStyle}>
                <View style={{backgroundColor:props.sortActive === 4?"#fc6444":'white', height:10, width:10, borderRadius:100}}/>
              </View>
              <Text style={text}>Tanggal Terlama</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
  )
}

const sortingStyle = {
    backgroundColor:'white', 
    borderWidth:2, 
    borderColor:'#fc6444', 
    borderRadius:100, 
    height:20, 
    width:20, 
    justifyContent:'center', 
    alignItems:'center',
}

const button = {
    flexDirection:'row', 
    alignItems:'center', 
    paddingVertical:15,
    paddingLeft:20
}

const text ={
    paddingLeft:10
}

export default SortingModal;

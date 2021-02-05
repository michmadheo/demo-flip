import React from 'react';
import {View, Text, TouchableOpacity, Image, ToastAndroid, Platform} from 'react-native';
import { dateConverter, digitSeparator } from '../functions/function';
import {right, copy, navBack} from '../icons/icons';
import Clipboard from '@react-native-community/clipboard';

function TransactionDetail({route, navigation}){

  const copyId = () =>{
    Clipboard.setString(route.params.item.id);
    if(Platform.OS === 'android'){
      ToastAndroid.showWithGravity(
        "Id berhasil di salin",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }
  }

  return(
    <View style={{
      flex:1, 
      backgroundColor:'#f5f9f8'}}>
      <View style={{backgroundColor:'white', paddingHorizontal:10, paddingTop:20}}>
        <TouchableOpacity style={{width:40,}} onPress={()=>{navigation.goBack()}}>
          <Image source={navBack} style={{
              height:25, 
              width:25,
              marginLeft:5}}/>
        </TouchableOpacity>
      </View>
      <View style={{
        backgroundColor:'white',  
        paddingHorizontal:10}}>
        <View style={{
          paddingVertical:20, 
          flexDirection:'row', 
          paddingHorizontal:20,
          alignItems:'center'}}>
          <Text style={boldText}>ID TRANSAKSI: #{route.params.item.id}</Text>
          <TouchableOpacity onPress={copyId}>
            <Image source={copy} style={{
              height:18, 
              width:18,
              marginLeft:5}}/>
          </TouchableOpacity>
        </View>
        <View style={{
          height:2, 
          backgroundColor:'#f9f9f9'}}/>
        <View style={{
          paddingVertical:20, 
          flexDirection:'row', 
          paddingHorizontal:20}}>
          <View style={{flex:1}}>
            <Text style={boldText}>DETAIL TRANSAKSI</Text>
          </View>
          <TouchableOpacity onPress={()=>{navigation.goBack()}}>
            <Text style={{
              color:"#f5693d"
            }}>Tutup</Text>
          </TouchableOpacity>
        </View>
        <View style={{
          height:2, 
          backgroundColor:'#ededed'}}/>
        <View style={{
          flexDirection:'row', 
          alignItems:'center',
          paddingHorizontal:20,
          paddingTop:10}}>
          <Text style={boldText}>{route.params.item.sender_bank.toUpperCase()}</Text>
          <Image source={right} style={{
            height:14, 
            width:14, 
            marginHorizontal:2}}/>
          <Text style={boldText}>{route.params.item.beneficiary_bank.toUpperCase()}</Text>
        </View>
        <View style={{
          flexDirection:'row', 
          alignItems:'center',
          paddingHorizontal:20,
          paddingTop:10}}>
          <View style={{
            flex:1
          }}>
            <Text style={boldText}>{route.params.item.beneficiary_name.toUpperCase()}</Text>
            <Text>{route.params.item.account_number}</Text>
          </View>
          <View style={{
            flex:0.7
          }}>
            <Text style={boldText}>NOMINAL</Text>
            <Text>Rp{digitSeparator(route.params.item.amount)}</Text>
          </View>
        </View>
        <View style={{
          flexDirection:'row', 
          alignItems:'center',
          paddingHorizontal:20,
          paddingTop:30}}>
          <View style={{
            flex:1
          }}>
            <Text style={boldText}>BERITA TRANSFER</Text>
            <Text>{route.params.item.remark}</Text>
          </View>
          <View style={{
            flex:0.7
          }}>
            <Text style={boldText}>KODE UNIK</Text>
            <Text>{route.params.item.unique_code}</Text>
          </View>
        </View>
        <View style={{
          flexDirection:'row', 
          alignItems:'center',
          paddingHorizontal:20,
          paddingTop:20,
          paddingBottom:20}}>
          <View style={{
            flex:1
          }}>
            <Text style={boldText}>WAKTU DIBUAT</Text>
            <Text>{dateConverter(route.params.item.created_at)}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const boldText ={
  fontWeight:'bold'
}

export default TransactionDetail;

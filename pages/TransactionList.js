import React, {useState} from 'react';
import { useEffect } from 'react';
import {View, Text, TouchableOpacity, TextInput, FlatList, Image} from 'react-native';
import {statusColor, dateConverter, digitSeparator, comparableDate} from '../functions/function';
import SortingModal from '../component/sortingModal';
import {down, right, search} from '../icons/icons';

function TransactionList({route, navigation}){

  const [data, setData] = useState([])
  const [searchValue, setValue] = useState("")
  const [searchedData, setSearched] = useState([])
  const [sortModal, setModal] = useState(false)
  const [sortActive, setSortActive] = useState(0)
  const [refreshing, setRefresh] = useState(false)

  useEffect(()=>{
    getData()
  },[])
  
  async function getData(){
    let data = await fetch('https://nextar.flip.id/frontend-test')
    let items = await data.json()
    sortData(items)
  }

  async function sortData(items){
    let arr = []
    let itemKey = Object.keys(items)
    itemKey.map((item)=>{
      arr.push({
        content: items[item]
      })
    })
    setData(arr)
  }

  function refreshData(){
    setData([])
    setSearched([])
    setValue("")
    setSortActive(0)
    getData()
  }

  async function searchData(search){
    let value = search.toString()
    let arr = []
    data.map((item)=>{
      let filtered = true
      if(item.content.beneficiary_name.toUpperCase().includes(value.toUpperCase()) === true){
        filtered = false
      }
      if(item.content.sender_bank.toUpperCase().includes(value.toUpperCase()) === true){
        filtered = false
      }
      if(item.content.beneficiary_bank.toUpperCase().includes(value.toUpperCase()) === true){
        filtered = false
      }
      if(item.content.amount.toString().toUpperCase().includes(value.toUpperCase()) === true){
        filtered = false
      }
      if(filtered === false){
        arr.push(item)
      }
    })
    setSearched(arr)
  }

  const closeModal =()=>{
    setModal(false)
  }

  function setSorting(option){
    setSortActive(option)
    setModal(false)
  }

  function setSortName(option){
    if(option === 0){
      return "URUTKAN"
    }
    if(option === 1){
      return "Nama A-Z"
    }
    if(option === 2){
      return "Nama Z-A"
    }
    if(option === 3){
      return "Terbaru"
    }
    if(option === 4){
      return "Terlama"
    }
  }

  function sortingResult(option, dataSource){
    if(option === 1){
      let arr = dataSource
      return arr.sort((a, b) => a.content.beneficiary_name.localeCompare(b.content.beneficiary_name))
    }
    if(option === 2){
      let arr = dataSource.sort((a, b) => comparableDate(a.content.created_at)-comparableDate(b.content.created_at)).reverse() //Untuk antisipasi Nama yang sama dengan nominal yang beda, di sort dari yang paling terbaru dulu
      return arr.sort((a, b) => a.content.beneficiary_name.localeCompare(b.content.beneficiary_name)).reverse()
    }
    if(option === 3 || option === 0){
      let arr = dataSource
      return arr.sort((a, b) => comparableDate(a.content.created_at)-comparableDate(b.content.created_at)).reverse()
    }
    if(option === 4){
      let arr = dataSource
      return arr.sort((a, b) => comparableDate(a.content.created_at)-comparableDate(b.content.created_at))
    }
  }

  const status = (status) =>{
    if(status === "SUCCESS"){
      return(
        <View style={{
          backgroundColor:"#55b585", 
          borderRadius:5}}>
          <Text style={{
            color:'white', 
            fontWeight:'bold', 
            paddingVertical:5, 
            paddingHorizontal:10
            }}>Berhasil</Text>
        </View>
      )
    }
    else{
      return(
        <View style={{
          backgroundColor:"white", 
          borderRadius:5, 
          borderWidth:1.5, 
          borderColor:'#f5693d'}}>
          <Text style={{
            paddingVertical:3, 
            fontWeight:'bold', 
            paddingHorizontal:10}}>Pengecekan</Text>
        </View>
      )
    }
  }

  return(
    <View style={{
      flex:1, 
      backgroundColor:'#f5f9f8', 
      paddingHorizontal:5}}>
      <View style={{
        backgroundColor:'white', 
        marginTop:5, 
        marginBottom:5, 
        flexDirection:'row', 
        borderRadius:5, 
        paddingHorizontal:5}}>
        <View style={{
          flex:1, 
          flexDirection:'row', 
          alignItems:'center'}}>
          <Image 
          source={search} 
          style={{
            height:15, 
            width:15, 
            marginLeft:5,
            marginRight:5}}/>
          <TextInput
            placeholder={"Cari nama, bank, atau nominal"}
            value={searchValue}
            onChangeText={(text)=>{
              setSearched([])
              setValue(text)
              searchData(text)
            }}
            style={{paddingRight:30}}
           />
        </View>
        <TouchableOpacity onPress={()=>{setModal(true)}} style={{
          justifyContent:'center', 
          flexDirection:'row', 
          alignItems:'center', 
          paddingRight:5}}>
          <Text style={{
            color:"#eb6c57", 
            fontWeight:'bold'}}>{setSortName(sortActive)}</Text>
          <Image source={down} style={{
            height:15, 
            width:15, 
            marginLeft:5}}/>
        </TouchableOpacity>
      </View>

      <FlatList
        data={searchValue===""?sortingResult(sortActive, data):sortingResult(sortActive, searchedData)}
        onRefresh={()=>{refreshData()}}
        keyExtractor={(item) => item.content.id}
        refreshing={refreshing}
        renderItem={({item})=>{
          return(
            <TouchableOpacity onPress={()=>{navigation.navigate('TransactionDetail', {item:item.content})}} 
            style={{
              backgroundColor:'white', 
              marginBottom:5, 
              flexDirection:'row', 
              borderRadius:5}}>
              <View style={{
                backgroundColor:statusColor(item.content.status), 
                width:5, 
                borderTopStartRadius:5, 
                borderBottomStartRadius:5}}/>
              <View style={{
                flex:1, 
                paddingVertical:10, 
                paddingLeft:20}}>
                <View style={{
                  flexDirection:'row', 
                  alignItems:'center'}}>
                  <Text style={boldText}>{item.content.sender_bank.toUpperCase()}</Text>
                  <Image source={right} style={{
                    height:14, 
                    width:14, 
                    marginHorizontal:2}}/>
                  <Text style={boldText}>{item.content.beneficiary_bank.toUpperCase()}</Text>
                </View>
                <Text>{item.content.beneficiary_name.toUpperCase()}</Text>
                <View style={{
                  flexDirection:'row', 
                  alignItems:'center'}}>
                  <Text>Rp{digitSeparator(item.content.amount)}</Text>
                  <View style={{
                    height:6, 
                    width:6, 
                    borderRadius:100, 
                    backgroundColor:'black', 
                    marginHorizontal:3}}/>
                  <Text>{dateConverter(item.content.completed_at)}</Text>
                  {/* <Text>{dateConverter(item.content.created_at)}</Text> */}
                  {/* Disini tidak dijelaskan untuk tanggal yang di pakai created_at atau completed_at, jadi saya buat dua-duanya. bisa di uncomment dan ditukar. (Karena tanggal pada completed_at
                    sama semua, jadi kalau mau melihat efektivitas sort tanggal bisa pakai yang created_at) */}
                </View>
              </View>
              <View style={{
                justifyContent:'center', 
                paddingRight:20, 
                borderTopEndRadius:5, 
                borderBottomEndRadius:5}}>
                <View>
                  {status(item.content.status)}
                </View>
              </View>
            </TouchableOpacity>
          )
        }}
      />

      <SortingModal //Komponen untuk menampilkan modal yang isinya menu sorting
      modalVisible={sortModal} 
      actionClose={closeModal}
      actionUn={()=>{setSorting(0)}}
      actionAZ={()=>{setSorting(1)}}
      actionZA={()=>{setSorting(2)}}
      actionNew={()=>{setSorting(3)}}
      actionOld={()=>{setSorting(4)}}
      sortActive={sortActive}
      />
    </View>
  )
}

const boldText = {
  fontWeight:'bold'
}

export default TransactionList;

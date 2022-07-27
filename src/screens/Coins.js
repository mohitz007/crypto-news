import React, { useEffect, useState } from "react";
import { FlatList, View,StyleSheet,Text } from "react-native";
import axios from "axios";

import CoinBox from "../components/CoinBox";

const CoinsScreen = () => {


    const [CoinList, setCoinList] = useState([]);

    // console.log(CoinList); 

    useEffect(()=>{
        fetchCoinList();
    },[]);

    const fetchCoinList = () => {
        const options = {
            method: 'GET',
            url: 'https://coinranking1.p.rapidapi.com/coins',
            params: {
              referenceCurrencyUuid: '6mUvpzCc2lFo',
              timePeriod: '24h',
              'tiers[0]': '1',
              orderBy: 'marketCap',
              orderDirection: 'desc',
              limit: '50',
              offset: '0'
            },
            headers: {
              'X-RapidAPI-Key': '7fbbc9eae4msh12aa80237a6bed1p16887djsn61e1634226ad',
              'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
            }
          };
          
          axios.request(options).then(function (response) {

            //   console.log(response.data);
              setCoinList(response.data.data.coins)
          }).catch(function (error) {
              console.error(error);
          });
    }

    return (
        <View>
            <View style={styles.topBar}>
                <Text style={{marginLeft:45}}>Coin Name</Text>
                <Text>Prices(Rupees)</Text>
                <Text >Price change</Text>
            </View>
            {CoinList.length?
            <View style={{paddingBottom:72}}>
                <FlatList 
                showsVerticalScrollIndicator={false}
                data={CoinList}    
                renderItem={({item})=>{
                    
                    // console.log(item);
                    const {name,symbol,iconUrl,price,change} = item;
                    return(
                <View style={styles.card}>
                    <CoinBox name={name} symbol={symbol} price={price} change={change} iconUrl={iconUrl} />
                </View>
            )}}
            />
            </View>
            :null}
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        height:50,
        width:"98%",
        borderTopWidth:1,

    },
    topBar : {
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        height:35,
        alignItems:"center",
        fontWeight:0.5,
        marginBottom:1,
        marginRight:1,
        // borderBottomWidth:1,
    }
})

export default CoinsScreen;
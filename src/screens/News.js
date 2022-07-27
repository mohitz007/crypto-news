import React, { useEffect, useState} from "react";
import axios from "axios";
import { FlatList, View,Text,StyleSheet } from "react-native";

import NewsBox from "../components/NewsBox"

const NewsScreen = () => {


    useEffect(()=>{
        news();
        coinUpdates();
    },[]);

    const [News, setNews] = useState([])
    const [CoinUpdates, setCoinUpdates] = useState({});

    // console.log(CoinUpdates);

    const news = () => {
        const options = {
            method: 'GET',
            url: 'https://bing-news-search1.p.rapidapi.com/news/search',
            params: {textFormat: 'Raw',q: 'crypto',count: 100},
            headers: {
              'X-BingApis-SDK': 'true',
              'X-RapidAPI-Key': '7fbbc9eae4msh12aa80237a6bed1p16887djsn61e1634226ad',
              'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
            }
          };
          
          axios.request(options).then(function (response) {
            //   console.log(response.data.value);
              setNews(response.data.value);
          }).catch(function (error) {
              console.error(error);
          });
    }

    const coinUpdates = () => {
        const options = {
            method: 'GET',
            url: 'https://coinranking1.p.rapidapi.com/stats',
            params: {referenceCurrencyUuid: '6mUvpzCc2lFo'},
            headers: {
              'X-RapidAPI-Key': '7fbbc9eae4msh12aa80237a6bed1p16887djsn61e1634226ad',
              'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
            }
          };
          
          axios.request(options).then(function (response) {
            //   console.log("hi");
              setCoinUpdates(response.data.data);
          }).catch(function (error) {
              console.error(error);
          });
    }


    function nFormatter(num, digits) {
        const lookup = [
          { value: 1, symbol: "" },
          { value: 1e3, symbol: "k" },
          { value: 1e6, symbol: "M" },
          { value: 1e9, symbol: "G" },
          { value: 1e12, symbol: "T" },
          { value: 1e15, symbol: "P" },
          { value: 1e18, symbol: "E" }
        ];
        const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
        var item = lookup.slice().reverse().find(function(item) {
          return num >= item.value;
        });
        return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
      }


    return (
        <View>
            <View style={styles.headerCard}>
                <View style={styles.individualCard}>
                    <Text>Total 24h Volume</Text>
                    <Text>{nFormatter(CoinUpdates.total24hVolume,3)}</Text>
                </View>
                <View style={styles.individualCard}>
                    <Text>Total Coins</Text>
                    <Text>{CoinUpdates.totalCoins}</Text>
                </View>
                <View style={styles.individualCard}>
                    <Text>Total Market Cap</Text>
                    <Text>{nFormatter(CoinUpdates.totalMarketCap,3)}</Text>
                </View>
            </View>
            {News.length?
            <FlatList

             data={News}
             renderItem = {({item})=>{
                // console.log(item,"\n\n");
                const {name,url,image,description,datePublished,provider} = item;
                // console.log(provider[0]);
                return(
                    <View style={styles.card}>
                        <NewsBox name={name} url={url} image={image?.thumbnail.contentUrl} description={description} datePublished={datePublished} provider={provider[0]} />
                    </View>
                )
             }}
            />
            :null}
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius:5,
        height: 300,
        // paddingVertical:10,
        // marginHorizontal:10,
        paddingHorizontal:10,
        shadowColor : "grey",
        elevation:1,
    },
    headerCard: {
        display: "flex",
        flexDirection : "row",
        justifyContent:"space-between",
        alignItems:"center",
        marginHorizontal:10,
        height:100,
        
    },
    individualCard : {
        elevation:2,
        borderColor:"black",
        height:80,
        width:"31%",
        alignItems: "center",
        justifyContent:"center",
        borderRadius:4,
        // fontWeight: "bold",
    }

})

export default NewsScreen;
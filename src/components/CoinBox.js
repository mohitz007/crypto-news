import React from "react";
import { TouchableOpacity, Text,View,StyleSheet } from "react-native";
import Image from 'react-native-remote-svg';

const CoinBox = ({name,symbol,iconUrl,price,change}) => {

    // console.log(name,symbol,iconUrl,price,change);
    iconUrl = iconUrl.split("?")[0];
    // console.log(iconUrl);
    // console.log(iconUrl.split(".").pop().substring(0,3));

    return (
        <TouchableOpacity style={styles.card}>
            <Image source={{uri:iconUrl}} style={styles.image} />
            <View style={styles.name}>
                <Text style={{fontWeight:"bold"}}>{name.length>12?name.substring(0, 12) + "...":name}</Text>
                <Text>{symbol}</Text>
            </View>
            <Text style={styles.price}>{price}</Text>
            <Text style={change[0]==='-'?styles.changeR:styles.changeG}>{change}%</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    name: {
        // borderColor: "black",
        // borderWidth:1,
        width: "28%",
        height: 50,
        justifyContent: 'center',
    },
    price: {
        width: "41%",
    },
    image: {
        height:30,
        width:30,
        // backgroundColor:"red",
    },
    changeR: {
        width: "12%",
        backgroundColor:"#F37878",
        color:"white",
        textAlign:"center",
        borderRadius:5,
    },
    changeG: {
        width: "12%",
        backgroundColor:"#3cb371",
        color:"white",
        textAlign:"center",
        borderRadius:5,
    },
})

export default CoinBox;
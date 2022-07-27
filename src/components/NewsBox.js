import React from "react";
import {Image, Text,View,StyleSheet,TouchableOpacity,Linking} from "react-native";
import moment from "moment";


import altImg from "../images/altImg.jpg"

const NewsBox = ({name,image,description,datePublished,url,provider}) => {

    // console.log(name,image,description,datePublished,url,provider);
    // console.log(provider);

    // console.log(image);
    // console.log(provider)
    return (
        <TouchableOpacity onPress={()=>Linking.openURL(url)} >
            <Image source={image?{uri:image}:altImg} style={styles.image}  />
            <Text style={styles.text}>{name.length>60?name.substring(0, 60) + "...":name}</Text>
            <Text style={styles.description}>{description.length>100?description.substring(0, 100) + "...":description}</Text>
            <View style={styles.provider}>
                {provider.image?<Image source={{uri: provider.image.thumbnail.contentUrl,width:20,height:20 } } />:null}
                <Text> •{provider.name} </Text>
                <Text> • {moment(datePublished).fromNow()} </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    
    image: {
        height:"60%",
        width:"100%",
    },
    text : {
        fontWeight : "bold",
        fontSize : 18,
    },
    description : {
        marginTop:5,
    },
    provider : {
        marginTop:5,
        display : "flex",
        flexDirection : "row",
        // alignContent:"flex-end",
        alignItems:"flex-end",
    }
})

export default NewsBox;
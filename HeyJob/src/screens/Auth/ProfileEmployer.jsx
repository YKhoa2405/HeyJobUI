import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { bgButton1, orange, white } from "../../assets/theme/color";
import { IconButton } from "react-native-paper";
import styleShare from "../../assets/theme/style";
import UIHeader from "../../components/UIHeader";
import Icon from "react-native-vector-icons/Ionicons";



export default function ProfileEmployer() {
    return (
        <View style={styleShare.container}>
            <UIHeader leftIcon={"arrow-back"}
                handleLeftIcon={() => { navigation.goBack() }} />

            <View style={styles.containerTop}>
                <TouchableOpacity style={styleShare.containerAvatar}>
                    <Image source={require('../../assets/images/google.png')} style={styleShare.avatarJob} />
                </TouchableOpacity>
                <Text style={styleShare.titleJobAndName}>UI/UX </Text>
                <View style={{marginVertical:10}}>
                    <View style={styleShare.flexCenter}>
                        <Icon name="cash" size={26} color={bgButton1} />
                        <Text style={{marginLeft:10}}>Mức lương</Text>
                    </View>
                    <View style={[styleShare.flexCenter,{marginTop:10}]}>
                        <Icon name="cash" size={26} color={bgButton1} />
                        <Text style={{marginLeft:10}}>Mức lương</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerTop:{
        alignItems: 'center',
        backgroundColor: white,
        borderRadius: 20,
        marginHorizontal: 20,
        marginTop: 30,
        paddingTop: 45,
        paddingHorizontal: 20
    },

})

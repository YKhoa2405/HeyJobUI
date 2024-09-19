import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import UIHeader from "../../components/UIHeader";
import { WebView } from 'react-native-webview';


export default function VnPayScreen({ navigation, route }) {
    const { url } = route.params
    console.log(url)
    return (
        <View style={{ flex: 1 }}>
            <UIHeader leftIcon={"arrow-back"}
                rightIcon={"ellipsis-horizontal"}
                title={'Thanh toán hóa đơn'}
                handleLeftIcon={() => { navigation.goBack() }} />
            <WebView
                style={{flex:1}}
                source={{ uri: url }}
            />
        </View>
    );
}
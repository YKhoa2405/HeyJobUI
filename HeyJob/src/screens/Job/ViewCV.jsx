import React from "react";
import { View, StyleSheet } from "react-native";
import UIHeader from "../../components/UIHeader";
import styleShare from "../../assets/theme/style";

export default function ViewCV({ navigation, route }) {
    const { cv } = route.params;
    console.log

    return (
        <View style={styleShare.container}>
            <UIHeader
                leftIcon={"arrow-back"}
                rightIcon={"ellipsis-horizontal"}
                title={'Xem lại CV'}
                handleLeftIcon={() => navigation.goBack()}
            />
            <View style={{ flex: 1 }}>
            </View>
        </View>
    );
}


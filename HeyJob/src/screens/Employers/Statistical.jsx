import React from "react";
import { View } from "react-native";
import styleShare from "../../assets/theme/style";
import UIHeader from "../../components/UIHeader";

export default function Statistical({navigation, route}) {
    return (
        <View style={styleShare.container}>
            <UIHeader leftIcon={"arrow-back"}
                handleLeftIcon={() => { navigation.goBack() }}
                title={'Thống kê tuyển dụng'} />
        </View>
    )
}
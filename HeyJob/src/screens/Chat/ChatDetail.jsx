import React, { useContext, useState } from "react";
import { View } from "react-native";
import UIHeader from "../../components/UIHeader";
import MyContext from "../../config/MyContext";

export default function ChatDetail({ route, navigation }) {
    const { chatRoomId } = route.params
    const [user, dispatch] = useContext(MyContext)
    return (
        <View>
            <UIHeader leftIcon={"arrow-back"}
                rightIcon={"ellipsis-horizontal"}
                title={'Tin nhawns'}
                handleLeftIcon={() => { navigation.goBack() }} />
        </View>
    )
}
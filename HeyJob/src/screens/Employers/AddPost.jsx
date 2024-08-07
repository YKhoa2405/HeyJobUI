import React from "react";
import { View } from "react-native";
import styleShare from "../../assets/theme/style";
import UIHeader from "../../components/UIHeader";

export default function AddPost({ navigation,route }) {
    const title = route.params

    return (
        <View style={styleShare.container}>
            <UIHeader leftIcon={"arrow-back"}
                handleLeftIcon={() => { navigation.goBack() }}
                title={title} />
        </View>
    )
}
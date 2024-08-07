import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import styleShare from "../../assets/theme/style";
import UIHeader from "../../components/UIHeader";
import ButtonMain from "../../components/ButtonMain";
import { bgButton1, white } from "../../assets/theme/color";

export default function ChooseRole({ navigation }) {
    return (
        <View style={styleShare.container}>
            <UIHeader leftIcon={"arrow-back"}
                handleLeftIcon={() => { navigation.goBack() }} />
            <View style={styles.containerTop}>
                <Text style={styleShare.titleText}>Chào bạn</Text>
                <Text style={{ marginTop: 10 }}>Để tối ưu tốt nhất cho trải nghiệm của bạn với <Text style={styleShare.titleJobAndName}>HeyJob</Text>,</Text>
                <Text>vui lòng lựa chọn nhóm phù hợp nhất với bạn.</Text>
            </View>
            <View style={styles.containerMain}>
                <View style={styles.optionChoose}>
                    <Image source={require("../../assets/images/division.png")} style={styles.imageChoose} />
                    <TouchableOpacity style={styles.btnChoose}>
                        <Text style={{ color: white, fontWeight: '500' }}>Nhà tuyển dụng</Text>

                    </TouchableOpacity>
                </View>
                <View style={styles.optionChoose}>
                    <Image source={require("../../assets/images/businessman.png")} style={styles.imageChoose} />
                    <TouchableOpacity style={styles.btnChoose}>
                        <Text style={{ color: white, fontWeight: '500' }}>Ứng viên tìm việc</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerTop: {
        marginTop: 40,
        alignItems: 'center',
        marginHorizontal: 20
    },
    containerMain: {
        marginHorizontal: 10,
        marginTop: 60,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    optionChoose: {
        borderWidth: 1.5,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 40,
        flex: 1,
        margin: 10
    },
    imageChoose: {
        width: 100,
        height: 100,
        resizeMode: 'center'
    },
    btnChoose: {
        backgroundColor: bgButton1,
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: 30
    }
})
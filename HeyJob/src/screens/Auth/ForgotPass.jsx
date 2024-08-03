import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import styleShare from "../../assets/theme/style";
import InputMain from "../../components/InputMain";
import { bgButton1, bgButton2, orange, white } from "../../assets/theme/color";
import ButtonMain from "../../components/ButtonMain";
export default function ForgotPass({navigation}) {
    return (
        <View style={styleShare.container}>
            <View style={styles.containerTop}>
                <Text style={styleShare.titleText}>Quên mật khẩu?</Text>
                <Text style={styles.desc}>Để đặt lại mật khẩu, bạn cần email đã đăng ký có thể xác thực,</Text>
                <Image style={styleShare.imageLogin} source={require("../../assets/images/forgotPass.png")} />
            </View>
            <View>
                <Text style={styles.textInput}>Email</Text>
                <InputMain
                    placeholder="Địa chỉ Email đã đăng ký tài khoản" />
            </View>
            <View style={styles.containerFooter}>
                <ButtonMain title={'Đặt lại mật khẩu'}
                    backgroundColor={bgButton1}
                    textColor={white} />
                <ButtonMain title={'Trở về đăng nhập'}
                    backgroundColor={bgButton2}
                    onPress={()=>{navigation.navigate("Login")}}
                    textColor={bgButton1} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerTop: {
        marginTop: 90,
        alignItems: 'center',
    }
    ,
    containerFooter: {
        marginTop: 30
    },
    textInput: {
        fontWeight: 'bold',
        color: bgButton1,
    },
})
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import styleShare from "../../assets/theme/style";
import InputMain from "../../components/InputMain";
import { bgButton1, bgButton2, orange, white } from "../../assets/theme/color";
import ButtonMain from "../../components/ButtonMain";
export default function Login({navigation}) {
    return (
        <View style={styleShare.container}>
            <View style={styles.containerTop}>
                <Text style={styleShare.titleText}>Chào mừng trở lại</Text>
                <Text style={styles.desc}>Đăng nhập tài khoản để tìm kiếm công việc mở ước,</Text>
                <Text>công việc theo chuyên môn và nhiều hơn thế nữa</Text>
            </View>
            <View style={styles.containerMain}>
                <Text style={styles.textInput}>Email</Text>
                <InputMain
                    placeholder="Email"
                />
                <Text style={styles.textInput}>Mật khẩu</Text>
                <InputMain
                    placeholder="Mật khẩu"
                    isPassword={true}
                />
                <View style={{ alignItems: "flex-end" }}>
                    <TouchableOpacity onPress={()=>{navigation.navigate("ForgotPass")}}>
                        <Text style={styles.textInput}>Quên mật khẩu ?</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.containerFooter}>
                <ButtonMain title={'Đăng nhập'}
                    backgroundColor={bgButton1}
                    textColor={white} />
                <View style={styleShare.lineContainer}>
                    <View style={styleShare.line}></View>
                    <Text style={styleShare.lineText}>hoặc đăng nhập bằng</Text>
                    <View style={styleShare.line}></View>
                </View>
                <TouchableOpacity style={styles.optionLoginContainer}>
                    <Image source={require('../../assets/images/google.png')} style={styles.optionImage} />
                </TouchableOpacity>
                <View style={styleShare.flexCenter}>
                    <Text>Bạn chưa có tài khoản ? </Text>
                    <TouchableOpacity onPress={()=>{navigation.navigate("Register")}}><Text style={{ fontWeight: '500', color: orange }} onPress={() => navigation.navigate('Register')}>Đăng ký ngay</Text></TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerTop: {
        marginTop: 90,
        alignItems: 'center',
    }
    , containerMain: {
        marginTop: 30
    },
    containerFooter: {
        marginTop: 30
    }
    , desc: {
        marginTop: 20
    }, textInput: {
        fontWeight: 'bold',
        color: bgButton1,
        marginTop: 15
    },
    optionLoginContainer: {
        alignItems: 'center'
    },
    optionImage: {
        width: 40,
        height: 40,
        marginTop: 10,
        marginBottom:40
    }
})
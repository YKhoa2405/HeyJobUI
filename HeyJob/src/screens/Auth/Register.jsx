import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import styleShare from "../../assets/theme/style";
import InputMain from "../../components/InputMain";
import { bgButton1, bgButton2, orange, white } from "../../assets/theme/color";
import ButtonMain from "../../components/ButtonMain";
export default function Register({navigation}) {
    return (
        <View style={[styleShare.container,{marginHorizontal:20}]}>
            <View style={styles.containerTop}>
                <Text style={styleShare.titleText}>Đăng ký tài khoản</Text>
                <Text style={styles.desc}>Đăng ký tài khoản để tìm kiếm công việc mở ước,</Text>
                <Text>công việc theo chuyên môn và nhiều hơn thế nữa</Text>
            </View>
            <View style={styles.containerMain}>
                <Text style={styles.textInput}>Họ và tên</Text>
                <InputMain
                    placeholder="Họ và tên"
                />
                <Text style={styles.textInput}>Email</Text>
                <InputMain
                    placeholder="Email"
                />
                <Text style={styles.textInput}>Mật khẩu</Text>
                <InputMain
                    placeholder="Mật khẩu"
                    isPassword={true}
                />
                <Text style={styles.textInput}>Nhập lại mật khẩu</Text>
                <InputMain
                    placeholder="Nhập lại mật khẩu"
                    isPassword={true}
                />
            </View>
            <View style={styles.containerFooter}>
                <ButtonMain title={'Đăng ký'}
                    backgroundColor={bgButton1}
                    textColor={white} />
                <View style={[styleShare.flexCenter,{marginTop:30}]}>
                    <Text>Bạn đã có tài khoản ? </Text>
                    <TouchableOpacity><Text style={{ fontWeight: '500', color: orange }} onPress={() => navigation.navigate('Login')}>Đăng nhập ngay</Text></TouchableOpacity>
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
})
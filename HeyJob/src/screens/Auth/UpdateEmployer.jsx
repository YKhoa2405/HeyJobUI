import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import styleShare from "../../assets/theme/style";
import UIHeader from "../../components/UIHeader";
import InputMain from "../../components/InputMain";
import { bgButton1, grey, orange, white } from "../../assets/theme/color";
import ButtonMain from "../../components/ButtonMain";
import { ToastMess } from "../../components/ToastMess";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApi, endpoints } from "../../config/API";

export default function UpdateEmployer({ navigation }) {
    const [companyName, setCompanyName] = useState('')
    const [website, setWebsite] = useState('')
    const [size, setSize] = useState(null)
    const [address, setAddress] = useState('')
    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(false);

    const validateUrl = (url) => {
        const urlPattern = new RegExp(
            '^(https?:\\/\\/)?' + // http or https
            '((([a-zA-Z0-9$-_@.&+!*"(),;]|[0-9])+)+\\.)' + // domain name
            '([a-zA-Z]{2,})' + // top-level domain (e.g., .com, .vn)
            '(\\/[a-zA-Z0-9$-_@.&+!*"(),;=]*)*' + // path (optional)
            '(\\?[a-zA-Z0-9-_@.&+!*"(),;=]*)?' // query string (optional)
        );

        return urlPattern.test(url);
    };

    const handleUpdateEmployer = async () => {
        if (!companyName || !website || !size || !address || !description) {
            ToastMess({ type: 'error', text1: 'Vui lòng không để trống các trường.' });
            return;
        }
        if (!validateUrl(website)) {
            ToastMess({ type: 'error', text1: 'Đường dẫn website công ty không hợp lệ.' });
            return;
        }

        setLoading(true)

        let form = new FormData();
        form.append('company_name', companyName);
        form.append('website', website);
        form.append('size', size);
        form.append('address', address);
        form.append('description', description);

        console.log(form)

        const token = await AsyncStorage.getItem("access-token");
        console.log(token)

        // Gửi request đến API
        try {
            const res = await authApi(token).patch(endpoints['update_employer'], form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            console.log('Response:', res.data);
            ToastMess({ type: 'success', text1: 'Cập nhật thông tin thành công.' });

        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        }

    }


    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styleShare.container}>
                <UIHeader title={'Cập nhật thông tin công ty'}
                    leftIcon={"arrow-back"}
                    handleLeftIcon={() => { navigation.goBack() }} />
                <View style={styles.containerMain}>
                    <Text style={styles.textInput}>Tên công ty</Text>
                    <InputMain
                        placeholder="Tên công ty"
                        onChangeText={setCompanyName}

                    />
                    <Text style={styles.textInput}>Website</Text>
                    <InputMain
                        placeholder="https://www.heyjob.vn"
                        onChangeText={setWebsite}
                        autoCapitalize="none"
                    />

                    <Text style={styles.textInput}>Quy mô công ty</Text>
                    <InputMain
                        placeholder="Số lượng nhân viên của công ty"
                        onChangeText={(text) => {
                            // Loại bỏ tất cả ký tự không phải số
                            const numericValue = text.replace(/[^0-9]/g, '');
                            setSize(numericValue);
                        }}
                        autoCapitalize="none"
                        keyboardType="numeric"
                    />

                    <Text style={styles.textInput}>Địa chỉ công ty</Text>
                    <View>
                        <InputMain
                            placeholder="Địa chỉ công ty"
                            onChangeText={setAddress}
                        />
                    </View>

                    <Text style={styles.textInput}>Giới thiệu về công ty</Text>
                    <TextInput
                        placeholder="Mô tả về công ty"
                        onChangeText={setDescription}
                        style={styles.introduceInput}
                        multiline={true}
                        numberOfLines={9}
                        textAlignVertical="top"
                    />
                    {loading ? (
                        <ActivityIndicator color={orange} size={'large'} />
                    ) : (
                        <ButtonMain title={'Cập nhật'} backgroundColor={bgButton1} textColor={white} onPress={() => handleUpdateEmployer()} />
                    )}
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    containerMain: {
        marginHorizontal: 20
    },
    textInput: {
        fontWeight: 'bold',
        color: bgButton1,
        marginTop: 15
    },
    introduceInput: {
        borderRadius: 20,
        marginTop: 10,
        marginBottom: 30,
        padding: 10,
        backgroundColor: white
    }
})
import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, StyleSheet, TouchableWithoutFeedback, Image, ActivityIndicator, FlatList, TouchableOpacity, Linking, Alert } from "react-native";
import styleShare from "../../assets/theme/style";
import UIHeader from "../../components/UIHeader";
import Icon from "react-native-vector-icons/Ionicons"
import moment from "moment";
import 'moment/locale/vi';
import { bgButton1, bgButton2, grey, orange, white } from "../../assets/theme/color";
import { authApi, endpoints } from "../../config/API";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CVApply({ navigation }) {
    const [cv, setCv] = useState([]);
    const [loading, setLoading] = useState(true);
    moment.locale('vi');

    const handleOpenEmail = (email) => {
        Linking.openURL(`mailto:${email}`).catch(err => console.error("Failed to open email:", err));
    };

    const handleOpenCv = (url) => {
        Linking.openURL(url).catch(err => console.error("Failed to open URL:", err));
    }

    useEffect(() => {
        fetchApplicationCV()
    }, []);
    const fetchApplicationCV = async () => {
        try {
            const token = await AsyncStorage.getItem("access-token");
            const res = await authApi(token).get(endpoints['apply_list']);
            setCv(res.data);
            console.log(res.data);
        } catch (error) {
            console.error("Error fetching jobs:", error);
        } finally {
            setLoading(false);
        }
    };





    const renderItem = ({ item }) => {
        return (
            <TouchableWithoutFeedback>
                <View style={styles.jobItemContainer}>
                    <View style={styleShare.flexBetween}>
                        <Text style={styleShare.titleJobAndName}>{item.job.title}</Text>
                        <View style={styleShare.flexCenter}>
                            {/* <TouchableOpacity onPress={() => handleUpdateStatus(item.id, 'OPEN')}>
                                <Icon name="checkmark-circle-sharp" size={24} color={'green'}></Icon>
                            </TouchableOpacity> */}
                        </View>
                    </View>
                    <View style={{ marginTop: 5 }}>
                        <TouchableOpacity onPress={() => handleOpenEmail(item.seeker_info.email)}>
                            <Text>Email: {item.email}</Text>

                        </TouchableOpacity>
                        <Text>Họ và  tên: {item.name}</Text>
                        <Text>Số điện thoại: {item.phone}</Text>
                    </View>
                    <View style={styleShare.flexBetween}>
                        <View style={styleShare.flexCenter}>
                            <Icon name="time" size={22} color={'grey'} style={{ marginRight: 5 }} />
                            <Text>{moment(item.created_at).format('DD/MM/YYYY')}</Text>
                        </View>
                        <Text style={[styleShare.titleJobAndName, { color: 'green' }]}>
                            Đã đồng ý
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => handleOpenCv(item.cv)}>
                        <View style={[styleShare.buttonDetailApply, { marginTop: 10 }]}>
                            <Icon name="document-outline" size={22} />
                            <Text style={{ marginLeft: 5 }}>Xem CV ứng viên</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </TouchableWithoutFeedback>
        )
    };

    if (loading) {
        return <ActivityIndicator style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} size="large" color='orange' />;
    }

    return (
        <View style={styleShare.container}>
            <UIHeader leftIcon={"arrow-back"}
                rightIcon={"ellipsis-horizontal"}
                title={'CV tiếp nhận'}
                handleLeftIcon={() => { navigation.goBack() }} />
            <FlatList
                data={cv}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                ListEmptyComponent={
                    <View style={{ marginTop: 50, alignItems: 'center' }}>
                        <Image source={require("../../assets/images/save.png")} style={styleShare.imageNullData} />
                        <Text style={styleShare.textMainOption}>Chưa có đơn ứng tuyển nào </Text>
                        <Text style={{ padding: 20, textAlign: 'center' }}>Bạn chưa có đơn ứng tuyển nào gần đây, hãy đăng bài tuyển dụng để tìm kiếm ứng viên tìm năng</Text>
                    </View>
                }
                contentContainerStyle={{ paddingBottom: 40, paddingTop: 10 }}
            />



        </View>
    )
}

const styles = StyleSheet.create({
    jobItemContainer: {
        backgroundColor: white,
        borderRadius: 20,
        padding: 15,
        backgroundColor: white,
        marginTop: 15,
        marginHorizontal: 20
    },

    technologyContainer: {
        // Container chứa các Chip công nghệ
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10
    },
})
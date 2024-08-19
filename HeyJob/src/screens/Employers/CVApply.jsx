import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, StyleSheet, TouchableWithoutFeedback, Image, ActivityIndicator, FlatList, TouchableOpacity, Linking } from "react-native";
import styleShare from "../../assets/theme/style";
import UIHeader from "../../components/UIHeader";
import Icon from "react-native-vector-icons/Ionicons"
import moment from "moment";
import 'moment/locale/vi';
import { Chip } from "react-native-paper";
import { bgButton1, bgButton2, grey, orange, white } from "../../assets/theme/color";
import { authApi, endpoints } from "../../config/API";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ReusableModal from "../../components/ReusableModal ";

export default function CVApply({ navigation }) {
    const [modalVisible, setModalVisible] = useState({
        statusCV: false,
    });
    const statusOption = ['Chấp nhận', 'Từ chối'];

    const mockData = [
        {
            id: 1,
            job_title: "UX/UI 1223",
            seeker_info: {
                id: 3,
                email: "Ungvien@gmail.com",
                username: "UngVien"
            },
            status: "PENDING",
            created_at: "2024-08-15T09:22:36.088055Z",
            cover_letter: "hahahahah",
            cv: "image/upload/v1723713759/kte8cuojphdvrqio92zz.pdf"
        }
    ];
    const [cv, setCv] = useState([]);
    const [selectStatus, setSelectStatus] = useState('')
    const [loading, setLoading] = useState(true);
    moment.locale('vi');

    const handleOpenEmail = (email) => {
        Linking.openURL(`mailto:${email}`).catch(err => console.error("Failed to open email:", err));
    };

    const handleStatusCVSelect = (statusCV) => {
        setSelectStatus(statusCV)
        setModalVisible({ ...modalVisible, statusCV: false });
        console.log(selectStatus)
    };

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

    useEffect(() => {
        fetchApplicationCV()
    }, []);

    const renderItem = ({ item }) => {
        const getStatusInfo = (status) => {
            switch (status) {
                case 'PENDING':
                    return { text: 'Chờ xử lý', style: { color: bgButton1 } }; // Màu cho trạng thái chờ xử lý
                case 'CLOSED':
                    return { text: 'Đã từ chối', style: { color: 'red' } }; // Màu cho trạng thái đã từ chối
                case 'OPEN':
                    return { text: 'Đã đồng ý', style: { color: 'green' } }; // Màu cho trạng thái đã đồng ý
                default:
                    return { text: 'Trạng thái không xác định', style: { color: 'gray' } }; // Màu cho trạng thái không xác định
            }
        };
        const statusInfo = getStatusInfo(item.status);
        return (
            <TouchableWithoutFeedback>
                <View style={styles.jobItemContainer}>
                    <View style={styleShare.flexBetween}>
                        <Text style={styleShare.titleJobAndName}>{item.job_title}</Text>
                        <TouchableOpacity onPress={() => setModalVisible({ ...modalVisible, statusCV: true })}>
                            <Icon name="layers" size={24} color={orange}></Icon>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginBottom: 15, marginTop: 5 }}>
                        <Text style={styleShare.titleJobAndName}>Thông tin ứng viên:</Text>
                        <TouchableOpacity onPress={() => handleOpenEmail(item.seeker_info.email)}>
                            <Text style={styles.seekerInfo}>Ứng viên: {item.seeker_info.username} ({item.seeker_info.email})</Text>
                        </TouchableOpacity>
                        <Chip style={{
                            alignSelf: 'flex-start',
                            backgroundColor: grey,
                            marginTop: 5
                        }}>
                            Hồ sơ ứng viên
                        </Chip>
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={styleShare.titleJobAndName}>Thư giới thiệu:</Text>
                        <Text>{item.cover_letter}</Text>
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={styleShare.titleJobAndName}>CV:</Text>
                        <Text>{item.cover_letter}</Text>
                    </View>
                    <View style={styleShare.flexBetween}>
                        <Text>Ứng tuyển lúc: {moment(item.created_at).format('DD/MM/YYYY')}</Text>

                        <Text style={[styleShare.titleJobAndName, statusInfo.style]}>
                            {statusInfo.text}
                        </Text>
                    </View>
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
            <ReusableModal
                visible={modalVisible.statusCV}
                onClose={() => setModalVisible({ ...modalVisible, statusCV: false })}
                title="Chọn mức lương"
                data={statusOption}
                selectedItems={selectStatus ? [selectStatus] : []}
                onItemPress={handleStatusCVSelect}
                onComplete={() => setModalVisible({ ...modalVisible, statusCV: false })}
                singleSelect={true}
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
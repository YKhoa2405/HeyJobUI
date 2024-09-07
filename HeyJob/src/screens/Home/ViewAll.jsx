import React, { useContext, useEffect, useState } from "react";
import { View, ScrollView, Text, StyleSheet, TouchableWithoutFeedback, Image, ActivityIndicator, FlatList, TouchableOpacity, Alert } from "react-native";
import styleShare from "../../assets/theme/style";
import UIHeader from "../../components/UIHeader";
import Icon from "react-native-vector-icons/Ionicons"
import moment from "moment";
import 'moment/locale/vi';
import { Avatar, Chip } from "react-native-paper";
import { bgButton1, bgButton2, orange, white } from "../../assets/theme/color";
import { authApi, endpoints } from "../../config/API";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastMess } from "../../components/ToastMess";
import MyContext from "../../config/MyContext";

export default function ViewAll({ navigation, route }) {
    const { title, api } = route.params;
    console.log(api)
    const [loading, setLoading] = useState(true);
    const [jobs, setJobs] = useState([])
    useEffect(() => {
        fetchJob()
    }, [])

    const fetchJob = async () => {
        const token = await AsyncStorage.getItem("access-token");
        const res = await authApi(token).get(endpoints[api]);
        setJobs(res.data)
        console.log(res.data)
        setLoading(false)
    }

    const handleSaveJob = async (jobId) => {
        try {
            const token = await AsyncStorage.getItem("access-token");
            await authApi(token).post(endpoints['save_job'], { job_id: jobId });
            ToastMess({ type: 'success', text1: 'Lưu việc làm thành công.' });


        } catch (error) {
            console.error("Lỗi khi lưu công việc:", error);
            ToastMess({ type: 'error', text1: 'Không thể lưu công việc. Vui lòng thử lại.' });
        }
        fetchJob()
    }

    const renderItem = ({ item }) => {
        return (
            <TouchableWithoutFeedback key={item.id} onPress={() => { navigation.navigate('JobDetail', { jobId: item.id }) }}>
                <View style={styles.jobItemContainer}>
                    {item.is_saved ?
                        <View style={styles.btnSave}>
                            <Icon name="bookmark" size={26} color={orange} />
                        </View> :
                        <TouchableOpacity style={styles.btnSave} onPress={() => handleSaveJob(item.id)}>
                            <Icon name="bookmark-outline" size={26} />
                        </TouchableOpacity>
                    }
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={styles.containerAvatarJob}>
                            <Avatar.Image source={{ uri: item.employer.avatar }} size={36} style={{ backgroundColor: 'white' }} />
                        </View>
                        <View>
                            <Text style={styleShare.titleJobAndName}>{item.title}</Text>
                            <Text style={{ marginTop: 5 }}>{item.employer.employer.company_name}</Text>
                        </View>
                    </View>
                    <View style={styleShare.technologyContainer}>
                        <Chip style={styleShare.chip}>{item.location}</Chip>
                        <Chip style={styleShare.chip}>{`${item.salary} VND`}</Chip>
                        <Chip style={styleShare.chip}>{item.experience}</Chip>
                        {item.technologies.map((tech, index) => (
                            <Chip key={index} style={styleShare.chip}>
                                {tech.name}
                            </Chip>
                        ))}
                    </View>
                    <View style={styleShare.flexBetween}>
                        <View style={styleShare.flexCenter}>
                            <Icon name="time" size={22} color={'grey'} style={{ marginRight: 5 }} />
                            <Text>{moment(item.expiration_date).format('DD/MM/YYYY')}</Text>
                        </View>
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
                title={title}
                handleLeftIcon={() => { navigation.goBack() }} />
            <FlatList
                data={jobs}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                ListEmptyComponent={
                    <View style={{ marginTop: 50, alignItems: 'center' }}>
                        <Image source={require("../../assets/images/save.png")} style={styleShare.imageNullData} />
                        <Text style={styleShare.textMainOption}>Không có việc làm nào </Text>
                        <Text style={{ padding: 20, textAlign: 'center' }}>Không có việc làm nào phù hợp, vui lòng quay lại kiểm ra sau này</Text>
                    </View>
                }
                contentContainerStyle={{ paddingBottom: 40, paddingTop: 10 }}
                ListFooterComponent={
                    <View style={{ alignItems: 'center', marginVertical: 20 }}>
                        <TouchableOpacity onPress={() => { /* Xử lý khi nhấn vào "Xem thêm" */ }}>
                            <Text style={{ color: bgButton1, fontSize: 16, fontWeight: '500' }}>Xem thêm</Text>
                        </TouchableOpacity>
                    </View>}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    jobItemContainer: {
        backgroundColor: white,
        borderRadius: 20,
        padding: 20,
        backgroundColor: white,
        marginTop: 15,
        marginHorizontal: 20
    },

    technologyContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10
    },
    containerAvatarJob: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: bgButton2,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15
    },
    btnSave: {
        position: 'absolute',
        top: 20,
        right: 20,
        opacity: 0.8,
        zIndex: 999
    },
})
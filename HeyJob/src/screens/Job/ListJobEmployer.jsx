import React, { useContext, useEffect, useState } from "react";
import { View, ScrollView, Text, StyleSheet, TouchableWithoutFeedback, Image, ActivityIndicator, FlatList, TouchableOpacity, Alert } from "react-native";
import styleShare from "../../assets/theme/style";
import UIHeader from "../../components/UIHeader";
import Icon from "react-native-vector-icons/Ionicons"
import moment from "moment";
import 'moment/locale/vi';
import { Chip } from "react-native-paper";
import { bgButton2, orange, white } from "../../assets/theme/color";
import { authApi, endpoints } from "../../config/API";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastMess } from "../../components/ToastMess";
import MyContext from "../../config/MyContext";

export default function ListJobEmployer({ navigation }) {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [jobState, dispatchJob] = useContext(MyContext);

    moment.locale('vi');

    const fetchJobEmployer = async () => {
        try {
            const token = await AsyncStorage.getItem("access-token");
            const res = await authApi(token).get(endpoints['job_employer']);
            setJobs(res.data);
            console.log(res.data);
        } catch (error) {
            console.error("Error fetching jobs:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobEmployer(); // Gọi hàm fetch khi component mount
    }, []);

    const handleDeleteJob = async (jobId) => {
        Alert.alert(
            "Xóa tin tuyển dụng",
            "Bạn có chắc muốn xóa tin tuyển dụng này?",
            [
                {
                    text: "Hủy",
                    style: "cancel"
                },
                {
                    text: "Xóa",
                    onPress: async () => {
                        try {
                            const token = await AsyncStorage.getItem("access-token");
                            await authApi(token).delete(endpoints['jobs_detail'](jobId));
                            ToastMess({ type: 'success', text1: 'Xóa tin tuyển dụng thành công.' });
                            dispatchJob({ type: 'DELETE_JOB_SUCCESS', payload: jobId });

                        } catch (error) {
                            console.log(error)
                        }
                    },
                    style: "destructive"
                }
            ],
            { cancelable: true }
        );
    };

    const renderItem = ({ item }) => {
        return (
            <TouchableWithoutFeedback onPress={() => navigation.navigate('JobDetail', { jobId: item.id })}>
                <View style={styles.jobItemContainer}>
                    <View style={styleShare.flexBetween}>
                        <Text style={styleShare.titleJobAndName}>{item.title}</Text>
                        <View style={styleShare.flexCenter}>
                            <TouchableOpacity style={{ zIndex: 999 }} onPress={() => handleDeleteJob(item.id)}>
                                <Icon name="trash-outline" size={24} color={'red'} />
                            </TouchableOpacity>

                            {/* <TouchableOpacity style={{ zIndex: 999 }}>
                                <Icon name="lock-closed" size={24} color={'green'} />
                            </TouchableOpacity> */}
                        </View>
                    </View>
                    <Text style={styleShare.textAlign}>{item.location}</Text>
                    <Text style={styleShare.textAlign}>{item.salary}</Text>
                    <View style={styles.technologyContainer}>
                        {item.technologies.map((tech, index) => (
                            <Chip key={index} style={styleShare.chip}>
                                {tech.name}
                            </Chip>
                        ))}
                    </View>
                    <View style={styleShare.flexBetween}>
                        <View>
                            <Text>Đã đăng {moment(item.created_at).fromNow()}</Text>
                            <Text>Hết hạn vào {moment(item.expiration_date).format('DD/MM/YYYY')}</Text>
                        </View>
                        <View>
                            <Text style={[styleShare.titleJobAndName, { color: orange }]}>Hết hạn</Text>
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
                title={'Chiến dịch tuyển dụng'}
                handleLeftIcon={() => { navigation.goBack() }} />
            <FlatList
                data={jobs}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                ListEmptyComponent={
                    <View style={{ marginTop: 50, alignItems: 'center' }}>
                        <Image source={require("../../assets/images/save.png")} style={styleShare.imageNullData} />
                        <Text style={styleShare.textMainOption}>Bạn chưa có bài tuyển dụng nào</Text>
                        <Text style={{ padding: 20, textAlign: 'center' }}>Bạn không có bất kỳ bài tuyển dụng nào, hãy đăng bài tuyển dụng để tìm kiếm ứng viên tiềm năng</Text>
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
        padding: 20,
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
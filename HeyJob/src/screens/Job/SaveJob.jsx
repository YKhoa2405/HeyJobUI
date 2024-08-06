import React from "react";
import { View, ScrollView, Text, StyleSheet, TouchableWithoutFeedback, Image } from "react-native";
import styleShare from "../../assets/theme/style";
import UIHeader from "../../components/UIHeader";
import Icon from "react-native-vector-icons/Ionicons"
import { Chip } from "react-native-paper";
import { bgButton2, white } from "../../assets/theme/color";

export default function SaveJob({navigation}) {
    const jobSave = [
        // {
        //     id: 1,
        //     image: 'https://example.com/image1.png',
        //     title: 'Kỹ sư phần mềm',
        //     company: {
        //         name: 'Công ty A',
        //         location: 'Hà Nội, Việt Nam',
        //     },
        //     experience: '2-3 năm',
        //     salary: {
        //         min: 1000,
        //         max: 1500,
        //     },
        // },
        // {
        //     id: 2,
        //     image: 'https://example.com/image2.png',
        //     title: 'Chuyên viên phân tích dữ liệu',
        //     company: {
        //         name: 'Công ty B',
        //         location: 'TP. Hồ Chí Minh, Việt Nam',
        //     },
        //     experience: '1-2 năm',
        //     salary: {
        //         min: 800,
        //         max: 1200,
        //     },
        // },
        // {
        //     id: 3,
        //     image: 'https://example.com/image3.png',
        //     title: 'Quản lý dự án',
        //     company: {
        //         name: 'Công ty C',
        //         location: 'Đà Nẵng, Việt Nam',
        //     },
        //     experience: '5+ năm',
        //     salary: {
        //         min: 1500,
        //         max: 2000,
        //     },
        // },
        // {
        //     id: 4,
        //     image: 'https://example.com/image4.png',
        //     title: 'Nhân viên kinh doanh',
        //     company: {
        //         name: 'Công ty D',
        //         location: 'Cần Thơ, Việt Nam',
        //     },
        //     experience: '1-2 năm',
        //     salary: {
        //         min: 700,
        //         max: 1000,
        //     },
        // },
        // {
        //     id: 5,
        //     image: 'https://example.com/image5.png',
        //     title: 'Thiết kế đồ họa',
        //     company: {
        //         name: 'Công ty E',
        //         location: 'Hải Phòng, Việt Nam',
        //     },
        //     experience: '2-3 năm',
        //     salary: {
        //         min: 900,
        //         max: 1300,
        //     },
        // },
    ];
    return (
        <View style={styleShare.container}>
            <UIHeader leftIcon={"arrow-back"}
                rightIcon={"ellipsis-horizontal"}
                title={'Việc làm đã lưu'}
                handleLeftIcon={() => { navigation.goBack() }} />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40, paddingTop: 10 }}>
                <View>
                    {jobSave.length === 0 ? (
                        <View style={{marginTop: 50, alignItems:'center'}}>
                            <Image source={require("../../assets/images/save.png")} style={styleShare.imageNullData} />
                            <Text style={styleShare.textMainOption}>Bạn chưa lưu việc làm nào</Text>
                            <Text style={{padding:20, textAlign:'center'}}>Bạn không có bất kỳ công việc nào được lưu, vui lòng tìm kiếm để lưu công việc </Text>
                        </View>
                    ) : (
                        jobSave.map((item) => (
                            <TouchableWithoutFeedback key={item.id} onPress={() => { navigation.navigate('JobDetail', { jobId: item.id }) }}>
                                <View style={styles.jobItemContainer}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={styles.containerAvatarJob}>
                                            <Image source={require('../../assets/images/google.png')} style={styles.avatarJob} />
                                        </View>
                                        <View>
                                            <Text style={styleShare.titleJobAndName}>{item.title}</Text>
                                            <Text style={{ marginTop: 5 }}>{item.company.name}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.infoJobContainer}>
                                        <View>
                                            <Chip style={styleShare.chip}>{item.company.location}</Chip>
                                            <Chip style={styleShare.chip}>{`${item.salary.min} - ${item.salary.max} VND`}</Chip>
                                        </View>
                                        <View>
                                            <Chip style={styleShare.chip}>{item.experience}</Chip>
                                        </View>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        ))
                    )}
                </View>
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    jobItemContainer: {
        backgroundColor: white,
        borderRadius: 20,
        padding: 20,
        backgroundColor: white,
        marginTop: 15
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
    avatarJob: {
        width: 30,
        height: 30
    },
    infoJobContainer: {
        paddingTop: 20,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'center'
    }
})
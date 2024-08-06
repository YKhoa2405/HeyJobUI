import React from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image, FlatList, TouchableWithoutFeedback, ScrollView } from "react-native";
import styleShare from "../../assets/theme/style";
import { bgButton1, bgButton2, grey, orange, white } from "../../assets/theme/color";
import Icon from "react-native-vector-icons/Ionicons"
import { Chip, Searchbar } from "react-native-paper";

export default function Home({ navigation }) {
    const dataJob = [
        {
            id: 1,
            image: 'https://example.com/image1.png',
            title: 'Kỹ sư phần mềm',
            company: {
                name: 'Công ty A',
                location: 'Hà Nội, Việt Nam',
            },
            experience: '2-3 năm',
            salary: {
                min: 1000,
                max: 1500,
            },
        },
        {
            id: 2,
            image: 'https://example.com/image2.png',
            title: 'Chuyên viên phân tích dữ liệu',
            company: {
                name: 'Công ty B',
                location: 'TP. Hồ Chí Minh, Việt Nam',
            },
            experience: '1-2 năm',
            salary: {
                min: 800,
                max: 1200,
            },
        },
        {
            id: 3,
            image: 'https://example.com/image3.png',
            title: 'Quản lý dự án',
            company: {
                name: 'Công ty C',
                location: 'Đà Nẵng, Việt Nam',
            },
            experience: '5+ năm',
            salary: {
                min: 1500,
                max: 2000,
            },
        },
        {
            id: 4,
            image: 'https://example.com/image4.png',
            title: 'Nhân viên kinh doanh',
            company: {
                name: 'Công ty D',
                location: 'Cần Thơ, Việt Nam',
            },
            experience: '1-2 năm',
            salary: {
                min: 700,
                max: 1000,
            },
        },
        {
            id: 5,
            image: 'https://example.com/image5.png',
            title: 'Thiết kế đồ họa',
            company: {
                name: 'Công ty E',
                location: 'Hải Phòng, Việt Nam',
            },
            experience: '2-3 năm',
            salary: {
                min: 900,
                max: 1300,
            },
        },
    ];



    return (
        <View style={styleShare.container}>
            <View style={styles.headerTop}>
                <TouchableOpacity onPress={() => navigation.navigate('JobSearch')} style={styleShare.searchComponent}>
                    <Searchbar
                        placeholder="Tìm kiếm công việc..."
                        editable={false} />
                </TouchableOpacity>

                <View style={styleShare.buttonSave}>
                    <Icon name="map" color={orange} size={24} />
                </View>
            </View>
            <ScrollView style={styles.headerMain} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 60 }}>
                <View>
                    <View style={styleShare.flexBetween}>
                        <Text style={styleShare.textMainOption}>Gợi ý công việc</Text>
                        <TouchableOpacity style={styleShare.textMainOption}>
                            <Text style={styleShare.lineText}>Xem tất cả</Text>
                        </TouchableOpacity>

                    </View>
                    {dataJob.map((item) => (
                        <TouchableWithoutFeedback key={item.id} onPress={() => { navigation.navigate('JobDetail', { jobId: item.id }) }}>
                            <View style={styles.jobItemContainer}>
                                <View style={styles.btnSave}>
                                    <Icon name="bookmark-outline" size={26} />
                                </View>
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
                    ))}

                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom: 10,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        backgroundColor: bgButton1
    },
    headerMain: {
        padding:20
    },
    jobItemContainer: {
        backgroundColor: white,
        borderRadius: 20,
        padding: 20,
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
    avatarJob: {
        width: 30,
        height: 30
    },
    btnSave: {
        position: 'absolute',
        top: 20,
        right: 20,
        opacity: 0.8
    },
    infoJobContainer: {
        paddingTop: 20,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'center'
    },

})
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, TouchableWithoutFeedback, Image } from "react-native";
import styleShare from "../../assets/theme/style";
import Icon from "react-native-vector-icons/Ionicons"
import { bgButton1, bgButton2, grey, orange, white } from "../../assets/theme/color";
import { Searchbar, Chip } from "react-native-paper";
import { endpoints } from "../../config/API";
import axios from "axios";

export default function JobSearchDetail({ navigation, route }) {
    const { searchContent } = route.params
    const [provinces, setProvinces] = useState([])

    const [recentJobs, setRecentJobs] = useState([
        // {
        //     id: '1',
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
        //     id: '2',
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
        //     id: '3',
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
        //     id: '4',
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
        //     id: '5',
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
    ]);

    const renderSearchJobItem = ({ item }) => (
        <TouchableWithoutFeedback key={item.id} onPress={() => { navigation.navigate('JobDetail', { jobId: item.id }) }}>
            <View style={styles.jobItemContainer}>
                <View style={styles.btnSave}>
                    <Icon name="bookmark-outline" size={26} />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={styles.containerAvatarJob}>
                        <Image source={{ uri: item.image }} style={styles.avatarJob} />
                    </View>
                    <View>
                        <Text style={styles.titleJobAndName}>{item.title}</Text>
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
    );

    const loadProvinces = async () => {
        try {
            const res = await axios.get(endpoints['getAllProvinces'])
            setProvinces(res.data)
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <View style={[styleShare.container, { marginHorizontal: 20 }]}>
            <View style={styles.containerTop}>
                <Icon name="arrow-back" size={26} color={bgButton1} onPress={() => navigation.goBack()} />
                <TouchableOpacity style={[styleShare.flexCenter, { marginLeft: 10 }]} onPress={() => loadProvinces()}>
                    <Icon name="location" size={20} color={orange} onPress={() => navigation.goBack()} />
                    <Text style={styles.textLocation}>Hồ Chí Minh</Text>
                    <Icon name="chevron-down-outline" size={20} color={orange} />
                </TouchableOpacity>
            </View>
            <View style={styles.containerMain}>
                <Searchbar style={[styleShare.searchComponent, { width: '100%', marginBottom: 10 }]}
                    value={searchContent}
                    editable={false}
                    clearIcon={true} />
                <View style={styleShare.flexCenter}>
                    <TouchableOpacity style={styles.optionSearch}>
                        <Text>Kinh nghiệm</Text>
                        <Icon name="chevron-down-outline" size={20} color={orange} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionSearch}>
                        <Text>Mức lương</Text>
                        <Icon name="chevron-down-outline" size={20} color={orange} />
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={recentJobs}
                    renderItem={renderSearchJobItem}
                    keyExtractor={item => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    style={styles.containerflat}
                    ListEmptyComponent={
                        <View style={{marginTop: 50, alignItems:'center'}}>
                            <Image source={require("../../assets/images/save.png")} style={styleShare.imageNullData} />
                            <Text style={styleShare.textMainOption}>Không có kết qủa tìm kiếm</Text>
                            <Text style={{padding:20, textAlign:'center'}}>Bạn hãy thử thay đổi từ khóa hoặc loại bỏ bớt tiêu chí lọc và thử lại </Text>
                        </View>
                    }
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    recentSearchItem: {
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    jobTitle: {
        marginLeft: 10
    }, containerTop: {
        flexDirection: 'row',
        marginTop: 30,
        marginBottom: 10,
        alignItems: 'center'
    },
    textLocation: {
        fontWeight: '500',
        marginHorizontal: 5
    },
    optionSearch: {
        borderWidth: 1,
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderColor: orange,
        marginRight: 20,
        borderRadius: 20,
        backgroundColor: white,
        marginBottom: 5
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
    containerflat: {
        paddingTop: 10,
        paddingBottom: 20
    }
})
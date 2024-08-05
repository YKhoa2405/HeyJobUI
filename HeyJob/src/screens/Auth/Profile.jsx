import React from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions, Image, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import styleShare from "../../assets/theme/style";
import { Avatar, Chip } from "react-native-paper";
import { bgButton1, bgButton2, grey, orange, white } from "../../assets/theme/color";
import Icon from "react-native-vector-icons/Ionicons"

export default function Profile({ navigation }) {

    const profileItem = [
        { id: 1, icon: 'sparkles', title: 'Kinh nghiệm làm việc', info: '10 năm' },
        { id: 2, icon: 'location-sharp', title: 'Địa điểm làm việc mong muốn', info: 'Chung cư 4s, đường số 17' },
        { id: 3, icon: 'briefcase', title: 'Công việc mong muốn', info: 'Quản lý nhân sự ' },
    ];

    const aboutApp = [
        { id: 1, icon: 'business', title: 'Về HeyJob' },
        { id: 2, icon: 'book', title: 'Điều khoản và dịch vụ' },
        { id: 3, icon: 'call', title: 'Trợ giúp' },
        { id: 4, icon: 'heart-circle-sharp', title: 'Đánh giá ứng dụng' },
    ]

    const manageJob = [
        { id: 1, icon: 'bookmark', title: 'Việc làm đã lưu', info: '5' },
        { id: 2, icon: 'briefcase', title: 'Việc làm đã ứng tuyển', info: '5' },
        { id: 3, icon: 'business', title: 'Công ty đã theo dõi', info: '5' },
    ]

    const handleManageJobClick = (id) => {
        switch (id) {
            case 1:
                navigation.navigate('SaveJob')
                break;
            case 2:
                console.log('Việc làm đã ứng tuyển clicked');
                // Navigate to the applied jobs screen or perform other actions
                break;
            case 3:
                console.log('Công ty đã theo dõi clicked');
                // Navigate to the followed companies screen or perform other actions
                break;
            default:
                console.log('Unknown item clicked');
                break;
        }
    };

    const ManageJobGrid = () => (
        <View style={styles.grid}>
            {manageJob.map((item) => (
                <TouchableWithoutFeedback onPress={() => handleManageJobClick(item.id)} key={item.id}>
                    <View style={styles.gridItem}>
                        <View style={styles.containerAvatarJob}>
                            <Icon name={item.icon} size={20} color={bgButton1}></Icon>
                        </View>
                        <View style={[styleShare.flexBetween, { marginTop: 10 }]}>
                            <Text style={{ paddingRight: 10, fontWeight: '500' }}>{item.title}</Text>
                            <Text style={styleShare.textMainOption}>{item.info}</Text>

                        </View>
                    </View>
                </TouchableWithoutFeedback>

            ))}
        </View>
    );
    return (
        <View style={styleShare.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 60 }}>
                <View style={styles.containerTop}>
                    <Avatar.Image
                        source={require('../../assets/images/google.png')}
                        size={60}
                        style={{ marginLeft: 40, marginRight: 20 }}
                    />
                    <View>
                        <Text style={styleShare.titleJobAndName}>NGuyen Y Khoa</Text>
                        <Text >Californuia,USA</Text>
                    </View>
                </View>
                <View style={styles.containerMain}>
                    {profileItem.map((item) => (
                        <View key={item.id} style={styles.profileItem}>
                            <View style={styleShare.flexBetween}>
                                <View style={styleShare.flexCenter}>
                                    <Icon name={item.icon} size={24} color={orange} style={{ marginRight: 15 }} />
                                    <Text style={styleShare.titleJobAndName}>{item.title}</Text>
                                </View>
                                <Icon name="pencil" size={24} color={orange} />
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <Chip style={{ alignSelf: 'flex-start', backgroundColor: grey, marginBottom: 5 }}>{item.info}</Chip>
                                <Chip style={{ alignSelf: 'flex-start', backgroundColor: grey, marginBottom: 5 }}>{item.info}</Chip>
                                <Chip style={{ alignSelf: 'flex-start', backgroundColor: grey, marginBottom: 5 }}>{item.info}</Chip>


                            </View>
                        </View>
                    ))}
                    <View style={styles.manageJob}>
                        <Text style={[styleShare.titleJobAndName, { marginVertical: 10 }]}>Quản lý việc làm</Text>
                        <ManageJobGrid></ManageJobGrid>
                    </View>
                    <View style={styles.manageJob}>
                        <TouchableWithoutFeedback style={styles.manageJobItem}>
                            <View style={styleShare.flexBetween}>
                                <View style={styleShare.flexCenter}>
                                    <Avatar.Image source={require('../../assets/images/cv.png')} size={50} />
                                    <Text style={{ fontWeight: '500', marginLeft: 15 }}>Hướng dẫn viết CV</Text>
                                </View>
                                <Icon name="chevron-forward-outline" size={24} color={bgButton1} />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.manageJob}>
                        <Text style={[styleShare.titleJobAndName, { marginVertical: 10 }]}>Chính sách và hỗ trợ</Text>
                        {aboutApp.map((item) => (
                            <TouchableWithoutFeedback key={item.id}>
                                <View style={styles.manageJobItem}>
                                    <View style={styleShare.flexBetween}>
                                        <View style={styleShare.flexCenter}>
                                            <Icon name={item.icon} size={24} color={orange} style={{ marginRight: 15 }} />
                                            <Text style={{ fontWeight: '500' }}>{item.title}</Text>
                                        </View>
                                        <Icon name="chevron-forward-outline" size={24} color={bgButton1} />
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>

                        ))}
                    </View>
                    <TouchableOpacity style={styles.manageJob} onPress={() => { navigation.navigate('Login') }}>
                        <View style={styleShare.flexCenter}>
                            <Text style={{ fontWeight: '500', fontSize: 16, marginRight: 10, color: 'red' }}>Đăng xuất</Text>
                            <Icon name="exit" size={24} color={'red'} />
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        </View>
    )

}

const styles = StyleSheet.create({
    containerTop: {
        backgroundColor: white,
        marginHorizontal: 20,
        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 20,
        borderRadius: 10
    },
    containerMain: {
        marginTop: 10
    },
    profileItem: {
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 10,
        backgroundColor: white
    },
    manageJob: {
        backgroundColor: white,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: 10
    },
    manageJobItem: {
        paddingVertical: 15
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    gridItem: {
        width: (Dimensions.get('window').width - 50) / 2, // 40 là tổng padding/margin
        padding: 16,
        backgroundColor: grey,
        borderRadius: 8,
        marginBottom: 10
    },
    containerAvatarJob: {
        width: 40,
        height: 40,
        borderRadius: 25,
        backgroundColor: bgButton2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarJob: {
        width: 24,
        height: 24
    },



})
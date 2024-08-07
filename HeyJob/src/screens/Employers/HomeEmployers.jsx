import React from "react";
import { View, Text, TouchableWithoutFeedback, StyleSheet, Dimensions } from "react-native";
import styleShare from "../../assets/theme/style";
import { Avatar, Chip } from "react-native-paper";
import { orange, bgButton1, grey, white } from "../../assets/theme/color";
import Icon from "react-native-vector-icons/Ionicons"

export default function HomeEmployers({navigation}) {
    const manageEmployers = [
        { id: 1, icon: 'megaphone-outline', title: 'Chiến dịch tuyển dụng', info: 0 },
        { id: 2, icon: 'reader-outline', title: 'CV tiếp nhận', info: 0 },
        { id: 4, icon: 'podium-outline', title: 'Thống kê tuyển dụng' },
        { id: 3, icon: 'exit-outline', title: 'CV ứng tuyển mới', info: 0 },
    ]
    const UtilitiesGrid = () => (
        <View style={styles.gridUtili}>
            <View style={styles.gridItemUtili}>
                <Icon name={'add-circle-outline'} size={20} color={bgButton1}></Icon>
                <Text style={styleShare.lineText}>Đăng bài</Text>
            </View>
        </View>
    );

    const ManageEmployersGrid = () => (
        <View style={styles.grid}>
            {manageEmployers.map((item) => (
                <TouchableWithoutFeedback onPress={() => handleManageEmployersClick(item.id)} key={item.id}>
                    <View style={styles.gridItem}>
                        <View style={styleShare.flexBetween}>
                            <Icon name={item.icon} size={20} color={bgButton1}></Icon>
                            <Text style={styleShare.textMainOption}>{item.info}</Text>
                        </View>
                        <View style={[styleShare.flexBetween, { marginTop: 10 }]}>
                            <Text style={{ fontWeight: '500' }}>{item.title}</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>

            ))}
        </View>
    );

    const handleManageEmployersClick = (id) => {
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
            case 4:
                navigation.navigate('Statistical')
            default:
                console.log('Unknown item clicked');
                break;
        }
    };

    return (
        <View style={styleShare.container}>
            <View style={styles.containerTop}>
                <View>
                    <Text style={styleShare.textMainOption}>Xin chào</Text>
                    <Chip style={{ marginTop: 5, backgroundColor: orange, }}>Nhà tuyển dụng</Chip>
                </View>
                <Avatar.Image source={require('../../assets/images/google.png')} size={50} />
            </View>
            <View style={styles.containerMain}>
                <Text style={[styleShare.titleJobAndName, { marginVertical: 10 }]}>Tiện ích</Text>
                <UtilitiesGrid></UtilitiesGrid>
                <Text style={[styleShare.titleJobAndName, { marginVertical: 10, marginTop: 10 }]}>Quản lý chiến dịch tuyển dụng</Text>
                <ManageEmployersGrid></ManageEmployersGrid>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerTop: {
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    containerMain: {
        marginHorizontal: 20
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    gridItem: {
        width: (Dimensions.get('window').width - 50) / 2, // 40 là tổng padding/margin
        padding: 16,
        backgroundColor: white,
        borderRadius: 8,
        marginBottom: 10,
        paddingVertical: 30
    },
    gridUtili: {
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: white,
        padding: 20,
        borderRadius: 20,
        marginBottom: 20
    }
    , gridItemUtili: {
        alignItems: 'center'
    
    }
})
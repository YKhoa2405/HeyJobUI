import React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity, ScrollView,TouchableWithoutFeedback } from "react-native";
import styleShare from "../../assets/theme/style";
import UIHeader from "../../components/UIHeader";
import { bgButton1, bgButton2, bgImage, grey, orange, textColor, white } from "../../assets/theme/color";
import Icon from "react-native-vector-icons/Ionicons";

export default function JobDetail({navigation,route}) {
    const { jobId } = route.params

    const menuItems = [
        { id: 1, icon: 'sparkles', title: 'Kinh nghiệm', info: '10' },
        { id: 2, icon: 'calendar', title: 'Hình thức', info: 'Fulltime' },
        { id: 3, icon: 'people', title: 'Số lượng tuyển', info: '10' },
        { id: 4, icon: 'person', title: 'Giới tính', info: 'Nam' },
        { id: 5, icon: 'podium', title: 'Cấp bậc', info: 'Leader' },
        { id: 6, icon: 'stopwatch', title: 'Hạn nộp hồ sơ', info: '10/5/2005' },
    ];

    return (
        <View style={{ flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 80 }}>
                <UIHeader leftIcon={"arrow-back"}
                    rightIcon={"ellipsis-horizontal"} 
                    handleLeftIcon={()=>{navigation.goBack()}}/>
                <View style={styles.containerTop}>
                    <TouchableOpacity style={styleShare.containerAvatar}>
                        <Image source={require('../../assets/images/google.png')} style={styleShare.avatarJob} />
                    </TouchableOpacity>
                    <Text style={styleShare.titleJobAndName}>UI/UX </Text>
                    <Text >Google.com.vn</Text>
                    <View style={styles.descOption}>
                        <View style={styles.descDetail}>
                            <Icon name="cash" size={30} color={bgButton1} />
                            <Text style={styles.textDesc}>Mức lương</Text>
                            <Text style={styleShare.titleJobAndName}>Thoa thuan</Text>
                        </View>
                        <View style={styles.descDetail}>
                            <Icon name="location-sharp" size={30} color={bgButton1} />
                            <Text style={styles.textDesc}>Địa điểm</Text>
                            <Text style={styleShare.titleJobAndName}>Thoa thuan</Text>
                        </View>
                        <View style={styles.descDetail}>
                            <Icon name="sparkles" size={30} color={bgButton1} />
                            <Text style={styles.textDesc}>Kinh nghiệm</Text>
                            <Text style={styleShare.titleJobAndName}>Thoa thuan</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.containerMain}>
                    <Text style={styleShare.textMainOption}>Thông tin chung</Text>
                    <View style={{ marginBottom: 20 }}>
                        {menuItems.map((item) => (
                            <View key={item.id} style={styles.infoContainer}>
                                <Icon name={item.icon} size={26} color={bgButton1} />
                                <View style={styles.infoDesc}>
                                    <Text style={{ color: textColor }}>{item.title}</Text>
                                    <Text style={{ fontWeight: '500', fontSize: 16, marginTop: 3 }}>{item.info}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <Text style={styleShare.textMainOption}>Mô tả công việc</Text>
                        <Text style={{ color: textColor, marginTop: 5 }}>Basic responsibility is to provide the technical support to the local service partner and/or end users. The person is measured by how effectively he can locally provide pre and post sales technical support in a way to win deals and maintain customer satisfactions according to the company’s strategies and vision.</Text>
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <Text style={styleShare.textMainOption}>Yêu cầu ứng viên</Text>
                        <Text style={{ color: textColor, marginTop: 5 }}>Basic responsibility is to provide the technical support to the local service partner and/or end users. The person is measured by how effectively he can locally provide pre and post sales technical support in a way to win deals and maintain customer satisfactions according to the company’s strategies and vision.</Text>
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <Text style={styleShare.textMainOption}>Địa chỉ làm việc</Text>
                        <Text style={{ color: textColor, marginTop: 5 }}>Basic responsibility is to provide the technical support to the local service partner and/or end users. The person is measured by how effectively he can locally provide pre and post sales technical support in a way to win deals and maintain customer satisfactions according to the company’s strategies and vision.</Text>
                    </View>
                </View>
            </ScrollView>
            <View style={[styleShare.bottomBar,styleShare.flexCenter]}>
                <View style={styleShare.buttonSave}>
                    <Icon name="bookmarks-outline" color={orange} size={24}/>
                </View>
                <TouchableOpacity style={styles.buttonApply} onPress={()=>{navigation.navigate('UploadCV')}}>
                    <Text style={styles.buttonText}>Ứng tuyển ngay</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerTop: {
        alignItems: 'center',
        backgroundColor: grey,
        borderRadius: 20,
        marginHorizontal: 20,
        marginTop: 30,
        paddingTop: 45,
        paddingHorizontal: 20
    }
    , descOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    descDetail: {
        alignItems: 'center',
        padding: 20
    }, textDesc: {
        marginTop: 10,
        marginBottom: 5
    },
    containerMain: {
        paddingHorizontal: 20,
        marginTop: 20
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12
    },
    infoDesc: {
        marginLeft: 20
    },
    buttonApply:{
        backgroundColor:bgButton1,
        padding: 12,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        width:'80%',
    },
    buttonText:{
        fontSize: 18,
        fontWeight: "500",
        color:white
    },


})
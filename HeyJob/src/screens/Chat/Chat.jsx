import React, { useContext, useState } from "react";
import { View, Text, FlatList, Image, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import styleShare from "../../assets/theme/style";
import UIHeader from "../../components/UIHeader";
import { StyleSheet } from "react-native";
import { Avatar } from "react-native-paper";
import MyContext from "../../config/MyContext";

export default function Chat({ navigation }) {
    const [user, dispatch]= useContext(MyContext)
    const [chatRooms, setChatRooms] = useState([
        {
            id: "chatRoom1",
            users: ["user1", "user2"],
            lastMessage: "See you tomorrow!",
            lastMessageTimestamp: "2024-09-01T10:00:00Z",
            lastMessageSenderId: "user1",
            createdAt: "2024-09-01T08:00:00Z",
        },
        {
            id: "chatRoom2",
            users: ["user2", "user3"],
            lastMessage: "Let's grab a coffee!",
            lastMessageTimestamp: "2024-09-01T11:30:00Z",
            createdAt: "2024-09-01T09:15:00Z",
        }
    ]);

    const formatRelativeTime = (timestamp) => {
        if (!timestamp) return '';

        const now = new Date();
        const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
        const difference = now - date; // Khoảng cách thời gian tính bằng mili giây

        const minutes = Math.floor(difference / (1000 * 60));
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));

        if (days > 0) {
            return `${days} ngày trước`;
        } else if (hours > 0) {
            return `${hours} giờ trước`;
        } else if (minutes > 0) {
            return `${minutes} phút trước`;
        } else {
            return 'Vừa mới';
        }
    };

    const renderItem = ({ item }) => (
        <TouchableWithoutFeedback onPress={() => navigation.navigate('ChatDetail', { chatRoomId: item.id })}>
            <View style={styles.containerChatRoom}>
                <Avatar.Image source={require("../../assets/images/google.png")} size={50} style={{ marginEnd: 15 }} />
                <View style={{ flex: 1 }}>
                    <View style={styleShare.flexBetween}>
                        <Text style={styleShare.titleJobAndName}>Andy Robertson</Text>
                        <Text style={{ color: 'grey' }}>{formatRelativeTime(item.lastMessageTimestamp)}</Text>
                    </View>
                    <Text style={{ marginTop: 5 }} ellipsizeMode="tail" numberOfLines={1}>{item.lastMessage}</Text>
                    <View style={[styleShare.flexBetween, { marginTop: 10, flex: 1 }]}>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
    return (
        <View style={styleShare.container}>
            <UIHeader title={'Nhắn tin'}
                rightIcon={'checkmark-done-outline'}
                handleRightIcon={() => markAllNotificationsAsRead()} />
            <View>
                <FlatList
                    data={chatRooms} // Dữ liệu sẽ hiển thị
                    keyExtractor={item => item.id} // Khoá duy nhất cho mỗi item
                    renderItem={renderItem} // Hàm hiển thị mỗi item
                    ListEmptyComponent={
                        <View style={{ marginTop: 50, alignItems: 'center' }}>
                            <Image source={require("../../assets/images/save.png")} style={styleShare.imageNullData} />
                            <Text style={styleShare.textMainOption}>Không có tin nhắn nào </Text>
                            <Text style={{ padding: 20, textAlign: 'center' }}>Bạn chưa có bất kỳ tin nhắn nào, kiểm tra lại sau</Text>
                        </View>
                    }
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerChatRoom: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 10
    }
})
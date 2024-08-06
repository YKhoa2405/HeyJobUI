import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, TouchableWithoutFeedback } from "react-native";
import styleShare from "../../assets/theme/style";
import Icon from "react-native-vector-icons/Ionicons"
import { bgButton1, bgButton2, grey } from "../../assets/theme/color";
import { Searchbar } from "react-native-paper";

export default function JobSearch({ navigation }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [recentJobs, setRecentJobs] = useState([
        { id: 1, title: 'Lập trình viên React Native', location: 'Hà Nội', company: 'Công ty A' },
        { id: 2, title: 'Kỹ sư phần mềm', location: 'TP. Hồ Chí Minh', company: 'Công ty B' },
        { id: 3, title: 'Quản lý dự án', location: 'Đà Nẵng', company: 'Công ty C' },
    ]);

    const filteredJobs = recentJobs.filter(job =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
        <View style={[styleShare.container, { marginHorizontal: 20 }]}>
            <View style={[styleShare.flexBetween, { marginTop: 30, marginBottom: 10 }]}>
                <Icon name="arrow-back" size={26} color={bgButton1} onPress={() => navigation.goBack()} />
                <Searchbar style={styleShare.searchComponent}
                    placeholder="Địa điểm - Công ty - Ngành nghề"
                    value={searchQuery}
                    onChangeText={query => setSearchQuery(query)} />
            </View>

            {searchQuery === '' ? (
                <>
                    <View style={styleShare.flexBetween}>
                        <Text style={styleShare.titleJobAndName}>Tìm kiếm gần đây</Text>
                        <TouchableOpacity onPress={() => setRecentJobs([])}>
                            <Text style={{ fontWeight: '500', color: 'red' }}>Xóa tất cả</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <FlatList
                            data={recentJobs}
                            keyExtractor={item => item.id.toString()}
                            renderItem={({ item }) => (
                                <TouchableWithoutFeedback key={item.id} onPress={() => navigation.navigate('JobSearchDetail', { searchContent: item.title })}>
                                    <View style={styles.recentSearchItem}>
                                        <Icon name="search-outline" size={22} color={bgButton1} />
                                        <Text style={styles.jobTitle}>{item.title}</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            )}
                        />
                    </View>
                </>
            ) : (
                <View>
                    <Text style={[styleShare.titleJobAndName, { marginBottom: 10 }]}>Gợi ý tìm kiếm</Text>
                    <FlatList
                        data={filteredJobs}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableWithoutFeedback key={item.id} onPress={() => navigation.navigate('JobSearchDetail', { searchContent: item.title })}>
                                <View style={{ paddingTop: 15 }}>
                                    <Text style={{ paddingBottom: 15 }}>{item.title}</Text>
                                    <View style={styleShare.line}></View>
                                </View>
                            </TouchableWithoutFeedback>

                        )}
                    />
                </View>
            )}

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
    }
})
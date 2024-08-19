import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Text, TextInput, ActivityIndicator, TouchableOpacity } from "react-native";
import styleShare from "../../assets/theme/style";
import UIHeader from "../../components/UIHeader";
import { bgButton1, orange, white } from "../../assets/theme/color";
import ButtonMain from "../../components/ButtonMain";
import InputMain from "../../components/InputMain";
import ReusableModal from "../../components/ReusableModal ";
import Icon from "react-native-vector-icons/Ionicons"
import API, { authApi, endpoints } from "../../config/API";
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastMess } from "../../components/ToastMess";

export default function AddPost({ navigation }) {
    const [modalVisible, setModalVisible] = useState({
        salary: false,
        technology: false,
        experience: false
    });
    const [title, setTitle] = useState('')
    const [location, setLocation] = useState('')
    const [selectedSalary, setSelectedSalary] = useState(null)
    const [selectExperience, setSelectExperience] = useState('')
    const [selectedTechnologies, setSelectedTechnologies] = useState([]);
    const [description, setDescription] = useState('')
    const [expirationDate, setExpirationDate] = useState(new Date()); // Ngày hết hạn

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [loading, setLoading] = useState(false);

    const [technologies, setTechnologies] = useState([]);
    const salaries = ['Dưới 5 triệu', '10 - 15  triệu', '15 - 20 triệu', '20 - 25 triệu', '25 - 30 triệu', '30 - 50 triệu', 'Trên 50 triệu', 'Thỏa thuận'];
    const experiences = ['Không yêu cầu', 'Thực tập sinh', 'Dưới 1 năm', '1 năm', '2 năm', '3 năm', '4 năm', '5 năm', 'Trên 5 năm'];

    useEffect(() => {
        fetchTechnology(); // Gọi hàm fetch khi component mount
    }, []);
    const fetchTechnology = async () => {
        try {
            const res = await API.get(endpoints['technology']);

            if (Array.isArray(res.data.results)) {
                const techNames = res.data.results.map(item => item.name); // Chuyển đổi thành mảng các chuỗi
                setTechnologies(techNames);
            } else {
                console.error("res.data.results is not an array");
            }
        } catch (error) {
            console.error("Error fetching technology data", error);
        }
    }

    const handleSalarySelect = (salary) => {
        setSelectedSalary(salary);
        setModalVisible({ ...modalVisible, salary: false });
    };

    const handleExperienceSelect = (experience) => {
        setSelectExperience(experience);
        setModalVisible({ ...modalVisible, experience: false });
    };

    const handleTechnologySelect = (technology) => {
        setSelectedTechnologies(prevTechnologies =>
            prevTechnologies.includes(technology)
                ? prevTechnologies.filter(item => item !== technology)
                : [...prevTechnologies, technology]
        );
    };

    const onChange = (event, selectedDate) => {
        if (selectedDate) {
            setExpirationDate(selectedDate); // Cập nhật ngày đã chọn
        }
        setShowDatePicker(false); // Ẩn picker sau khi chọn
    };

    const handlePostJob = async () => {
        if (!title || !location || !selectedSalary || !selectExperience || !selectedTechnologies || !description || !expirationDate) {
            ToastMess({ type: 'error', text1: 'Vui lòng không để trống các trường.' });
            return;
        }
        setLoading(true)
        let formJob = new FormData();
        formJob.append('title', title);
        formJob.append('location', location);
        formJob.append('salary', selectedSalary);
        formJob.append('experience', selectExperience);
        formJob.append('description', description);
        formJob.append('expiration_date', expirationDate);
        formJob.append('technologies', JSON.stringify(selectedTechnologies));

        

        try {
            const token = await AsyncStorage.getItem("access-token");
            const response = await authApi(token).post(endpoints['jobs'], formJob, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }


    }


    return (
        <View style={styleShare.container}>
            <UIHeader leftIcon={"arrow-back"}
                handleLeftIcon={() => { navigation.goBack() }}
                title={'Đăng tin tuyển dụng'} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.containerMain}>
                    <Text style={styles.textInput}>Tiêu đề</Text>
                    <InputMain
                        placeholder="Tiêu đề tin tuyển dụng"
                        onChangeText={setTitle}

                    />
                    <Text style={styles.textInput}>Địa điểm làm việc</Text>
                    <InputMain
                        placeholder="Địa điểm làm việc"
                        onChangeText={setLocation}
                        autoCapitalize="none"
                    />
                    <View style={styleShare.flexBetween}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.textInput}>Mức lương</Text>
                            <TouchableOpacity onPress={() => setModalVisible({ ...modalVisible, salary: true })} >
                                <View style={styles.inputSelect}>
                                    <Text>{selectedSalary ? selectedSalary : "Chọn mức lương"}</Text>
                                    <Icon name="chevron-down" size={22} color="orange" />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, marginLeft: 10 }}>
                            <Text style={styles.textInput}>Kinh nghiệm</Text>
                            <TouchableOpacity onPress={() => setModalVisible({ ...modalVisible, experience: true })} >

                                <View style={styles.inputSelect}>
                                    <Text>{selectExperience ? selectExperience : "Kinh nghiệm"}</Text>
                                    <Icon name="chevron-down" size={22} color="orange" />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <ReusableModal
                        visible={modalVisible.salary}
                        onClose={() => setModalVisible({ ...modalVisible, salary: false })}
                        title="Chọn mức lương"
                        data={salaries}
                        selectedItems={selectedSalary ? [selectedSalary] : []}
                        onItemPress={handleSalarySelect}
                        onComplete={() => setModalVisible({ ...modalVisible, salary: false })}
                        singleSelect={true}
                    />
                    <ReusableModal
                        visible={modalVisible.experience}
                        onClose={() => setModalVisible({ ...modalVisible, experience: false })}
                        title="Chọn kinh nghiệm yêu cầu"
                        data={experiences}
                        selectedItems={selectExperience ? [selectExperience] : []}
                        onItemPress={handleExperienceSelect}
                        onComplete={() => setModalVisible({ ...modalVisible, experience: false })}
                        singleSelect={true}
                    />

                    <Text style={styles.textInput}>Công nghệ</Text>
                    <TouchableOpacity onPress={() => setModalVisible({ ...modalVisible, technology: true })}>
                        <View style={styles.inputSelect}>
                            <Text>{selectedTechnologies.length > 0 ? selectedTechnologies.join(', ') : "Chọn công nghệ"}</Text>
                            <Icon name="chevron-down" size={22} color="orange" />
                        </View>
                    </TouchableOpacity>

                    <ReusableModal
                        visible={modalVisible.technology}
                        onClose={() => setModalVisible({ ...modalVisible, technology: false })}
                        title="Chọn công nghệ"
                        data={technologies}
                        selectedItems={selectedTechnologies}
                        onItemPress={handleTechnologySelect}
                        onComplete={() => setModalVisible({ ...modalVisible, technology: false })}
                    />


                    <Text style={styles.textInput}>Thời gian hết hạn</Text>
                    <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                        <View style={styles.inputSelect}>
                            <Text>{expirationDate ? expirationDate.toLocaleDateString() : "Chọn ngày hết hạn"} </Text>
                            <Icon name="chevron-down" size={22} color="orange" />
                        </View >
                    </TouchableOpacity>

                    {/* Hiển thị DateTimePicker */}
                    {showDatePicker && (
                        <DateTimePicker
                            value={expirationDate}
                            mode="date" // Chọn ngày. Có thể là 'date' hoặc 'time'
                            display="default"
                            onChange={onChange} // Cập nhật giá trị khi người dùng chọn ngày
                            onClose={() => setShowDatePicker(false)} // Đóng picker sau khi chọn
                        />
                    )}
                    <Text style={styles.textInput}>Mô tả</Text>
                    <TextInput
                        style={styles.introduceInput}
                        placeholder="Mô tả về công việc"
                        onChangeText={setDescription}
                        multiline={true}
                        numberOfLines={7}
                        textAlignVertical="top"
                    />
                    <View style={{ marginTop: 10 }}></View>
                    {loading ? (
                        <ActivityIndicator color={orange} size={'large'} />
                    ) : (
                        <ButtonMain title={'Đăng'} backgroundColor={bgButton1} textColor={white} onPress={() => handlePostJob()} />
                    )}
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    containerMain: {
        paddingHorizontal: 20
    },
    textInput: {
        fontWeight: 'bold',
        color: bgButton1,
        marginTop: 20
    },
    inputSelect: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderRadius: 18,
        backgroundColor: white,
        marginTop: 10,
        opacity: 0.8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    introduceInput: {
        borderRadius: 20,
        marginTop: 10,
        marginBottom: 30,
        padding: 10,
        backgroundColor: white
    }
})
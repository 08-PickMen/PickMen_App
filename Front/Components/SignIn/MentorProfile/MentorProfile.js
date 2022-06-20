import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { Card } from 'react-native-paper';
import Modal from 'react-native-modal';
import 'react-navigation';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import filter from '../../../icons/filter.png';
import Exit from '../../../icons/Exit.png';
import DropDownPicker from 'react-native-dropdown-picker';
import TeachIcon from '../../../icons/teach.png';
import MajorIcon from '../../../icons/Major.png';
import { CheckBox } from 'react-native-elements';

// 멘토 프로필 리스트 페이지
const MentorProfile = ({ navigation }) => {
    const [MentorList, setMentorList] = React.useState([]);
    const [MentorList2, setMentorList2] = React.useState([]);
    const [MajorList, setMajorList] = React.useState([]);
    const [LectureList, setLectureList] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [value, setValue] = React.useState(null);
    const [value2, setValue2] = React.useState(null);
    const [isMajor, setIsMajor] = React.useState(false);
    const [isLecture, setIsLecture] = React.useState(false);
    const [isRating, setIsRating] = React.useState(false);
    const [MajorText, setMajorText] = React.useState('');
    const [MajorText2, setMajorText2] = React.useState('');
    const [LectureText, setLectureText] = React.useState('');
    const [LectureText2, setLectureText2] = React.useState('');


    const [ModalVisible, setModalVisible] = React.useState(false);
    // 간략한 멘토 프로필을 렌더링하는 함수
    const renderCard = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('MentorProfileDetailPage', { item_id: item.id, item_Major_id : item.majorDto.name, item_lecture1_id : item.lectureDto1.name, item_lecture2_id : item.lectureDto2.name, item_averageRating : item.averageRating})}>
                <Card style={styles.cards}>
                    <Card.Content style={{ flexDirection: 'row' }}>
                    </Card.Content>
                    <Card.Content>
                        <View>
                            <FastImage source={{ uri: 'http://10.0.2.2:8090/getProfile?userid=' + Number(item.id), cache : FastImage.cacheControl.web}} style={{ marginLeft: 'auto', marginRight: 'auto', width: 60, height: 60, borderRadius: 120 }}></FastImage>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={styles.MainTitle}>멘토</Text>
                                <Text style={styles.nickName}>{item.nickname}</Text>
                            </View>
                            <View>
                                <View style = {{flexDirection : 'row'}}>
                                    <Image source={MajorIcon} style={{ width: 17, height: 17, marginTop : 10, marginRight : 10,}}></Image>
                                    <Text style={styles.MentorMajor}>{item.majorDto.name}</Text>
                                </View>
                            </View>
                            <View style = {{flexDirection : 'row'}}>
                                    <Image source={TeachIcon} style={{ width: 17, height: 17, marginTop : 10, marginRight : 10,}}></Image>
                                    <Text style={styles.MentorLectures}>{item.lectureDto1.name},{'\n'}{item.lectureDto2.name}</Text>
                            </View>
                        </View>
                    </Card.Content>
                    <Card.Actions>
                    </Card.Actions>
                </Card>
            </TouchableOpacity>
        )
    };
    // 멘토 프로필을 조건에 맞게 설정하는 함수
    const updateList = (MajorText, LectureText, isMajor, isLecture,isRating) => {
        setMentorList(MentorList2);
        if (isRating) {
            setMentorList(MentorList2.sort((a, b) => {
                return b.averageRating - a.averageRating;
            }));
        }
        if (isMajor) {
            if (MajorText) {
                const newData = MentorList2.filter((item) => {
                    const itemData = item.majorDto.name ? item.majorDto.name.toUpperCase() : ''.toUpperCase();
                    const textData = MajorText2.toUpperCase();
                    return itemData.indexOf(textData) > -1
                });
                setMentorList(newData);
            } else {
                setMentorList(MentorList2);
            }
        }
        if (isLecture) {
            if (LectureText) {
                const newData = MentorList2.filter((item) => {
                    const itemData = (item.lectureDto1.name ? item.lectureDto1.name.toUpperCase() : ''.toUpperCase())
                    const textData = LectureText.toUpperCase();
                    const itemData2 = (item.lectureDto2.name ? item.lectureDto2.name.toUpperCase() : ''.toUpperCase())
                    return itemData.indexOf(textData) > -1 || itemData2.indexOf(textData) > -1
                });
                setMentorList(newData);
                setLectureText(LectureText2);
            } else {
                setMentorList(MentorList2);
            }
        }
    }
    // 멘토 프로필 리스트를 불러오는 함수
    useEffect(() => {
        axios.get('http://10.0.2.2:8090/user/mentor/getAll').then(async (response) => {
            var data = response.data;
            setMentorList(data);
            setMentorList2(data);
            console.log(data)
        });
        axios.get('http://10.0.2.2:8090/major/getAll').then((response) => {
            var data = response.data;
            var newlist = [];
            for (var i of data) {
                newlist.push({
                    label: i.name,
                    value: i.id
                });
            }
            setMajorList(newlist);
        });
        axios.get('http://10.0.2.2:8090/lecture/getAll').then((response) => {
            var data = response.data;
            var newlist = [];
            for (var i of data) {
                newlist.push({
                    label: i.name,
                    value: i.id
                });
            }
            setLectureList(newlist);
        });
    }, [])
    return (
        <View style={{ flex: 1, backgroundColor: '#27BAFF'}}>
            <View style = {styles.PageStyle}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.Title}>
                    멘토 프로필 리스트
                </Text>
                <TouchableOpacity style={styles.filter} onPress={() => setModalVisible(true)}>
                    <Image source={filter}></Image>
                </TouchableOpacity>
            </View>
            <FlatList
                data={MentorList}
                renderItem={renderCard}
                keyExtractor={item => item.id}
                numColumns={2}
            >
            </FlatList>
            <Modal
                visible={ModalVisible}
                transparent={true}>
                <View style={{ marginLeft: 'auto', marginRight: 'auto', backgroundColor: '#fff', borderColor: 'black', borderWidth: 1, width: 300, height: 600 }}>
                    <SafeAreaView style={{ flexDirection: 'row' }}>
                        <Text style={styles.ModalTitle}>정렬 기준</Text>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Image source={Exit} style={{ marginTop: 15, marginLeft: 160, marginRight: 10, width: 30, height: 30 }}></Image>
                        </TouchableOpacity>
                    </SafeAreaView>
                    <View style={{ flexDirection: 'row', marginLeft: 40, marginTop: 20, }}>
                        <CheckBox checked={isRating} onPress={() => setIsRating(!isRating)} style={{ marginTop: 100, }} />
                        <Text style={styles.ModalCategory_Rating}>평점 순</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginLeft: 40, marginTop: 20,}}>
                        <CheckBox checked={isMajor} onPress={() => setIsMajor(!isMajor)} style={{ marginTop: 100, }} />
                        <Text style={styles.ModalCategory_Major}>전공 별</Text>
                    </View>
                    <View>
                        <DropDownPicker
                            style={{ width: 150, marginTop: 10, marginLeft: 'auto', marginRight: 125, borderColor: '#a0a0a0' }}
                            open={open}
                            value={value}
                            zIndex={3000}
                            zIndexInverse={1000}
                            searchable={true}
                            dropDownContainerStyle={{ borderColor: '#a0a0a0', width: 150, height: 150, marginLeft: 75 }}
                            searchContainerStyle={{ borderColor: '#a0a0a0', borderBottomWidth: .15, width: 250, marginLeft: 'auto', marginRight: 70, }}
                            listItemContainerStyle={{ borderColor: '#a0a0a0', borderTopWidth: 0, width: 250, marginLeft: 'auto', marginRight: 70, }}
                            searchTextInputStyle={{ height: 30, borderRadius: 0, borderWidth: 0, borderColor: '#a0a0a0' }}
                            items={MajorList}
                            placeholder="전공 검색"
                            placeholderStyle={{ borderColor: '#a0a0a0', fontFamily: 'NanumSquareRoundB', fontSize: 14 }}
                            searchPlaceholder='학과 검색'
                            containerStyle={{ width: 350, marginLeft: 'auto', marginRight: 'auto' }}
                            onChangeValue={(itemValue) => {
                                const getIndex = (itemValue) => {
                                    for (var i = 0; i < MajorList.length; i++) {
                                        if (MajorList[i].value == itemValue) {
                                            return i;
                                        }
                                    }
                                }
                                if (getIndex(itemValue) >= 0) {
                                    setMajorText(MajorList[getIndex(itemValue)].label);
                                    setMajorText2(MajorList[getIndex(itemValue)].label);
                                }
                            }}
                            setValue={setValue}
                            setOpen={setOpen}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', marginLeft: 40, marginTop: 20, }}>
                            <CheckBox checked={isLecture} onPress={() => setIsLecture(!isLecture)} style={{ marginTop: 100, }} />
                            <Text style={styles.ModalCategory_Lecture}>전문 강의 별</Text>
                        </View>
                        <DropDownPicker
                            style={{ width: 150, marginTop: 10, marginLeft: 'auto', marginRight: 125, borderColor: '#a0a0a0' }}
                            open={open2}
                            value={value2}
                            zIndex={1000}
                            zIndexInverse={3000}
                            searchable={true}
                            dropDownContainerStyle={{ borderColor: '#a0a0a0', width: 150, height: 150, marginLeft: 75 }}
                            searchContainerStyle={{ borderColor: '#a0a0a0', borderBottomWidth: .15, }}
                            listItemContainerStyle={{ borderColor: '#a0a0a0', borderTopWidth: 0, }}
                            searchTextInputStyle={{ height: 30, borderRadius: 0, borderWidth: 0, borderColor: '#a0a0a0' }}
                            items={LectureList}
                            placeholder="강의 검색"
                            placeholderStyle={{ borderColor: '#a0a0a0', fontFamily: 'NanumSquareRoundB', fontSize: 14 }}
                            searchPlaceholder='강의 검색'
                            containerStyle={{ width: 350, marginLeft: 'auto', marginRight: 'auto' }}
                            onChangeValue={(itemValue) => {
                                const getIndex = (itemValue) => {
                                    for (var i = 0; i < LectureList.length; i++) {
                                        if (LectureList[i].value == itemValue) {
                                            return i;
                                        }
                                    }
                                }
                                if (getIndex(itemValue) >= 0) {
                                    setLectureText(LectureList[getIndex(itemValue)].label);
                                    setLectureText2(LectureList[getIndex(itemValue)].label);
                                }
                            }}
                            setValue={setValue2}
                            setOpen={setOpen2}
                        />
                    </View>
                    <TouchableOpacity style={styles.CorrectButton} onPress={() => { updateList(MajorText, LectureText, isMajor, isLecture, isRating) }}>
                        <Text style={styles.CorrectButtonText}>적용</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cards: {
        width: 180,
        height: 250,
        marginLeft: 10,
        marginRight: 1,
        borderWidth:.1,
        borderRadius: 20,
    },
    MainTitle: {
        fontSize: 17,
        fontFamily: 'Jalnan',
        color: '#27BAFF',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 20,
    },
    subtitle: {
        fontFamily: 'Jalnan',
        color: "black",
    },
    MentoName: {
        fontFamily: 'Jalnan',
        marginBottom: 10,
        fontSize: 14,
    },
    teachSector: {
        fontFamily: 'Jalnan',
        marginTop: 10,
        marginRight: 'auto',
        fontSize: 14,
        color: 'black'
    },
    nickName: {
        fontFamily: 'Jalnan',
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 14,
        color: 'black'
    },
    MentorMajor: {
        fontFamily: 'NanumSquareRoundB',
        fontSize: 15,
        marginRight: 20,
        marginTop: 10,
        marginBottom: 10,
        color: 'black',
    },
    MentorLectures: {
        fontFamily: 'NanumSquareRoundB',
        fontSize: 15,
        marginRight: 21,
        marginTop: 10,
        marginBottom: 10,
        color: 'black',
    },
    Title: {
        fontFamily: 'Jalnan',
        fontSize: 17,
        color: "#27BAFF",
        marginBottom: 10,
        marginLeft: 10,
        marginTop: 18,
    },
    ButtonText: {
        fontFamily: 'Jalnan',
        fontSize: 14,
        color: "#27BAFF",
    },
    filter: {
        marginLeft: 'auto',
        marginRight: 10,
    },
    ModalTitle: {
        fontFamily: 'NanumSquareRoundB',
        fontSize: 17,
        color: 'black',
        marginLeft: 20,
        marginTop: 20,
    },
    ModalCategory_Rating: {
        fontFamily: 'NanumSquareRoundB',
        fontSize: 17,
        marginTop: 15,
        color: 'black',
        marginRight: 'auto',
    },
    ModalCategory_Lecture: {
        fontFamily: 'NanumSquareRoundB',
        fontSize: 17,
        marginTop: 15,
        color: 'black',
        marginRight: 'auto',
    },
    ModalCategory_Major: {
        fontFamily: 'NanumSquareRoundB',
        fontSize: 17,
        marginTop: 15,
        color: 'black',
        marginRight: 'auto',
    },
    CorrectButton: {
        width: 200,
        height: 40,
        paddingTop: 5,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 30,
        borderRadius: 5,
        backgroundColor: "#27BAFF"
    },
    CorrectButtonText: {
        color: "white",
        textAlign: "center",
        marginTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 15,
        fontFamily: 'Jalnan',
    },
    PageStyle: {
        backgroundColor: 'white',
        width: 400,
        height: 680,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius : 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto'
      },
})

export default MentorProfile;
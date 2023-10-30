import React, { useCallback, useRef, useState } from 'react';
import {View, StyleSheet, FlatList, TextInput, Text, Switch, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import TodoListItem, { ListItem } from '../components/TodoListItem';
import Button from '../components/Button';
import { selectAllTodoListItems, selectDarkTheme, setAddListItem, setDeleteItem, setTheme, setUpdateListItem } from '../redux/reducers';
import { darkTheme, lightTheme } from '../Theme';
import ModalPopup from '../components/ModalPopup';


function TodoListScreen() {

    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState('');
    const [errorMessage, setErrorMesage] = useState('')
    const [isModalVisible, setModalVisible] = useState(false)
    //@ts-ignore
    const textInputRef = useRef<TextInput | null>({});
    const dispatch = useDispatch();
    const allTodoListItems = useSelector(selectAllTodoListItems);
    const isDark = useSelector(selectDarkTheme);
    
    const onAddItem = useCallback(() => {
        if(title.length === 0) {
            setModalVisible(true);
            setErrorMesage('Title should not be empty')
            return
        }else if(priority.length === 0) {
            setModalVisible(true);
            setErrorMesage('Priority should not be empty')
            return
        } else {

            const newItem = {id: Date.now(), title, priority};
            dispatch(setAddListItem(newItem));
            setTitle('')
            setPriority('')
        }
    }, [dispatch, allTodoListItems, title, priority]);

    const onSelectEdit = useCallback((id: number) => {
        // @ts-ignore
        textInputRef.current[id].focus();
    }, [])

    const onUpdatedTitle = useCallback((text: string, item: ListItem) => {
        const updatedItem = {...item, title: text};
        dispatch(setUpdateListItem({ id: item.id, updatedItem}))
    }, [dispatch, allTodoListItems])

    const handleDarkTheme = useCallback((value: boolean) => {
        dispatch(setTheme(value))
    }, [dispatch])


    return (
        <React.Fragment>
        <View style={isDark ? [styles.container, {backgroundColor: darkTheme.backgroundColor}] : styles.container}>
            <View style={styles.headerContainer}>

            <Text style={{ color: isDark ? darkTheme.textColor : lightTheme.textColor}}>To do list screen</Text>
            <Switch 
            value ={isDark}
            onValueChange={handleDarkTheme}
            />
            </View>
            <TextInput 
            style={isDark ? [styles.textInput, {borderColor: darkTheme.borderColor, color: darkTheme.textColor}] : styles.textInput}
            value={title}
            onChangeText={(value) => setTitle(value)}
            placeholder='Add new title...'
            placeholderTextColor={isDark ? darkTheme.textColor : lightTheme.textColor}
            />
            <TextInput 
            style={isDark ? [styles.textInput, {borderColor: darkTheme.borderColor, color: darkTheme.textColor}] : styles.textInput}
            value={priority}
            onChangeText={(value) => setPriority(value)}
            placeholder='Add priority...'
            placeholderTextColor={isDark ? darkTheme.textColor : lightTheme.textColor}
            />
            <Button name="Add" onPress={onAddItem}/>
            {allTodoListItems.length === 0 && <Text style={{ color: isDark ? darkTheme.textColor : lightTheme.textColor}}>No Items found</Text>}
            <View style={{flex: 1}}>
                <FlatList 
                data={allTodoListItems}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    // @ts-ignore
                    <TodoListItem ref={ref => textInputRef.current[item.id] = ref} editable={true} item={item} onDelete={() => dispatch(setDeleteItem(item.id))} onEdit={() => onSelectEdit(item.id)} onBlurEvent={(text) => onUpdatedTitle(text, item)}/>
                )}
                />
            </View >

        </View>
        <ModalPopup isVisible={isModalVisible} onDismiss={() => setModalVisible(false)} message={errorMessage}/>
        </React.Fragment>

        
    )
}

export default TodoListScreen;

const styles= StyleSheet.create({
    container: {
        padding: 10,
        flex: 1
    },
    headerContainer: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#3e3e3e',
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
        color: '#000'
    },
    button: {
        width: '30%',
        padding: 10,
        borderRadius: 10,
        backgroundColor: "dodgerblue",
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
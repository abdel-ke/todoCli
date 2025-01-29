import {Icon} from '@rneui/base';
import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

type props = {
  onPress: Function;
  onchangeText: string;
  setOnchangeText: React.Dispatch<React.SetStateAction<string>>;
};

const AddTodo = ({onPress, onchangeText, setOnchangeText}: props) => {
  const handleAddTodo = () => {
    if (onchangeText) {
      onPress({title: onchangeText, checked: false});
      setOnchangeText('');
    } else {
      console.log('Please enter a todo');
    }
  };

  const handleOnChangeText = (text: string) => {
    setOnchangeText(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={handleOnChangeText}
        placeholder="Add To-Do"
        value={onchangeText}
        onSubmitEditing={handleAddTodo}
      />
      <Icon
        style={{
          paddingRight: 3,
        }}
        name="add-circle"
        size={30}
        onPress={handleAddTodo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
    shadowColor: 'black',
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    color: 'black',
  },
});

export default AddTodo;

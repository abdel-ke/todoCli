import {CheckBox, Icon} from '@rneui/base';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

type Props = {
  item: {
    title: string;
    completed: number;
  };
  onCheckedChange: (val: boolean) => void;
  onDelete: () => void;
};

const TodoItem = ({item, onCheckedChange, onDelete}: Props) => {
  const [checked, setChecked] = useState(item.completed ? true : false);
  return (
    <View style={styles.container}>
      <CheckBox
        iconType="material-community"
        checkedIcon="checkbox-outline"
        uncheckedIcon={'checkbox-blank-outline'}
        checked={checked}
        onPress={() => {
          setChecked(!checked);
          onCheckedChange(!checked);
        }}
      />
      <Text
        style={[
          styles.text,
          {textDecorationLine: checked ? 'line-through' : 'none'},
        ]}>
        {item.title}
      </Text>
      <Icon name="delete" size={26} color={'crimson'} onPress={onDelete} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 0.5,
    paddingHorizontal: 5,
    marginVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: 'black',
    elevation: 5,
    backgroundColor: 'white',
  },
  text: {
    flex: 1,
  },
});
export default TodoItem;

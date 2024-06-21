import { CheckBox, Icon } from "@rneui/base";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";


type Props = {
  item: {
    title: string;
    completed: number;
  };
  onCheckedChange: (val: boolean) => void;
  onDelete: () => void;
};

const TodoItem = ({ item, onCheckedChange, onDelete }: Props) => {
  const [checked, setChecked] = useState(item.completed ? true : false);
  return (
    <View style={styles.container}>
      <CheckBox checked={checked} onPress={() => {
        setChecked(!checked);
        onCheckedChange(!checked);
      }} />
      <Text
        style={[
          styles.text,
          { textDecorationLine: checked ? "line-through" : "none" },
        ]}
      >
        {item.title}
      </Text>
        <Icon name="delete" size={26} color={"crimson"} onPress={onDelete} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 0.5,
    padding: 10,
    marginVertical: 10,
    alignItems: "center",
    gap: 10,
    borderRadius: 10,
    shadowColor: "black",
    elevation: 2,
    backgroundColor: "white",
  },
  text: {
    flex: 1,
    marginLeft: 20,
  },
});
export default TodoItem;

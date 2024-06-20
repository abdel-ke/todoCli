import { Icon } from "@rneui/base";
import React from "react";
import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

type props = {
  onPress: Function;
};

const AddTodo = ({ onPress }: props) => {
  const [onchangeText, setOnchangeText] = useState("");

  const handleAddTodo = () => {
    if (onchangeText) {
      onPress({ title: onchangeText, checked: false });
      setOnchangeText("");
    } else {
      console.log("Please enter a todo");
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
        // if click enter froom keyboard
      />
      <View style={styles.iconAdd}>
        <Icon name="add-circle" size={30} onPress={handleAddTodo} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
    shadowColor: "black",
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
  },
  iconAdd: {
    padding: 2,
    margin: 5,
    backgroundColor: "lightblue",
    borderRadius: 10,
  },
});

export default AddTodo;

import {StyleSheet, Text, View} from 'react-native';

const EmptyState = () => (
  <View style={styles.container}>
    <Text style={styles.text}>No data!</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default EmptyState;

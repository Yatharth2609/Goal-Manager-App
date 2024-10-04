import { useState } from "react";
import { Button, FlatList, StyleSheet, View } from "react-native";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [modal, setModal] = useState(false);
  const [goals, setGoals] = useState([]);

  const startAddGoalHandler = () => {
    setModal(true);
  };

  const addGoalHandler = (goalText) => {
    setGoals((prev) => [
      ...prev,
      { text: goalText, id: Math.random().toString() },
    ]);

    endGoalHandler();
  };

  const endGoalHandler = () => {
    setModal(false);
  };

  const deleteGoalHandler = (id) => {
    setGoals((curr) => {
      return curr.filter((goal) => goal.id !== id);
    });
  };
  return (
    <>
      <StatusBar style="light"/>
      <View style={styles.appContainer}>
        <Button
          title="Add New Goal!"
          color="#a065ec"
          onPress={startAddGoalHandler}
        />
        <GoalInput
          showModal={modal}
          onPress={addGoalHandler}
          onClose={endGoalHandler}
        />
        <View style={styles.goalsContainer}>
          <FlatList
            data={goals}
            renderItem={(goal) => {
              return (
                <GoalItem
                  id={goal.item.id}
                  text={goal.item.text}
                  onDelete={deleteGoalHandler}
                />
              );
            }}
            keyExtractor={(item, idx) => {
              return item.id;
            }}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    padding: 50,
    paddingHorizontal: 15,
  },
  goalsContainer: {
    flex: 5,
  },
});

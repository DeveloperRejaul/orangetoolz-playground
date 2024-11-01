import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createTable, deleteTodoItem, getDBConnection, getTodoItems, saveTodoItems, ToDoItem } from '../db-service';

const initTodos = [{ id: 0, value: 'go to shop' ,age:10, name:'kamal'}];


export default function Sqlit() {
  const [todos, setTodos] = useState<ToDoItem[]>([]);

  const initDb =  async() => {
      try {
        const db = await getDBConnection();
        await createTable(db); // this table create if not table exists
        const storedTodoItems = await getTodoItems(db);

        // is any todos exists already in db , this todo set in to the state
        if(storedTodoItems?.length) {
          setTodos([...storedTodoItems]);
        }
      } catch (error) {
        console.error(error);
      }
  };

  useEffect(()=>{
     initDb();
  },[]);

const handleAddTodos = async () => {
  const totalTodos = todos.length;
  const newTodos = initTodos.map((d, i)=> ({...d,id: totalTodos + i}) );
  const db = await getDBConnection();
  await saveTodoItems(db, newTodos);
  setTodos(pre=> [...pre, ...newTodos]);
};


const deleteTodo = async () => {
  if(todos.length) {
    const db = await getDBConnection();
    await deleteTodoItem(db, todos[0].id);
    setTodos(todos.slice(1, todos.length));
  }
};

  return (
    <View>
      <Text style={styles.header}>sq-lite</Text>
      <View style={styles.action}>
        <Text onPress={handleAddTodos}>Add TODO</Text>
        <Text onPress={deleteTodo}>Delete TODO</Text>
      </View>
      <ScrollView>
        {todos.map(d=> (
          <View style={styles.body} key={d.id}>
          <Text>{d.id}</Text>
          <Text>{d.value}</Text>
          <Text>{d.age}</Text>
          <Text>{d.name}</Text>
        </View>
      ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header:{
    fontSize:40,
    textAlign:'center',
    color:'#000',
    textTransform:'uppercase',
  },
  body:{
    flexDirection:'row',
    columnGap:5,
  },
  action:{flexDirection:'row', columnGap:10},
});

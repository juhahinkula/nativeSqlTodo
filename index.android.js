/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import SQLite from 'react-native-sqlite-storage';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

export default class nativetodo extends Component {
  constructor(props) {
    super(props);
    this.state = {todos: '', error: ''};
  }

  componentDidMount() {
    var db = SQLite.openDatabase("todo.db", "1.0", "Todo", -1);
    this.createDb(db);
    //this.populateDb(db);
    //this.fetchTodos(db);
  }

  // Create todos table
  createDb = (tx) => {   
    tx.executeSQL('CREATE TABLE IF NOT EXISTS todos( '
    + 'todo_id INTEGER PRIMARY KEY NOT NULL, '
    + 'description VARCHAR(30) ); ', [], this.successCB, this.errorCB);    
  }

  // Populate some demo data
  populateDb = (tx) => {
    this.setState({todos: 'hello'});    
    tx.executeSql('INSERT INTO todos (description) VALUES ("Wash car");');
    tx.executeSql('INSERT INTO todos (description) VALUES ("Coffee with Mike");');    
  }

  // Fetch all todos
  fetchTodos = () => {
    this.setState({todos: 'hello'});    
    tx.executeSql('SELECT description FROM todos')
    .then(([tx, results]) => {
        for (let i = 0; i < results.rows.length; i++) {
          let row = results.rows.item(i).description;
        }
      })
      .catch((error) => { 
        this.setState({error: err});
        console.log(error);
      });   
  }

  errorCB = (err) => {
    console.log("error: ",err);
    this.setState({error: err});
    return false;
  }

  successCB = () => {
    console.log("SQL executed ...");
    this.setState({error: 'Ok'});
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Hello {this.state.todos}
        </Text>
        <Text style={styles.welcome}>
          Error: {this.state.error}
        </Text>        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('nativetodo', () => nativetodo);

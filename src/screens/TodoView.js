import React from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import {observer} from 'mobx-react';

import {ViewModelContext} from '../contexts';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  btn: {
    width: 100,
    height: 50,
    padding: 10,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
  },
  todoContainer: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  checkbox: {
    borderRadius: 100,
    width: 30,
    height: 30,
    borderColor: 'green',
    borderWidth: 1,
    marginHorizontal: 5,
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    width: width * 0.5,
    height: 40,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'black',
    color: 'black',
    padding: 5,
  },
});

@observer
class TodoView extends React.Component {
  static contextType = ViewModelContext;

  constructor(props) {
    super(props);
    this.state = {
      currEditIndex: null,
    };
  }

  onPressText = currEditIndex => {
    this.setState({currEditIndex});
  };

  onChangeTodoText = (text, todo) => {
    todo.text = text;
    this.forceUpdate();
  };

  onEndEditing = () => {
    this.setState({currEditIndex: null});
  };

  renderTodo = ({item: todo, index}) => {
    const {currEditIndex} = this.state;
    const model = this.context.todoViewModel;
    const checkboxStyles = [styles.checkbox];
    if (todo.isDone) {
      checkboxStyles.push({backgroundColor: 'green'});
    }

    return (
      <View style={styles.todoContainer}>
        {/* Todo number */}
        <Text
          style={{
            marginHorizontal: 5,
            fontWeight: 'bold',
          }}>{`#${index + 1}|`}</Text>

        {/* checkbox */}
        <TouchableOpacity
          style={checkboxStyles}
          onPress={() => {
            model.toggleTodo(todo);
            this.forceUpdate();
          }}
        />

        {/* dynamic rendered text or textInput */}
        {currEditIndex !== index && (
          <TouchableOpacity onPress={() => this.onPressText(index)}>
            <Text style={{width: width * 0.5}}>
              {todo.text || 'PRESS TO ENTER TODO DESCRIPTION'}
            </Text>
          </TouchableOpacity>
        )}
        {currEditIndex === index && (
          <TextInput
            value={todo.text}
            onChangeText={text => this.onChangeTodoText(text, todo)}
            style={styles.textInput}
            placeholder={todo.text}
            onSubmitEditing={this.onEndEditing}
            onEndEditing={this.onEndEditing}
          />
        )}

        {/* delete button */}
        <Btn
          style={[styles.btn, {backgroundColor: 'red', width: 75, height: 40}]}
          onPress={() => model.remove(todo)}
          text="Delete"
        />
      </View>
    );
  };

  renderEmpty = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={{fontWeight: 'bold', fontSize: 24}}>Add a Todo</Text>
      </View>
    );
  };

  render() {
    const model = this.context.todoViewModel;
    console.log(model.todos.slice());

    return (
      <SafeAreaView style={styles.container}>
        {/* action btns */}
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Btn
            style={[styles.btn, {backgroundColor: 'blue'}]}
            onPress={model.add}
            text="Add"
          />
          <Btn
            style={[styles.btn, {backgroundColor: 'orange'}]}
            onPress={model.load}
            text="Reload"
          />
          <Btn
            style={[styles.btn, {backgroundColor: 'green'}]}
            onPress={model.save}
            text="Save"
          />
        </View>

        <FlatList
          data={model.todos}
          keyExtractor={todo => todo.id}
          renderItem={this.renderTodo}
          ListEmptyComponent={this.renderEmpty}
        />
      </SafeAreaView>
    );
  }
}

function Btn({style, text, onPress}) {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Text style={styles.btnText}>{text}</Text>
    </TouchableOpacity>
  );
}

export {TodoView};

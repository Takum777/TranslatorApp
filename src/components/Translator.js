import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Clipboard } from 'react-native';
import axios from 'axios';

const Translator = () => {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('en');
  const [items, setItems] = useState([
    { label: 'English', value: 'en' },
    { label: 'Spanish', value: 'es' },
    { label: 'French', value: 'fr' },
    { label: 'German', value: 'de' },
    { label: 'Chinese', value: 'zh' },
    { label: 'Japanese', value: 'ja' },
    { label: 'Ukrainian', value: 'uk' },
  ]);

  const translateText = async () => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo-0613',
          messages: [
            { role: 'system', content: 'You are a translator.' },
            { role: 'user', content: `Translate the following text to ${value}: ${text}` },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer YOUR_GTP_KEY`,
          },
        }
      );
      setTranslatedText(response.data.choices[0].message.content.trim());
    } catch (error) {
      console.error(error);
    }
  };

  const copyToClipboard = () => {
    Clipboard.setString(translatedText);
    Alert.alert('Copied to Clipboard', 'The translated text has been copied to your clipboard.');
  };

  return (
    <View style={styles.container}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        style={styles.picker}
        dropDownContainerStyle={styles.dropdown}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter text"
        value={text}
        onChangeText={setText}
      />
      <View style={styles.outputContainer}>
        <TextInput
          style={styles.output}
          placeholder="Translated text"
          value={translatedText}
          editable={false}
        />
        <TouchableOpacity onPress={copyToClipboard} style={styles.copyButton}>
          <Text style={styles.copyButtonText}>Copy</Text>
        </TouchableOpacity>
      </View>
      <Button title="Translate" onPress={translateText} color="#1e90ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff', // Светлый фон
  },
  picker: {
    height: 50,
    marginBottom: 16,
    backgroundColor: '#fff', // Светлый фон для picker
    borderColor: '#ccc', // Цвет границы
  },
  dropdown: {
    marginBottom: 16,
    backgroundColor: '#fff', // Светлый фон для dropdown
    borderColor: '#ccc', // Цвет границы
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    color: '#000', // Черный текст
    backgroundColor: '#fff', // Светлый фон для ввода
    borderColor: '#ccc', // Цвет границы
  },
  outputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  output: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    color: '#000', // Черный текст
    backgroundColor: '#fff', // Светлый фон для вывода
    borderColor: '#ccc', // Цвет границы
  },
  copyButton: {
    padding: 10,
    backgroundColor: '#1e90ff',
    marginLeft: 10,
  },
  copyButtonText: {
    color: '#fff',
  },
});

export default Translator;

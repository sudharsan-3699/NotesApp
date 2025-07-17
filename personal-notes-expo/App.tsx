import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, TextInput,Button, FlatList, View, StyleSheet, Alert, KeyboardAvoidingView,Platform,} from 'react-native';
import { getNotes, createNote, updateNote, deleteNote } from './utils/api';

type Note = {
  id: number;
  title: string;
  content: string;
  tags: string;
  created: string;
  updated: string;
};

const emptyForm = { title: '', content: '', tags: '' };

export default function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);

  const loadNotes = async () => {
    try {
      setNotes(await getNotes());
    } catch (err) {
      Alert.alert('Error');
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const handleSubmit = async () => {
    if (!form.title.trim() || !form.content.trim()) {
      Alert.alert('Title & Content required!');
      return;
    }
    try {
      if (editingId !== null) {
        await updateNote(editingId, form);
      } else {
        await createNote(form);
      }
      setForm(emptyForm);
      setEditingId(null);
      loadNotes();
    } catch {
      Alert.alert('Error');
    }
  };

  const handleEdit = (note: Note) => {
    setEditingId(note.id);
    setForm({ title: note.title, content: note.content, tags: note.tags });
  };

  const handleDelete = async (id: number, title: string) => {
  try {
    await deleteNote(id);
    loadNotes();
    Alert.alert('Deleted!', `${title} Deleted!`);
  } catch {
    Alert.alert('Error');
  }
};

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.inner}
        behavior={Platform.OS==='ios'?'padding':undefined} 
        >
        <Text style={styles.title}>Personal Notes</Text>
        <View style={styles.form}>
          <TextInput
            style={styles.input} placeholder="Title"
            value={form.title}
            onChangeText={t => setForm(f => ({ ...f, title:t }))} />

          <TextInput
            style={styles.input} placeholder="Tags"
            value={form.tags}
            onChangeText={t => setForm(f => ({ ...f, tags: t}))} />
            
          <TextInput
            style={[styles.input, styles.textArea]} placeholder="Content"
            value={form.content}
            onChangeText={t => setForm(f => ({ ...f, content: t }))} multiline
            numberOfLines={4} />

          <Button
            title={editingId ? "Update Note" : "Add Note"}
            onPress={handleSubmit} />
            {editingId && (
            <Button
              title="Cancel" color="grey"
              onPress={() => { setEditingId(null); setForm(emptyForm);
              }}
            />
          )}
        </View>
        <FlatList
          data={notes}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.noteCard}>
              <Text style={styles.noteTitle}>
                {item.title}{' '}
                <Text style={styles.noteTags}>{item.tags}</Text>
              </Text>
              <Text style={styles.noteContent}>{item.content}</Text>
              <Text style={styles.noteDate}>
                {new Date(item.updated).toLocaleString()}
              </Text>
              <View style={styles.buttonRow}>
                <Button
                  title="Edit"
                  onPress={() => handleEdit(item)}
                />
                <View style={{ width: 10 }} />
                <Button
                  title="Delete"
                  color="#d22"
                  onPress={() =>Alert.alert("Delete",`Are you sure you want to permanently delete "${item.title}"?`,
                [{
                text: "Cancel",
                },{
                text: "Delete",onPress: () => handleDelete(item.id, item.title)
                }])}/>

              </View>
            </View>
          )}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  inner: { flex: 1, padding: 18},
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 19,
    textAlign: 'center',
    color: 'midnightblue',
  },
  form: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 14,
    marginBottom: 20,
    elevation: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#bfd0ea',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  textArea: {minHeight: 70},
  buttonRow: {
    flexDirection:'row',
    marginTop: 8,
    alignItems:'center',
  },
  noteCard: {
    backgroundColor: '#eeeeeeff',
    marginBottom: 13,
    borderRadius: 8,
    padding: 14,
    borderWidth: 1,
    borderColor: '#b6b6b6ff',
  },
  noteTitle: { fontWeight: 'bold', fontSize: 18, color: 'midnightblue' },
  noteTags: { fontSize: 16, color: 'blue', fontWeight: 'normal' },
  noteContent: { fontSize: 16, marginVertical: 6 },
  noteDate: { fontSize: 12, color: '#8898ad', marginBottom: 6 },
  empty: { textAlign: 'center', marginTop: 40, color: '#aaa', fontSize: 18 },
});

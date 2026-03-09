import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { Alert, Image, Pressable, Text, TextInput, View } from "react-native";

export default function Settings() {
  const USERNAME_KEY = "settings.username";
  const IMAGE_KEY = "settings.imageUrl";

  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [savedMessage, setSavedMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // Laddar sparade inställningar från AsyncStorage när sidan öppnas
  useEffect(() => {
    const loadSettings = async () => {
      const savedUsername = await AsyncStorage.getItem(USERNAME_KEY);
      const savedImage = await AsyncStorage.getItem(IMAGE_KEY);

      if (savedUsername) setUsername(savedUsername);
      if (savedImage) setImageUrl(savedImage);
    };
    loadSettings();
  }, []);

  const handleSelectImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    // Frågar om tillgång till bildbiblioteket
    if (!permission.granted) {
      Alert.alert("Permission needed", "Please allow photo access");
      return;
    }
    // Öppnar bildväljaren och tillåter beskärning till kvadrat
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImageUrl(uri);
      await AsyncStorage.setItem(IMAGE_KEY, uri);
      setSavedMessage("Image Saved!");
      setTimeout(() => setSavedMessage(""), 2000);
    }
  };

  const handleSaveUsername = async () => {
    const trimmed = username.trim();

    if (!trimmed) {
      Alert.alert("Missing username", " Please enter a username");
      return;
    }
    await AsyncStorage.setItem(USERNAME_KEY, trimmed);
    setSavedMessage("Username Saved!");
    setTimeout(() => setSavedMessage(""), 2000);
  };

  return (
    <View className="flex-1 items-center justify-center">
      <Text>Settings</Text>
      {/* Visar vald lokal bild först, annars sparad profilbild */}
      <Image source={{ uri: imageUrl }} style={{ width: 120, height: 120 }} />
      <Pressable onPress={handleSelectImage}>
        <Text>Upload Image</Text>
      </Pressable>
      {savedMessage ? <Text>{savedMessage}</Text> : null}
      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder="Enter Username"
      />
      <Pressable onPress={handleSaveUsername}>
        <Text>Save Username</Text>
      </Pressable>
    </View>
  );
}

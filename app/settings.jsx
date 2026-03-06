import { useState } from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";

export default function Settings() {
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [userId, setUserId] = useState("");
  const [savedMessage, setSavedMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSelectImage = async () => {
    const premission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!premission.granted) {
      Alert.alert("Premission needed", "Please allow photo access");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8
    });

    if (!result.canseled) {
      setImageUrl(result.assets[0].uri);
    }
  };

  return (
    <View className="flex-1 items-center justify-center">
      <Text>Settings</Text>
      <Image
        source={{ uri: imageUrl || avatarUrl }}
        style={{ width: 120, height: 120 }}
      />
      <Pressable onPress={handleSelectImage}>Upload Image</Pressable>
      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder="Enter Username"
      />
      {/* <Pressable onPress={handleSaveUsername}>
        <Text>Save Username</Text>
      </Pressable> */}
    </View>
  );
}

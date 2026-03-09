import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { Alert, Image, Text, TextInput, View } from "react-native";
import Button from "../components/Button";

export default function Settings() {
  // Keys för persistens av settings i AsyncStorage.
  const USERNAME_KEY = "settings.username";
  const IMAGE_KEY = "settings.imageUrl";

  const [savedMessage, setSavedMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [savedUsername, setSavedUsername] = useState("");

  // Laddar sparade inställningar från AsyncStorage när sidan öppnas
  useEffect(() => {
    const loadSettings = async () => {
      // Hämtar tidigare sparad data vid första render.
      const savedUsernameFromStorage = await AsyncStorage.getItem(USERNAME_KEY);
      const savedImage = await AsyncStorage.getItem(IMAGE_KEY);

      if (savedUsernameFromStorage) {
        // Vi fyller både rubrik (saved) och input så användaren ser aktuell data direkt.
        setSavedUsername(savedUsernameFromStorage);
        setUsernameInput(savedUsernameFromStorage);
      }
      if (savedImage) setImageUrl(savedImage);
    };
    loadSettings();
  }, []);

  const handleSelectImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    // Frågar om tillgång till bildbiblioteket
    if (!permission.granted) {
      Alert.alert("Åtkomst krävs", "Tillåt åtkomst för att fortsätta");
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
      // Uppdaterar UI direkt och sparar lokalt så det finns kvar vid nästa app-start.
      setImageUrl(uri);
      await AsyncStorage.setItem(IMAGE_KEY, uri);
      setSavedMessage("Bild sparad, tjoho!");
      setTimeout(() => setSavedMessage(""), 2000);
    }
  };

  const handleSaveUsername = async () => {
    const trimmed = usernameInput.trim();

    if (!trimmed) {
      Alert.alert("Användarnamn saknas", " Skriv in ett användarnamn, snälla.");
      return;
    }
    // Sparar först till storage, uppdaterar sedan den "officiella" rubriken i UI.
    await AsyncStorage.setItem(USERNAME_KEY, trimmed);
    setSavedUsername(trimmed);
    setSavedMessage("Användarnamn uppdaterat, tjiho!");
    // Input rensas efter save, rubriken behåller senaste sparade namn.
    setUsernameInput("");
    setTimeout(() => setSavedMessage(""), 2000);
  };

  return (
    <View className="flex-1 bg-white items-center justify-center px-6">
      <View className="w-full max-w-sm gap-4">
        <Text className="text-2xl font-semibold text-center">
          {savedUsername}
        </Text>
        {/* Om bild finns: visa den. Annars: visa fallback med text. */}
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            className="w-32 h-32 rounded-full self-center border border-[rgb(182,152,206)]"
          />
        ) : (
          <View className="w-32 h-32 rounded-full self-center border border-[rgb(182,152,206)] items-center justify-center">
            <Text className="text-[rgb(49,37,109)] font-semibold text-center bg-white px-2 py-1 rounded-md">
              Ingen bild
            </Text>
          </View>
        )}

        <Button
          title="Ladda upp bild"
          color="primaryLight"
          onPress={handleSelectImage}
        />

        <TextInput
          value={usernameInput}
          onChangeText={setUsernameInput}
          placeholder="Ändra användarnamn"
          className="w-full bg-[rgb(237,233,254)] rounded-lg px-4 py-3"
        />

        <Button
          title="Spara Användarnamn"
          color="primary"
          onPress={handleSaveUsername}
        />

        {savedMessage ? (
          <Text className="text-center text-[rgb(49,37,109)]">
            {savedMessage}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

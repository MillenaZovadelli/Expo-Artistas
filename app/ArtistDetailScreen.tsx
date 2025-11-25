import { useLocalSearchParams } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";

export default function ArtistDetailScreen() {
  const artistas = useLocalSearchParams<any>();
  
return (
    <View style={styles.container}>

      <Image source={{ uri: artistas.image as string }} style={styles.image} />
      <Text>Nome Artistico: {artistas.name}</Text>
      <Text>Nome Verdadeiro: {artistas.realName}</Text>
      <Text>Gênero Musical: {artistas.genre}</Text>
      <Text>início de carreira: {artistas.careerStart}</Text>
      <Text>Quantidade de Albuns: {artistas.mainAlbums}</Text>
      <Text>Biografia: {artistas.biography}</Text>
    </View>

  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center"
  },
  image: {
    width: 200,
    height: 280,
    borderRadius: 10,
    marginBottom: 15
  }
});

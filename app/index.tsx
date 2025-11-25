
import axios from 'axios';

import { Image } from "expo-image";

import { Link } from 'expo-router';

import { useEffect, useState } from "react";

import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";

export type Artist = {
  id: number;
  name: string;
  realName: string;
  image: string;
  genre: string;
  careerStart: number;
  mainAlbums: string[];
  biography: string;
};

export default function Index() {

  const [artistas, setArtistas] = useState<any>([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);

  useEffect(() => {
    getArtistas(); // chama a função que busca os artistas
  }, []);

  // Função que busca os artistas da API
  const getArtistas = async () => {

    // Ativa o loading
    setLoading(true);

    await axios.get("http://localhost:3000/artists")

      .then((response) => {
        setArtistas(response.data); // salva os dados dos Artistas
        setError(false); // remove qualquer erro
      })
      .catch((e) => {
        setError(true); // ativa a mensagem de erro
      });

    setLoading(false);
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>

      <Text style={styles.container} >Lista de Artistas Musicais:</Text>

      { loading ? (
        <ActivityIndicator size="large" color="#4b1010ff" />

      ) : (

        error ? ( 
          <Text>
            Não foi possivel carregar a lista de artistas!
          </Text> 

        ) : (
      <FlatList
        data={artistas}
        keyExtractor={(item) => item.id} // chave única

        renderItem={({ item }) => (

          <Link href={{
            pathname: "./ArtistDetailScreen",
            params: {

              id: item.id,
              name: item.name,
              realName: item.realName,
              genre: item.genre,
              careerStart: item.careerStart,
              mainAlbums: item.mainAlbums,
              biography: item.biography,
              image: item.image
            },
          }} >
             <View>
                  <Image
                    style={{ width: 200, height: 300 }} 
                    source={item.image} 
                  />
                  <Text>Nome Artistico: {item.name}</Text>
                  <Text>Gênero Musical: {item.genre}</Text>
            </View>
          </Link>

        )}
      />
      )
    )}

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
})

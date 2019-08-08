import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity, Animated } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";

// Import images
import logo from "../assets/logo.png";
import like from "../assets/like.png";
import dislike from "../assets/dislike.png";
import empty from "../assets/undraw_empty_xct9.png";

// Mock
import { users as mock } from "../util/mocks";

export default function () {
  const [users, setUsers] = useState([]);
  const [likes, setLikes] = useState([]);
  const [dislikes, setDislikes] = useState([]);
  const [currentUser, setCurrentUser] = useState(0);
  const translateX = new Animated.Value(0);

  const animatedEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationX: translateX
        }
      }
    ],
    {
      useNativeDriver: true
    }
  );

  function onHandledStateChanged(event) {

  }

  useEffect(() => {
    setUsers([mock[0]]);
  }, []);

  useEffect(() => {
    // console.log(`Likes: ${likes.name} Dislikes: ${dislikes.name}`)

  }, [likes, dislikes]);

  function handleLike() {
    let count = currentUser + 1;
    setCurrentUser(count);

    if (users.length > 0) {
      let user = users;

      setLikes(user[0]);

      user.shift();
      setUsers(user);

      if (count < mock.length) {
        user.push(mock[count]);
        setUsers(user);
      }
    }
  }

  function handleDislike() {
    let count = currentUser + 1;
    setCurrentUser(count);

    if (users.length > 0) {
      let user = users;

      setDislikes(users[0]);
      user.shift();

      setUsers(user);

      if (count < mock.length) {
        user.push(mock[count]);
        setUsers(user);
      }
    }
  }

  return (
    <SafeAreaView style={style.container}>
      <Image source={logo} style={style.logo}/>
      <View style={style.cardsContainer}>
        {users.length > 0 &&
        users.map((prop, index) => {
          return (
            <PanGestureHandler
              onGestureEvent={animatedEvent}
              onHandlerStateChange={onHandledStateChanged}
              key={users.length - index}
            >
              <Animated.View
                style={
                  [style.card, {
                    zIndex: users.length - index,
                    transform: [{ translateX: translateX.interpolate({inputRange: [-200, 200], outputRange: [-200, 200], extrapolate: "clamp"})}],
                    opacity: translateX.interpolate({
                      inputRange: [0, 150],
                      outputRange: [1, 0]
                    })
                  }]
                }
              >
                <Image style={style.avatar} source={{ uri: prop.image }}/>
                <View style={style.footer}>
                  <Text style={style.name}>{prop.name}</Text>
                  <Text style={style.bio} numberOfLines={3}>{prop.bio}</Text>
                </View>
              </Animated.View>
            </PanGestureHandler>
          )})
        ||
          (
            <View style={style.containerEmpty}>
              <Image source={empty} style={{ height: 250, width: 250}}/>
              <Text style={style.textEmpty}>Sem usuários.</Text>
            </View>
          )
        }
      </View>
      <View style={style.buttonsContainer}>
        <TouchableOpacity style={style.button} onPress={handleDislike}>
          <Image source={dislike}/>
        </TouchableOpacity>
        <TouchableOpacity style={style.button} onPress={handleLike}>
          <Image source={like}/>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "space-between"
  },
  logo: {
    marginTop: 30,
  },
  cardsContainer: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "center",
    maxHeight: 500
  },
  card: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    margin: 30,
    overflow: "hidden",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  avatar: {
    flex: 1,
    height: 300
  },
  footer: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 15
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333"
  },
  bio: {
    fontSize: 14,
    color: "#999",
    marginTop: 2,
    lineHeight: 20
  },
  buttonsContainer: {
    flexDirection: "row",
    marginBottom: 30,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 2
    }
  },
  containerEmpty: {
    alignSelf: "center"
  },
  textEmpty: {
    fontSize: 18,
    color: "#DDD",
    fontWeight: "bold",
    textAlign: "center"
  }
});

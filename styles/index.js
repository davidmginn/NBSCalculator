import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 8,
    },
    row: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    item: {
      margin: 16,
    },
    button: {
      opacity: 0.6,
    },
    badge: {
      position: "absolute",
      top: 4,
      right: 0,
    },
    label: {
      flex: 1,
    },
    inputContainerStyle: {
      margin: 8,
    },
    centerStyle: {
      alignItems: "center",
      justifyContent: "center",
    },
    graph: {
      marginBottom:30
    },
    image: {
      height: 40,
      width: 40,
      margin: 8,
    },
  });

  export default styles;
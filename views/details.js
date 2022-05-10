import React, { useState } from "react";
import {
  Badge,
  IconButton,
  List,
  Paragraph,
  Switch,
  Colors,
} from "react-native-paper";
import { View } from "react-native";
import styles from "../styles/index";

function DetailsScreen({ navigation }) {
  const [visible, setVisible] = useState(true);

  return (
    <View style={[styles.container]}>
      <View style={[styles.row, styles.item]}>
        <Paragraph style={styles.label}>Show badges</Paragraph>
        <Switch
          value={visible}
          onValueChange={(visible) => setVisible(visible)}
        />
      </View>
      <List.Section title="Text">
        <View style={styles.row}>
          <View style={styles.item}>
            <IconButton icon="palette-swatch" size={36} style={styles.button} />
            <Badge visible={visible} style={styles.badge}>
              12
            </Badge>
          </View>
          <View style={styles.item}>
            <IconButton icon="inbox" size={36} style={styles.button} />
            <Badge
              visible={visible}
              style={[styles.badge, { backgroundColor: Colors.blue500 }]}
            >
              999+
            </Badge>
          </View>
        </View>
      </List.Section>
      <List.Section title="Dot">
        <View style={styles.row}>
          <View style={styles.item}>
            <IconButton icon="book-open" size={36} style={styles.button} />
            <Badge visible={visible} style={styles.badge} size={8} />
          </View>
          <View style={styles.item}>
            <IconButton icon="receipt" size={36} style={styles.button} />
            <Badge visible={visible} style={styles.badge} size={8} />
          </View>
        </View>
      </List.Section>
    </View>
  );
}

export default DetailsScreen;

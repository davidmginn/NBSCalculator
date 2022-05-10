import React, { useState, useEffect } from "react";
import {
  View,
  Keyboard,
  Dimensions,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
} from "react-native";
import { TextInput, List } from "react-native-paper";
import styles from "../styles/index";
import { Picker } from "@react-native-picker/picker";
import { BarChart } from "react-native-chart-kit";

function HomeScreen({ navigation }) {
  const [weight, setWeight] = useState();
  const [activityLevel, setActivityLevel] = useState();

  const [output, setOutput] = useState();

  const [expanded, setExpanded] = useState(true);

  const _handlePress = () => {
    setExpanded(!expanded);
  };

  const screenWidth = Dimensions.get("window").width - 15;

  const activityLevelLiteral = {
    light: 9,
    moderate: 10,
    advanced: 11,
    extreme: 12,
  };

  useEffect(() => {
    if (!isNaN(weight) && activityLevelLiteral[activityLevel]) {

      const averageDailyCaloricIntake =
        weight * activityLevelLiteral[activityLevel];

      const weeklyCaloricIntake = averageDailyCaloricIntake * 7;

      const weekdayCaloricIntake = (weeklyCaloricIntake / 7) * 0.85;

      const weekendCaloricIntake =
        (weeklyCaloricIntake - weekdayCaloricIntake * 5) / 2;

      const weekdayProtein = (weekdayCaloricIntake * 0.35) / 4;

      const weekdayCarbs = (weekdayCaloricIntake * 0.35) / 4;

      const weekdayFat = (weekdayCaloricIntake * 0.3) / 9;

      setOutput({
        averageDailyCaloricIntake,
        weeklyCaloricIntake,
        weekdayCaloricIntake,
        weekendCaloricIntake,
        weekdayProtein,
        weekdayCarbs,
        weekdayFat,
        chartData: {
          labels: ["Weekday", "Weekend", "Average"],
          datasets: [
            {
              data: [
                weekdayCaloricIntake,
                weekendCaloricIntake,
                averageDailyCaloricIntake,
              ],
            },
          ],
        },
      });
    }
  }, [weight, activityLevel, setOutput]);

  const chartConfig = {
    backgroundColor: "#1C1A1B",
    backgroundGradientFrom: "#8D8C8D",
    backgroundGradientTo: "#7B797A",
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={styles.container}>
          <View>
            <TextInput
              label="Enter your weight in lbs."
              keyboardType={"numeric"}
              value={weight}
              onChangeText={(weight) => setWeight(weight)}
            />
          </View>
          <View>
            <Picker
              selectedValue={activityLevel}
              onValueChange={(itemValue, itemIndex) =>
                setActivityLevel(itemValue)
              }
            >
              <Picker.Item label="Light" value="light" />
              <Picker.Item label="Moderate" value="moderate" />
              <Picker.Item label="Advanced" value="advanced" />
              <Picker.Item label="Extreme" value="extreme" />
            </Picker>
          </View>
          <View>
            {output && (
              <List.Section>
                <List.Subheader>Results</List.Subheader>
                <List.Accordion
                  left={() => (
                    <Image
                      source={require("../assets/icons/k_cal.png")}
                      style={styles.image}
                    />
                  )}
                  title="Calories"
                  expanded={expanded}
                  onPress={_handlePress}
                >
                  <List.Item
                    title="Average Daily Caloric Intake"
                    description={output.averageDailyCaloricIntake}
                  />
                  <List.Item
                    title="Total Weekly Caloric Intake"
                    description={output.weeklyCaloricIntake}
                  />
                  <List.Item
                    title="Weekday Caloric Intake"
                    description={output.weekdayCaloricIntake}
                  />
                  <List.Item
                    title="Weekend Caloric Intake"
                    description={output.weekendCaloricIntake}
                  />
                </List.Accordion>
                <List.Item
                  title="Weekday Protein"
                  left={() => (
                    <Image
                      source={require("../assets/icons/protien.png")}
                      style={styles.image}
                    />
                  )}
                  description={output.weekdayProtein}
                />
                <List.Item
                  title="Weekday Carbs"
                  left={() => (
                    <Image
                      source={require("../assets/icons/tot_carb.png")}
                      style={styles.image}
                    />
                  )}
                  description={output.weekdayCarbs}
                />
                <List.Item
                  title="Weekday Fat"
                  left={() => (
                    <Image
                      source={require("../assets/icons/tot_fat.png")}
                      style={styles.image}
                    />
                  )}
                  description={output.weekdayFat}
                />
              </List.Section>
            )}
          </View>
          <View style={styles.graph}>
            {output && (
              <BarChart
                data={output.chartData}
                width={screenWidth}
                height={350}
                chartConfig={chartConfig}
                verticalLabelRotation={45}
                horizontalLabelRotation={-45}
                fromZero={true}
              />
            )}
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </>
  );
}

export default HomeScreen;

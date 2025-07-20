import { Colors } from "@/constants/Colors";
import { MonthNavigator } from "@/types/Calendar";
import { ThemeColors } from "@/types/ThemeColors";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { ThemedText } from "../ThemedText";

const CalendarHeader = ({
  month,
  year,
  nextMonth,
  prevMonth,
}: MonthNavigator) => {
  const scheme = useColorScheme() || "light";

  const theme: ThemeColors = Colors[scheme];
  const styles = createStyles(theme);
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={prevMonth} style={styles.button}>
        <ThemedText>{"<"}</ThemedText>
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <ThemedText style={styles.title}>{`${month} ${year}`}</ThemedText>
      </View>
      <TouchableOpacity onPress={nextMonth} style={styles.button}>
        <ThemedText>{">"}</ThemedText>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CalendarHeader;

const createStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      paddingVertical: 10,
      paddingHorizontal: 4,
      backgroundColor: theme.primary,
      color: theme.text,
    },
    titleContainer: {
      flex: 1,
      alignItems: "center",
      textAlign: "center",
    },
    button: {
      width: 40,
      alignItems: "center",
    },
    title: {
      fontSize: 20,
      fontWeight: "600",
      color: theme.text,
    },
  });

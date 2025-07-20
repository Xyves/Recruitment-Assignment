import { Colors } from "@/constants/Colors";
import { ThemeColors } from "@/types/ThemeColors";
import { format } from "date-fns";
import React from "react";
import { Button, StyleSheet, useColorScheme, View } from "react-native";
import { ThemedText } from "../ThemedText";

const CalendarDay = ({ selectedDate, onOrder }) => {
  const scheme = useColorScheme() || "light";
  const theme: ThemeColors = Colors[scheme];
  const styles = createStyles(theme);
  if (!selectedDate) return null;

  return (
    <View style={styles.container}>
      <ThemedText style={styles.dateText}>
        Wybrana data: {format(new Date(selectedDate), "dd.MM.yyyy")}
      </ThemedText>
      <Button title="Zamów" onPress={() => onOrder(selectedDate)} />
    </View>
  );
};

export default CalendarDay;

const createStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      marginTop: 20,
      alignItems: "center",
    },
    dateText: {
      fontSize: 16,
      marginBottom: 10,
      color: theme.text,
    },
  });

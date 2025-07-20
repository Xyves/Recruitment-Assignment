import { Colors } from "@/constants/Colors";
import { useCalendarMonth } from "@/hooks/useCalendarMonth";
import { sendOrder } from "@/services/orderService";
import { ThemeColors } from "@/types/ThemeColors";
import { format } from "date-fns";
import React, { useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  View,
  useColorScheme,
} from "react-native";
import { ThemedText } from "../ThemedText";
import CalendarDay from "./CalendarDay";
import CalendarHeader from "./CalendarHeader";
export const DayFormat = "yyyy-mm-dd";

export default function MonthView() {
  // Styling based on user's system color theme (dark mode / light mode)
  const scheme = useColorScheme() || "light";
  const theme: ThemeColors = Colors[scheme];
  const styles = createStyles(theme);
  const [width, setWidth] = useState<number>(0);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const { weeks, monthLabel, yearLabel, nextMonth, prevMonth } =
    useCalendarMonth(new Date(), ["2025-07-22"], ["2025-07-24"]);
  const weekDayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const handleOrder = async (date: string) => {
    try {
      const result = await sendOrder(date);
      console.log("Zamówienie złożone:", result);
    } catch (err) {
      Alert.alert("Błąd", "Nie udało się złożyć zamówienia. Spróbuj ponownie.");
      console.error("Błąd podczas składania zamówienia:", err);
    }
  };

  return (
    <View
      style={styles.days}
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
    >
      <CalendarHeader
        month={monthLabel}
        year={yearLabel}
        nextMonth={nextMonth}
        prevMonth={prevMonth}
      />

      {/* Weekday header row */}
      <View style={styles.weekRow}>
        {weekDayNames.map((dayName) => (
          <View
            key={dayName}
            style={{ width: width / 7, padding: 4, alignItems: "center" }}
          >
            <ThemedText style={styles.weekDayText}>{dayName}</ThemedText>
          </View>
        ))}
      </View>

      {/* Calendar weeks grid */}
      {weeks.map((week, weekIndex) => (
        <View key={`week-${week[0]?.date || weekIndex}`} style={styles.weekRow}>
          {week.map((d) => {
            const isSelected = selectedDay === d.date;
            const dateObj = new Date(d.date);

            return (
              <View
                key={d.date}
                style={{
                  width: width / 7,
                  padding: 1,
                }}
              >
                <Pressable
                  style={{
                    ...styles.touchableBox,
                    ...(d.offer || !d.isCurrentMonth ? {} : styles.noOfferDay),
                    ...(d.isCurrentMonth ? {} : styles.otherMonthDay),
                    ...(isSelected ? styles.selectedDayStyle : {}),
                    ...(d.today && d.isCurrentMonth
                      ? styles.todayBackground
                      : {}),
                  }}
                  onPress={() => {
                    setSelectedDay(d.date);
                    console.log(
                      "Selected date:",
                      format(dateObj, "dd-MM-yyyy")
                    );
                  }}
                >
                  <View style={styles.dayBox}>
                    {d.isCurrentMonth && (
                      <ThemedText
                        style={{
                          ...styles.dayText,
                          ...(d.today
                            ? { fontWeight: "bold", color: "blue" }
                            : {}),
                          ...(d.isCurrentMonth ? {} : styles.otherMonthText),
                          textAlign: "center",
                        }}
                      >
                        {d.day}
                      </ThemedText>
                    )}
                  </View>
                </Pressable>
              </View>
            );
          })}
        </View>
      ))}
      <CalendarDay selectedDate={selectedDay} onOrder={handleOrder} />
    </View>
  );
}

const createStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    status: {
      position: "absolute",
      borderRadius: 5,
      width: 15,
      aspectRatio: 1,
    },
    unavailable: {
      opacity: 0.5,
    },
    ordered: {
      top: -3,
      right: -3,
      backgroundColor: theme.secondary,
    },
    orderedUnpaid: {
      top: -3,
      right: -3,
      backgroundColor: theme.accent,
    },
    cancelled: {
      bottom: -3,
      left: -3,
      backgroundColor: "#666",
    },
    added: {
      bottom: -3,
      right: -3,
      backgroundColor: theme.primary,
    },
    orderedText: {
      fontSize: 10,
      textAlign: "center",
      fontFamily: "poppins-bold",
      color: "#fff",
    },
    days: {
      marginVertical: 2,
      marginHorizontal: 2,
      alignSelf: "stretch",
    },
    weekHeader: {
      flexDirection: "row",
    },
    weekRow: {
      flexDirection: "row",
    },
    dayText: {
      textAlign: "center",
      fontSize: 14,
      color: theme.text,
    },
    weekDayName: {
      textAlign: "center",
      color: "#aaa",
      fontFamily: "poppins-bold",
      textTransform: "uppercase",
      fontSize: 8,
    },
    selectedDay: {
      borderWidth: 2,
      borderColor: theme.primary,
    },
    today: {
      color: "#555",
    },
    todayBackground: {
      borderWidth: 1,
      borderRadius: 4,
      borderColor: theme.primary,
    },
    touchableBox: {
      backgroundColor: "#f6f6f6",
      aspectRatio: 1,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: "#f6f6f6",
      justifyContent: "center",
    },
    dayBox: {
      justifyContent: "center",
      marginHorizontal: 0,
    },
    otherMonthDay: {
      backgroundColor: "#f0f0f0",
      borderColor: "#f0f0f0",
      opacity: 0.4,
    },
    noOfferDay: {
      opacity: 0.4,
    },
    otherMonthText: {
      color: "#ccc",
    },
    selectedDayStyle: {
      backgroundColor: theme.accent,
    },
    weekDayText: {
      color: theme.text,
    },
  });

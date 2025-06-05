import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type SettingsModalControlProps = {
  label: string;
  value: number;
  increment: number;
  changeFn: (delta: number) => void;
};

export default function SettingsModalControl(props: SettingsModalControlProps) {
  const { label, value, increment, changeFn } = props;

  return (
    <View style={styles.rowContainer}>
      <Text style={styles.labelText}>{label}</Text>
      <View style={styles.controlContainer}>
        <TouchableOpacity
          onPress={() => changeFn(-increment)}
          style={styles.controlButton}
        >
          <Text style={styles.controlButtonText}>{"-"}</Text>
        </TouchableOpacity>
        <Text style={styles.controlValueText}>{value / increment}</Text>
        <TouchableOpacity
          onPress={() => changeFn(increment)}
          style={styles.controlButton}
        >
          <Text style={styles.controlButtonText}>{"+"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  labelText: {
    fontSize: 16,
    marginRight: 40,
  },
  controlContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  controlButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eee",
    borderRadius: 8,
  },
  controlButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  controlValueText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    minWidth: 40,
  },
});

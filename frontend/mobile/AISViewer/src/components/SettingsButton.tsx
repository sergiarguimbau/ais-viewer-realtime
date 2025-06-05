import { StyleSheet, Text, TouchableOpacity } from "react-native";

type SettingsButtonProps = {
  onPress: () => void;
};

export default function SettingsButton(props: SettingsButtonProps) {
  const { onPress } = props;

  return (
    <TouchableOpacity style={styles.settingsButton} onPress={onPress}>
      <Text style={styles.settingsIconText}>⛯</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  settingsButton: {
    position: "absolute",
    bottom: 40,
    right: 20,
    backgroundColor: "white",
    opacity: 0.9,
    borderWidth: 2,
    borderRadius: 24,
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 20,
  },
  settingsIconText: {
    fontSize: 30,
    fontWeight: 600,
  },
});

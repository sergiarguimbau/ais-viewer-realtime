import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import type { ModalProps, SettingsProps } from "../types";
import SettingsModalControl from "./SettingsModalControl";

type SettingsModalProps = ModalProps & SettingsProps;

export default function SettingsModal(props: SettingsModalProps) {
  const { visible, onClose, settings, setSettings } = props;

  const MIN_ZOOM_MIN = 1;
  const MIN_ZOOM_MAX = 16;
  const INTERVAL_MS_MIN = 1000;
  const INTERVAL_MS_MAX = 30000;

  const changeZoom = (delta: number) => {
    let newVal = settings.minZoom + delta;
    if (newVal < MIN_ZOOM_MIN) newVal = MIN_ZOOM_MIN;
    if (newVal > MIN_ZOOM_MAX) newVal = MIN_ZOOM_MAX;
    setSettings({ ...settings, minZoom: newVal });
  };

  const changeInterval = (delta: number) => {
    let newVal = settings.intervalMs + delta;
    if (newVal < INTERVAL_MS_MIN) newVal = INTERVAL_MS_MIN;
    if (newVal > INTERVAL_MS_MAX) newVal = INTERVAL_MS_MAX;
    setSettings({ ...settings, intervalMs: newVal });
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        {/* Background overlay, tap to close */}
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={StyleSheet.absoluteFill} />
        </TouchableWithoutFeedback>

        <View style={styles.modalContainer}>
          <Text style={styles.modalTitleText}>{"Map settings"}</Text>
          <SettingsModalControl
            label="Min zoom"
            changeFn={changeZoom}
            value={settings.minZoom}
            increment={1}
          />
          <SettingsModalControl
            label="Update (s)"
            changeFn={changeInterval}
            value={settings.intervalMs}
            increment={1000}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    padding: 20,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 12,
  },
  modalTitleText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

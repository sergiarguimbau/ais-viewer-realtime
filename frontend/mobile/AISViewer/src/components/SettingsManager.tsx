import { useState } from "react";

import type { SettingsProps } from "../types";
import SettingsButton from "./SettingsButton";
import SettingsModal from "./SettingsModal";

type SettingsManagerProps = SettingsProps;

export default function SettingsManager(props: SettingsManagerProps) {
  const { settings, setSettings } = props;

  const [settingsVisible, setSettingsVisible] = useState(false);

  const openSettings = () => setSettingsVisible(true);
  const closeSettings = () => setSettingsVisible(false);

  return (
    <>
      <SettingsButton onPress={openSettings} />
      <SettingsModal
        visible={settingsVisible}
        onClose={closeSettings}
        settings={settings}
        setSettings={setSettings}
      />
    </>
  );
}

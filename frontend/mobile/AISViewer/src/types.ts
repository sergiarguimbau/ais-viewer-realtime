import type { Dispatch, SetStateAction } from "react";

export type Settings = {
  minZoom: number;
  intervalMs: number;
};

export type SettingsProps = {
  settings: Settings;
  setSettings: Dispatch<SetStateAction<Settings>>;
};

export type ModalProps = {
  visible: boolean;
  onClose: () => void;
};

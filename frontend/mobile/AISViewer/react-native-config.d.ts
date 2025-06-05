declare module "react-native-config" {
  export interface NativeConfig {
    MAPBOX_API_KEY: string;
  }

  export const Config: NativeConfig;
  export default Config;
}

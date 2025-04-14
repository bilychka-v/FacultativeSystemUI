export {};

declare global {
  interface Window {
    onGoogleLibraryLoad: () => void;
    google: any;
  }
  const google: any;
}

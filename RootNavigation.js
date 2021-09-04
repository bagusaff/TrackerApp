import { createNavigationContainerRef } from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export function reset(routes, index, params) {
  navigationRef.current?.reset(routes, index, params);
}

export function popToTop() {
  navigationRef.current?.popToTop();
}
export function goBack() {
  navigationRef.current?.goBack();
}

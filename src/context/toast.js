import { createContext, useContext } from "react";

// Kept out of the component file so fast refresh stays happy.
export const ToastContext = createContext({
  copyEmail: () => {},
  notify: () => {},
});

export const useToast = () => useContext(ToastContext);

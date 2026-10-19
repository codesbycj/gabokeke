import { useCallback, useEffect, useRef, useState } from "react";
import { ToastContext } from "../context/toast";
import { profile } from "../data/site";
import { useCopyToClipboard } from "../hooks";

export const ToastProvider = ({ children }) => {
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const timer = useRef(null);
  const { copy } = useCopyToClipboard();

  const notify = useCallback((text) => {
    setMessage(text);
    setVisible(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setVisible(false), 2200);
  }, []);

  const copyEmail = useCallback(async () => {
    const ok = await copy(profile.email);
    notify(ok ? "Email copied to clipboard" : profile.email);
  }, [copy, notify]);

  useEffect(() => () => timer.current && clearTimeout(timer.current), []);

  return (
    <ToastContext.Provider value={{ copyEmail, notify }}>
      {children}
      <div
        className={`toast ${visible ? "toast--visible" : ""}`}
        role="status"
        aria-live="polite"
      >
        {message}
      </div>
    </ToastContext.Provider>
  );
};

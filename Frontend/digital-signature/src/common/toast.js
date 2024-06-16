import { toast } from "react-toastify";

export const ToastType = {
  SUCCESS: 1,
  ERROR: 2,
  INFO: 4,
  WARNING: 8,
};

export const showToast = (message, type = ToastType.SUCCESS, onClose) => {
  if (type === ToastType.SUCCESS) {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      onClose: onClose,
      // transition: Bounce,
    });
  } else if (type === ToastType.ERROR) {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      onClose: onClose,
      // transition: Bounce,
    });
  } else if (type === "info") {
    toast.info(message);
  } else if (type === ToastType.WARNING) {
    toast.warning(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      onClose: onClose,
      // transition: Bounce,
    });
  }
};

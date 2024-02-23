import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const defaultConfig = {
  type: "success", 
  theme: "colored",
  autoClose: 2000,
  position: "top-right", 
};

export const notify = (message, options = {}) => {
  const mergedConfig = { ...defaultConfig, ...options }; // Merge options

  switch (mergedConfig.type) {
    case "success":
      toast.success(message, mergedConfig);
      break;
    case "error":
      toast.error(message, mergedConfig);
      break;
    case "warning":
      toast.warning(message, mergedConfig);
      break;
    default:
      // Handle invalid type or use a default notification type
      toast(message, mergedConfig);
  }
};

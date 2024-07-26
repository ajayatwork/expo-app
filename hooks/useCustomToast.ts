import { useToast } from "react-native-toast-notifications";

export const useCustomToast = () => {
  const toast = useToast();
  
  const catchError = (message: string) => {
    message!= "" && toast.show(message, {
      type: "danger",
      placement: "top",
      duration: 3500,
      animationType: "slide-in",
    });
  };

  const showsuccesToast = (message:string)=>{
    message!= "" &&  toast.show(message, {
      type: "success",
      placement: "top",
      duration: 3500,
      animationType: "slide-in",
    })
  }

  return {catchError, showsuccesToast};
};
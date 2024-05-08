import { ToastType } from "../common/toast";
const payOSconfig = (url, returnUrl, showToast) => {
  return {
    RETURN_URL: returnUrl, // required
    ELEMENT_ID: "pricing", // required
    CHECKOUT_URL: url, // required
    onSuccess: (event) => {
      showToast("Đặt hàng thành công", ToastType.SUCCESS);
    },
    onCancel: (event) => {
      showToast("Đơn hàng đã bị huỷ", ToastType.ERROR);
    },
    onExit: (event) => {
      showToast("Đơn hàng đã bị huỷ", ToastType.ERROR);
    },
  };
};
export default payOSconfig;

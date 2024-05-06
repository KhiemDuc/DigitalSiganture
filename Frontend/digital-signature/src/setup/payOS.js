const payOSconfig = (url, returnUrl) => {
  return {
    RETURN_URL: returnUrl, // required
    ELEMENT_ID: "pricing", // required
    CHECKOUT_URL: url, // required
    onSuccess: (event) => {
      console.log(event);
      //TODO: Hành động sau khi người dùng thanh toán đơn hàng thành công
    },
    onCancel: (event) => {
      //TODO: Hành động sau khi người dùng Hủy đơn hàng
      alert();
    },
    onExit: (event) => {
      console.log(event);
      //TODO: Hành động sau khi người dùng tắt Pop up
    },
  };
};
export default payOSconfig;

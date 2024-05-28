import Layout from "../../components/Layout";
import RequestTicket from "../../components/RequestSignature/RequestTicket";
import CertificateService from "../../services/certificate.service";

export default function MyRequest() {
  const handleClick = () => {
    CertificateService.getCertificate()
      .then((response) => {
        console.log(response.data.data);
      })
      .catch((error) => console.log(error));
  };
  return (
    <Layout
      heading={"Xem vé yêu cầu"}
      subheading={"Danh sách vé yêu cầu của bạn"}
    >
      <button
        className="btn btn-outline-primary"
        onClick={() => {
          handleClick();
        }}
        style={{
          alignSelf: "flex-end",
        }}
      >
        Tải chứng chỉ của bạn
      </button>
      <RequestTicket></RequestTicket>
    </Layout>
  );
}

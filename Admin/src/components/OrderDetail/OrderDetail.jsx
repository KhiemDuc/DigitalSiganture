import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getImg } from "../../service/imgaes";
import forge from "node-forge";
import { useSelector } from "react-redux";
export default function OrderDetail() {
  const { state } = useLocation();
  const [imgSrcs, setImgSrcs] = useState({});
  const caCert = useSelector((state) => state.cert);
  useEffect(() => {
    (async () => {
      try {
        if (state.isExtend) return;
        const result = await Promise.all([
          getImg(state.face),
          getImg(state.CCCD),
          getImg(state.CCCDBack),
        ]);
        setImgSrcs({
          face: result[0].data,
          CCCD: result[1].data,
          CCCDBack: result[2].data,
        });
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  const signCertificate = () => {
    console.log(caCert);
    const certificate = forge.pki.createCertificate();
    certificate.publicKey = forge.pki.publicKeyFromPem(state.publicKey);
    const province = state.address.split(", ")[2];
    var attrs = [
      {
        name: "commonName",
        value: `${state.lastName + state.firstName}`,
      },
      {
        name: "countryName",
        value: "VN",
      },
      {
        shortName: "ST",
        value: province,
      },
    ];
    certificate.setSubject(attrs);
    certificate.setIssuer();
  };
  return (
    <div>
      <p>Họ tên: {state.firstName + " " + state.lastName}</p>
      <p>Số điện thoại: {state.phone}</p>
      <p>Email: {state.email}</p>
      <p>Số căn cước: {state.IdNum}</p>
      <p>Địa chỉ: {state.address}</p>
      <p>Giới tính: {state.gender === "Male" ? "Nam" : "Nữ"}</p>
      <p>Quốc tịch: {state.nationality}</p>
      <p>Loại: {state.isExtend ? "Gia hạn/cấp đổi" : "Cấp mới"}</p>
      {!state.isExtend && (
        <div className="container">
          <div className="row">
            <div className="col">
              <img
                className="img-thumbnail"
                src={imgSrcs?.face}
                alt="face img"
              />
            </div>
            <div className="col">
              <img
                className="col img-thumbnail"
                src={imgSrcs?.CCCD}
                alt="CCCD"
              />
            </div>
            <div className="col">
              <img
                className=" col img-thumbnail"
                src={imgSrcs?.CCCDBack}
                alt="CCCD_Back"
              />
            </div>
          </div>
        </div>
      )}
      <div>
        <button
          type="button"
          className="btn btn-success"
          onClick={signCertificate}
        >
          Accept
        </button>
        <button type="button" className="btn btn-danger ml-10">
          Reject
        </button>
      </div>
    </div>
  );
}

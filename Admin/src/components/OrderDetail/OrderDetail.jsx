import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getImg } from "../../service/imgaes";
import forge from "node-forge";
import { useSelector } from "react-redux";
import { signCertificate as sign, rejectSign } from "../../service/certificate";
import ModalNoti from "./../ModalNoti/index";
import { Modal } from "@mui/material";
export default function OrderDetail() {
  const { state } = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [reason, setReason] = useState("");
  const [openReject, setOpenReject] = useState(false);
  const handleCloseReject = () => {
    setOpenReject(false);
  };
  const handleOpenReject = () => {
    setOpenReject(true);
  };
  const handleReject = () => {
    rejectSign(state._id, reason)
      .then((res) => {
        setOpenReject(false);
        setContent("Từ chối ký thành công");
        setShowModal(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleClose = () => {
    setShowModal(false);
  };
  const handleOpen = () => {
    setShowModal(true);
  };
  const [imgSrcs, setImgSrcs] = useState({});
  const CA = useSelector((state) => state.signature);
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
    const certificate = forge.pki.createCertificate();
    certificate.publicKey = forge.pki.publicKeyFromPem(state.publicKey);
    const province = state.address.split(", ")[2] || state.address;
    const local = state.address.split(",")[1] || state.address;
    var attrs = [
      {
        name: "commonName",
        value: state.lastName + " " + state.firstName,
        valueTagClass: forge.asn1.Type.UTF8,
      },
      {
        name: "countryName",
        value: "VN",
      },
      {
        shortName: "ST",
        value: province,
        valueTagClass: forge.asn1.Type.UTF8,
      },
      {
        shortName: "E",
        value: state.email,
      },
      {
        shortName: "L",
        value: local,
        valueTagClass: forge.asn1.Type.UTF8,
      },
    ];

    const bytes = forge.random.getBytesSync(10);
    const seri = forge.util.bytesToHex(bytes);
    certificate.serialNumber = seri;
    certificate.setSubject(attrs);

    const current = new Date();
    certificate.validity.notBefore = current;

    const exp = new Date();
    if (state.subscription === "standard") {
      // với gói mặc định, thời hạn sẽ là 6 tháng
      exp.setFullYear(exp.getFullYear() + 1);
    } else {
      // với gói pro và sinh viên, thời hạn là 5 năm
      exp.setFullYear(exp.getFullYear + 5);
    }

    certificate.validity.notAfter = exp;

    certificate.setIssuer(CA.cert.subject.attributes);
    certificate.setExtensions([
      {
        name: "basicConstraints",
        cA: false,
      },
      {
        name: "keyUsage",
        digitalSignature: true,
        keyEncipherment: true,
        dataEncipherment: true,
      },
    ]);
    certificate.sign(CA.key, forge.md.sha256.create());
    const certPem = forge.pki.certificateToPem(certificate);
    sign(certPem, state.userId, state.isExtend)
      .then((res) => {
        console.log(res.data);
        setTitle("Thành công");
        setContent("Ký chứng chỉ số thành công");
        setIsDone(true);
        handleOpen();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div
      style={{
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {!state.isExtend && (
        <div
          className="container"
          style={{
            height: "250px",
          }}
        >
          <div className="row">
            <div className="col">
              <label>
                <strong>Ảnh mặt</strong>
              </label>
              <img
                className="img-thumbnail"
                src={imgSrcs?.face}
                alt="face img"
              />
            </div>
            <div className="col">
              <label>
                <strong>Ảnh CCCD mặt trước</strong>
              </label>
              <img
                className="col img-thumbnail"
                src={imgSrcs?.CCCD}
                alt="CCCD"
              />
            </div>
            <div className="col">
              <label>
                <strong>Ảnh CCCD mặt sau</strong>
              </label>
              <img
                className=" col img-thumbnail"
                src={imgSrcs?.CCCDBack}
                alt="CCCD_Back"
              />
            </div>
          </div>
        </div>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          paddingBottom: "1rem",
        }}
      >
        <p>
          <strong>Họ tên:</strong> {state.lastName + " " + state.firstName}
        </p>
        <p>
          <strong>Số điện thoại:</strong> {state.phone}
        </p>
        <p>
          <strong>Email:</strong> {state.email}
        </p>
        <p>
          <strong>Số căn cước:</strong> {state.IdNum}
        </p>
        <p>
          <strong>Địa chỉ:</strong> {state.address}
        </p>
        <p>
          <strong>Giới tính:</strong> {state.gender === "Male" ? "Nam" : "Nữ"}
        </p>
        <p>
          <strong>Quốc tịch:</strong> {state.nationality}
        </p>
        <p>
          <strong>Loại:</strong>{" "}
          {state.isExtend ? "Gia hạn/cấp đổi" : "Cấp mới"}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: "5rem",
          marginTop: "1rem",
        }}
      >
        <button
          type="button"
          className="btn btn-success"
          onClick={signCertificate}
        >
          Chấp nhận
        </button>
        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={() => {
            handleOpenReject();
          }}
        >
          Từ chối
        </button>
      </div>
      <Modal open={openReject}>
        <div
          style={{
            backgroundColor: "white",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "1rem",
            alignItems: "center",
            padding: "2rem",
            borderRadius: "10px",
            width: "30%",
          }}
        >
          <div className="w-100">
            <label for="reject">Nhập lý do từ chối</label>
            <input
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              type="text"
              className="form-control"
              id="reject"
              aria-describedby="emailHelp"
              placeholder="Nhập lý do tại đây ..."
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "1rem",
            }}
          >
            <button onClick={handleReject} className="btn btn-success">
              Từ chối
            </button>
            <button
              className="btn btn-outline-danger"
              onClick={() => {
                handleCloseReject();
              }}
            >
              Huỷ
            </button>
          </div>
        </div>
      </Modal>
      <ModalNoti
        show={showModal}
        handleClose={handleClose}
        isDone={isDone}
        title={title}
        content={content}
      />
    </div>
  );
}

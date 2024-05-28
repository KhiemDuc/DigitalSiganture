import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getImg } from "../../service/imgaes";
export default function OrderDetail() {
  const { state } = useLocation();
  const [imgSrcs, setImgSrcs] = useState({});
  useEffect(() => {
    (async () => {
      try {
        const result = await Promise.all([
          getImg(state.face),
          getImg(state.CCCD),
          getImg(state.CCCDBack),
        ]);
        console.log(result);
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
  return (
    <div>
      <p>Họ tên: {state.firstName + " " + state.lastName}</p>
      <p>Số điện thoại: {state.phone}</p>
      <p>Email: {state.email}</p>
      <p>Số căn cước: {state.IdNum}</p>
      <p>Địa chỉ: {state.address}</p>
      <p>Giới tính: {state.gender === "Male" ? "Nam" : "Nữ"}</p>
      <p>Quốc tịch: {state.nationality}</p>
      <div className="container">
        <div className="row">
          <div className="col">
            <img className="img-thumbnail" src={imgSrcs?.face} alt="face img" />
          </div>
          <div className="col">
            <img className="col img-thumbnail" src={imgSrcs?.CCCD} alt="CCCD" />
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

      <div>
        <button type="button" className="btn btn-success">
          Accept
        </button>
        <button type="button" className="btn btn-danger ml-10">
          Reject
        </button>
      </div>
    </div>
  );
}

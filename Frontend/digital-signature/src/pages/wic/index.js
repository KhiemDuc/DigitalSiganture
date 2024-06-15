import Layout from "../../components/Layout";

const Wic = () => {
  return (
    <Layout
      heading={"Mã hoá công khai là gì"}
      subheading={
        "Mật mã hóa khóa công khai là một dạng mật mã hóa cho phép người sử dụng trao đổi các thông tin mật mà không cần phải trao đổi các khóa chung bí mật trước đó. Mã hoá công khai, hay còn được gọi là mã hoá bất đối xứng, là một phương pháp mã hoá dữ liệu sử dụng hai khóa riêng biệt: khóa công khai và khóa bí mật. Đây là một trong những nền tảng cơ bản của bảo mật thông tin hiện đại, cho phép người dùng bảo vệ dữ liệu và truyền thông tin một cách an toàn qua các mạng không tin cậy. Mã hoá công khai là một cách để giữ bí mật những điều chúng ta muốn giấu kín. Hãy tưởng tượng bạn có một hộp bí mật và chỉ bạn có chìa khóa để mở hộp đó. Bất cứ ai cũng có thể bỏ thư vào hộp, nhưng chỉ bạn mới có thể mở ra và đọc thư. Đó là cách mã hoá công khai hoạt động!"
      }
    >
      <div
        style={{
          textAlign: "left",
          lineHeight: "1.6",
        }}
      >
        <h2>Khóa Bí Mật Và Khóa Công Khai Là Gì?</h2>
        <div
          style={{
            padding: "10px",
          }}
        >
          <h4>Khóa Công Khai (Public Key)</h4>
          <p>
            Khóa công khai là một phần của cặp khóa mã hoá bất đối xứng, được
            chia sẻ công khai và có thể được truy cập bởi bất kỳ ai. Khóa này
            được sử dụng để mã hoá dữ liệu hoặc xác thực danh tính của người
            gửi. Khi một người muốn gửi thông tin bảo mật đến người nhận, họ sẽ
            sử dụng khóa công khai của người nhận để mã hoá dữ liệu. Chỉ có khóa
            bí mật tương ứng mới có thể giải mã thông tin này. Khóa công khai
            giống như một chiếc hộp có ổ khóa mà bất cứ ai cũng có thể sử dụng
            để gửi cho bạn thư bí mật. Mọi người đều có thể nhìn thấy và sử dụng
            chiếc hộp này để bỏ thư vào.
          </p>

          <h4>Khóa Bí Mật (Private Key)</h4>
          <p>
            Khóa bí mật là phần còn lại của cặp khóa và được giữ bí mật bởi chủ
            sở hữu của nó. Khóa bí mật được sử dụng để giải mã dữ liệu đã được
            mã hoá bằng khóa công khai tương ứng. Ngoài ra, nó cũng có thể được
            sử dụng để tạo chữ ký số, giúp xác thực tính toàn vẹn và nguồn gốc
            của thông tin. Khi dữ liệu được mã hoá bằng khóa công khai, chỉ có
            khóa bí mật tương ứng mới có thể giải mã, đảm bảo rằng chỉ người
            nhận dự định mới có thể truy cập nội dung thông tin. Khóa bí mật
            giống như chiếc chìa khóa duy nhất để mở chiếc hộp bí mật đó. Chỉ có
            bạn mới có chiếc chìa khóa này. Vì vậy, khi ai đó bỏ thư vào hộp,
            chỉ bạn mới có thể mở ra và đọc thư bên trong.
          </p>

          <h4>Ví Dụ Dễ Hiểu</h4>
          <p>
            Hãy tưởng tượng bạn và người bạn thân nhất của bạn, Tí, đang chơi
            một trò chơi bí mật. Bạn có một chiếc hộp màu xanh (khóa công khai)
            và một chiếc chìa khóa vàng (khóa bí mật).
          </p>
          <img
            src="../../../static/img/game.png"
            alt="Ví dụ về mã hoá công khai"
            style={{ width: "50%", margin: "auto", display: "block" }}
          />

          <h4
            style={{
              marginTop: "20px",
            }}
          >
            Gửi Thư Bí Mật:
          </h4>
          <ul>
            <li>Tí muốn gửi cho bạn một bức thư bí mật.</li>
            <li>
              Tí sẽ bỏ bức thư vào chiếc hộp màu xanh của bạn và khóa lại.
            </li>
            <li>
              Chiếc hộp này có thể được nhìn thấy bởi bất kỳ ai, nhưng chỉ bạn
              mới có chiếc chìa khóa vàng để mở hộp và đọc bức thư của Tí.
            </li>
          </ul>
          <img
            src="../../../static/img/send.png"
            alt="Ví dụ về mã hoá công khai"
            style={{ width: "50%", margin: "auto", display: "block" }}
          />

          <h4>Đảm Bảo An Toàn:</h4>
          <ul>
            <li>
              Khi bạn nhận được chiếc hộp đã khóa, bạn sẽ dùng chiếc chìa khóa
              vàng của mình để mở ra và đọc thư.
            </li>
            <li>
              Bởi vì chỉ bạn có chiếc chìa khóa vàng, nên không ai khác có thể
              đọc được bức thư đó.
            </li>
          </ul>
        </div>
        <h3>Lợi Ích Của Mã Hoá Công Khai</h3>
        <ul>
          <li>
            <strong>Bảo mật cao:</strong> Chỉ có người có chìa khóa vàng (khóa
            bí mật) mới có thể mở chiếc hộp màu xanh (khóa công khai) và đọc
            được thư.
          </li>
          <li>
            <strong>Xác thực:</strong> Bạn có thể chắc chắn rằng bức thư được
            gửi bởi Tí, vì chỉ có Tí mới biết cách sử dụng chiếc hộp màu xanh
            của bạn.
          </li>
          <li>
            <strong>Dễ dàng chia sẻ:</strong> Bạn có thể đưa chiếc hộp màu xanh
            của mình cho bất kỳ ai để họ có thể gửi thư bí mật cho bạn, nhưng
            chỉ bạn mới có thể mở hộp và đọc thư.
          </li>
        </ul>

        <h3>Ứng Dụng Thực Tế</h3>
        <p>
          Trong cuộc sống, mã hoá công khai giúp chúng ta giữ an toàn cho các bí
          mật. Ví dụ như:
        </p>
        <ul>
          <li>
            <strong>Giao dịch trực tuyến:</strong> Khi bạn mua đồ chơi qua mạng,
            mã hoá công khai giúp giữ an toàn cho thông tin cá nhân của bạn.
          </li>
          <li>
            <strong>Email bảo mật:</strong> Khi gửi email, mã hoá công khai giúp
            bảo vệ nội dung thư để chỉ người nhận mới có thể đọc.
          </li>
        </ul>

        <h3>Kết Luận</h3>
        <p>
          Mã hoá công khai giống như việc sử dụng một chiếc hộp và chìa khóa để
          giữ bí mật an toàn. Nó giúp chúng ta bảo vệ thông tin quan trọng và
          đảm bảo rằng chỉ người có quyền mới có thể truy cập và đọc thông tin
          đó.
        </p>
      </div>
    </Layout>
  );
};
export default Wic;

using Newtonsoft.Json;

namespace CA.Data
{
    public class Transaction
    {
        [JsonProperty("Mã GD")]
        public int MaGD { get; set; }

        [JsonProperty("Mô tả")]
        public string MoTa { get; set; }

        [JsonProperty("Giá trị")]
        public int GiaTri { get; set; }

        [JsonProperty("Ngày diễn ra")]
        public string NgayDienRa { get; set; }

        [JsonProperty("Số tài khoản")]
        public string SoTaiKhoan { get; set; }
    }

    public class Response
    {
        public List<Transaction> data { get; set; }
        public bool error { get; set; }
    }
}

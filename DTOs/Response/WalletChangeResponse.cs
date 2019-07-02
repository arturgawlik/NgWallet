namespace ngWallet.DTOs.Response
{
    public class WalletChangeResponse
    {
        public int Id { get; set; }
        public decimal Value { get; set; }
        public string Date { get; set; }
        public string Description { get; set; }
        public string Color { get; set; }
        public string Category { get; set; }
    }
}
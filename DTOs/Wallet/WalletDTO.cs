namespace wallet.DTOs
{
    public class WalletDTO
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool FastAccess { get; set; }
        public int? DefaultCategoryId { get; set; }
    }
}
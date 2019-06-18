namespace ngWallet.DTOs.WalletChange
{
    public class WalletChangeDTO
    {
        public OperationType OperationType { get; set; }
        public decimal Value { get; set; }
        public string Description { get; set; }
        public int WalletId { get; set; }
    }

    public enum OperationType
    {
        outcome,
        income
    }
}
using System.Collections.Generic;

namespace ngWallet.DTOs.Response
{
    public class WalletResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal CurrentState { get; set; }
        public string Currency { get; set; }
        public int? DefaultCategoryId { get; set; }
        public List<WalletChangeResponse> WalletChanges { get; set; }
    }
}
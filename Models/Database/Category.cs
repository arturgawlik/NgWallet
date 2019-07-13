using System.Collections.Generic;
using wallet.Models.Database;

namespace ngWallet.Models.Database
{
    public class Category
    {
        public int Id { get; set; }
        public int ApplicationUserId { get; set; }
        public string Name { get; set; }
        public string Color { get; set; }
        public ICollection<WalletValueChange> WalletValueChanges { get; set; }
        public ICollection<Wallet> Wallets { get; set; }
    }
}
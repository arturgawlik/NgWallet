using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace wallet.Models.Database
{
    public class Wallet
    {
        public int Id { get; set; }
        public int ApplicationUserId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool FastAccess { get; set; }
        public int? DefaultCategoryId { get; set; }
        public ICollection<WalletValueChange> WalletValueChanges { get; set; }
    }
}
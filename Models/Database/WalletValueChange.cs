using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace wallet.Models.Database
{
    public class WalletValueChange
    {
        public int Id { get; set; }
        public int WalletId { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal ChangeValue { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
    }
}
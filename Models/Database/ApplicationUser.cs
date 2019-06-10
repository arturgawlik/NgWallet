using System.Collections.Generic;

namespace wallet.Models.Database
{
    public class ApplicationUser
    {
        public int Id { get; set; }
        public string FirebaseUserIdentity { get; set; }
        public ICollection<Wallet> Wallets { get; set; }
    }
}
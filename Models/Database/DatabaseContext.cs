using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace wallet.Models.Database
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {
        }   

        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<Wallet> Wallets { get; set; }
        public DbSet<WalletValueChange> WalletValueChanges { get; set; }
    }
}
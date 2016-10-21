using AspTests.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;

namespace AspTests.Models
{
    public static class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new ApplicationDbContext(
                serviceProvider.GetRequiredService<DbContextOptions<ApplicationDbContext>>()))
            {
                // Look for any movies.
                if (context.Film.Any())
                {
                    return;   // DB has been seeded
                }

                context.Film.AddRange(
                     new Film
                     {
                         Title = "Jungle Book",
                         AddedBy = "Isa",
                     },

                     new Film
                     {
                         Title = "Vieux Film",
                         AddedBy = "Mm",
                     }
                );
                context.SaveChanges();
            }
        }
    }
}

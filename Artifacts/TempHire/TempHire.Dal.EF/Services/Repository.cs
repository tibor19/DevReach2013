using System.Data.Entity;
using System.Linq;
using TempHire.DomainModel.Services;

namespace TempHire.Dal.EF.Services
{
    public class Repository<T> : IRepository<T> where T : class
    {
        public Repository(DbContext context)
        {
            Context = context;
        }

        protected DbContext Context { get; private set; }

        public IQueryable<T> All()
        {
            return Context.Set<T>();
        }
    }
}
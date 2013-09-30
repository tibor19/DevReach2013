using System.Linq;

namespace TempHire.DomainModel.Services
{
    public interface IRepository<out T>
    {
        IQueryable<T> All();
    }
}
using System.Web.Http;
using Breeze.WebApi;
using Breeze.WebApi.EF;
using TempHire.Dal.EF;

namespace TempHire.Web.Controllers
{
    [BreezeController]
    [Authorize]
    public class DefaultController : ApiController
    {
        // ~/breeze/Metadata
        [HttpGet]
        public string Metadata()
        {
            return new EFContextProvider<TempHireDbContext>().Metadata();
        }
    }
}
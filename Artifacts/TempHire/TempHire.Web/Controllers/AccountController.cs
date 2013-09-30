using System.Net;
using System.Net.Http;
using System.Security;
using System.Web;
using System.Web.Http;
using System.Web.Security;

namespace TempHire.Web.Controllers
{
    public class AccountController : ApiController
    {
        [HttpPost]
        public void Login(Credential credential)
        {
            Seed();

            if (Membership.ValidateUser(credential.Username, credential.Password))
            {
                FormsAuthentication.SetAuthCookie(credential.Username, false);
            }
            else
            {
                throw new SecurityException("Invalid user name or password");
            }
        }

        [HttpGet]
        [Authorize]
        public HttpResponseMessage Logout()
        {
            FormsAuthentication.SignOut();
            if (HttpContext.Current.Session != null)
            {
                HttpContext.Current.Session.Clear();
            }
            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        private void Seed()
        {
            if (Membership.GetAllUsers().Count != 0)
                return;

            Membership.CreateUser("Admin", "password");
        }
    }
}
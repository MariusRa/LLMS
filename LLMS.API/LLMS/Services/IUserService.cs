using LLMS.Models;
using System.Collections.Generic;


namespace LLMS.Services
{
    public interface IUserService
    {
        IEnumerable<User> GetAllUsers();
        User GetById(string userId);
        User SaveUser(User user);
        User DeleteUser(string userId);
    }
}

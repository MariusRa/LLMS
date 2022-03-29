using LLMS.DAL;
using LLMS.Models;
using System.Collections.Generic;
using System.Linq;

namespace LLMS.Services
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _db;

        public UserService(ApplicationDbContext db)
        {
            _db = db;
        }

       
        public IEnumerable<User> GetAllUsers()
        {
            return _db.Users.Where(u => u.UserRole == "Teacher" || u.UserRole == "Student").ToList();
        }

        public User GetById(string userId)
        {
            return _db.Users.FirstOrDefault(u => u.UserId == userId);
        }

        public User SaveUser(User user)
        {
            _db.Add(user);
            _db.SaveChanges();

            return user;
        }

        public User DeleteUser(string userId)
        {
            var delUser = GetById(userId);
            _db.Users.Remove(delUser);
            _db.SaveChanges();
            return delUser;
        }
    }
}

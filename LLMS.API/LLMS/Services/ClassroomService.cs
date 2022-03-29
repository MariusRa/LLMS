using LLMS.DAL;
using LLMS.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace LLMS.Services
{
    public class ClassroomService : IClassroomService
    {
        private readonly ApplicationDbContext _db;

        public ClassroomService(ApplicationDbContext db)
        {
            _db = db;
        }

        

        public IEnumerable<Classroom> GetAllClassrooms()
        {
            return _db.Classrooms.Include(u => u.Users).OrderByDescending(c => c.IsActive).ToList();
                
        }

        public Classroom GetClassById(string classId)
        {
            return _db.Classrooms.Include(u => u.Users).FirstOrDefault(c => c.ClassroomId == classId);
        }

        public Classroom SaveClassroom(Classroom classroom, string userId)
        {
            var newClassroom = _db.Classrooms.Include(u => u.Users).FirstOrDefault(c => c.ClassroomId == classroom.ClassroomId);

            if(newClassroom == null)
            {
                var user = _db.Users.Where(x => x.UserId == userId).SingleOrDefault();

                classroom.Users = new List<User>()
                {
                    user
                };
            
                _db.Add(classroom);
                _db.SaveChanges();             
            }
            else
            {
                var user = _db.Users.Where(x => x.UserId == userId).SingleOrDefault();

                newClassroom.Users.Add(user);
                _db.SaveChanges();
            }

            return classroom;
        }

        public Classroom SetActive(string id, bool value)
        {
            var classroom = GetClassById(id);

            classroom.IsActive = value;

            _db.SaveChanges();

            return classroom;
        }

        public Classroom DeleteClass(string id)
        {
            var classroom = GetClassById(id);
            
            _db.Classrooms.Remove(classroom);
            _db.SaveChanges();

            return classroom;
        }
    }
}

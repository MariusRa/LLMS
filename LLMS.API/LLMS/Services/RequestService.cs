using LLMS.DAL;
using LLMS.Models;
using System.Collections.Generic;
using System.Linq;

namespace LLMS.Services
{
    public class RequestService : IRequestService
    {
        private readonly ApplicationDbContext _db;

        public RequestService(ApplicationDbContext db)
        {
            _db = db;
        }

        public Request AddNewRequest(Request request)
        {
            var user = _db.Users.FirstOrDefault(u => u.UserId == request.StudentId);
            
            if(user == null || user?.UserRole != "Requestor" && user?.UserRole != "Teacher" && user?.UserRole != "Coordinator")
            {
                
                var newRequest = _db.Requests.FirstOrDefault(r => r.StudentEmail == request.StudentEmail && r.Language == request.Language && r.Semester == request.Semester && r.Approval != "notApproved");
            
                if (newRequest == null)
                {
                    _db.Requests.Add(request);
                    _db.SaveChanges();
                    return request;  
                }
                else
                {
                    return null;
                }
            }
            else
            {
                return null;
            }
       
            
        }

        public IEnumerable<Request> GetAllRequests()
        {
            return _db.Requests.OrderByDescending(r => r.Approval).ToList();
        }

        public IEnumerable<Request> GetAllUserRequests(string userId)
        {
            return _db.Requests.Where(u => u.RequestorId == userId).ToList();
        }

        public Request SetApprovalStatus(int id, string value)
        {
            var request = _db.Requests.FirstOrDefault(r => r.RequestId == id);
            request.Approval = value;

            _db.SaveChanges();

            return request;
        }
    }
}

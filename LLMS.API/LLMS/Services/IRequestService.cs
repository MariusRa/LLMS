using LLMS.Models;
using System.Collections.Generic;

namespace LLMS.Services
{
    public interface IRequestService
    {
      
        Request AddNewRequest(Request request);
        Request SetApprovalStatus(int id, string value);


        IEnumerable<Request> GetAllRequests();
        IEnumerable<Request> GetAllUserRequests(string userId);
    }
}

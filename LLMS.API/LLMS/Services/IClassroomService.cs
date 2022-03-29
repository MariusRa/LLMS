using LLMS.Models;
using System.Collections.Generic;

namespace LLMS.Services
{
    public interface IClassroomService
    {
        IEnumerable<Classroom> GetAllClassrooms();
        Classroom GetClassById(string classId);
        Classroom SaveClassroom(Classroom classroom, string userId);
        Classroom SetActive(string id, bool value);
        Classroom DeleteClass(string id);
    }
}

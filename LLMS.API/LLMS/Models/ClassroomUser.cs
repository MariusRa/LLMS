

namespace LLMS.Models
{
    public class ClassroomUser
    {   
        public string ClassroomId { get; set; }
        public string UserId { get; set; }
        
        public Classroom Classroom { get; set; }
        public User User { get; set; }
        
    }
}

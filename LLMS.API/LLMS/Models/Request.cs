

namespace LLMS.Models
{
    public class Request
    {
        public int RequestId { get; set; }
        public string RequestorId { get; set; }

        public string StudentName { get; set; }
        public string StudentEmail { get; set; }
        public string StudentId { get; set; }
        public string Language { get; set; }
        public string Target { get; set; }
        public string Semester { get; set; }
        public string CostCenter { get; set; }
        public string Comments { get; set; }
        
        public string Approval { get; set; }
    }
}

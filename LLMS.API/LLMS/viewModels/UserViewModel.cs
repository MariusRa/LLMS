using System.ComponentModel.DataAnnotations;

namespace LLMS.viewModels
{
    public class UserViewModel
    {
        [Required]
        public string UserId { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public string UserEmail { get; set; }
        [Required]
        public string UserRole { get; set; }
    }
}

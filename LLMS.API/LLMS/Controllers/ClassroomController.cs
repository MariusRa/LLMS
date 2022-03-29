using LLMS.Models;
using LLMS.Services;
using LLMS.viewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace LLMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Coordinator")]
    public class ClassroomController : ControllerBase
    {
        private readonly IClassroomService _service;

        public ClassroomController(IClassroomService service)
        {
            _service = service;
        }


        [HttpGet]
        public IEnumerable<Classroom> GetClassrooms()
        {
            return _service.GetAllClassrooms();
        }

        [HttpGet("{id}")]
        public IActionResult GetClassroomById(string id)
        {   
            return Ok(_service.GetClassById(id));
        }

        [HttpPost("NewClassroom")]
        public IActionResult AddClassroom(ClassroomViewModel model)
        {
            if (ModelState.IsValid)
            {
                var userList = model.Users;

                foreach (var user in userList)
                {
                    var userId = user.UserId;
                    
                    Classroom classroom = new Classroom()
                                    {
                                        ClassroomId = model.ClassroomId,
                                        Language = model.Language,
                                        LanguageLevel = model.LanguageLevel,
                                        IsActive = true
                                    };

                   var result = _service.SaveClassroom(classroom, userId);
                }
            }
            return Ok("Classroom created");
        }

        [HttpPut("{id}")]
        public IActionResult UpdateAprroval(string id, [FromBody] ClassroomViewModelApproval model)
        {
            return Ok( _service.SetActive(id, model.IsActive));
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteClassroom(string id)
        {
            _service.DeleteClass(id);
            return Ok("Class delete");
        }

    }
}

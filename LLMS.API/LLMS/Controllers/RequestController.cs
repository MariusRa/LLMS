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
    
    public class RequestController : ControllerBase
    {
        private readonly IRequestService _service;

        public RequestController(IRequestService service)
        {
            _service = service;
        }


        [HttpPost]
        [Route("NewRequest")]
        [Authorize(Roles = "Coordinator, Requestor")]
        public IActionResult NewRequest(RequestViewModel model)
        {
            if (ModelState.IsValid)
            {
                var userId = User.FindFirst("http://schemas.microsoft.com/identity/claims/objectidentifier")?.Value;
                
                Request request = new Request()
                {
                    RequestorId = userId,
                    StudentName = model.StudentName,
                    StudentEmail = model.StudentEmail,
                    StudentId = model.StudentId,
                    Language = model.Language,
                    CostCenter = model.CostCenter,
                    Target = model.Target,
                    Semester = model.Semester,
                    Comments = model.Comments,
                    Approval = model.Approval
                };
                
                var result = _service.AddNewRequest(request);
                
                if (result != null)
                {
                    return Ok(request);
                }
                else
                {
                    return NotFound();
                }
                
            }

            return Ok();
               
        }


        [HttpGet]
        [Route("Requests")]
        [Authorize(Roles = "Coordinator")]
        public IEnumerable<Request> GetRequests()
        {
            return _service.GetAllRequests();
        }

        [HttpGet]
        [Route("RequestsU")]
        public IEnumerable<Request> GetUserRequests()
        {
            var userId = User.FindFirst("http://schemas.microsoft.com/identity/claims/objectidentifier").Value;
            return _service.GetAllUserRequests(userId);
        }

        [HttpPut]
        [Route("NewRequest/{id}")]
        [Authorize(Roles = "Coordinator")]
        public IActionResult UpdateAprroval(int id, [FromBody] RequestViewModelApproval model)
        {
            return Ok(_service.SetApprovalStatus(id, model.Approval));
        }
    }
}

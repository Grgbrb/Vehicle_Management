using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using API.Data;
using API.Entities;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    
    [ApiController]
    [Route("api/[controller]")]
    public class MotorcyclesController : ControllerBase
    {
        private readonly DataContext _context;
        public MotorcyclesController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]

        public async Task<ActionResult<IEnumerable<Motor>>> GetMotorCycles(){

            var motorcycles = await _context.Motorcycles.ToListAsync();

            return Ok(motorcycles);
        }
         [HttpGet("{id}")]

        public async Task<ActionResult<Motor>> GetMotocycle(int id)
        {

            var motorcycle = await _context.Motorcycles.FindAsync(id);

            return Ok(motorcycle);
        }
    }
}

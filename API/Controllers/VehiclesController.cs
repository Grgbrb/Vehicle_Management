using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using API.Data;
using API.Entities;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using API.Interfaces;
using API.Dtos;
using Microsoft.AspNetCore.Authorization;
using System.Data;


namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VehiclesController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IVehicleService _vehicleService;
        public VehiclesController(DataContext context,IVehicleService vehicleService)
        {
            _vehicleService = vehicleService;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Vehicle>>> GetVehicles()
        {
            var vehicles = await _vehicleService.GetVehiclesAsync();
            return Ok(vehicles);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Vehicle>> GetVehicle(int id)
        {
            var vehicle = await _vehicleService.GetVehicleAsync(id);
            return Ok(vehicle);
        }
       
        [HttpPost]
        public async Task<ActionResult<Vehicle>> CreateVehicle(CreateVehicleDto createVehicleDto)
        {
            var vehicleIds =_context.Vehicles.Count();
            for (int i=1; i<= vehicleIds;i++){
                var vehicle = await _context.Vehicles.FindAsync(i);
                    if (vehicle != null){
                        if (vehicle.Vin == createVehicleDto.Vin || vehicle.LicensePlate == createVehicleDto.LicensePlate)
                        return BadRequest("This vehicle exists already");
                    }  
            }   
            
            var newvehicle = new Vehicle{
               
                Color = createVehicleDto.Color,
                MaxSpeed = createVehicleDto.MaxSpeed,
                NumberOfDoors = createVehicleDto.NumberOfDoors,
                LicensePlate = createVehicleDto.LicensePlate,
                Model = createVehicleDto.Model,
                Vin = createVehicleDto.Vin,
                Manufacturer = createVehicleDto.Manufacturer
            };
            
            if (newvehicle != null){
                await _vehicleService.AddVehicleAsync(newvehicle);
            }
            return Ok("Vehicle Added");
        }

        [HttpPut("update-vehicle/")]
        public async Task<ActionResult<Vehicle>> UpdateVehicle(Vehicle vehicle)
        {
            
            var checkVinExists = await _context.Vehicles.AsNoTracking().Where(x => x.Vin == vehicle.Vin).FirstOrDefaultAsync();
            var checkLicensePlateExists = await _context.Vehicles.AsNoTracking().Where(x => x.LicensePlate == vehicle.LicensePlate).FirstOrDefaultAsync();
              
            if (vehicle.Id == 0) return BadRequest("You must chose a vehicle Id");
          
            if (checkVinExists != null && checkVinExists.Vin == vehicle.Vin && checkVinExists.Id != vehicle.Id) return BadRequest("You cannot change a different vehicle's Vin");
            
            if (checkLicensePlateExists != null && checkLicensePlateExists.LicensePlate == vehicle.LicensePlate && checkLicensePlateExists.Id != vehicle.Id) return BadRequest("You cannot change a different vehicle's License Plate");

            if (vehicle.Id != 0){
                _vehicleService.updateVehicle(vehicle);    
                return Ok("Vehicle Updated");
            }  
            return BadRequest("Vehicle failed to update!");  
        }

        [HttpDelete("delete-vehicle")]
        public async Task<ActionResult<Vehicle>> DeleteVehicle(int id)
        {
            var vehicle = await _context.Vehicles.FindAsync(id);
            if (vehicle == null) return BadRequest("This vehicle doesn't exist");
            await _vehicleService.deleteVehicleAsync(vehicle);
            return Ok("Vehicle Deleted");
        }      
    }
}
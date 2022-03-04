using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Interfaces;
using API.Entities;
using Microsoft.EntityFrameworkCore;


namespace API.Data
{
    public class vehiclerepository : IVehicleService
    
    {  
        private readonly DataContext _context;
        public vehiclerepository(DataContext context)
        {
            _context = context;
        }
        public async Task<Vehicle> AddVehicleAsync(Vehicle vehicle){

            await _context.Vehicles.AddAsync(vehicle);
            await _context.SaveChangesAsync();
            return vehicle;
        }
        public void updateVehicle(Vehicle vehicle){
            
            _context.Update(vehicle);
            _context.SaveChangesAsync();
        }
        public async Task<Vehicle> deleteVehicleAsync(Vehicle vehicle)
        {
            _context.Vehicles.Remove(vehicle);
            await _context.SaveChangesAsync();
            return vehicle;
        }
        public async Task<IEnumerable<Vehicle>> GetVehiclesAsync()
        {
            var vehicles = await _context.Vehicles.ToListAsync();
            return vehicles;
        }
        public async Task<Vehicle> GetVehicleAsync(int id)
        {
            return await _context.Vehicles.FindAsync(id);           
        }
    }
}
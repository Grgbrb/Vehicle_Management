using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Interfaces;
using API.Entities;
using Microsoft.EntityFrameworkCore;
using API.Helpers;

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
        public async Task<PagedList<Vehicle>> GetVehiclesAsync(VehicleParams vehicleParams)
        {
            var query = _context.Vehicles.Include(p =>p.Photos).AsNoTracking();

            return await PagedList<Vehicle>.CreateAsync(query,vehicleParams.PageNumber,vehicleParams.pageSize);
        }
        public async Task<Vehicle> GetVehicleAsync(int id)
        {
            return await _context.Vehicles.Include(p =>p.Photos)
            .SingleOrDefaultAsync(x => x.Id == id);
        }

          public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

    }
}
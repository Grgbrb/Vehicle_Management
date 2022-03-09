using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IVehicleService  
    {
        Task<Vehicle> AddVehicleAsync(Vehicle vehicle);
        public void  updateVehicle(Vehicle vehicle);
        Task<Vehicle> deleteVehicleAsync(Vehicle vehicle);
        Task<PagedList<Vehicle>> GetVehiclesAsync(VehicleParams vehicleParams);
        Task<Vehicle> GetVehicleAsync(int id);
    }
}
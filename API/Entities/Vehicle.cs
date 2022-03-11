using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class Vehicle
    {
        [Key]
        public int Id { get; set; }
        public string Color { get; set; }
        public int MaxSpeed { get; set; }
        public int NumberOfDoors { get; set; }
        public int NumberOfWheels { get; set; }
        public string Model { get; set; }
        public string Manufacturer { get; set; }
        public int Vin { get; set; }
        public string LicensePlate { get; set; }
        public ICollection<Photo> Photos{ get; set;}

    }
}
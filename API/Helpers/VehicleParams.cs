using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Helpers
{
    public class VehicleParams
    {
        private const int MaxPageSize = 50;

        public int PageNumber { get; set; } = 1;

        private int _pageSize = 8;

        public int pageSize{
            get => _pageSize;
            set => _pageSize = (value> MaxPageSize)? MaxPageSize : value;
        }
    }
}
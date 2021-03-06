using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Helpers;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config )
        {
            services.Configure<CloudinarySettings>(config.GetSection("CloudinarySettings"));
            return services;   

        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            //Define an mapper, first paran is the class from where to get the values, second param is to get the values to map into
           //in this case is map an Activity into an Activity
            CreateMap<Activity, Activity>();
        }
    }
}
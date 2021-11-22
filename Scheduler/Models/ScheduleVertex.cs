using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.Models
{
    public class ScheduleVertex : Vertex
    {
        ScheduleModel value;

        public override string ToString()
        {
            return "";
        }
        //{
        //    StringBuilder allNeighbors = new StringBuilder("");
        //    allNeighbors.Append(value + ": ");
        //    foreach (Vertex<T> neighbor in neighbors)
        //    {
        //        allNeighbors.Append(neighbor.value + "  ");
        //    }
        //    return allNeighbors.ToString();
        //}

        public override bool IsConnection(Vertex otherVertex)
        {
            return true;
        }

        public override string GetValue()
        {
            return "";
        }


    }
}

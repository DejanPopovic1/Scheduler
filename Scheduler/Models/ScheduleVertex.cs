using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Scheduler.Models
{
    public class ScheduleVertex : Vertex
    {
        public ScheduleModel scheduleModelValue;

        public ScheduleVertex(ScheduleModel sm)
        {
            scheduleModelValue = sm;
        }

        public override string ToString()
        {
            StringBuilder allNeighbors = new StringBuilder("");
            allNeighbors.Append(scheduleModelValue + ": ");
            foreach (Vertex neighbor in Neighbors)
            {
                allNeighbors.Append(neighbor.GetValue() + "  ");
            }
            return allNeighbors.ToString();
        }

        public override bool IsConnection(Vertex otherVertex)
        {
            if (scheduleModelValue.isScheduleOverlap(((ScheduleVertex)otherVertex).scheduleModelValue))
            {
                return true;
            }
            return false;
        }

        public override string GetValue()
        {
            return scheduleModelValue.ToString();
        }
    }
}

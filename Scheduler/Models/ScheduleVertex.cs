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

        public override bool IsConnection(Vertex otherVertex)
        {
            if (scheduleModelValue.IsScheduleOverlap(((ScheduleVertex)otherVertex).scheduleModelValue))
            {
                return true;
            }
            return false;
        }

        public override string ToString()
        {
            return scheduleModelValue.ToString();
        }
    }
}

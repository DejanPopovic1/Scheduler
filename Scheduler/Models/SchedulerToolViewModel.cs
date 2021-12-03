using Scheduler.Data;
using System;
using System.Collections.Generic;

namespace Scheduler.Models
{
    public partial class SchedulerToolViewModel
    {
        public int NumberOfSchedulingUsers { get; set; }
        public int TotalMinutesTravelledForTheNextDay { get; set; }

        public List<int> RequiredResourcesPerDay { get; set; }
        public List<int> KmPerDay { get; set; }
        public List<int> DistancePerDay { get; set; }

        public Location HubLocation { get; set; }

        public virtual List<BookingAssignment> BookingAssignments { get; set; }

        public SchedulerToolViewModel()
        {
            BookingAssignments = new List<BookingAssignment>();
        }
    }

    public partial class BookingAssignment
    {
        public int AssignedResourceNumber { get; set; }
        //TimeSpan DepartureTime { get; set; }
        //TimeSpan ReturnTime { get; set; }

        public string DepartureTime { get; set; }
        public string ReturnTime { get; set; }

        public BookingAssignment()
        {

        }

        public BookingAssignment(ScheduleVertex scheduledVertex)
        {
            AssignedResourceNumber = scheduledVertex.Colour;
            //DepartureTime = scheduledVertex.scheduleModelValue.StartTime;
            //ReturnTime = scheduledVertex.scheduleModelValue.EndTime;
            var test1 = scheduledVertex.scheduleModelValue.StartTime.Ticks;
            var test2 = scheduledVertex.scheduleModelValue.EndTime.Ticks;
            DepartureTime = new DateTime(scheduledVertex.scheduleModelValue.StartTime.Ticks).ToString("HH:mm");
            ReturnTime = new DateTime(scheduledVertex.scheduleModelValue.EndTime.Ticks).ToString("HH:mm");
        }
    }
}

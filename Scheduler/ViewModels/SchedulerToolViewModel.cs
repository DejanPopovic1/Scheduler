using Scheduler.Models;
using System;
using System.Collections.Generic;

namespace Scheduler.ViewModels
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
            RequiredResourcesPerDay = new List<int>();
        }
    }

    public partial class BookingAssignment
    {
        public int ResourceNumber { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public BookingAssignment()
        {

        }

        public BookingAssignment(ScheduleVertex scheduledVertex)
        {
            ResourceNumber = scheduledVertex.Colour;
            StartTime = new DateTime(scheduledVertex.scheduleModelValue.StartTime.Ticks).ToString("HH:mm");
            EndTime = new DateTime(scheduledVertex.scheduleModelValue.EndTime.Ticks).ToString("HH:mm");
        }
    }
}

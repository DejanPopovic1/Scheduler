using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.Models
{
    public class BookingDateAndDuration
    {
        public DateTime BookingDate { get; set; }
        public TimeSpan BookingDuration { get; set; }
        public BookingDateAndDuration(DateTime bookingDate, TimeSpan bookingDuration)
        {
            BookingDate = bookingDate;
            BookingDuration = bookingDuration;
        }
    }
}

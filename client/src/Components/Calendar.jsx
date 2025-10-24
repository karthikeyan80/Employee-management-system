import calendar from "../assets/calendar.png"
const Calendar = () => {
  return (
    <div className='flex flex-row opacity-50 items-center space-x-2'>
        <img src={calendar} className='h-6 w-6' />
        <p>Calendar</p>
    </div>
  )
}

export default Calendar
import React, {useEffect, useState} from 'react';
import s from './SessionCalendar.module.css'
import Calendar from 'react-calendar';

const SessionCalendar = ({freeSessions, selectedDate, setSelectedDate, setSelectedTime}) => {

    const [date, setDate] = useState(new Date());

    const [selectedTimes, setSelectedTimes] = useState([]);

    const [activeIndex, setActiveIndex] = useState(null);

    // const [selectedDate, setSelectedDate] = useState(null);

    console.log("selectedDate: ", selectedDate);

    const handleItemClick = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
        setSelectedTime(selectedTimes[index]);
    };

    useEffect(()=>{
        setActiveIndex(0);
        setSelectedTime(selectedTimes[0]);
    },[date])

    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 20);

    const formatShortWeekday = (locale, date) => {
        return date.toLocaleDateString(locale, {weekday: 'short'}).charAt(0).toUpperCase() + date.toLocaleDateString(locale, {weekday: 'short'}).slice(1);
    };

    const customFormatMonthYear = (locale, date) => {
        const month = date.toLocaleDateString(locale, {month: 'long'});
        const year = date.getFullYear();
        return `${month} ${year}`;
    };

    const tileDisabled = ({date}) => {
        // Найти объект в массиве freeSessions, соответствующий текущей дате
        const session = freeSessions.find(session => (
            date.getDate() === session.day.getDate() &&
            date.getMonth() === session.day.getMonth() &&
            date.getFullYear() === session.day.getFullYear()
        ));

        // Если нет сессии для текущей даты, либо если все времена заняты, сделать дату недоступной
        return !session || session.times.length === 0;
    };

    const handleDateChange = (newDate) => {
        setDate(newDate);
        setSelectedDate(newDate);
        const session = freeSessions.find(session => (
            newDate.getDate() === session.day.getDate() &&
            newDate.getMonth() === session.day.getMonth() &&
            newDate.getFullYear() === session.day.getFullYear()
        ));

        if (session) {
            setSelectedTimes(session.times);
        } else {
            setSelectedTimes([]);
        }
    };
    const formatDate = (date) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = new Intl.DateTimeFormat('ru-RU', options).format(date);

        const words = formattedDate.split(' ');

        const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));

        capitalizedWords.pop();
        capitalizedWords.pop();

        return capitalizedWords.join(' ');
    };

    return (
        <div>
            <div className={s.container}>
                <Calendar
                    onChange={handleDateChange}
                    value={date}
                    next2Label={false}
                    prev2Label={false}
                    minDate={new Date()}
                    maxDate={maxDate}
                    formatShortWeekday={formatShortWeekday}
                    showNeighboringMonth={false}
                    formatMonthYear={customFormatMonthYear}
                    minDetail={'month'}
                    tileDisabled={tileDisabled}
                    tileClassName={({ date, view }) =>
                        view === 'month' && selectedDate && date.getTime() === selectedDate.getTime() ? 'selected-calendar-date' : ''
                    }
                />
                <div className={s.selectedDate}>
                    <p>{selectedTimes.length > 0 && formatDate(date)}</p>
                </div>
                <div className={s.sessionsContainer}>
                    {selectedTimes.length > 0 && (
                        <ul className={s.sessions}>
                            {selectedTimes.map((time, index) => (
                                <div
                                    key={index}
                                    className={`${s.sessionItem} ${index === activeIndex ? s.active : ''}`}
                                    onClick={() => handleItemClick(index)}
                                >
                                    <p>{time}</p>
                                </div>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SessionCalendar;
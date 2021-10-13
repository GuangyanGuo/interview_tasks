import { useState } from 'react';
import { CalendarComponent, ChangedEventArgs } from '@syncfusion/ej2-react-calendars';

type changeDateFunc = (d: Date) => void;

const Calendar = ({changeDate, deliveryDate}:{changeDate: changeDateFunc, deliveryDate: Date}) => {
  const [newDate, setNewDate] = useState(deliveryDate);

  const closeModal = (change: boolean) => {
    const interval = setInterval(() => {
      const modalDiv: HTMLElement | null = document.querySelector('.ReactModal__Overlay.ReactModal__Overlay--after-open');
      if (modalDiv) {
        clearInterval(interval);
        modalDiv.style.height = '0px';
        modalDiv.style.transition = 'height 1s';
      }
    }, 500);
    if (change) {
      changeDate(newDate);
    }
  }
  
  const onChange = (args: ChangedEventArgs) => {
    if (args.value) {
      setNewDate(new Date(args.value));
    }
  }

  return (
    <div className="calendar">
      <CalendarComponent change={onChange} />
      <div className="footer-btn">
        <div className="cancel" role="button" tabIndex={0} onClick={() => closeModal(false)}>CANCEL,<br />DON'T CHANGE</div>
        <div className="change-date" role="button" tabIndex={0} onClick={() => closeModal(true)}>CHANGE DATE</div>
      </div>
    </div>)
}

export default Calendar;

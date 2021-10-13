import { useState } from 'react';
import ReactModal from 'react-modal';

import './styles/App.scss';
import './styles/Calender.scss';


import icoVan from './van.svg';
import icoCalendar from './calendar.svg';
import Calendar from './components/Calender';

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  const animateModalIn = () => {
    setShowModal(true);
    
    const interval = setInterval(() => {
      const modalEle: HTMLElement | null = document.querySelector('.ReactModal__Overlay.ReactModal__Overlay--after-open');
      if (modalEle) {
        clearInterval(interval);
        modalEle.style.height = '100vh';
        modalEle.style.transition = 'height 1s';
        modalEle.addEventListener('click', (e:Event) => {
          
          if (e && e.target && e.target) {
            if (e.target instanceof HTMLDivElement) {
              if (e.target.classList.contains('calendar-modal')) {
                setShowModal(false);
              }
            }
          }
        });
      }
    }, 500);  
  }
  const removeModal = () => {
    setShowModal(false);
  }
  const changeDate = (date: Date) => {
    setDeliveryDate(date);
  }
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const chosenDate = `${DAYS[deliveryDate.getDay()]} ${MONTHS[deliveryDate.getMonth()]} ${deliveryDate.getDate()}`;
  return (
    <div className="App">
      <div className="para">
        <p>Choose your delivery day<span>
        Delivery is always free</span></p>
      </div>
      <div className="calendar-btn">
        <div className="calendar-btn-left">
          <div className="calendar-btn-left-upper">{chosenDate}</div>
          <div className="calendar-btn-left-lower">
            <img src={icoVan} alt="Van" className="van" />
            <div className="calendar-btn-left-lower-word">Earlist delivery</div>
          </div>
        </div>
        <div className="calendar-btn-right" role="button" tabIndex={-1} onClick={animateModalIn}>
          <img src={icoCalendar} alt="calendar" className="calendar-btn-right-upper" />
          <div className="selected-date">{deliveryDate.getDate()}</div>
          <div className="calendar-btn-right-lower">
            <div className="calendar-btn-right-lower-word">Change </div>
            <span className="calendar-btn-right-lower-arrow"> &gt;</span>
          </div>
        </div>
      </div>
      {showModal && (
        <ReactModal
          isOpen={showModal}
          closeTimeoutMS={0}
          ariaHideApp
          shouldCloseOnOverlayClick
          role="calendar"
          style={{
            overlay: {
              zIndex: 1000001,
            },
          }}
          className={{
            base:'calendar-modal',
            afterOpen: 'calendar-modal',
            beforeClose: 'calendar-modal',
          }}
        >
        <Calendar changeDate={changeDate} deliveryDate={deliveryDate} removeModal={removeModal} />
      </ReactModal>)}
    </div>
  )
}

export default App
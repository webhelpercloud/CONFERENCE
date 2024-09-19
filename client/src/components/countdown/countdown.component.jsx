import React from 'react'

import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { Container , Row , Col } from 'react-bootstrap'

import './countdown.styles.scss'

const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

const timerProps = {
  isPlaying: true,
  size: 120,
  strokeWidth: 6
};

const renderTime = (dimension, time) => {
  return (
    <div className="time-wrapper">
      <div className="time">{time}</div>
      <div className="dimension">{dimension}</div>
    </div>
  );
};

const Countdown = ({date}) => {
  const stratTime = Date.now() / 1000; 
  const endTime = new Date(date).getTime() / 1000

  const remainingTime = endTime - stratTime;
  const days = Math.ceil(remainingTime / daySeconds);
  const daysDuration = days * daySeconds;
  return(
    <Container className="time-container" >
      <Row>
        <Col>
          <CountdownCircleTimer
          {...timerProps}
          colors={[["#0275d8"]]}
          duration={daysDuration}
          initialRemainingTime={remainingTime}
        >
          {({ elapsedTime }) =>
            renderTime("days", getTimeDays(daysDuration - elapsedTime))
          }
        </CountdownCircleTimer>
      </Col>
      <Col>
        <CountdownCircleTimer
        {...timerProps}
        colors={[["#0275d8"]]}
        duration={daySeconds}
        initialRemainingTime={remainingTime % daySeconds}
        onComplete={(totalElapsedTime) => [
          remainingTime - totalElapsedTime > hourSeconds
        ]}
        >
        {({ elapsedTime }) =>
          renderTime("hours", getTimeHours(daySeconds - elapsedTime))
        }
        </CountdownCircleTimer>      
      </Col>
      <Col>
        <CountdownCircleTimer
        {...timerProps}
        colors={[["#0275d8"]]}
        duration={hourSeconds}
        initialRemainingTime={remainingTime % hourSeconds}
        onComplete={(totalElapsedTime) => [
          remainingTime - totalElapsedTime > minuteSeconds
        ]}
      >
        {({ elapsedTime }) =>
          renderTime("minutes", getTimeMinutes(hourSeconds - elapsedTime))
        }
        </CountdownCircleTimer>      
      </Col>
      <Col>
        <CountdownCircleTimer
          {...timerProps}
          colors={[["#0275d8"]]}
          duration={minuteSeconds}
          initialRemainingTime={remainingTime % minuteSeconds}
          onComplete={(totalElapsedTime) => [
            remainingTime - totalElapsedTime > 0
          ]}
        >
          {({ elapsedTime }) =>
            renderTime("seconds", getTimeSeconds(elapsedTime))
          }
        </CountdownCircleTimer>      
      </Col>

      </Row>
    </Container>
  )
}

const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;
const getTimeDays = (time) => (time / daySeconds) | 0;

export default Countdown
import React, { useState, useEffect } from 'react';
import './TrafficLightSimulator.css';

type LightColor = 'red' | 'yellow' | 'green';
type Direction = 'north' | 'south' | 'east' | 'west';

interface TrafficLight {
  color: LightColor;
  direction: Direction;
  greenDuration: number;
}

const TrafficLightSimulator = () => {
  const YELLOW_DURATION = 1000;
  const DEFAULT_GREEN_DURATION = 5000;

  const [trafficLights, setTrafficLights] = useState<TrafficLight[]>([
    { direction: 'north', color: 'red', greenDuration: DEFAULT_GREEN_DURATION },
    { direction: 'south', color: 'red', greenDuration: DEFAULT_GREEN_DURATION },
    { direction: 'east', color: 'red', greenDuration: DEFAULT_GREEN_DURATION },
    { direction: 'west', color: 'red', greenDuration: DEFAULT_GREEN_DURATION },
  ]);

  const [activeDirection, setActiveDirection] = useState<Direction>('north');
  const [isRunning, setIsRunning] = useState(true);

  const updateGreenDuration = (direction: Direction, duration: number) => {
    setTrafficLights((prevLights) =>
      prevLights.map((light) =>
        light.direction === direction
          ? { ...light, greenDuration: duration * 1000 }
          : light
      )
    );
  };

  const getNextDirection = (current: Direction): Direction => {
    const order: Direction[] = ['north', 'east', 'south', 'west'];
    const currentIndex = order.indexOf(current);
    return order[(currentIndex + 1) % order.length];
  };

  useEffect(() => {
    if (!isRunning) return;

    const currentLight = trafficLights.find(
      (light) => light.direction === activeDirection
    )!;

    setTrafficLights((prevLights) =>
      prevLights.map((light) => ({
        ...light,
        color: light.direction === activeDirection ? 'green' : 'red',
      }))
    );

    const yellowTimer = setTimeout(() => {
      setTrafficLights((prevLights) =>
        prevLights.map((light) => ({
          ...light,
          color: light.direction === activeDirection ? 'yellow' : 'red',
        }))
      );
    }, currentLight.greenDuration);

    const nextDirectionTimer = setTimeout(() => {
      setActiveDirection(getNextDirection(activeDirection));
    }, currentLight.greenDuration + YELLOW_DURATION);

    return () => {
      clearTimeout(yellowTimer);
      clearTimeout(nextDirectionTimer);
    };
  }, [activeDirection, isRunning]);

  return (
    <div
      className='simulator-container'
      role='main'
      aria-label='Traffic Light Simulator'
    >
      <h1>Borneo Traffic Light Simulator</h1>

      <div
        className='simulator-layout'
        role='region'
        aria-labelledby='simulator-title'
      >
        <div className='simulator-left'>
          <div
            className='traffic-grid'
            role='group'
            aria-label='Traffic intersection'
          >
            <div className='grid-cell north'>
              <TrafficLightComponent
                direction='north'
                light={trafficLights.find((l) => l.direction === 'north')!}
              />
            </div>

            <div className='grid-cell west'>
              <TrafficLightComponent
                direction='west'
                light={trafficLights.find((l) => l.direction === 'west')!}
              />
            </div>

            <div
              className='grid-cell intersection'
              role='region'
              aria-label='Center of intersection'
            >
              Intersection
            </div>

            <div className='grid-cell east'>
              <TrafficLightComponent
                direction='east'
                light={trafficLights.find((l) => l.direction === 'east')!}
              />
            </div>

            <div className='grid-cell south'>
              <TrafficLightComponent
                direction='south'
                light={trafficLights.find((l) => l.direction === 'south')!}
              />
            </div>
          </div>
        </div>

        <div
          className='simulator-right'
          role='complementary'
          aria-label='Simulation controls'
        >
          <div
            className='control-panel'
            role='group'
            aria-label='Simulation control buttons'
          >
            <button
              onClick={() => setIsRunning(!isRunning)}
              className='control-button'
              aria-pressed={isRunning}
              aria-label={`${isRunning ? 'Pause' : 'Start'} simulation`}
            >
              {isRunning ? 'Pause' : 'Start'}
            </button>
          </div>

          <div
            className='duration-controls'
            role='group'
            aria-label='Traffic light duration controls'
          >
            {trafficLights.map((light) => (
              <div
                key={light.direction}
                className='duration-control'
                role='group'
                aria-label={`${light.direction} light controls`}
              >
                <h3>{light.direction} Light</h3>
                <label
                  role='group'
                  aria-label={`${light.direction} light controls`}
                >
                  Green Duration (seconds):
                  <input
                    type='number'
                    min='1'
                    max='20'
                    value={light.greenDuration / 1000}
                    onChange={(e) =>
                      updateGreenDuration(
                        light.direction,
                        Number(e.target.value)
                      )
                    }
                    aria-label={`Set green light duration for ${light.direction} direction`}
                  />
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const TrafficLightComponent: React.FC<{
  direction: Direction;
  light: TrafficLight;
}> = ({ direction, light }) => {
  return (
    <div
      className='traffic-light'
      role='region'
      aria-label={`Traffic light for ${direction} direction`}
    >
      <div className='direction-label' aria-hidden='true'>
        {direction}
      </div>
      <div
        className='light-container'
        role='status'
        aria-label={`Current signal is ${light.color}`}
      >
        <div
          className={`light red ${light.color === 'red' ? 'active' : ''}`}
          role='presentation'
          aria-hidden='true'
        />
        <div
          className={`light yellow ${light.color === 'yellow' ? 'active' : ''}`}
          role='presentation'
          aria-hidden='true'
        />
        <div
          className={`light green ${light.color === 'green' ? 'active' : ''}`}
          role='presentation'
          aria-hidden='true'
        />
      </div>
    </div>
  );
};

export default TrafficLightSimulator;

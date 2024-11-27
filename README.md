# Borneo Traffic Light Simulator 🚦

A React-based traffic light simulation system that manages traffic flow at a four-road intersection. Built with TypeScript and modern web technologies, featuring real-time visualization and configurable timing controls.

## Website - https://trafficsimulatortask.netlify.app/

## 🌟 Features

- Interactive simulation of a four-way intersection traffic light system
- Configurable green light duration for each direction (1-20 seconds)
- Real-time visual feedback with color transitions
- Pause/Resume functionality
- Mobile-responsive design
- Fully accessible interface with ARIA support

## 🛠️ Technologies

- React 18
- TypeScript
- CSS3 (Flexbox & Grid)
- ARIA for accessibility

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/Atul1307/borneoTask.git
```

2. Navigate to project directory

3. Install dependencies

```bash
npm install
# or
yarn install
```

4. Start the development server

```bash
npm start
# or
yarn start
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎯 Project Structure

```
src/
├── components/
│   ├── TrafficLightSimulator.tsx
│   └── TrafficLightSimulator.css
```

## 💡 How It Works

### Core Components

#### Traffic Light Cycle

```typescript
type LightColor = 'red' | 'yellow' | 'green';
type Direction = 'north' | 'south' | 'east' | 'west';
```

- Each traffic light follows the sequence: green → yellow → red
- Yellow light duration: Fixed at 1 second
- Green light duration: Configurable (default: 5 seconds)
- Direction rotation: Clockwise (North → East → South → West)

### State Management

```typescript
interface TrafficLight {
  color: LightColor;
  direction: Direction;
  greenDuration: number;
}

const [trafficLights, setTrafficLights] = useState<TrafficLight[]>([...]);
const [activeDirection, setActiveDirection] = useState<Direction>('north');
const [isRunning, setIsRunning] = useState(true);
```

## 🎨 Key Features Implementation

### Traffic Light Control

```typescript
useEffect(() => {
  if (!isRunning) return;

  const yellowTimer = setTimeout(() => {}, currentLight.greenDuration);

  const nextDirectionTimer = setTimeout(() => {},
  currentLight.greenDuration + YELLOW_DURATION);

  return () => {
    clearTimeout(yellowTimer);
    clearTimeout(nextDirectionTimer);
  };
}, [activeDirection, isRunning]);
```

## ♿ Accessibility Features

- Semantic HTML structure with ARIA roles
- Screen reader friendly interface
- Keyboard navigation support
- Status announcements for light changes
- High contrast visual indicators

## 🔧 Configuration

### Adjusting Light Durations

- Green light: 1-20 seconds (configurable via UI)
- Yellow light: 1 second (constant)
- Red light: Automatically calculated

## 📱 Responsive Design

The simulator is fully responsive and works across:

- Desktop browsers
- Tablets
- Mobile devices

## 👥 Author

Your Name - [katul2015@gmail.com](mailto:katul2015@gmail.com)

Project Link: [https://github.com/Atul1307/borneoTask](https://github.com/Atul1307/borneoTask)

---

---
sidebar_position: 2
custom_edit_url: null
---

# Module 1: Robotic Nervous System (ROS 2)

<div class="module-1-bg">

This chapter covers the first module of the platform: Robotic Nervous System (ROS 2).

import AnimatedCard from '@site/src/components/AnimatedCard';

## Overview

ROS 2 (Robot Operating System 2) is the middleware that provides services designed for a heterogeneous computer cluster including hardware abstraction, device drivers, libraries, visualizers, message-passing, package management, and more. It serves as the "nervous system" for your robot, allowing different components to communicate effectively.

<AnimatedCard title="Key Concept" color="blue" icon="🧠">
ROS 2 acts as the central communication hub for all robot components, enabling seamless interaction between sensors, actuators, and control systems.
</AnimatedCard>

## What You'll Learn

<AnimatedCard title="Learning Objectives" color="green" icon="🎯">
- ROS 2 architecture and concepts
- How to set up a ROS 2 environment
- Creating nodes, topics, services, and actions
- Practical implementation for physical robots
- Code examples and implementation details
</AnimatedCard>

## ROS 2 Architecture

ROS 2 uses a client library implementation that provides the ROS API to different programming languages. The architecture includes:

<AnimatedCard title="Core Components" color="purple" icon="⚙️">
1. **Nodes**: Processes performing computation
2. **Topics**: Named buses over which nodes exchange messages
3. **Services**: Synchronous request/response communication
4. **Actions**: Asynchronous request/goal-based communication
</AnimatedCard>

## Setting Up Your ROS 2 Environment

To work with ROS 2 on your physical robot:

<AnimatedCard title="Setup Steps" color="orange" icon="🔧">
1. Install ROS 2 (Humble Hawksbill or later recommended)
2. Set up your development environment
3. Create a workspace for your robot's packages

```bash
source /opt/ros/humble/setup.bash
mkdir -p ~/robot_ws/src
cd ~/robot_ws
colcon build
source install/setup.bash
```
</AnimatedCard>

## Creating Your First Robot Node

Let's create a simple node that controls a robot's movement:

```python
import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Twist

class RobotController(Node):
    def __init__(self):
        super().__init__('robot_controller')
        self.publisher = self.create_publisher(Twist, 'cmd_vel', 10)
        timer_period = 0.5  # seconds
        self.timer = self.create_timer(timer_period, self.timer_callback)

    def timer_callback(self):
        msg = Twist()
        msg.linear.x = 0.5  # Move forward at 0.5 m/s
        msg.angular.z = 0.0  # No rotation
        self.publisher.publish(msg)

def main(args=None):
    rclpy.init(args=args)
    robot_controller = RobotController()
    rclpy.spin(robot_controller)
    robot_controller.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

## Communication Patterns

ROS 2 provides several communication patterns:

<AnimatedCard title="Topics (Publish/Subscribe)" color="blue" icon="📢">
- Used for streaming data
- Multiple publishers and subscribers possible
- Example: sensor data, robot state
</AnimatedCard>

<AnimatedCard title="Services (Request/Response)" color="green" icon="💬">
- Used for single request/response interactions
- Synchronous communication
- Example: calibration, configuration
</AnimatedCard>

<AnimatedCard title="Actions (Goal/Result/Feedback)" color="purple" icon="🎯">
- Used for long-running tasks
- Provides feedback during execution
- Example: navigation, manipulation
</AnimatedCard>

## Physical Robot Integration

When integrating with physical hardware:

<AnimatedCard title="Integration Steps" color="orange" icon="🤖">
1. Create hardware abstraction layers
2. Use ros2_control for standardized interfaces
3. Implement safety mechanisms
4. Test in simulation first
</AnimatedCard>

## Hardware Abstraction

For physical robots, create a hardware interface:

```python
from ros2_control_py import HardwareInterface
from hardware_interface import HardwareInfo

class RobotHardwareInterface(HardwareInterface):
    def __init__(self, hardware_info: HardwareInfo):
        super().__init__(hardware_info)

    def configure(self, sensor_names, actuator_names):
        # Configure hardware components
        pass

    def read(self, time, period):
        # Read from sensors
        pass

    def write(self, time, period):
        # Write to actuators
        pass
```

## Best Practices for Physical Robots

<AnimatedCard title="Safety Guidelines" color="blue" icon="⚠️">
- Always implement safety limits
- Use proper error handling
- Implement emergency stops
- Test in simulation before physical deployment
- Log important events for debugging
</AnimatedCard>

## Summary

This module provided a comprehensive introduction to ROS 2 for physical robot implementation. You learned about ROS 2 architecture, setting up your environment, creating nodes, and integrating with physical hardware. This forms the foundation for your robot's nervous system.

<AnimatedCard title="Module Complete" color="green" icon="✅">
Congratulations! You've completed the first module of the AI Robotics Education Platform. You now understand the fundamentals of ROS 2 and are ready to explore the next module: Digital Twins.
</AnimatedCard>

</div>
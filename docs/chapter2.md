---
sidebar_position: 3
custom_edit_url: null
---

# Module 2: Digital Twin (Gazebo & Simulation)

<div class="module-2-bg">

This chapter covers the second module of the platform: Digital Twin (Gazebo & Simulation).

import AnimatedCard from '@site/src/components/AnimatedCard';

## Overview

Digital twins in robotics provide virtual representations of physical robots and environments, enabling simulation, testing, and validation of robotic systems before deployment on real hardware. This is crucial for testing your robot's behavior safely and efficiently.

<AnimatedCard title="Key Concept" color="purple" icon="🌐">
Digital twins enable safe and efficient testing of robotic systems in a virtual environment before deployment on real hardware.
</AnimatedCard>

## What You'll Learn

<AnimatedCard title="Learning Objectives" color="green" icon="🎯">
- Digital twin concepts and applications
- Gazebo simulation environment
- Creating accurate robot models
- Physics simulation principles
- How to use simulation for robot development
</AnimatedCard>

## Digital Twin Concepts

A digital twin in robotics consists of:

<AnimatedCard title="Core Components" color="blue" icon="⚙️">
1. **Virtual Model**: Accurate representation of the physical robot
2. **Simulation Environment**: Physics-accurate environment for testing
3. **Data Synchronization**: Real-time data flow between physical and virtual
4. **Validation Tools**: Methods to verify system behavior
</AnimatedCard>

## Setting Up Gazebo Simulation

To set up Gazebo for your robot:

<AnimatedCard title="Setup Steps" color="orange" icon="🔧">
1. Install Gazebo Garden or Fortress
2. Create URDF models of your robot
3. Set up ROS 2-Gazebo integration
4. Configure sensors and actuators
</AnimatedCard>

## Creating Robot Models (URDF)

Create a URDF (Unified Robot Description Format) file for your robot:

```xml
<?xml version="1.0"?>
<robot name="my_robot">
  <!-- Base link -->
  <link name="base_link">
    <visual>
      <geometry>
        <box size="0.5 0.3 0.2"/>
      </geometry>
    </visual>
    <collision>
      <geometry>
        <box size="0.5 0.3 0.2"/>
      </geometry>
    </collision>
    <inertial>
      <mass value="1.0"/>
      <inertia ixx="0.1" ixy="0.0" ixz="0.0" iyy="0.1" iyz="0.0" izz="0.1"/>
    </inertial>
  </link>

  <!-- Wheel links -->
  <link name="wheel_left">
    <visual>
      <geometry>
        <cylinder radius="0.1" length="0.05"/>
      </geometry>
    </visual>
  </link>

  <link name="wheel_right">
    <visual>
      <geometry>
        <cylinder radius="0.1" length="0.05"/>
      </geometry>
    </visual>
  </link>

  <!-- Joints -->
  <joint name="wheel_left_joint" type="continuous">
    <parent link="base_link"/>
    <child link="wheel_left"/>
    <origin xyz="-0.15 -0.15 0" rpy="0 0 0"/>
    <axis xyz="0 1 0"/>
  </joint>

  <joint name="wheel_right_joint" type="continuous">
    <parent link="base_link"/>
    <child link="wheel_right"/>
    <origin xyz="-0.15 0.15 0" rpy="0 0 0"/>
    <axis xyz="0 1 0"/>
  </joint>
</robot>
```

## Gazebo Integration

Create a Gazebo plugin to control your robot:

```xml
<gazebo>
  <plugin name="diff_drive" filename="libgazebo_ros_diff_drive.so">
    <left_joint>wheel_left_joint</left_joint>
    <right_joint>wheel_right_joint</right_joint>
    <wheel_separation>0.3</wheel_separation>
    <wheel_diameter>0.2</wheel_diameter>
    <command_topic>cmd_vel</command_topic>
    <odometry_topic>odom</odometry_topic>
    <odometry_frame>odom</odometry_frame>
    <robot_base_frame>base_link</robot_base_frame>
  </plugin>
</gazebo>
```

## Launching Simulation

Create a launch file to start your robot in simulation:

```python
from launch import LaunchDescription
from launch.actions import DeclareLaunchArgument
from launch.substitutions import LaunchConfiguration
from launch_ros.actions import Node
from ament_index_python.packages import get_package_share_directory
import os

def generate_launch_description():
    # Get the package share directory
    pkg_dir = get_package_share_directory('my_robot_description')

    # Define arguments
    use_sim_time = LaunchConfiguration('use_sim_time')

    # Robot State Publisher node
    robot_state_publisher = Node(
        package='robot_state_publisher',
        executable='robot_state_publisher',
        name='robot_state_publisher',
        output='screen',
        parameters=[{
            'use_sim_time': use_sim_time,
            'robot_description': open(
                os.path.join(pkg_dir, 'urdf', 'my_robot.urdf')
            ).read()
        }]
    )

    # Gazebo node
    gazebo = Node(
        package='gazebo_ros',
        executable='spawn_entity.py',
        arguments=[
            '-entity', 'my_robot',
            '-file', os.path.join(pkg_dir, 'models', 'my_robot.sdf'),
            '-x', '0', '-y', '0', '-z', '0.1'
        ],
        output='screen'
    )

    return LaunchDescription([
        DeclareLaunchArgument(
            'use_sim_time',
            default_value='true',
            description='Use simulation clock if true'
        ),
        robot_state_publisher,
        gazebo
    ])
```

## Sensor Simulation

Add sensors to your robot for perception:

```xml
<!-- Laser scanner -->
<gazebo reference="base_scan">
  <sensor type="ray" name="base_scan_sensor">
    <pose>0 0 0.1 0 0 0</pose>
    <visualize>false</visualize>
    <update_rate>10</update_rate>
    <ray>
      <scan>
        <horizontal>
          <samples>360</samples>
          <resolution>1.0</resolution>
          <min_angle>-3.14159</min_angle>
          <max_angle>3.14159</max_angle>
        </horizontal>
      </scan>
      <range>
        <min>0.1</min>
        <max>30.0</max>
        <resolution>0.01</resolution>
      </range>
    </ray>
    <plugin name="scan" filename="libgazebo_ros_ray_sensor.so">
      <ros>
        <namespace>/</namespace>
        <remapping>~/out:=scan</remapping>
      </ros>
      <output_type>sensor_msgs/LaserScan</output_type>
    </plugin>
  </sensor>
</gazebo>
```

## Navigation Simulation

Set up navigation in simulation:

```yaml
# Navigation configuration
bt_navigator:
  ros__parameters:
    use_sim_time: True
    global_frame: map
    robot_base_frame: base_link
    odom_topic: /odom
    bt_xml_filename: navigate_w_replanning_and_recovery.xml
    default_server_timeout: 20
    enable_groot_monitoring: True
    groot_zmq_publisher_port: 1666
    groot_zmq_server_port: 1667
```

## Best Practices for Simulation

<AnimatedCard title="Best Practices" color="blue" icon="💡">
- Create accurate physics models
- Test navigation algorithms in simulation first
- Validate sensor models against real hardware
- Use simulation to test edge cases safely
- Match simulation parameters to real hardware as closely as possible
</AnimatedCard>

## Transitioning to Real Hardware

<AnimatedCard title="Transition Steps" color="orange" icon="🔄">
1. Verify that simulation and real hardware have similar dynamics
2. Test basic movement in simulation
3. Gradually increase complexity
4. Use hardware-in-the-loop testing
5. Monitor performance differences between simulation and reality
</AnimatedCard>

## Summary

This module provided a comprehensive understanding of digital twins in robotics using Gazebo simulation. You learned to create accurate robot models, set up simulation environments, and use simulation as a tool for developing and testing your physical robot before deployment.

<AnimatedCard title="Module Complete" color="green" icon="✅">
Congratulations! You've completed the second module of the AI Robotics Education Platform. You now understand how to create and use digital twins for safe and efficient robot development.
</AnimatedCard>

</div>
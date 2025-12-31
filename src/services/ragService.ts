/**
 * RAG service for the chatbot
 * Connects to an LLM and uses retrieved documents to answer questions
 */

import { chunkDocuments, findRelevantChunks } from '../utils/documentProcessor';
import { streamText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

// Get the API key from environment variables
const getApiKey = () => {
  // Try to get from window object (client-side)
  if (typeof window !== 'undefined' && (window as any).GOOGLE_GENERATIVE_AI_API_KEY) {
    return (window as any).GOOGLE_GENERATIVE_AI_API_KEY;
  }

  // Try to get from process.env (server-side during build)
  if (typeof process !== 'undefined' && process.env && process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    return process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  }

  // Return undefined if not found
  return undefined;
};

const apiKey = getApiKey();

// Initialize the Google Generative AI provider only if API key is available
const google = apiKey ? createGoogleGenerativeAI({ apiKey }) : createGoogleGenerativeAI();

// Static book content based on the actual book chapters
const bookContent = [
  {
    id: 'intro',
    title: 'Introduction to AI Robotics Education Platform',
    content: `---
sidebar_position: 1
---

# AI Robotics Education Platform Documentation

Welcome to the documentation for the **AI Robotics Education Platform**, a comprehensive educational system for teaching Physical AI and Humanoid Robotics.

## About This Platform

This platform is designed to teach complex robotics concepts through four distinct modules:
- **Robotic Nervous System (ROS 2)**
- **Digital Twin (Gazebo & Unity)**
- **AI-Robot Brain (NVIDIA Isaac™)**
- **Vision-Language-Action (VLA)**

## Platform Overview

The AI Robotics Education Platform provides:

- Interactive learning experiences with animations, diagrams, and visual elements
- An AI-powered Q&A system using Google's Gemini API
- RAG (Retrieval Augmented Generation) to ensure accurate responses
- Copyable code examples with syntax highlighting
- Professional, responsive blue-themed interface

## Key Features

1. **Four Educational Modules**: Comprehensive coverage of ROS 2, Digital Twins, NVIDIA Isaac, and Vision-Language-Action systems
2. **AI Chatbot**: Ask questions and get answers based only on course content
3. **Visual Learning**: Diagrams, animations, and interactive elements to enhance understanding
4. **Code Examples**: Copyable examples with proper syntax highlighting
5. **Navigation System**: Intuitive side navigation for easy access to content

## Intended Audience

This documentation is intended for:
- Students enrolled in the Physical AI & Humanoid Robotics course
- Educators looking to implement similar systems
- Developers interested in AI-powered educational platforms`
  },
  {
    id: 'module1',
    title: 'Module 1: Robotic Nervous System (ROS 2)',
    content: `---
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

\`\`\`bash
source /opt/ros/humble/setup.bash
mkdir -p ~/robot_ws/src
cd ~/robot_ws
colcon build
source install/setup.bash
\`\`\`
</AnimatedCard>

## Creating Your First Robot Node

Let's create a simple node that controls a robot's movement:

\`\`\`python
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
\`\`\`

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

\`\`\`python
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
\`\`\`

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

</div>`
  },
  {
    id: 'module2',
    title: 'Module 2: Digital Twin (Gazebo & Simulation)',
    content: `---
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

\`\`\`xml
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
  </joint>

  <joint name="wheel_right_joint" type="continuous">
    <parent link="base_link"/>
    <child link="wheel_right"/>
    <origin xyz="-0.15 0.15 0" rpy="0 0 0"/>
  </joint>
</robot>
\`\`\`

## Gazebo Integration

Integrate your robot model with Gazebo:

<AnimatedCard title="Integration Steps" color="blue" icon="🔄">
1. Create a Gazebo world file
2. Add your robot model to the world
3. Configure physics properties
4. Set up sensors and actuators
</AnimatedCard>

## Physics Simulation

Gazebo provides realistic physics simulation:

<AnimatedCard title="Physics Properties" color="green" icon="⚙️">
- Collision detection
- Dynamics simulation
- Contact forces
- Friction models
</AnimatedCard>

## Sensors and Actuators

Configure sensors and actuators in your simulation:

\`\`\`xml
<gazebo reference="base_link">
  <material>Gazebo/Blue</material>
</gazebo>

<gazebo reference="wheel_left">
  <mu1>0.2</mu1>
  <mu2>0.2</mu2>
</gazebo>

<!-- Add a camera sensor -->
<gazebo reference="camera_mount">
  <sensor type="camera" name="my_camera">
    <visualize>true</visualize>
    <update_rate>30.0</update_rate>
    <camera name="head">
      <horizontal_fov>1.3962634</horizontal_fov>
      <image>
        <width>800</width>
        <height>600</height>
        <format>R8G8B8</format>
      </image>
      <clip>
        <near>0.02</near>
        <far>300</far>
      </clip>
    </camera>
  </sensor>
</gazebo>
\`\`\`

## Simulation Best Practices

<AnimatedCard title="Best Practices" color="orange" icon="💡">
- Start with simple models and add complexity gradually
- Validate simulation against real-world data
- Use appropriate physics parameters
- Test different scenarios and edge cases
</AnimatedCard>

## Connecting to ROS

Connect your Gazebo simulation to ROS:

<AnimatedCard title="ROS Integration" color="purple" icon="🔌">
- Use gazebo_ros_pkgs for ROS-Gazebo communication
- Publish sensor data to ROS topics
- Subscribe to ROS topics for actuator control
- Use TF for coordinate transforms
</AnimatedCard>

## Summary

This module covered the fundamentals of digital twin technology and Gazebo simulation for robotics. You learned how to create robot models, set up simulation environments, configure sensors, and integrate with ROS. This enables safe and efficient testing of robotic systems before deployment on real hardware.

<AnimatedCard title="Module Complete" color="green" icon="✅">
Congratulations! You've completed the Digital Twin module. You now understand how to create and use simulation environments for robot development and testing.
</AnimatedCard>

</div>`
  },
  {
    id: 'module3',
    title: 'Module 3: AI-Robot Brain (NVIDIA Isaac™)',
    content: `---
sidebar_position: 4
custom_edit_url: null
---

# Module 3: AI-Robot Brain (NVIDIA Isaac™)

<div class="module-3-bg">

This chapter covers the third module of the platform: AI-Robot Brain (NVIDIA Isaac™).

import AnimatedCard from '@site/src/components/AnimatedCard';

## Overview

The AI-Robot Brain combines perception, planning, and control systems to give your robot intelligent behavior. NVIDIA Isaac provides a comprehensive platform for developing AI-powered robots with advanced perception and control capabilities.

<AnimatedCard title="Key Concept" color="purple" icon="🧠">
The AI-Robot Brain integrates perception, planning, and control to enable intelligent robot behavior.
</AnimatedCard>

## What You'll Learn

<AnimatedCard title="Learning Objectives" color="green" icon="🎯">
- AI-Robot Brain architecture and components
- Perception systems for environment understanding
- Planning algorithms for navigation and manipulation
- Control systems for precise robot actuation
- NVIDIA Isaac platform capabilities
</AnimatedCard>

## AI-Robot Brain Architecture

The AI-Robot Brain consists of three main components:

<AnimatedCard title="Perception" color="blue" icon="👁️">
- Computer vision for object detection and recognition
- Sensor fusion to combine data from multiple sensors
- 3D reconstruction and mapping
- Environment understanding
</AnimatedCard>

<AnimatedCard title="Planning" color="orange" icon="🗺️">
- Path planning algorithms (A*, RRT, etc.)
- Motion planning considering robot constraints
- Task planning for complex behaviors
- Multi-robot coordination
</AnimatedCard>

<AnimatedCard title="Control" color="green" icon="⚙️">
- Low-level motor control
- Trajectory tracking
- Feedback control systems
- Adaptive control strategies
</AnimatedCard>

## NVIDIA Isaac Platform

NVIDIA Isaac provides:

<AnimatedCard title="Core Components" color="purple" icon="📦">
1. **Isaac ROS**: ROS 2 packages optimized for NVIDIA hardware
2. **Isaac Sim**: High-fidelity simulation environment
3. **Isaac Apps**: Reference applications and workflows
4. **Deep Learning Tools**: Pre-trained models and training frameworks
</AnimatedCard>

## Perception Systems

Perception systems enable robots to understand their environment:

<AnimatedCard title="Computer Vision" color="blue" icon="📷">
- Object detection and classification
- Semantic segmentation
- Pose estimation
- Visual SLAM (Simultaneous Localization and Mapping)
</AnimatedCard>

## Planning Algorithms

Planning algorithms determine how robots navigate and manipulate objects:

\`\`\`python
# Example path planning with A* algorithm
import numpy as np

def a_star(start, goal, grid):
    # Implementation of A* path planning algorithm
    open_list = [start]
    closed_list = []
    g_score = {start: 0}
    f_score = {start: heuristic(start, goal)}

    while open_list:
        current = min(open_list, key=lambda x: f_score.get(x, float('inf')))

        if current == goal:
            return reconstruct_path(current)

        open_list.remove(current)
        closed_list.append(current)

        for neighbor in get_neighbors(current, grid):
            if neighbor in closed_list:
                continue

            tentative_g_score = g_score[current] + distance(current, neighbor)

            if neighbor not in open_list:
                open_list.append(neighbor)
            elif tentative_g_score >= g_score.get(neighbor, float('inf')):
                continue

            # This path to neighbor is better than any previous one
            came_from[neighbor] = current
            g_score[neighbor] = tentative_g_score
            f_score[neighbor] = g_score[neighbor] + heuristic(neighbor, goal)

    return None  # No path found
\`\`\`

## Control Systems

Control systems ensure precise robot movement:

<AnimatedCard title="PID Control" color="green" icon="🔄">
- Proportional-Integral-Derivative control for precise actuation
- Trajectory tracking for smooth motion
- Adaptive control for changing conditions
- Safety mechanisms and limits
</AnimatedCard>

## Deep Learning Integration

Integrate deep learning models into your robot:

<AnimatedCard title="AI Capabilities" color="orange" icon="🤖">
- Pre-trained models for common tasks
- Custom model training with Isaac SDK
- Edge inference on NVIDIA hardware
- Transfer learning for new domains
</AnimatedCard>

## Isaac ROS Examples

Example of using Isaac ROS for perception:

\`\`\`python
# Using Isaac ROS for object detection
import rclpy
from rclpy.node import Node
from sensor_msgs.msg import Image
from vision_msgs.msg import Detection2DArray

class PerceptionNode(Node):
    def __init__(self):
        super().__init__('perception_node')
        self.subscription = self.create_subscription(
            Image,
            'camera/image_raw',
            self.image_callback,
            10)
        self.publisher = self.create_publisher(
            Detection2DArray,
            'detections',
            10)

    def image_callback(self, msg):
        # Process image with AI model
        detections = self.run_detection_model(msg)

        # Publish results
        detection_msg = Detection2DArray()
        detection_msg.detections = detections
        self.publisher.publish(detection_msg)
\`\`\`

## Best Practices

<AnimatedCard title="Best Practices" color="blue" icon="💡">
- Start with simulation before deploying on hardware
- Validate AI models in diverse conditions
- Implement safety checks and fallback behaviors
- Use modular architecture for easy updates
</AnimatedCard>

## Summary

This module covered the AI-Robot Brain architecture and NVIDIA Isaac platform. You learned about perception, planning, and control systems that enable intelligent robot behavior. You also explored how to integrate deep learning models and use Isaac tools for robot development.

<AnimatedCard title="Module Complete" color="green" icon="✅">
Congratulations! You've completed the AI-Robot Brain module. You now understand how to develop intelligent robots with perception, planning, and control capabilities.
</AnimatedCard>

</div>`
  },
  {
    id: 'module4',
    title: 'Module 4: Vision-Language-Action (VLA)',
    content: `---
sidebar_position: 5
custom_edit_url: null
---

# Module 4: Vision-Language-Action (VLA)

<div class="module-4-bg">

This chapter covers the fourth module of the platform: Vision-Language-Action (VLA).

import AnimatedCard from '@site/src/components/AnimatedCard';

## Overview

Vision-Language-Action (VLA) systems represent the next generation of robotic intelligence, combining visual perception, natural language understanding, and action execution. These systems allow robots to understand and respond to human commands in complex environments.

<AnimatedCard title="Key Concept" color="purple" icon="🌐">
VLA systems integrate vision, language, and action to enable natural human-robot interaction.
</AnimatedCard>

## What You'll Learn

<AnimatedCard title="Learning Objectives" color="green" icon="🎯">
- Vision-Language-Action system architecture
- Multimodal AI models for robotics
- Natural language processing for robot commands
- Action planning and execution
- Human-robot interaction design
</AnimatedCard>

## VLA System Components

A VLA system integrates three key components:

<AnimatedCard title="Vision" color="blue" icon="👁️">
- Scene understanding and object recognition
- Spatial reasoning and 3D perception
- Visual attention mechanisms
- Environment mapping
</AnimatedCard>

<AnimatedCard title="Language" color="green" icon="💬">
- Natural language understanding
- Command interpretation
- Context awareness
- Dialogue management
</AnimatedCard>

<AnimatedCard title="Action" color="orange" icon="💪">
- Task planning and execution
- Manipulation and navigation
- Skill learning and adaptation
- Safety-aware control
</AnimatedCard>

## Vision Systems

Vision systems enable robots to understand their visual environment:

<AnimatedCard title="Visual Perception" color="blue" icon="📷">
- Object detection and recognition
- Semantic segmentation
- 3D scene reconstruction
- Visual attention mechanisms
</AnimatedCard>

## Language Processing

Language processing systems interpret human commands:

<AnimatedCard title="Natural Language Understanding" color="green" icon="🧠">
- Command parsing and semantic analysis
- Context modeling
- Intent recognition
- Multi-turn dialogue management
</AnimatedCard>

## Action Execution

Action systems execute robot behaviors:

<AnimatedCard title="Robot Control" color="orange" icon="⚙️">
- Task planning and decomposition
- Motion planning and control
- Skill execution and monitoring
- Error recovery and adaptation
</AnimatedCard>

## Example VLA Interaction

Example of a VLA system processing a command:

\`\`\`python
# Processing a natural language command
def process_command(robot, command, visual_context):
    # 1. Parse the language command
    parsed_command = parse_natural_language(command)

    # 2. Analyze the visual context
    scene_analysis = analyze_scene(visual_context)

    # 3. Plan appropriate action sequence
    action_sequence = plan_actions(parsed_command, scene_analysis)

    # 4. Execute the actions
    for action in action_sequence:
        robot.execute_action(action)
\`\`\`

## Integration Challenges

<AnimatedCard title="Key Challenges" color="red" icon="⚠️">
- Multimodal alignment between vision and language
- Real-time processing requirements
- Robustness to environmental variations
- Safety in open-world environments
</AnimatedCard>

## NVIDIA Foundation Models

NVIDIA provides foundation models for VLA systems:

<AnimatedCard title="Foundation Models" color="purple" icon="🏗️">
- Vision models for scene understanding
- Language models for command interpretation
- Multimodal models for joint reasoning
- Pre-trained models for faster development
</AnimatedCard>

## Human-Robot Interaction

Design principles for effective human-robot interaction:

<AnimatedCard title="Interaction Design" color="blue" icon="🤝">
- Natural language interfaces
- Visual feedback and status indicators
- Proactive assistance and suggestions
- Error handling and recovery
</AnimatedCard>

## Safety Considerations

<AnimatedCard title="Safety First" color="red" icon="🛡️">
- Safe action verification
- Human-aware navigation
- Emergency stop mechanisms
- Ethical AI deployment
</AnimatedCard>

## Future of VLA Systems

<AnimatedCard title="Future Trends" color="green" icon="🔮">
- More sophisticated multimodal models
- Improved contextual understanding
- Enhanced human-robot collaboration
- Applications in various domains
</AnimatedCard>

## Summary

This module covered Vision-Language-Action systems, the next generation of robotic intelligence. You learned how to integrate vision, language, and action systems to create robots that can understand and respond to human commands in complex environments. This represents the cutting edge of human-robot interaction.

<AnimatedCard title="Module Complete" color="green" icon="✅">
Congratulations! You've completed the VLA module. You now understand how to develop advanced robots with natural language interfaces and intelligent behavior.
</AnimatedCard>

</div>`
  }
];

// Process the book content into chunks
const documentChunks = chunkDocuments(bookContent);

export interface ChatMessage {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

export interface ChatRequest {
  messages: ChatMessage[];
  query: string;
}

export const processChatRequest = async (request: ChatRequest): Promise<string> => {
  try {
    // Find relevant chunks based on the user's query
    const relevantChunks = findRelevantChunks(request.query, documentChunks);

    if (relevantChunks.length === 0) {
      return "I couldn't find any relevant information in the book content to answer your question. Please try rephrasing or check the relevant chapters for more details.";
    }

    // Combine the relevant chunks into context
    const context = relevantChunks.map(chunk =>
      `From ${chunk.title}: ${chunk.content}`
    ).join('\n\n');

    // Prepare the prompt for the LLM
    const prompt = `You are an AI assistant for the AI Robotics Education Platform. Answer the user's question based only on the provided book content. If you cannot find the answer in the provided context, say so directly.

Book Content:
${context}

User Question: ${request.query}

Please provide a helpful and accurate response based on the book content. Format your response in a clear, informative way.`;

    // Stream the response from the LLM
    const result = await streamText({
      model: google('gemini-pro'), // Using the correct model name for the SDK version
      prompt: prompt,
    });

    // Collect the full response
    let fullResponse = '';
    for await (const textPart of result.textStream) {
      fullResponse += textPart;
    }

    return fullResponse;
  } catch (error) {
    console.error('Error processing chat request:', error);
    return "I encountered an error while processing your request. Please try again later.";
  }
};
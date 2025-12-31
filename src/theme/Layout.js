import React, { useState } from 'react';
import OriginalLayout from '@theme-original/Layout';
import styles from './Chatbot.module.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! I\'m your AI assistant. Ask me anything about robotics.', sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Simple rule-based responses for book content
  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();

    // Define simple responses based on keywords from the book content
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return 'Hello! I\'m your AI assistant for the AI Robotics Education Platform. Ask me anything about ROS 2, Digital Twins, AI-Robot Brain, or Vision-Language-Action systems!';
    } else if (message.includes('robot') || message.includes('robotics')) {
      return 'Robotics is an interdisciplinary branch of engineering and science that includes mechanical engineering, electrical engineering, computer science, and others. It deals with the design, construction, operation, and application of robots, as well as computer systems for their control, sensory feedback, and information processing.';
    } else if (message.includes('what') && message.includes('is')) {
      if (message.includes('ai') || message.includes('artificial intelligence')) {
        return 'Artificial Intelligence (AI) in robotics refers to the intelligence exhibited by machines or software that enables them to perform tasks that typically require human intelligence. This includes learning from experience, understanding natural language, solving problems, and recognizing patterns.';
      } else if (message.includes('sensor')) {
        return 'Sensors in robotics are devices that detect and respond to some type of input from the physical environment. The output is generally a signal that is converted to human-readable display at the console or transmitted for reading or further processing.';
      } else if (message.includes('actuator')) {
        return 'An actuator is a component of a machine that is responsible for moving and controlling a mechanism or system. It takes energy, usually provided by air, electricity, or liquid, and converts that into some kind of motion.';
      } else if (message.includes('ros') || message.includes('ros 2')) {
        return 'ROS 2 (Robot Operating System 2) is the middleware that provides services designed for a heterogeneous computer cluster including hardware abstraction, device drivers, libraries, visualizers, message-passing, package management, and more. It serves as the "nervous system" for your robot, allowing different components to communicate effectively.';
      } else if (message.includes('digital twin') || message.includes('simulation')) {
        return 'Digital twins in robotics provide virtual representations of physical robots and environments, enabling simulation, testing, and validation of robotic systems before deployment on real hardware. This is crucial for testing your robot\'s behavior safely and efficiently.';
      } else if (message.includes('nvidia') || message.includes('isaac')) {
        return 'NVIDIA Isaac™ is a simulation and development platform for AI-powered robots. It provides tools for training, testing, and deploying AI-based robotic applications in a virtual environment before moving to physical hardware.';
      } else if (message.includes('vla') || message.includes('vision-language-action')) {
        return 'Vision-Language-Action (VLA) systems enable robots to understand natural language commands and translate them into physical actions based on visual input. This allows robots to perform complex tasks in unstructured environments.';
      }
    } else if (message.includes('ros') || message.includes('ros 2')) {
      return 'ROS 2 (Robot Operating System 2) is the middleware that provides services designed for a heterogeneous computer cluster including hardware abstraction, device drivers, libraries, visualizers, message-passing, package management, and more. It serves as the "nervous system" for your robot, allowing different components to communicate effectively. The core components include Nodes (processes performing computation), Topics (named buses over which nodes exchange messages), Services (synchronous request/response communication), and Actions (asynchronous request/goal-based communication).';
    } else if (message.includes('digital twin') || message.includes('gazebo') || message.includes('simulation')) {
      return 'Digital twins in robotics provide virtual representations of physical robots and environments. In this platform, we use Gazebo simulation environment for creating accurate robot models and testing them safely. A digital twin consists of a virtual model (accurate representation of the physical robot), a simulation environment (physics-accurate environment for testing), data synchronization (real-time data flow between physical and virtual), and validation tools (methods to verify system behavior).';
    } else if (message.includes('modules') || message.includes('module')) {
      return 'The AI Robotics Education Platform consists of four distinct modules: 1) Robotic Nervous System (ROS 2), 2) Digital Twin (Gazebo & Unity), 3) AI-Robot Brain (NVIDIA Isaac™), and 4) Vision-Language-Action (VLA). Each module builds upon the previous one to provide a comprehensive understanding of robotics.';
    } else if (message.includes('architecture') || message.includes('nodes') || message.includes('topics') || message.includes('services') || message.includes('actions')) {
      return 'ROS 2 architecture includes: 1) Nodes (processes performing computation), 2) Topics (named buses over which nodes exchange messages, used for streaming data), 3) Services (synchronous request/response communication, used for single request/response interactions), and 4) Actions (asynchronous request/goal-based communication, used for long-running tasks that provide feedback during execution).';
    } else if (message.includes('urdf') || message.includes('model') || message.includes('robot model')) {
      return 'URDF (Unified Robot Description Format) is an XML format used to describe robot models in ROS. It includes information about robot links (physical parts), joints (connections between parts), visual properties (how the robot looks), collision properties (for physics simulation), and inertial properties (for physics simulation).';
    } else if (message.includes('nvidia') || message.includes('isaac')) {
      return 'The AI-Robot Brain module uses NVIDIA Isaac™, which is a simulation and development platform for AI-powered robots. It provides tools for training, testing, and deploying AI-based robotic applications in a virtual environment before moving to physical hardware.';
    } else if (message.includes('vla') || message.includes('vision-language-action')) {
      return 'Vision-Language-Action (VLA) systems enable robots to understand natural language commands and translate them into physical actions based on visual input. This allows robots to perform complex tasks in unstructured environments by combining computer vision, natural language processing, and motor control.';
    } else if (message.includes('history') || message.includes('evolution')) {
      return 'The history of robotics goes back to ancient times with automata, but the modern robotics era began in the 20th century. The term "robot" was first used in 1921 by Karel Capek in his play "R.U.R." (Rossum\'s Universal Robots). The first programmable robot was created by George Devol in 1954.';
    } else if (message.includes('types') || message.includes('classification')) {
      return 'Robots can be classified in several ways: 1) Based on application (industrial, service, medical, military), 2) Based on control system (autonomous, teleoperated, semi-autonomous), 3) Based on mobility (mobile, stationary), 4) Based on human interaction (collaborative, non-collaborative).';
    } else if (message.includes('application') || message.includes('use')) {
      return 'Robots are used in various applications including manufacturing, healthcare, space exploration, military, agriculture, and domestic services. Industrial robots are commonly used for welding, painting, assembly, and material handling.';
    } else if (message.includes('programming') || message.includes('code')) {
      return 'Robots are typically programmed using languages like Python, C++, or specialized robotic frameworks like ROS (Robot Operating System). Programming involves defining behaviors, sensor processing, and control algorithms. In ROS 2, you create nodes that communicate through topics, services, and actions.';
    } else if (message.includes('ethics') || message.includes('safety')) {
      return 'Robot ethics is a branch of ethics that studies the moral implications of robots and their behavior. Key concerns include safety, privacy, job displacement, and the potential for autonomous weapons. Safety measures include fail-safes, human oversight, and ethical programming. In physical robot development, safety guidelines include always implementing safety limits, using proper error handling, implementing emergency stops, testing in simulation before physical deployment, and logging important events for debugging.';
    } else if (message.includes('future') || message.includes('trend')) {
      return 'The future of robotics includes more autonomous systems, human-robot collaboration, swarm robotics, and integration with AI technologies like machine learning. We can expect to see robots in more service roles, healthcare assistance, and complex decision-making tasks.';
    } else if (message.includes('thank')) {
      return 'You\'re welcome! Is there anything else I can help you with about robotics?';
    } else if (message.includes('help')) {
      return 'I can help you understand robotics concepts! You can ask me about the four modules of the AI Robotics Education Platform: ROS 2 (Robotic Nervous System), Digital Twins (Gazebo & Simulation), AI-Robot Brain (NVIDIA Isaac), and Vision-Language-Action (VLA).';
    } else {
      // Default response if no keywords match
      return 'I\'m here to help you learn about robotics. The AI Robotics Education Platform covers four main modules: 1) Robotic Nervous System (ROS 2), 2) Digital Twin (Gazebo & Unity), 3) AI-Robot Brain (NVIDIA Isaac™), and 4) Vision-Language-Action (VLA). Please ask about one of these topics or rephrase your question.';
    }
  };

  const handleSend = () => {
    if (inputValue.trim() === '') return;

    // Add user message
    const newUserMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user'
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate processing delay
    setTimeout(() => {
      // Get bot response based on user input
      const response = getBotResponse(inputValue);

      // Add bot response
      const botResponse = {
        id: messages.length + 2,
        text: response,
        sender: 'bot'
      };

      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 500); // 500ms delay to simulate processing
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSend();
    }
  };

  return (
    <>
      {/* Floating chat button */}
      <button
        className={`${styles.chatButton} ${isOpen ? styles.hidden : ''}`}
        onClick={toggleChat}
        aria-label="Open chat"
      >
        💬
      </button>

      {/* Chat container */}
      <div className={`${styles.chatContainer} ${isOpen ? styles.open : ''}`}>
        <div className={styles.chatHeader}>
          <h3>Robotics Assistant</h3>
          <button
            className={styles.closeButton}
            onClick={toggleChat}
            aria-label="Close chat"
          >
            ×
          </button>
        </div>
        <div className={styles.chatMessages}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`${styles.message} ${styles[message.sender]}`}
            >
              {message.text}
            </div>
          ))}
          {isLoading && (
            <div className={`${styles.message} ${styles.bot}`}>
              Thinking...
            </div>
          )}
        </div>
        <div className={styles.chatInput}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about robotics..."
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default function Layout(props) {
  return (
    <>
      <OriginalLayout {...props} />
      <Chatbot />
    </>
  );
}
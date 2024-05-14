import { useState, useEffect, useRef } from "react";
import "./App.css";
import Card from "./components/Card/card";
import Input from "./components/Input/input";
import DoneCard from "./components/DoneCard/done";
import { motion } from "framer-motion";
import Footer from "./components/Footer/footer";

function App() {
  const [tasks, setTasks] = useState(() => {
    const localTasks = localStorage.getItem("taskLocalStorage");
    return localTasks ? JSON.parse(localTasks) : [];
  });

  const [done, setDone] = useState(() => {
    const localDone = localStorage.getItem("doneLocalStorage");
    return localDone ? JSON.parse(localDone) : [];
  });

  useEffect(() => {
    localStorage.setItem("taskLocalStorage", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("doneLocalStorage", JSON.stringify(done));
  }, [done]);

  const addTask = (newTask) => {
    const taskWithId = { id: Date.now(), text: newTask };
    setTasks((prevTasks) => [...prevTasks, taskWithId]);
  };

  const handleRemove = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const doneHandleRemove = (taskId) => {
    setDone((prevDone) => prevDone.filter((task) => task.id !== taskId));
  };

  const timeoutRef = useRef();

  const handleCheck = (taskId) => {
    setTimeout(() => {
      setTasks((prevTasks) => {
        const newTasks = prevTasks.filter((task) => task.id !== taskId);
        const completedTask = prevTasks.find((task) => task.id === taskId);
  
        if (completedTask) {
          setDone((prevDone) => {

            const isAlreadyDone = prevDone.find((task) => task.id === completedTask.id);
            return isAlreadyDone ? prevDone : [...prevDone, completedTask];
          });
        }
  
        return newTasks;
      });
    }, 1000);
  };
  

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <>
      <h1>TODO APP</h1>
      <main>
        <Input addTask={addTask} />
        <div className="cards-main">
          <span>Tasks</span>
          <div className="cards">
            {tasks.length===0 ? <p>Not yet added</p> :tasks.map((task, index) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.3 }}
                key={task.id}  
              >
                <Card
                  text={task.text}
                  onRemove={() => handleRemove(task.id)}
                  onCheck={() => handleCheck(task.id)}
                />
              </motion.div>
            ))}
          </div>
        </div>
        <div className="done-main">
          <span>Done</span>
          <div className="done">
            {done.length===0 ? <p>Not yet added</p> : done.map((task) => (
              <DoneCard
                key={task.id}
                text={task.text}
                onRemove={() => doneHandleRemove(task.id)}
              />
            ))}
          </div>
        </div>
        <Footer/>
      </main>
    </>
  );
}

export default App;

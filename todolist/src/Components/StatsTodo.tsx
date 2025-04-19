import { useContext, useEffect, useState } from "react";
import styles from "./StatsTodo.module.css";
import { TaskContext, TaskInt } from "../Context";

const StatsTodo = () => {
  const contexto = useContext(TaskContext);
  if (!contexto) {
    throw new Error("No contexto");
  }
  const { taskList, setTaskList } = contexto;

  const calculateAverageDurations = (tasks: TaskInt[]) => {
    let totalDuration = 0;
    let totalCount = 0;

    const priorityData: Record<string, { total: number; count: number }> = {
      "1": { total: 0, count: 0 },
      "2": { total: 0, count: 0 },
      "3": { total: 0, count: 0 },
    };

    tasks.forEach((task) => {
      if (task.doneDate == "") {
        return;
      }
      const start = new Date(task.createDate);
      const end = new Date(task.doneDate);

      const duration =
        (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24); // duración en días

      totalDuration += duration;
      totalCount++;

      priorityData[task.priority].total += duration;
      priorityData[task.priority].count++;
    });

    const generalAverage = totalCount ? totalDuration / totalCount : 0;

    const priorityAverages = {
      1: priorityData[1].count
        ? priorityData[1].total / priorityData[1].count
        : 0,
      2: priorityData[2].count
        ? priorityData[2].total / priorityData[2].count
        : 0,
      3: priorityData[3].count
        ? priorityData[3].total / priorityData[3].count
        : 0,
    };

    return {
      generalAverage,
      priorityAverages,
    };
  };

  const [average, setAverage] = useState(0);
  const [averageLow, setAverageLow] = useState(0);
  const [averageMedium, setAverageMedium] = useState(0);
  const [averageHigh, setAverageHigh] = useState(0);

  useEffect(() => {
    let { generalAverage, priorityAverages } =
      calculateAverageDurations(taskList);
    setAverage(generalAverage);
    setAverageLow(priorityAverages[1]);
    setAverageMedium(priorityAverages[2]);
    setAverageHigh(priorityAverages[3]);
  }, [taskList]);

  return (
    <div className={styles.container}>
      <div>
        <h3>Average Time to finish Tasks:</h3>
        <h4>{average}</h4>
      </div>
      <div>
        <h3>Average Time to finish Tasks by Priority:</h3>
        <div className={styles.itemStat}>
          <h3 className={styles.valueStat}>Low</h3>
          <h4>{averageLow}</h4>
        </div>
        <div className={styles.itemStat}>
          <h3 className={styles.valueStat}>Medium</h3>
          <h4>{averageMedium}</h4>
        </div>
        <div className={styles.itemStat}>
          <h3 className={styles.valueStat}>High</h3>
          <h4>{averageHigh}</h4>
        </div>
      </div>
    </div>
  );
};

export default StatsTodo;

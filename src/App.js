import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";

function App() {
  const [added, setAdded] = useState(false);
  const [todo, setTodo] = useState("");
  const [list, setList] = useState([]);
  const [date, setDate] = useState(null);
  const handleChangeDate = (e) => {
    setDate(e.target.value);
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data"));
    if (data) {
      setList(data);
    }
  }, []);

  const handleCreate = () => {
    const data = { todo, date };
    setList([...list, data]);
    localStorage.setItem("data", JSON.stringify([...list, data]));
    setAdded(!added);
  };

  const handleChecklist = (e, item) => {
    console.log(e.target.value);
    if (e.target.value === "on") {
      const data = list.filter((obj) => obj?.todo !== item?.todo);
      setList(data);
      localStorage.setItem("data", JSON.stringify(data));
    }
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  if (added) {
    return (
      <div className={styles.root}>
        <div className={styles.containerAdd}>
          <div className={styles.appBarAdd}>
            <div className={styles.subBarOne}>
              <p className={styles.title}>New Task</p>
            </div>
            <div onClick={() => setAdded(!added)} className={styles.subBarTwo}>
              <img src="/img/close.svg" alt="close" height="24" width="24" />
            </div>
          </div>
          <div className={styles.content}>
            <p>What are you planning?</p>
            <textarea onChange={handleChange} className={styles.textArea} />
          </div>
          <div className={styles.divDate}>
            <input
              onChange={handleChangeDate}
              type="date"
              className={styles.inputDate}
            />
          </div>
          <button onClick={handleCreate} className={styles.buttonCreate}>
            Create
          </button>
        </div>
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className={styles.root}>
        <div className={styles.container}>
          <div className={styles.appBar}>
            <img src="/img/back.svg" alt="back" height="24" width="24" />
            <img src="/img/more.svg" alt="more" height="24" width="24" />
          </div>
          <div className={styles.titleSection}>
            <div className={styles.task}>
              <img src="/img/event.svg" alt="event" height="24" width="24" />
            </div>
            <p className={styles.textOne}>
              <b>All</b>
            </p>
            <p className={styles.totalTask}>{list?.length} Task</p>
          </div>
          <div className={styles.boxList}>
            {list?.map((item, index) => (
              <div className={styles.list} key={index}>
                <div>
                  <p className={styles.title}>{item?.todo}</p>
                  <p className={styles.date}>{item?.date}</p>
                </div>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    handleChecklist(e, item);
                  }}
                />
              </div>
            ))}

            <div className={styles.divFab}>
              <div className={styles.fabs}>
                <div
                  onClick={() => setAdded(!added)}
                  className={styles.buttonFabs}
                >
                  <img src="/img/add.svg" height="25" width="25" alt="add" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;

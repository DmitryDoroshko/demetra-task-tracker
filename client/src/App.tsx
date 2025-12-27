import styles from "./App.module.scss";

import { Header } from "./components/Header/Header.tsx";
import { CustomInput } from "./components/CustomInput/CustomInput.tsx";
import { CustomButton } from "./components/CustomButton/CustomButton.tsx";

const icon = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12.8 12.8L9.90005 9.9M11.4667 6.13334C11.4667 9.07886 9.0789 11.4667 6.13338 11.4667C3.18786 11.4667 0.800049 9.07886 0.800049 6.13334C0.800049 3.18782 3.18786 0.800003 6.13338 0.800003C9.0789 0.800003 11.4667 3.18782 11.4667 6.13334Z"
      stroke="#1E1E1E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <Header />
        <div className={styles.actionsRowFlex}>
          <CustomInput style={{ flex: 1, marginBottom: "2.4rem" }}
                       name={"taskTitle"}
                       placeholder={"New task title"} />
          <CustomButton type={"button"} buttonType={"primary"}>Add</CustomButton>
        </div>
        <div className="actionsRow marginBottom24">
          <CustomInput icon={icon} placeholder={"Search task"} />
        </div>

        <main className={"tasksAppContainer"}>
          <div className="tasksInfo">
            <h2 className={"totalTasks"}>Total Tasks: 3</h2>
            <button className={"button deleteAllButton"}>Delete All</button>
          </div>
          <ul className={"tasks"}>
            <li className={"task completed"}>
              <div className="taskInner">
                <div className="taskLeft">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.3334 4L6.00002 11.3333L2.66669 8" stroke="#F5F5F5" strokeWidth="1.6"
                          strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="taskTexts">
                    <p className={"taskTitle"}>Task 1</p>
                    <p className={"taskDescription"}>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias architecto at corporis dolorem
                      facilis ipsum
                    </p>
                  </div>
                </div>
                <div className="taskRight">
                  <button>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15 5L5 15M5 5L15 15" stroke="#757575" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
            </li>
            <li className={"task completed"}>
              <div className="taskInner">
                <div className="taskLeft">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.3334 4L6.00002 11.3333L2.66669 8" stroke="#F5F5F5" stroke-width="1.6"
                          stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <div className="taskTexts">
                    <p className={"taskTitle"}>Task 2</p>
                    <p className={"taskDescription"}>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias architecto at corporis dolorem
                      facilis ipsum
                    </p>
                  </div>
                </div>
                <div className="taskRight">
                  <button>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15 5L5 15M5 5L15 15" stroke="#757575" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
            </li>
            <li className={"task"}>
              <div className="taskInner">
                <div className="taskLeft">
                  <svg
                    width="12"
                    height="10"
                    viewBox="0 0 12 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 4.5L4.5 8L11 1"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="taskTexts">
                    <p className={"taskTitle"}>Task 1</p>
                    <p className={"taskDescription"}>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias architecto at corporis dolorem
                      facilis ipsum
                    </p>
                  </div>
                </div>
                <div className="taskRight">
                  <button>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15 5L5 15M5 5L15 15" stroke="#757575" strokeWidth="2" strokeLinecap="round"
                            strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </main>

      </div>
    </div>
  );
}

export default App;

let cancelTask = false;

export function onStartTask() {
  cancelTask = false;
}

export function onCancelTask() {
  cancelTask = true;
}

type TaskFn<T> = (cb: (err: Error | null, res: T) => void) => void;

export function handleCallbackFunctions<T>(
  info: {
    tasks: TaskFn<T>[];
    limit: number;
    // 是否任何一个失败都退出
    failToExit?: boolean;
  },
  onDone: (err: Error[] | null, results: T[]) => void,
) {
  let running = 0;

  const results: T[] = [];
  const errors: Error[] = [];

  let idx = -1;
  let canceled: boolean = false;
  function runner() {
    if (cancelTask) {
      return;
    }
    while (running < info.limit && info.tasks.length > 0) {
      if (canceled) {
        return;
      }
      const task = info.tasks.shift();
      idx = idx + 1;
      const currentIdx = idx;
      if (!task) {
        break;
      }
      task((err, res) => {
        if (canceled) {
          return;
        }
        if (err) {
          errors.push(err);
        }
        if (info.failToExit && err) {
          onDone(errors, []);
          canceled = true;
          return;
        }
        --running;

        results[currentIdx] = res;

        if (info.tasks.length > 0) {
          runner();
          return;
        } else {
          if (running === 0) {
            onDone(errors, results);
          }
        }
      });
      running++;
    }
  }
  runner();
}

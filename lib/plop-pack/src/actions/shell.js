import shell from 'shelljs';

const exec = (command, options) => new Promise(
  (resolve, reject) => {
    const r = shell.exec(command, { ...options, async: false });

    return (
      r.code === 0
        ? resolve()
        : reject(r.stderr)
    );
  }
);

const plopActionShell = (answers, config, plop) => {
  const command = plop.renderString(config.command, answers);

  return exec(command).then(() => command);
};

export default plopActionShell;

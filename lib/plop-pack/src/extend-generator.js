import nodePlop from 'node-plop';
import path from 'node:path';
import resolve from 'resolve';

export const extendGenerator = async (plop, plopfilePath, generator, extension, actionsSpliceStart, actionsSpliceDeleteCount = 0) => {
	const parentPath = resolve.sync(plopfilePath, { basedir: plop.getPlopfilePath() });
  const parent = await nodePlop(parentPath, { destBasePath: plop.getDestBasePath() });
  const { name, description, prompts, actions: _actions, basePath, runActions, runPrompts, ...rest } = parent.getGenerator(generator);

  const patchPath = v => v && path.resolve(basePath, v);
  const patchAction = action => ({
    ...action,
    base: patchPath(action.base),
    source: patchPath(action.source),
    target: patchPath(action.target),
    templateFile: patchPath(action.templateFile),
    templateFiles: patchPath(action.templateFiles)
  });

  const actions = _actions.map(patchAction);

  const start = (
    actionsSpliceStart === undefined
      ? _actions.length
      : actionsSpliceStart
  );
  actions.splice(start, actionsSpliceDeleteCount, ...extension.actions);

  return {
    ...rest,
    ...extension,
    description: extension.description || description,
    prompts: [ ...prompts, ...extension.prompts ],
    actions
  };
};

export default extendGenerator;

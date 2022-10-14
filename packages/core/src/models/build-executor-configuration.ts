import { TargetConfiguration } from '@nrwl/devkit';
import { lt } from 'semver';
import { BuildExecutorSchema } from '../executors/build/schema';

/**
 * Returns a TargetConfiguration for the nx-dotnet/core:build executor
 */
export function GetBuildExecutorConfiguration(
  projectRoot: string,
): BuildExecutorConfiguration {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const nxVersion = require('nx/package.json').version;

  const outputDirectory =
    (lt(nxVersion, '15.0.0-beta.0') ? '' : '{workspaceRoot}/') +
    `dist/${projectRoot}`;

  return {
    executor: '@nx-dotnet/core:build',
    outputs: [outputDirectory],
    options: {
      configuration: 'Debug',
      noDependencies: true,
    },
    configurations: {
      production: {
        configuration: 'Release',
      },
    },
  };
}

/**
 * Configuration options relevant for the build executor
 */
export type BuildExecutorConfiguration = TargetConfiguration & {
  executor: '@nx-dotnet/core:build';
  options: BuildExecutorSchema;
};

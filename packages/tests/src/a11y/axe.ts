import { AxeResults, configure, run, type ImpactValue, type Result, type RunOptions, type Spec } from 'axe-core';
import chalk from 'chalk';
import { merge } from 'lodash-es';
import { matcherHint, mount, printReceived } from './utils';

export type AxeConfigureOptions = RunOptions & { globalOptions?: Spec };

export const configureAxe = (options: AxeConfigureOptions = {}) => {
  const { globalOptions = {}, ...runnerOptions } = options;

  const { checks = [], rules = [], ...otherGlobalOptions } = globalOptions;

  configure({
    checks: [
      {
        // color contrast checking doesnt work in a jsdom environment.
        id: 'color-contrast',
        enabled: false,
      },
      ...checks,
    ],
    rules: [
      {
        id: 'color-contrast',
        enabled: false,
      },
      ...rules,
    ],
    ...otherGlobalOptions,
  });

  return (html: string | HTMLElement, additionalOptions = {}) => {
    const [element, restore] = mount(html);
    const options = merge({}, runnerOptions, additionalOptions);

    return new Promise((resolve, reject) => {
      run(element, options, (err, results) => {
        restore();

        if (err) {
          reject(err);
        }

        resolve(results);
      });
    });
  };
};

export const axe = configureAxe();

const filterViolations = (violations: Result[], impactLevels: ImpactValue[]) => {
  if (impactLevels && impactLevels.length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return violations.filter((v) => impactLevels.includes(v.impact!));
  }

  return violations;
};

export const toHaveNoViolations = {
  toHaveNoViolations(results: AxeResults) {
    if (typeof results.violations === 'undefined') {
      throw new Error('No violations found in aXe results object');
    }

    const violations = filterViolations(
      results.violations,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      results.toolOptions ? (results as any).toolOptions.impactLevels : []
    );

    const reporter = (violations: Result[]) => {
      if (violations.length === 0) {
        return [];
      }

      const lineBreak = '\n\n';
      const horizontalLine = '\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500';

      return violations
        .map((violation) => {
          return violation.nodes
            .map((node) => {
              const selector = node.target.join(', ');
              const expectedText = `Expected the HTML found at $('${selector}') to have no violations:` + lineBreak;
              return (
                expectedText +
                chalk.grey(node.html) +
                lineBreak +
                `Received:` +
                lineBreak +
                printReceived(`${violation.help} (${violation.id})`) +
                lineBreak +
                chalk.yellow(node.failureSummary) +
                lineBreak +
                (violation.helpUrl
                  ? `You can find more information on this issue here: \n${chalk.blue(violation.helpUrl)}`
                  : '')
              );
            })
            .join(lineBreak);
        })
        .join(lineBreak + horizontalLine + lineBreak);
    };

    const formattedViolations = reporter(violations);
    const pass = formattedViolations.length === 0;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const message: () => string = () => {
      if (pass) {
        return;
      }
      return matcherHint('.toHaveNoViolations') + '\n\n' + `${formattedViolations}`;
    };

    return { actual: violations, message, pass };
  },
};

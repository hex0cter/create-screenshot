import { ArgumentParser } from 'argparse';
import { resolve } from 'path';
import { version, description } from '../package.json';
import path from 'path';
import screenshot from 'screenshot-desktop';
import shell from 'shelljs';

export async function cli() {
  const parser = new ArgumentParser({
    description
  });

  parser.add_argument('-v', '--version', { action: 'version', version });
  parser.add_argument('-d', '--output-dir', {default: "screenshots", help: 'destination directory of screenshots' });

  const args = parser.parse_args()
  const fullPath = resolve(args.output_dir)
  shell.mkdir('-p', fullPath);
  const start = Date.now();
  const destFilePath = path.join(fullPath, `screenshots-${start}.png`);

  const image = await screenshot({ filename: destFilePath });
  console.log(image);
}

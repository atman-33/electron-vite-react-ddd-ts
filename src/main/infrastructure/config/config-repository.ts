import { app } from 'electron';
import fs from 'fs';
import path from 'path';
import { Config } from '../../domain/config/config';
import { IConfigRepository } from '../../domain/config/iconfig-repository';

class ConfigRepository implements IConfigRepository {
  private configPath: string;

  constructor(configPath?: string) {
    if (configPath) {
      this.configPath = configPath;
    } else {
      this.configPath = path.resolve(this.getConfigFolderPath(), 'config.json');
    }
  }

  get(): Config {
    if (fs.existsSync(this.configPath)) {
      return JSON.parse(fs.readFileSync(this.configPath, 'utf-8'));
    } else {
      return {} as Config;
    }
  }

  set(config: Config): void {
    fs.writeFileSync(this.configPath, JSON.stringify(config, null, 2), 'utf-8');
  }

  /** 設定ファイルが存在するフォルダパスを取得する */
  private getConfigFolderPath(): string {
    const folderPath =
      process.env.NODE_ENV === 'development'
        ? path.join(__dirname)
        : path.join(path.dirname(app.getPath('exe')));

    console.log(`configFolderPath: ${folderPath}`);
    return folderPath;
  }
}

export { ConfigRepository };

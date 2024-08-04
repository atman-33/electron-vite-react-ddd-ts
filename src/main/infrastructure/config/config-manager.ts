import { app } from 'electron';
import fs from 'fs';
import path from 'path';

type Config = {
  DATABASE_URL: string;
};

class ConfigManager {
  private configPath: string;
  private config!: Config;

  constructor(configPath?: string) {
    if (configPath) {
      this.configPath = configPath;
    } else {
      this.configPath = path.resolve(this.getConfigFolderPath(), 'config.json');
    }
    this.loadConfig();
  }

  /** 設定ファイルを読み込む */
  private loadConfig() {
    if (fs.existsSync(this.configPath)) {
      this.config = JSON.parse(fs.readFileSync(this.configPath, 'utf-8'));
    } else {
      this.config = {} as Config;
    }
  }

  /** 設定ファイルのパスを返す */
  get path() {
    return this.configPath;
  }

  /** 設定ファイルから特定のキーの値を取得する */
  get<K extends keyof Config>(key: K): Config[K] {
    return this.config[key];
  }

  /** 設定ファイルに特定のキーと値を書き込む */
  set<K extends keyof Config>(key: K, value: Config[K]) {
    this.config[key] = value;
    this.saveConfig();
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

  /** 設定ファイルを保存する */
  private saveConfig() {
    fs.writeFileSync(this.configPath, JSON.stringify(this.config, null, 2), 'utf-8');
  }
}

export { ConfigManager };

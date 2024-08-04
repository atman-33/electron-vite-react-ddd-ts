import { app } from 'electron';
import fs from 'fs';
import path from 'path';

type Config = {
  DATABASE_URL: string;
};

class ConfigManager {
  private configPath: string;
  private config!: Config | object;

  constructor() {
    this.configPath = path.resolve(this.getConfigFolderPath(), 'config.json');
    this.loadConfig();
  }

  /**
   * 設定ファイルを読み込む
   */
  private loadConfig() {
    if (fs.existsSync(this.configPath)) {
      this.config = JSON.parse(fs.readFileSync(this.configPath, 'utf-8'));
    } else {
      this.config = {};
    }
  }

  /**
   * 設定ファイルから特定のキーの値を取得する
   * @param key
   * @returns
   */
  get(key: string) {
    return this.config[key];
  }

  /**
   * 設定ファイルに特定のキーと値を書き込む
   * @param key
   * @param value
   */
  set(key: string, value: unknown) {
    this.config[key] = value;
    this.saveConfig();
  }

  /**
   * 設定ファイルが存在するフォルダパスを取得する
   * @returns
   */
  private getConfigFolderPath(): string {
    const folderPath =
      process.env.NODE_ENV === 'development'
        ? path.join(__dirname)
        : path.join(path.dirname(app.getPath('exe')));

    console.log(`configFolderPath: ${folderPath}`);
    return folderPath;
  }

  /**
   * 設定ファイルを保存する
   */
  private saveConfig() {
    fs.writeFileSync(this.configPath, JSON.stringify(this.config, null, 2), 'utf-8');
  }
}

export const configManager = new ConfigManager();

import { Injectable } from "@nestjs/common";
import fs from "fs";
import * as path from "path";
import { Inject } from "@nestjs/common";
import { MODULE_OPTIONS_TOKEN } from "./config.module-definition";
import * as dotenv from "dotenv";

@Injectable()
export class ConfigService {
  private envVars: { [key: string]: string };

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN) private options: Record<string, string>,
    // @Inject(MODULE_OPTIONS_TOKEN) private options: string,
  ) {
    const filePath = path.resolve(
      __dirname + "/../env/" + options.filename + ".env",
      // __dirname + "/../env/" + options + ".env",
    );
    this.envVars = dotenv.parse(fs.readFileSync(filePath, "utf-8"));
  }

  get(value: string): string {
    if (this.envVars[value]) {
      return this.envVars[value];
    } else {
      throw new Error(`Config value for ${value} not found`);
    }
  }
}

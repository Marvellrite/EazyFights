import { Module } from "@nestjs/common";
import { ConfigService } from "./config.service";
import { ConfigurableModuleClass as ConfigModuleClass } from "./config.module-definition";

@Module({
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule extends ConfigModuleClass {}

console.log("Config Module: ", ConfigModule);
console.log(
  "Config Module Register: ",
  ConfigModule.register({ filename: "development" }),
  // ConfigModule.register("development"),
);

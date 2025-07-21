import { ConfigurableModuleBuilder } from "@nestjs/common";

// type ConfigModuleOption = string;

interface ConfigModuleOption {
  filename: "development" | "production";
}

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN, OPTIONS_TYPE } =
  new ConfigurableModuleBuilder<ConfigModuleOption>()
    .setExtras({ isGlobal: true }, (definitons, extras) => {
      console.log(
        "Module definition ==>",
        definitons,
        "this is extras=>",
        extras,
      );
      return { ...definitons, global: extras.isGlobal };
    })
    .build();

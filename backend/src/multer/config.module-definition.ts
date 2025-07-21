import { ConfigurableModuleBuilder } from "@nestjs/common";

interface multerOptions {
    filename: string
}

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN, OPTIONS_TYPE } = new ConfigurableModuleBuilder<multerOptions>().build()